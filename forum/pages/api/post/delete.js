import { connectDB } from '@/util/database';
import { ObjectId } from 'mongodb';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';

// export default async function handler(req, res) {
//     if (req.method === 'POST') {
//         let db = (await connectDB).db('forum');
//         let result = await db.collection('post').deleteOne({ _id: new ObjectId(req.body) });
//         console.log(result);
//         res.status(200).json('삭제 완료');
//     }
// }

export default async function handler(req, res) {
    if (req.method === 'DELETE') {
        try {
            let session = await getServerSession(req, res, authOptions);

            const db = (await connectDB).db('forum');
            let found = await db.collection('post').findOne({ _id: new ObjectId(req.body) });

            if (found.author === session.user.email) {
                let result = await db.collection('post').deleteOne({ _id: new ObjectId(req.body) });
                return res.status(200).json('삭제 완료');
            } else {
                return res.status(403).json('현재유저와 작성자 불일치');
            }
        } catch (error) {
            console.error(error);
            return res.status(500).json('서버 오류');
        }
    }
}
