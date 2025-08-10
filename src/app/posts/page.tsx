import Image from "next/image";
import Link from "next/link";

type PostsData = {
  id: string;
  title: string;
  image: string;
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
    <div>
      <ul className="flex flex-wrap gap-3 w-[1000px] mx-auto">
        {posts.map((p) => (
          <li key={p.id}>
            <Link href={`/posts/${p.id}`}>
              <div className="rounded-2xl overflow-hidden">
                <div>
                  <Image src={p.image} alt="" width={200} height={300} />
                </div>
                <p className="bg-white text-zinc-600 p-3">{p.title}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
