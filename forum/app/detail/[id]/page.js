import { connectDB } from '@/util/database';
import { ObjectId } from 'mongodb';
import Comment from './comment';

export default async function Detail(props) {
    const db = (await connectDB).db('forum');
    let result = await db.collection('post').findOne({ _id: new ObjectId(props.params.id) });

    return (
        <div className="detailPage">
            <h4>상세페이지</h4>
            <h4>{result.title}</h4>
            <p>{result.content}</p>
            <Comment _id={result._id.toString()} />

            {/* 클라이언트 컴포넌트화하기 */}
            {/* <div>
                <div>댓글목록보여줄부분</div>
                <input />
                <button>댓글전송</button>
            </div> */}
        </div>
    );
}
