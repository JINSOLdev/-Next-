'use client';

import { useEffect } from 'react';

export default function DarkMode() {
    useEffect(() => {
      let 쿠키값 = ('; ' +document.cookie).split(`; mode=`).pop().split(';')[0]
      if (쿠키값 === '') {
        document.cookie = 'mode=light; max-age=' + 3000 * 24 * 400;

      }
    }, []);
    return <span> 🌙 </span>;
}
