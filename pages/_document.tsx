import React from 'react';
import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="ko">
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="시니어 층 고객분들을 대상으로 한 그룹 여행 서비스입니다."
        />
        <meta name="keywords" content="여행, 패키지, 패키지여행, 그룹여행, 시니어" />
        <meta name="author" content="김지영, 박정민, 안가을, 김예지, 이규석, 임현진" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="고투게더" />
        <meta
          property="og:description"
          content="시니어 층 고객분들을 대상으로 한 그룹 여행 서비스입니다."
        />
        <meta property="og:image" content="" />
        <meta property="og:url" content="https://go-together.vercel.app/" />
        <meta property="og:site_name" content="고투게더" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
