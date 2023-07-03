import {mongooseConnect} from "../../lib/mongoose";
import Stripe from "stripe";
import {buffer} from "micro";
import {Order} from "../../models/Order";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const endpointSecret = "whsec_df6ad88cf96693ca78b9afa15f5ab01e39bc011631c0a82dcee35ab247820b1d";

export default async function handler (req, res) {
    await mongooseConnect();
    
    const sig = req.headers['stripe-signature'];
    
    let event;
    
    try {
        event = stripe.webhooks.constructEvent(await buffer(req), sig, endpointSecret);
    } catch (err) {
        res.status(400).send(`Webhook Error: ${err.message}`);
        return;
    }
    
    // Handle the event
    switch (event.type) {
        case 'checkout.session.completed':
            const data = event.data.object;
            const orderId = data.metadata.orderId;
            const paid = data.payment_status === 'paid';
            if (orderId && paid) {
                await Order.findByIdAndUpdate(orderId,{
                    paid:true,
                })
            }
            break;
        default:
            console.log(`Unhandled event type ${event.type}`);
    }
    
    res.status(200).send('ok');
}

export const config = {
    api: {bodyParser:false,}
};
