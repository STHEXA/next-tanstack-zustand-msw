import { PostDetail } from "@/types/api";

export default async function PostDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const { id } = await params;
  const data = await fetch(`${baseUrl}/api/posts/${id}`);
  const post: PostDetail = await data.json();
  return (
    <article>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
    </article>
  );
}
