export default function handler(req, res) {
    const date = new Date();
    res.status(200).json(date);
}
