import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2026-02-25.clover',
});

export async function POST(req: Request) {
  try {
    const { plan, userId } = await req.json();

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    // Usually you would lookup the Stripe Price ID in your dashboard.
    const priceId = plan === 'annual' 
      ? 'price_dummy_annual'  // Replace with actual Stripe price ID
      : 'price_dummy_monthly'; // Replace with actual Stripe price ID

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'gbp',
            product_data: {
              name: plan === 'annual' ? 'ParSide Annual Subscription' : 'ParSide Monthly Subscription',
              description: 'Access to Monthly Draws and tracking protocols.',
            },
            unit_amount: plan === 'annual' ? 9999 : 999, // in pence
            recurring: { interval: plan === 'annual' ? 'year' : 'month' },
          },
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/dashboard?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/signup`,
      client_reference_id: userId,
      metadata: {
        userId: userId,
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error('Error creating checkout session:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
