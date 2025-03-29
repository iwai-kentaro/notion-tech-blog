import { dateFormat } from "@/functions/functions";
import { Post } from "@/lib/notionApi";
import Link from "next/link";
import router from "next/router";

const SinglePost = (props: Post) => {
  const { title, description, created_time, tags, slug, updated_time } = props;

  // タグがクリックされたときのハンドラー
  const handleClickTag = (e: React.MouseEvent, tagName: string) => {
    e.stopPropagation(); // 親要素へのイベント伝播を停止
    e.preventDefault(); // デフォルトのリンク挙動を防止
    router.push(`/posts/tag/${tagName}/page/1`);
  };

  return (
    <Link href={`/posts/${slug}`}>
      <div className="lg:w-4/5  mx-auto border border-gray-200 p-4 rounded-md mb-4 bg-gray-100 border-s-indigo-100 shadow-md hover:shadow-sm hover:translate-y-1 transform transition duration-300 ease-in-out">
        <div className="flex gap-2">
          <p className="text-sm text-gray-500">
            作成日: {dateFormat(created_time)}
          </p>
          {updated_time && (
            <p className="text-sm text-gray-500">
              更新日: {dateFormat(updated_time)}
            </p>
          )}
        </div>
        <h2 className="text-2xl font-medium mt-0 mb-2">{title}</h2>
        <div className="flex flex-wrap items-center gap-3 container">
          <div className="flex gap-2">
            {tags?.map((tag: string, index: number) => (
              <span
                key={index}
                className="text-xs bg-cyan-600 text-white rounded-md px-2 py-1 hover:bg-cyan-700 hover:shadow-md transition duration-300 ease-in-out cursor-pointer"
                onClick={(e) => handleClickTag(e, tag)}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        <p className="mt-2">{description}</p>
      </div>
    </Link>
  );
};
export default SinglePost;
