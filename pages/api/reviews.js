import {mongooseConnect} from "../../lib/mongoose";
import {Review} from "../../models/Review";
import title from "../../components/Title";

export default async function handle(req, res) {
    await mongooseConnect();
    
    if (req.method === 'POST') {
        const {title, description, stars, product} = req.body;
        res.json(await Review.create({title, description, stars, product}))
    }
    
    if (req.method === 'GET') {
        const {product} = req.body;
        res.json(await Review.find({product}))
    }
}
