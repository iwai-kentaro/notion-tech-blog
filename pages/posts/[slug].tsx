import { dateFormat } from "@/functions/functions";
import { getAllPosts, getSinglePost } from "@/lib/notionApi";
import Link from "next/link";
import router from "next/router";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";

export const getStaticPaths = async () => {
  const allPosts = await getAllPosts();
  const paths = allPosts.map((slug) => {
    return {
      params: { slug: slug.slug },
    };
  });
  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps = async ({ params }: any) => {
  const post = await getSinglePost(params.slug);
  return {
    props: {
      post,
    },
    revalidate: 60 * 60 * 6,
  };
};

// タグがクリックされたときのハンドラー
const handleClickTag = (e: React.MouseEvent, tagName: string) => {
  e.stopPropagation(); // 親要素へのイベント伝播を停止
  e.preventDefault(); // デフォルトのリンク挙動を防止
  router.push(`/posts/tag/${tagName}/page/1`);
};

const Post = ({ post }: any) => {
  return (
    <section className="container lg:w-3/5 lg:px-2 px-5  mx-auto mt-20 mb-20">
      <h2 className="w-full text-2xl font-medium">{post.metadata.title}</h2>
      <div className="border-b-2 border-sky-200 border-2 w-2/3 "></div>
      <span className="text-gray-500 mb-2 inline-block">
        {`作成日: ${dateFormat(post.metadata.created_time)}`}
      </span>
      {post.metadata.updated_time && (
        <span className="text-gray-500 mb-2 inline-block ml-4">
          {`最終更新日: ${dateFormat(post.metadata.updated_time)}`}
        </span>
      )}
      <br />
      <div className="flex flex-wrap gap-2">
        {post.metadata.tags.map((tag: string, index: number) => (
          <p
            key={index}
            className="text-s bg-cyan-600 text-white rounded-md px-2 py-1 hover:bg-cyan-700 hover:shadow-md transition duration-300 ease-in-out cursor-pointer"
            onClick={(e) => handleClickTag(e, tag)}
          >
            {tag}
          </p>
        ))}
      </div>
      <div className="mt-10 prose ">
        <ReactMarkdown
          components={{
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            code({ node, inline, className, children, ...props }: any) {
              const match = /language-(\w+)/.exec(className || "");
              return !inline && match ? (
                <SyntaxHighlighter
                  style={vscDarkPlus}
                  language={match[1]}
                  PreTag="div"
                  {...props}
                >
                  {String(children).replace(/\n$/, "")}
                </SyntaxHighlighter>
              ) : (
                <code className={className} {...props}>
                  {children}
                </code>
              );
            },
          }}
        >
          {post.markdown.parent || ""}
        </ReactMarkdown>

        <Link href={"/"}>
          <span className="inline-block mt-4 text-cyan-600">←ホームに戻る</span>
        </Link>
      </div>
    </section>
  );
};
export default Post;
