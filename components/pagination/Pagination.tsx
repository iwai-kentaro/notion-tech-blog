import { getPageLink } from "@/lib/blogHelper";
import Link from "next/link";

type PaginationProps = {
  numberOfPage: number; // 総ページ数
  tag: string; // タグ名
  currentPage: number; // 現在のページ番号
};

const Pagination = (props: PaginationProps) => {
  const { numberOfPage, tag, currentPage } = props;

  // ページ番号の配列を生成
  const pageNumbers = [];
  for (let i = 1; i <= numberOfPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <>
      <section>
        <ul className="flex justify-center items-center gap-2 mt-10 mb-10">
          {pageNumbers.map((number) => (
            <li key={number}>
              <Link
                href={getPageLink(tag, number)}
                className={`rounded-md w-8 h-8 flex items-center justify-center relative transition-colors duration-300 ease-in-out hover:shadow-md cursor-pointer ${
                  currentPage === number
                    ? "bg-cyan-600 text-white"
                    : "bg-gray-200 text-cyan-600 hover:bg-cyan-600 hover:text-white"
                }`}
              >
                {number}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
};
export default Pagination;
