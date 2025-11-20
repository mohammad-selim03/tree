/**
 * Email Service
 * 
 * Domain service for sending emails.
 * Uses a simple SMTP approach (can be replaced with SendGrid, AWS SES, etc.)
 */

export interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

export interface OrderConfirmationEmailData {
  buyerName: string;
  orderNumber: string;
  totalAmount: number;
  currency: string;
  items: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
  shippingAddress: string;
}

export interface ShippingNotificationEmailData {
  buyerName: string;
  orderNumber: string;
  trackingNumber: string;
  carrier?: string;
}

export class EmailService {
  private from: string;

  constructor() {
    this.from = process.env.SMTP_FROM || 'noreply@treeverse.com';
  }

  /**
   * Send a generic email
   */
  async sendEmail(options: EmailOptions): Promise<void> {
    // In production, use a real email service (SendGrid, AWS SES, etc.)
    // For now, we'll just log
    
    console.log('📧 Email sent:');
    console.log(`To: ${options.to}`);
    console.log(`Subject: ${options.subject}`);
    console.log(`Body: ${options.html.substring(0, 100)}...`);

    // TODO: Integrate with actual email service
    // Example with nodemailer:
    /*
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: this.from,
      ...options,
    });
    */
  }

  /**
   * Send order confirmation email
   */
  async sendOrderConfirmation(to: string, data: OrderConfirmationEmailData): Promise<void> {
    const itemsList = data.items
.map(
        (item) => `
        <tr>
          <td>${item.name}</td>
          <td>${item.quantity}</td>
          <td>${data.currency} ${item.price.toFixed(2)}</td>
        </tr>
      `
      )
      .join('');

    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #4CAF50; color: white; padding: 20px; text-align: center; }
          .content { padding: 20px; }
          table { width: 100%; border-collapse: collapse; }
          th, td { padding: 10px; text-align: left; border-bottom: 1px solid #ddd; }
          .total { font-size: 18px; font-weight: bold; }
          .footer { margin-top: 20px; padding-top: 20px; border-top: 1px solid #ddd; color: #666; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Order Confirmation</h1>
          </div>
          <div class="content">
            <p>Hi ${data.buyerName},</p>
            <p>Thank you for your order! Your order has been confirmed.</p>
            
            <p><strong>Order Number:</strong> ${data.orderNumber}</p>
            
            <h3>Order Details:</h3>
            <table>
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Quantity</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                ${itemsList}
              </tbody>
            </table>
            
            <p class="total">Total: ${data.currency} ${data.totalAmount.toFixed(2)}</p>
            
            <h3>Shipping Address:</h3>
            <p style="white-space: pre-line;">${data.shippingAddress}</p>
            
            <p>You will receive another email once your order ships.</p>
          </div>
          <div class="footer">
            <p>Thank you for shopping with TreeVerse!</p>
            <p>If you have any questions, please contact us.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    await this.sendEmail({
      to,
      subject: `Order Confirmation - ${data.orderNumber}`,
      html,
      text: `Order ${data.orderNumber} confirmed. Total: ${data.currency} ${data.totalAmount.toFixed(2)}`,
    });
  }

  /**
   * Send shipping notification email
   */
  async sendShippingNotification(to: string, data: ShippingNotificationEmailData): Promise<void> {
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #2196F3; color: white; padding: 20px; text-align: center; }
          .content { padding: 20px; }
          .tracking { background-color: #f5f5f5; padding: 15px; margin: 20px 0; border-radius: 5px; }
          .footer { margin-top: 20px; padding-top: 20px; border-top: 1px solid #ddd; color: #666; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>📦 Your Order Has Shipped!</h1>
          </div>
          <div class="content">
            <p>Hi ${data.buyerName},</p>
            <p>Good news! Your order has been shipped and is on its way to you.</p>
            
            <p><strong>Order Number:</strong> ${data.orderNumber}</p>
            
            <div class="tracking">
              <h3>Tracking Information:</h3>
              <p><strong>Tracking Number:</strong> ${data.trackingNumber}</p>
              ${data.carrier ? `<p><strong>Carrier:</strong> ${data.carrier}</p>` : ''}
            </div>
            
            <p>You can use the tracking number above to track your shipment.</p>
            <p>Your order should arrive within the estimated delivery time.</p>
          </div>
          <div class="footer">
            <p>Thank you for your purchase!</p>
            <p>TreeVerse Team</p>
          </div>
        </div>
      </body>
      </html>
    `;

    await this.sendEmail({
      to,
      subject: `Order Shipped - ${data.orderNumber}`,
      html,
      text: `Your order ${data.orderNumber} has shipped. Tracking: ${data.trackingNumber}`,
    });
  }

  /**
   * Send payment confirmation email
   */
  async sendPaymentConfirmation(to: string, orderNumber: string, amount: number, currency: string): Promise<void> {
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #4CAF50; color: white; padding: 20px; text-align: center; }
          .content { padding: 20px; }
          .amount { font-size: 24px; font-weight: bold; color: #4CAF50; text-align: center; margin: 20px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>✅ Payment Confirmed</h1>
          </div>
          <div class="content">
            <p>Your payment has been successfully processed.</p>
            
            <p><strong>Order Number:</strong> ${orderNumber}</p>
            
            <div class="amount">
              ${currency} ${amount.toFixed(2)}
            </div>
            
            <p>Your order is now being prepared for shipment.</p>
            <p>Thank you for your purchase!</p>
          </div>
        </div>
      </body>
      </html>
    `;

    await this.sendEmail({
      to,
      subject: `Payment Confirmation - ${orderNumber}`,
      html,
      text: `Payment confirmed for order ${orderNumber}. Amount: ${currency} ${amount.toFixed(2)}`,
    });
  }
}
