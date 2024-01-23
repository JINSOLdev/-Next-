'use client';
import { signIn, signOut } from 'next-auth/react';

export function LoginBtn() {
    return (
        <button
            className="login"
            onClick={() => {
                signIn();
            }}
        >
            로그인
        </button>
    );
}

export function LogoutBtn() {
    return (
        <button
            className="logout"
            onClick={() => {
                signOut();
            }}
        >
            로그아웃
        </button>
    );
}
