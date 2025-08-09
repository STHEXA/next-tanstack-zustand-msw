import Link from "next/link";

type PostsData = {
  id: string;
  title: string;
};

export default async function PostsPage() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  let posts: PostsData[] = [];
  try {
    const res = await fetch(`${baseUrl}/api/posts`);
    if (!res.ok) {
      throw new Error(res.statusText);
    }
    posts = await res.json();
    console.log(posts);
  } catch (e) {
    if (e instanceof Error) {
      console.info(e.message);
    }
  }

  return (
    <ul>
      {posts.map((p) => (
        <li key={p.id}>
          <Link href={`/posts/${p.id}`}>{p.title}</Link>
        </li>
      ))}
    </ul>
  );
}
