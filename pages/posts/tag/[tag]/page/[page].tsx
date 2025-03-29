import Pagination from "@/components/pagination/Pagination";
import SinglePost from "@/components/posts/SinglePost";
import { Seo } from "@/components/seo/Seo";
import Tag from "@/components/tag/Tag";
import {
  getAllTags,
  getNumberOfPagesByTag,
  getPostsByTagPage,
} from "@/lib/notionApi";
import { GetStaticProps, GetStaticPaths } from "next";

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
    revalidate: 10,
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
      <Seo
        title={`Tech Blog - ${currentTag}`}
        description={`Tech Blog - ${currentTag}のページ ${currentPage}ページ目`}
        keywords={`Tech Blog, ${currentTag}, ${currentPage}ページ目`}
        url={`https://notion-tech-blog-one.vercel.app/posts/tag/${currentTag}/page/${currentPage}`}
      />
      <main className="container w-full mt-16">
        <h1 className="text-5xl font-medium text-center mb-16 font-sans">
          Tech Blog💻
        </h1>
        <div className="flex gap-10 lg:flex-row flex-col justify-center">
          <div className="">
            {postsByPage.map((post: any) => (
              <div className="w-full mx-auto lg:px-2 px-5" key={post.id}>
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
          </div>
          <Tag tags={allTags} />
        </div>
      </main>
    </div>
  );
};
export default BlogTagPageList;
