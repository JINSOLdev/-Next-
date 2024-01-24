import { connectDB } from '@/util/database';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import NextAuth from 'next-auth/next';
import GithubProvider from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';
import axios from 'axios';

// async function refreshAccessToken(token) {
//     // 1. access token 재발급해달라고 POST요청
//     const url = 'https://github.com/login/oauth/access_token';
//     const params = {
//         grant_type: 'refresh_token',
//         refresh_token: token.refreshToken,
//         clientId: process.env.CLIENT_ID,
//         clientSecret: process.env.CLIENT_SECRET,
//     };

//     const res = await axios.post(url, null, { params: params });
//     const refreshedTokens = await res.data;
//     if (res.status !== 200) {
//         console.log('실패', refreshedTokens);
//     }

//     // 2. 재발급한거 출력해보기
//     console.log('토큰 재발급한 거: ');
//     console.log(refreshedTokens);
// }

export const authOptions = {
    providers: [
        GithubProvider({
            clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
            clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
        }),
        CredentialsProvider({
            // 1. 로그인페이지 폼 자동생성해주는 코드
            name: 'credentials',
            credentials: {
                email: { label: 'email', type: 'text' },
                password: { label: 'password', type: 'password' },
            },

            // 2. 로그인 요청 시 실행되는 코드 (제일 중요👑)
            // 직접 DB에서 아이디, 비번 비교하고
            // 아이디, 비번 맞으면 return 결과, 틀리면 return null 해야함
            async authorize(credentials) {
                let db = (await connectDB).db('forum');
                let user = await db.collection('user_cred').findOne({ email: credentials.email });
                if (!user) {
                    console.log('해당 이메일은 없음');
                    return null;
                }
                const pwcheck = await bcrypt.compare(credentials.password, user.password);
                if (!pwcheck) {
                    console.log('비번틀림');
                    return null;
                }
                return user;
            },
        }),
    ],

    // 3. jwt 써놔야 잘된다. + jwt 만료일설정
    session: {
        strategy: 'jwt',
        maxAge: 30 * 24 * 60 * 60, // 30일
    },

    // 기간설정은 무시됨, github은 access token 유효기간 8시간, refresh token 유효기간 6개월
    // jwt: {
    //     maxAge: 60,
    // },

    callbacks: {
        // 4. jwt 만들 때 실행되는 코드
        // user 변수는 DB의 유저정보 담겨있고 token.user에 뭐 저장하면 jwt에 들어간다.
        jwt: async ({ token, user }) => {
            if (user) {
                token.user = {};
                token.user.name = user.name;
                token.user.email = user.email;
            }
            return token;
        },

        // 5. 유저 세션이 조회될 때마다 실행되는 코드
        session: async ({ session, token }) => {
            session.user = token.user;
            return session;
        },

        // (+) JWT 사용할 때마다 실행됨, return 오른쪽에 뭐 적으면 그걸 JWT로 만들어서 유저에게 보내줌
        // async jwt({ token, account, user }) {
        //     console.log('account', account);
        //     console.log('user', user);
        //     console.log('token', token);

        //     // 1. 첫 JWT 토큰 만들어주기 (첫 로그인시에만 실행)
        //     if (account && user) {
        //         return {
        //             accessToken: account.access_token,
        //             refreshToken: account.refresh_token,
        //             accessTokenExpires: account.expires_at,
        //             user,
        //         };
        //     }

        //     // 2. 남은 시간이 임박한 경우 access token 재발급하기
        //     // 지금은 개발중이라 8시간 - 10초 남았을 때 재발급중
        //     let remainTime = token.accessTokenExpires - Math.round(Date.now() / 1000);
        //     if (remainTime < 60 * 60 * 8 * -10) {
        //         console.log('유효기간 얼마 남지 않음');
        //         let newJWT = await refreshAccessToken(token);
        //         console.log('newJWT: ', newJWT);
        //         return newJWT;
        //     } else {
        //         return token;
        //     }
        // },

        // getServerSession 실행 시 토큰에 있던 어떤 정보 뽑아서 컴포넌트로 보내줄지 결정 가능
        // async session({ session, token }) {
        //     session.user = token.user;
        //     session.accessToken = token.accessToken;
        //     session.accessTokenExpires = token.accessTokenExpires;
        //     session.error = token.error;
        //     return session;
        // },
    },

    adapter: MongoDBAdapter(connectDB),
    secret: 'password1234',
};

console.log('CLIENT_ID:', process.env.NEXT_PUBLIC_CLIENT_ID);
console.log('CLIENT_SECRET:', process.env.NEXT_PUBLIC_CLIENT_SECRET);

export default NextAuth(authOptions);
