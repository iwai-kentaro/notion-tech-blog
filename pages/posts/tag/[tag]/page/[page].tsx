import Pagination from "@/components/pagination/Pagination";
import SinglePost from "@/components/posts/SinglePost";
import Tag from "@/components/tag/Tag";
import {
  getAllTags,
  getNumberOfPagesByTag,
  getPostsByTagPage,
} from "@/lib/notionApi";
import { GetStaticProps, GetStaticPaths } from "next";
import Head from "next/head";

export const getStaticPaths: GetStaticPaths = async () => {
  const allTags = await getAllTags();

  const params: any = [];
  await Promise.all(
    allTags.map(async (tag) => {
      const numberOfPages = await getNumberOfPagesByTag(tag);
      for (let i = 1; i <= numberOfPages; i++) {
        params.push({ params: { tag: tag, page: String(i) } });
      }
    })
  );

  return {
    paths: params,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const currentPage = context.params?.page;
  const currentTag = context.params?.tag;

  const upperCaseTag =
    typeof currentTag === "string"
      ? currentTag.charAt(0).toUpperCase() + currentTag.slice(1)
      : "";

  const posts = await getPostsByTagPage(
    upperCaseTag as string,
    Number(currentPage)
  );

  const numberOfPagesByTag = await getNumberOfPagesByTag(
    upperCaseTag as string
  );

  const allTags = await getAllTags();

  // タグ名とページ番号も渡す
  return {
    props: {
      postsByPage: posts,
      currentTag: currentTag,
      currentPage: Number(currentPage),
      numberOfPagesByTag: Number(numberOfPagesByTag),
      upperCaseTag,
      allTags,
    },
    revalidate: 60 * 60 * 6,
  };
};

const BlogTagPageList = ({
  postsByPage,
  numberOfPagesByTag,
  currentTag,
  currentPage,
  allTags,
}: {
  postsByPage: string[];
  numberOfPagesByTag: number;
  currentTag: string;
  currentPage: number;
  allTags: string[];
}) => {
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
        {postsByPage.map((post: any) => (
          <div className="mx-auto lg:px-2 px-5" key={post.id}>
            <SinglePost
              title={post.title}
              description={post.description}
              created_time={post.created_time}
              updated_time={post.updated_time}
              tags={post.tags}
              slug={post.slug}
              isPaginationPage={true}
            />
          </div>
        ))}
        <Pagination
          numberOfPage={numberOfPagesByTag}
          tag={currentTag}
          currentPage={currentPage}
        />
        <Tag tags={allTags} />
      </main>
    </div>
  );
};
export default BlogTagPageList;
