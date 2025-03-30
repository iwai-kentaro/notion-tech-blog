import Link from "next/link";
import { useRouter } from "next/router";

const Navbar = () => {
  const router = useRouter();

  // 現在のパスがリンクのパスと一致するかチェックする関数
  const isActive = (path: string) => {
    return router.pathname === path;
  };
  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm shadow-sm py-3">
      <div className="container mx-auto lg:px-4 px-5 flex items-center justify-between">
        <Link
          href={"/"}
          className="text-2xl font-bold text-gray-800 hover:text-cyan-600 transition-colors"
        >
          <span className="text-cyan-600">Tech Blog</span>
        </Link>

        <div className="flex items-center space-x-1">
          <Link
            href={"/"}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
              isActive("/")
                ? "text-cyan-600 bg-cyan-50"
                : "text-gray-700 hover:text-cyan-600 hover:bg-gray-50"
            }`}
          >
            Home
          </Link>

          <Link
            href={"https://x.com/kentaro_wdc"}
            className="px-4 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-cyan-600 hover:bg-gray-50 transition-all duration-300"
            target="_blank"
            rel="noopener noreferrer"
          >
            Twitter
          </Link>

          <Link
            href={"#"}
            className="px-4 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-cyan-600 hover:bg-gray-50 transition-all duration-300"
          >
            Qiita
          </Link>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
