export default function handler(req, res) {
    if (req.method === 'GET') {
        return res.status(200).json('처리완료');
    } else {
        return res.status(400).json('처리실패');
    }
    // return res.status(200).json('처리완료');
}
