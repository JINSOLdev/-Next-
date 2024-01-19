import { connectDB } from '@/util/database';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const { name, id, password1, password2 } = req.body;

            if (!name || !id || !password1 || !password2) {
                return res.status(400).json({ error: '빈칸을 모두 작성해주세요' });
            }

            const db = (await connectDB).db('forum');

            await db.collection('signup').insertOne({
                name: name,
                id: id,
                password1: password1,
                password2: password2,
            });

            return res.status(200).json('회원가입 성공');
        } catch (error) {
            console.error('회원가입 실패 :', error);
            return res.status(500).json('회원가입에 실패했습니다');
        }
    } else {
        return res.status(405).json({ error: '메서드는 POST만 허용됩니다.' });
    }
}
