import {mongooseConnect} from "../../lib/mongoose";
import {getServerSession} from "next-auth";
import {Order} from "../../models/Order";
import {authOptions} from "./auth/[...nextauth]";

export default async function handle(req, res) {
    await mongooseConnect();
    
    const {user} = await getServerSession(req, res, authOptions);
    res.json(
        await Order.find({userEmail: user.email})
    )
}
