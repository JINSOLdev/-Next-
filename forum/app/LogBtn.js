'use client';
import { signIn, signOut } from 'next-auth/react';

export function LoginBtn() {
    return (
        <button
            id="login"
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
            id="logout"
            onClick={() => {
                signOut();
            }}
        >
            로그아웃
        </button>
    );
}
