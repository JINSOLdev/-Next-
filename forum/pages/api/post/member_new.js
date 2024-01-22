import { connectDB } from '@/util/database';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const { name, id, password1, password2 } = req.body;

            if (!name || !id || !password1 || !password2) {
                return res.status(400).json({ error: '빈칸을 모두 작성해주세요' });
            }

            const db = (await connectDB).db('forum');

            // 기존 사용자 목록 조회
            const existingName = await db.collection('signup').findOne({ name });
            const existingId = await db.collection('signup').findOne({ id });

            // 중복체크
            if (existingName) {
                return res.status(400).json({ error: '이미 존재하는 이름 입니다.' });
            } else if (existingId) {
                return res.status(400).json({ error: '이미 존재하는 아이디 입니다.' });
            }

            // 비밀번호 일치 여부 확인
            if (password1 !== password2) {
                return res.status(400).json({ error: '비밀번호가 일치하지 않습니다.' });
            }

            // 회원가입 성공 시 데이터베이스에 저장
            await db.collection('signup').insertOne({ name, id, password1, password2 });
            return res.status(200).json('회원가입 성공');
        } catch (error) {
            console.error('회원가입 실패 :', error);
            return res.status(500).json('회원가입에 실패했습니다');
        }
    } else {
        return res.status(405).json({ error: '메서드는 POST만 허용됩니다.' });
    }
}
