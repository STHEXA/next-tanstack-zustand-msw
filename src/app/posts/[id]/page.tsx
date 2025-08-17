import FavoriteBtn from "@/app/components/FavoriteBtn";
import { PostDetail } from "@/types/api";
import Link from "next/link";

export default async function PostDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const { id } = params;
  const data = await fetch(`${baseUrl}/api/posts/${id}`);
  const post: PostDetail = await data.json();
  return (
    <div className="flex flex-col justify-center items-center gap-[20px] p-10">
      <article className="bg-blue-300 rounded-3xl p-10 w-full h-[80vh] flex flex-col">
        <div className="flex items-center mb-5">
          <h2 className="text-6xl text-zinc-600 mr-5">{post.title}</h2>
          <FavoriteBtn />
        </div>
        <div className="bg-white rounded-3xl p-5 shadow-2xs flex-1 min-h-0 overflow-auto">
          <p className="text-zinc-600 text-2xl">{post.body}</p>
        </div>
      </article>
      <Link
        href={"/posts/"}
        className="text-white text-base border-white rounded-2xl p-3 border"
      >
        一覧に戻る
      </Link>
    </div>
  );
}
