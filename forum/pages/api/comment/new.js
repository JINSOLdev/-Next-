import { connectDB } from '@/util/database';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';
import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
    // 🚀 It's mine 🚀
    // let session = await getServerSession(req, res, authOptions);
    // // console.log('여기얌:', session.user);

    // if (req.method === 'POST') {
    //     try {
    //         // _id 필드 없애기
    //         const { comment, author, parent } = req.body;
    //         console.log('댓글데이터:', comment);

    //         const db = (await connectDB).db('forum');
    //         // console.log(db);

    //         // DB에 comment 컬렉션 생성
    //         // let dbComment = await db.createCollection('comment');

    //         const result = await db.collection('comment').insertOne({ comment, author, parent });
    //         console.log('들어가라:', result);
    //         return res.status(200).redirect('/list');
    //         // return res.status(200).json('드디어 등록됨!!!!!!!!!!');
    //     } catch (error) {
    //         console.error('댓글 등록 쉽지않쥬~~ :', error);
    //         return res.status(500).json('댓글 등록 실패함');
    //     }
    // } else {
    //     return res.status(405).json({ error: '메서드는 POST만 허용됨' });
    // }

    // 👑 모범답안 👑
    const session = await getServerSession(req, res, authOptions);

    if (req.method === 'POST') {
        req.body = JSON.parse(req.body);
        // console.log(req.body);
        const saveComment = {
            content: req.body.comment,
            parent: new ObjectId(req.body._id),
            author: session.user.email,
        };

        const db = (await connectDB).db('forum');
        const result = await db.collection('comment').insertOne(saveComment);
        return res.status(200).json('저장완료');
    }
}
