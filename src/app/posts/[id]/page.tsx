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
    <div className="flex flex-col justify-center items-center gap-[20px]">
      <article className="">
        <h1>{post.title}</h1>
        <p>{post.body}</p>
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
