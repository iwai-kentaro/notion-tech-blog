import Head from "next/head";

interface SeoProps {
  title?: string;
  description?: string;
  keywords?: string;
  url?: string;
}

export const Seo = ({
  title = "Tech Blog",
  description = "Tech Blog 普段のエンジニアとしての学びや、技術的な情報を発信するブログです。",
  keywords = "Tech Blog,エンジニア,学び,技術情報,プログラミング,Next.js,Notion",
  url = "https://notion-tech-blog-one.vercel.app/",
}: SeoProps) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Tech Blog" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
    </Head>
  );
};
