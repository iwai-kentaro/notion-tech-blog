import { dateFormat } from "@/functions/functions";
import { getAllPosts, getSinglePost } from "@/lib/notionApi";
import Link from "next/link";
import router from "next/router";
import React from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";
import rehypeRaw from "rehype-raw";
import remarkBreaks from "remark-breaks";

export const getStaticPaths = async () => {
  const allPosts = await getAllPosts();

  const paths = allPosts.map((post) => {
    return {
      params: { slug: post.slug },
    };
  });
  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps = async ({ params }: any) => {
  const post = await getSinglePost(params.slug);

  if (!post || !post.metadata) {
    return { notFound: true };
  }
  return {
    props: {
      post,
      fallback: false,
    },
    revalidate: 10,
  };
};

// タグがクリックされたときのハンドラー
const handleClickTag = (e: React.MouseEvent, tagName: string) => {
  e.stopPropagation(); // 親要素へのイベント伝播を停止
  e.preventDefault(); // デフォルトのリンク挙動を防止
  router.push(`/posts/tag/${tagName}/page/1`);
};

const Post = ({ post }: any) => {
  const { title, created_time, tags, updated_time } = post?.metadata || {};
  return (
    <section className="container lg:w-3/5 lg:px-2 px-5  mx-auto mt-20 mb-20">
      <h2 className="w-full text-2xl font-medium">{title}</h2>
      <div className="border-b-2 border-sky-200 border-2 w-2/3 "></div>
      <div className="flex flex-col sm:flex-row gap-2 mt-4">
        <span className="text-gray-500 block">
          {`作成日: ${dateFormat(created_time)}`}
        </span>
        {updated_time && (
          <span className="text-gray-500 block">
            {`最終更新日: ${dateFormat(updated_time)}`}
          </span>
        )}
      </div>
      <br />
      <div className="flex flex-wrap gap-2">
        {tags?.map((tag: string, index: number) => (
          <p
            key={index}
            className="text-s bg-cyan-600 text-white rounded-md px-2 py-1 hover:bg-cyan-700 hover:shadow-md transition duration-300 ease-in-out cursor-pointer"
            onClick={(e) => handleClickTag(e, tag)}
          >
            {tag}
          </p>
        ))}
      </div>
      <div className="mt-10 prose">
        <ReactMarkdown
          remarkPlugins={[remarkBreaks]}
          rehypePlugins={[rehypeRaw]}
          components={{
            code({ inline, className, children, ...props }: any) {
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

            p({
              children,
              ...props
            }: {
              children?: React.ReactNode;
            } & React.HTMLAttributes<HTMLParagraphElement>) {
              // 子要素の配列を走査して、すべてが空かどうかを確認
              const isEmpty = React.Children.toArray(children).every(
                (child: any) => {
                  if (child === null || child === undefined) return true;
                  if (typeof child === "string") return child.trim() === "";
                  if (React.isValidElement(child)) {
                    // 子要素があるかどうかをチェック。子要素がない、またはすべて空なら空と判定。
                    const inner =
                      React.isValidElement(child) && child.props
                        ? child.props
                        : null;
                    if (!inner) return true;
                    return Array.isArray(inner)
                      ? inner.every(
                          (c: any) => typeof c === "string" && c.trim() === ""
                        )
                      : typeof inner === "string" && inner.trim() === "";
                  }
                  return false;
                }
              );

              if (isEmpty) {
                return (
                  <p
                    {...props}
                    className="empty-paragraph my-4"
                    style={{ minHeight: "1em" }}
                  >
                    &nbsp;
                  </p>
                );
              }

              return (
                <p
                  {...props}
                  className={`${props.className || ""} whitespace-pre-wrap`}
                >
                  {children}
                </p>
              );
            },
          }}
        >
          {post?.markdown?.parent ||
            post?.markdown?.content ||
            post?.markdown ||
            ""}
        </ReactMarkdown>

        <Link href={"/"}>
          <span className="inline-block mt-4 text-cyan-600">←ホームに戻る</span>
        </Link>
      </div>
    </section>
  );
};
export default Post;
