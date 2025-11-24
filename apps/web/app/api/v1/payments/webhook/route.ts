/**
 * Stripe Webhook Handler
 * 
 * POST /api/v1/payments/webhook
 * Receives and processes Stripe webhook events
 */

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@repo/database';
import { ProcessPaymentWebhookUseCase, StripePaymentService } from '@repo/core/payments';
import { PrismaOrderRepository } from '@repo/core/orders';

/**
 * POST /api/v1/payments/webhook
 * Handle Stripe webhooks (NO AUTHENTICATION - Stripe signature verification only)
 */
export async function POST(request: NextRequest) {
  try {
    // 1. Get raw body and signature
    const body = await request.text();
    const signature = request.headers.get('stripe-signature');

    if (!signature) {
      return NextResponse.json(
        {
          success: false,
          error: 'Missing stripe-signature header',
        },
        { status: 400 }
      );
    }

    // 2. Verify webhook signature
    const stripeService = new StripePaymentService();
    let event;

    try {
      event = stripeService.verifyWebhookSignature(body, signature);
    } catch (error) {
      console.error('Webhook signature verification failed:', error);
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid signature',
        },
        { status: 400 }
      );
    }

    // 3. Initialize use case
    const orderRepository = new PrismaOrderRepository(prisma);
    const webhookUseCase = new ProcessPaymentWebhookUseCase(orderRepository, stripeService);

    // 4. Process event
    await webhookUseCase.execute(event);

    // 5. Return success (Stripe expects 200)
    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook processing error:', error);

    // Still return 200 to Stripe to prevent retries for permanent errors
    // Log the error for investigation
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Webhook processing failed',
      },
      { status: 200 } // Return 200 to Stripe even on error
    );
  }
}
