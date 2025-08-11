import { PostsData } from "@/types/api";
import PostsList from "../components/PostsList";

export default async function PostsPage() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const res = await fetch(`${baseUrl}/api/posts`);
  const posts: PostsData[] = await res.json();

  return (
    <div className="flex flex-col justify-center items-center">
      <h2 className="text-4xl mb-6">記事一覧</h2>
      <PostsList initialPosts={posts} />
    </div>
  );
}
