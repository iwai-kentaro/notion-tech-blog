import SinglePost from "@/components/posts/SinglePost";
import Tag from "@/components/tag/Tag";
import { getAllTags, getPostsFiveTopPage } from "@/lib/notionApi";
import { GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";

export const getStaticProps: GetStaticProps = async () => {
  const fivePosts = await getPostsFiveTopPage();
  const allTags = await getAllTags();

  return {
    props: {
      fivePosts,
      allTags,
    },
    revalidate: 10,
  };
};

export default function Home({
  fivePosts,
  allTags,
}: {
  fivePosts: any;
  allTags: string[];
}) {
  return (
    <div className="container h-full w-full mx-auto font-sans mb-20">
      <Head>
        <title>Tech Blog</title>
        <meta name="description" content="Home" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="container w-full mt-16">
        <h1 className="text-5xl font-medium text-center mb-16 font-sans">
          Tech Blog💻
        </h1>
        {fivePosts.map((post: any) => (
          <div className="mx-auto lg:px-2 px-5" key={post.id}>
            <SinglePost
              title={post.title}
              description={post.description}
              created_time={post.created_time}
              updated_time={post.updated_time}
              tags={post.tags}
              slug={post.slug}
              isPaginationPage={false}
            />
          </div>
        ))}

        <Link
          href={"/posts/page/1"}
          className="lg:w-4/5 mx-auto lg:px-2 px-5 flex justify-end mt-10"
        >
          ...もっと見る
        </Link>
        <Tag tags={allTags} />
      </main>
    </div>
  );
}
