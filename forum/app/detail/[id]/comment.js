'use client';

import { useEffect, useState } from 'react';

export default function Comment(props) {
    let [comment, setComment] = useState('');

    // 쓸데없는 코드 보관함
    useEffect(()=>{
      fetch()
    },[])

    return (
        <div>
            <div>댓글목록보여줄부분</div>
            <input
                onChange={(e) => {
                    setComment(e.target.value);
                }}
            />
            <button
                onClick={() => {
                    fetch('/api/comment/new', {
                        method: 'POST',
                        body: JSON.stringify({ comment: comment, _id: props._id }),
                    });
                }}
            >
                댓글전송
            </button>
        </div>
    );
}
