import Pagination from "@/components/pagination/Pagination";
import SinglePost from "@/components/posts/SinglePost";
import Tag from "@/components/tag/Tag";
import { getAllTags, getNumberOfPages, getPostsByPage } from "@/lib/notionApi";
import { GetStaticProps, GetStaticPaths } from "next";
import Head from "next/head";

export const getStaticPaths: GetStaticPaths = async () => {
  const numberOfPages = await getNumberOfPages();

  const paths = Array.from({ length: numberOfPages }, (_, i) => ({
    params: { page: String(i + 1) },
  }));

  //   const params = [];
  //   for (let i = 1; i <= numberOfPages; i++) {
  //     params.push({ params: { page: String(i) } });
  //   }

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const currentPage = context.params?.page;
  const postsByPage = await getPostsByPage(Number(currentPage));

  const numberOfPages = await getNumberOfPages();

  const allTags = await getAllTags();

  return {
    props: {
      postsByPage,
      numberOfPage: numberOfPages,
      currentPage,
      allTags,
    },
    revalidate: 10,
  };
};

const BlogPageList = ({
  postsByPage,
  numberOfPage,
  currentPage,
  allTags,
}: {
  postsByPage: any;
  numberOfPage: number;
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
              tags={post.tags}
              slug={post.slug}
              isPaginationPage={true}
            />
          </div>
        ))}
        <Pagination
          numberOfPage={numberOfPage}
          tag=""
          currentPage={currentPage}
        />
        <Tag tags={allTags} />
      </main>
    </div>
  );
};
export default BlogPageList;
