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
                            onClick={() => {
                                fetch('/api/post/delete', {
                                    method: 'POST',
                                    body: result[i]._id,
                                })
                                    .then((r) => {
                                        return r.json();
                                    })
                                    .catch((error) => {
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
