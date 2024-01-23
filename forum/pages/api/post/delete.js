import { connectDB } from '@/util/database';
import { ObjectId } from 'mongodb';
import { getServerSession } from 'next-auth';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        let session = await getServerSession();

        let db = (await connectDB).db('forum');
        let result = await db.collection('post').findOne({ _id: new ObjectId(req.body) });

        if (result.author === session.user.email) {
            let result = await db.collection('post').deleteOne({ _id: new ObjectId(req.body) });
            return res.status(200).json('삭제 완료');
        } else {
            return res.status(500).json('현재 유저와 작성자 불일치');
        }
    }
}
