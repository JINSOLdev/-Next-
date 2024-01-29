'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function DarkMode() {
    let router = useRouter();
    useEffect(() => {
        let cookie = ('; ' + document.cookie).split(`; mode=`).pop().split(';')[0];
        // 모드라는 이름의 쿠키가 없는 경우
        if (cookie === '') {
            document.cookie = 'mode=light; max-age=' + 3000 * 24 * 400;
        }
    }, []);
    return (
        <span
            onClick={() => {
                let cookie = ('; ' + document.cookie).split(`; mode=`).pop().split(';')[0];
                if (cookie == 'light') {
                    document.cookie = 'mode=dark; max-age=' + 3600 * 24 * 400;
                    router.refresh();
                } else {
                    document.cookie = 'mode=light; max-age=' + 3600 * 24 * 400;
                    router.refresh();
                }
            }}
        >
            🌙
        </span>
    );
}
