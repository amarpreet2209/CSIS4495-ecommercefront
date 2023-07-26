import {mongooseConnect} from "../../lib/mongoose";
import {Review} from "../../models/Review";

export default async function handle(req, res) {
    await mongooseConnect();
    
    if (req.method === 'POST') {
        const {title, description, stars} = req.body;
        res.json(await Review.create({title, description, stars}))
    }
    
    if (req.method === 'GET') {
        const {productId} = req.body;
        res.json(await Review.create({title, description, stars}))
    }
}
