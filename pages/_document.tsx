import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="ja">
      <Head>
        <meta name="theme-color" content="#ffffff" />
        <meta
          name="description"
          content="Tech Blog - プログラミングやITに関する情報を発信するブログです。"
        />
        <meta
          name="keywords"
          content="Tech Blog, プログラミング, IT, ブログ, 記事"
        />
        <meta name="author" content="Tech Blog" />

        {/* 例：Noto Sans JP を読み込む */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;700&display=swap"
          rel="stylesheet"
        />
        {/* <!-- Google tag (gtag.js) --> */}
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=G-0PW85T66F3`}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-0PW85T66F3');
            `,
          }}
        />
        <meta
          name="google-site-verification"
          content="oLuM836je70yItHEcDleJOAtg1830wfW3AO-FSdBBDY"
        />

        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9689878452048286"
          crossorigin="anonymous"
        ></script>
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
