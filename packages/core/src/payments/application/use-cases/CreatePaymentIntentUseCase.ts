/**
 * Create Payment Intent Use Case
 * 
 * Creates a Stripe payment intent for an order.
 */

import { IOrderRepository } from '../../../orders/domain/repositories/IOrderRepository';
import { Payment } from '../../domain/entities/Payment';
import { StripePaymentService } from '../../domain/services/StripePaymentService';

export interface CreatePaymentIntentDTO {
  orderId: string;
}

export interface PaymentIntentResponseDTO {
  paymentId: string;
  clientSecret: string;
  amount: number;
  currency: string;
  status: string;
}

export class CreatePaymentIntentUseCase {
  constructor(
    private orderRepository: IOrderRepository,
    private stripeService: StripePaymentService
  ) {}

  async execute(dto: CreatePaymentIntentDTO, userId: string): Promise<PaymentIntentResponseDTO> {
    // 1. Find order
    const order = await this.orderRepository.findById(dto.orderId);
    if (!order) {
      throw new Error('Order not found');
    }

    // 2. Verify authorization (only buyer can create payment)
    if (order.buyerId !== userId) {
      throw new Error('Unauthorized to create payment for this order');
    }

    // 3. Check order status
    if (order.status !== 'PENDING') {
      throw new Error('Payment can only be created for pending orders');
    }

    // 4. Create payment entity
    const payment = Payment.create({
      orderId: order.id,
      amount: order.totalAmount.getAmount(),
      currency: order.totalAmount.getCurrency(),
    });

    // 5. Create Stripe payment intent
    const paymentIntent = await this.stripeService.createPaymentIntent({
      amount: payment.amount,
      currency: payment.currency,
      orderId: order.id,
      metadata: {
        buyerId: order.buyerId,
        sellerId: order.sellerId,
        orderNumber: order.orderNumber.getValue(),
      },
    });

    // 6. Update payment with Stripe details
    payment.markAsProcessing(paymentIntent.id);

    // 7. Return response
    return {
      paymentId: payment.id,
      clientSecret: paymentIntent.client_secret!,
      amount: payment.amount,
      currency: payment.currency,
      status: payment.status,
    };
  }
}
