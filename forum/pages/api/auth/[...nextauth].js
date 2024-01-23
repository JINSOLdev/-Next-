import { connectDB } from '@/util/database';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import NextAuth from 'next-auth/next';
import GithubProvider from 'next-auth/providers/github';

export const authOptions = {
    providers: [
        GithubProvider({
            clientId: '50dcbcb9e31cd7451b44',
            clientSecret: '0235d67514afb49d3d43110dc98d79855586649f',
        }),
    ],
    secret: 'sdlfkjwelijwlklk2429345809409slksdfsd',
    adapter: MongoDBAdapter(connectDB)
};

export default NextAuth(authOptions);
