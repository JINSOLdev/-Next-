import { connectDB } from '@/util/database';
import ListItem from './ListItem';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function List() {
    const db = (await connectDB).db('forum');
    let result = await db.collection('post').find().toArray();

    return (
        <div className="list-bg">
            <ListItem result={result} />
        </div>
    );
}
