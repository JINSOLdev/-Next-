import { MongoClient } from 'mongodb';
const url = 'mongodb+srv://jinsol032360:Gongjs0323~@jinsocial.hdhmsn4.mongodb.net/?retryWrites=true&w=majority';
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
