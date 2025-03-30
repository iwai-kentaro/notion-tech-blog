import Pagination from "@/components/pagination/Pagination";
import SinglePost from "@/components/posts/SinglePost";
import { Seo } from "@/components/seo/Seo";
import Tag from "@/components/tag/Tag";
import {
  getAllTags,
  getNumberOfPages,
  getPostsFiveTopPage,
} from "@/lib/notionApi";
import { GetStaticProps } from "next";

export const getStaticProps: GetStaticProps = async (context) => {
  const fivePosts = await getPostsFiveTopPage();
  const allTags = await getAllTags();
  const numberOfPages = await getNumberOfPages();
  const currentPage = context.params?.page;

  return {
    props: {
      fivePosts,
      allTags,
      numberOfPage: numberOfPages,
      currentPage: Number(currentPage),
    },
    revalidate: 10,
  };
};

export default function Home({
  fivePosts,
  allTags,
  numberOfPage,
  currentPage,
}: {
  fivePosts: any;
  allTags: string[];
  numberOfPage: number;
  currentPage: number;
}) {
  return (
    <div className="container h-full w-full mx-auto font-sans mb-20">
      <Seo
        title={`Tech Blog `}
        description={`Tech BlogのTOPページ`}
        keywords={`Tech Blog, TOPページ, ブログ, 記事`}
        url={`https://notion-tech-blog-one.vercel.app/`}
      />
      <main className="container w-full mt-16">
        <h1 className="text-5xl font-medium text-center mb-16 font-sans">
          Tech Blog💻
        </h1>
        <div className="flex gap-10 lg:flex-row flex-col justify-center">
          <div className="">
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
            <Pagination
              numberOfPage={numberOfPage}
              tag=""
              currentPage={currentPage}
            />
          </div>
          <Tag tags={allTags} />
        </div>
      </main>
    </div>
  );
}
