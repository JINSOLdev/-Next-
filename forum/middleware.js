import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request) {
    // middleware에서 쿠키 다루려면
    request.cookies.get('쿠키이름'); // 출력
    request.cookies.has('쿠키이름'); // 존재확인
    request.cookies.delete('쿠키이름'); // 삭제

    const response = NextResponse.next();
    response.cookies.set({
        name: 'mode',
        value: 'dark',
        maxAge: 3600,
        httpOnly: true,
    });

    return response;

    // 유저가 '/register' 페이지 방문 시 visited=true 라는 쿠키를 생성해주려면?
    // if (request.nextUrl.pathname.startsWith('/register')) {
    //     if (request.cookies.has('visited') == false) {
    //         const response = NextResponse.next();
    //         response.cookies.set({
    //             name: 'visited',
    //             value: 'true',
    //             maxAge: 3600,
    //         });
    //         return response;
    //     }
    // }

    // const session = await getToken({ req: request });
    // if (request.nextUrl.pathname.startsWith('/write')) {
    //     // 미로그인 유저가 '/write' 접속 시 로그인 페이지로 이동 -> nextauth 쓰면 현재 로그인정보 출력 가능
    //     if (session === null) {
    //         return NextResponse.redirect('http://localhost:3000/api/auth/signin');
    //     }
    // }

    // // list페이지 접속 시 날짜, 시간 받아오기
    // if (request.nextUrl.pathname.startsWith('/list')) {
    //     console.log(new Date());
    //     console.log(request.headers.get('sec-ch-ua-platform'));
    //     return NextResponse.next();
    // }
}
