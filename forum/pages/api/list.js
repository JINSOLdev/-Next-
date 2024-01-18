import { connectDB } from '@/util/database';

export default async function handler(req, res) {
    const db = (await connectDB).db('forum');
    let result = await db.collection('post').find().toArray();

    if (req.method === 'GET') {
        return res.status(200).json(result);
    } else {
        return res.status(400).json('처리실패');
    }
    // return res.status(200).json('처리완료');
}
