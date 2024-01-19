import { connectDB } from '@/util/database';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const { title, content } = req.body;
            console.log(req.body);

            // 제목과 내용이 제공되었는지 확인
            if (!title || !content) {
                return res.status(400).json({ error: '제목과 내용은 필수 입력 사항입니다.' });
            }

            const db = (await connectDB).db('forum');

            // 데이터베이스에 새로운 글 추가
            await db.collection('post').insertOne({
                title: title,
                content: content,
            });

            return res.status(200).json('글 등록 성공');
        } catch (error) {
            console.error('글 등록 실패 :', error);
            return res.status(500).json('글 등록에 실패했습니다.');
        }
    } else {
        return res.status(405).json({ error: '메서드는 POST만 허용됩니다.' });
    }
}
