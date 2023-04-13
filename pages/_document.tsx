import React from 'react';
import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="ko">
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="시니어 그룹 패키지 여행 서비스" />
        <meta name="keywords" content="여행, 패키지, 패키지여행, 그룹여행, 시니어" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="고투게더" />
        <meta property="og:description" content="시니어 그룹 패키지 여행 서비스" />
        <meta property="og:image" content="" />
        <meta property="og:url" content="https://go-together.vercel.app/" />
        <meta property="og:site_name" content="고투게더" />
        <link rel="icon" href="/favicon.ico" />
        <script defer src="https://developers.kakao.com/sdk/js/kakao.min.js"></script>
        <title>고투게더</title>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
