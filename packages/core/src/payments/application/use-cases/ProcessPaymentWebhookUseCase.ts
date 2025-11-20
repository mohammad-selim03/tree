/**
 * Process Payment Webhook Use Case
 * 
 * Handles Stripe webhook events for payment processing.
 */

import { IOrderRepository } from '../../../orders/domain/repositories/IOrderRepository';
import { StripePaymentService } from '../../domain/services/StripePaymentService';
import Stripe from 'stripe';

export class ProcessPaymentWebhookUseCase {
  constructor(
    private orderRepository: IOrderRepository,
    private stripeService: StripePaymentService
  ) {}

  async execute(event: Stripe.Event): Promise<void> {
    switch (event.type) {
      case 'payment_intent.succeeded':
        await this.handlePaymentSuccess(event.data.object as Stripe.PaymentIntent);
        break;

      case 'payment_intent.payment_failed':
        await this.handlePaymentFailure(event.data.object as Stripe.PaymentIntent);
        break;

      case 'charge.refunded':
        await this.handleRefund(event.data.object as Stripe.Charge);
        break;

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }
  }

  private async handlePaymentSuccess(paymentIntent: Stripe.PaymentIntent): Promise<void> {
    const orderId = paymentIntent.metadata.orderId;

    if (!orderId) {
      throw new Error('Order ID not found in payment intent metadata');
    }

    // Find order
    const order = await this.orderRepository.findById(orderId);
    if (!order) {
      throw new Error(`Order not found: ${orderId}`);
    }

    // Mark order as paid
    order.markAsPaid(paymentIntent.id);

    // Transition to processing
    order.startProcessing();

    // Save order
    await this.orderRepository.save(order);

    console.log(`Order ${orderId} marked as paid and processing`);
  }

  private async handlePaymentFailure(paymentIntent: Stripe.PaymentIntent): Promise<void> {
    const orderId = paymentIntent.metadata.orderId;

    if (!orderId) {
      console.error('Order ID not found in failed payment intent');
      return;
    }

    console.error(`Payment failed for order ${orderId}:`, paymentIntent.last_payment_error?.message);
    
    // Could send notification email here
    // Could cancel order if payment fails multiple times
  }

  private async handleRefund(charge: Stripe.Charge): Promise<void> {
    console.log(`Refund processed for charge ${charge.id}`);
    
    // Could update order status to REFUNDED here
    // Could send refund confirmation email
  }
}
