'use client';
import Link from 'next/link';

export default function ListItem({ result }) {
    return (
        <div>
            {result.map((a, i) => {
                return (
                    <div className="list-item" key={i}>
                        <Link prefetch={false} href={`/detail/${result[i]._id}`}>
                            <h4>{result[i].title}</h4>
                        </Link>
                        <Link href={`/edit/${result[i]._id}`}>✏</Link>
                        <p
                            onClick={(e) => {
                                fetch('/api/post/delete', {
                                    method: 'DELETE',
                                    body: result[i]._id,
                                })
                                    .then((r) => {
                                        if (r.status === 200) {
                                            return r.json();
                                        } else {
                                            // 서버가 에러코드 전송 시 실행할 코드
                                        }
                                    })
                                    .then(() => {
                                        // 성공 시 실행할 코드
                                        e.target.parentElement.style.opacity = 0;
                                        setTimeout(() => {
                                            e.target.parentElement.style.display = 'none';
                                        }, 1000);
                                    })
                                    .catch((error) => {
                                        // 인터넷 문제로 실패 시 실행할 코드
                                        console.log(error);
                                    });
                            }}
                        >
                            🗑
                        </p>
                        <p>{result[i].content}</p>
                    </div>
                );
            })}
        </div>
    );
}
