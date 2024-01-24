import { MongoClient } from 'mongodb';
const url = process.env.NEXT_PUBLIC_DB_URL;
const options = { useNewUrlParser: true };
let connectDB;

if (process.env.NODE_ENV === 'development') {
    if (!global._mongo) {
        global._mongo = new MongoClient(url, options).connect();
    }
    connectDB = global._mongo;
} else {
    connectDB = new MongoClient(uri, options).connect();
}

export { connectDB };
