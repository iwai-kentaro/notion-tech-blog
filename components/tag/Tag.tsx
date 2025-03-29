import Link from "next/link";

const Tag = (props: { tags: string[] }) => {
  const { tags } = props;

  return (
    <div className="">
      <section className="w-4/5 lg:w-full mx-auto lg:px-2 px-5 flex flex-col gap-4 border-xl border-2 border-cyan-600  p-5 rounded-lg">
        <div className="font-bold">タグ一覧</div>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag: string, index: number) => (
            <Link key={index} href={`/posts/tag/${tag}/page/1`}>
              <span className="text-xs bg-cyan-600 text-white rounded-md px-2 py-1 hover:bg-cyan-700 hover:shadow-md transition duration-300 ease-in-out cursor-pointer">
                {tag}
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};
export default Tag;
