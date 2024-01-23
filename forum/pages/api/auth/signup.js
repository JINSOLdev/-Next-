import { connectDB } from '@/util/database';
import bcrypt from 'bcrypt';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const hash = await bcrypt.hash(req.body.password, 10);
        // 암호화된 비밀번호
        req.body.password = hash;

        // 중복된 이메일 체크

        let db = (await connectDB).db('forum');
        await db.collection('user_cred').insertOne(req.body);
        res.status(200).json('성공');
    }
}
