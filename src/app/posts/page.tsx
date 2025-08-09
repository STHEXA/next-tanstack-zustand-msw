// "use client";
import Link from "next/link";
import { useEffect, useState } from "react";

type PostsData = {
  id: string;
  title: string;
};

export default async function PostsPage() {
  // const [data, setData] = useState<PostsData[]>([]);
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  let posts = [];
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

  // useEffect(() => {
  //   const dataFetch = async () => {
  //     try {
  //       const res = await fetch(`${baseUrl}/api/posts`);
  //       if (!res.ok) {
  //         throw new Error(res.statusText);
  //       }
  //       const posts = await res.json();
  //       console.log(posts);
  //       setData(posts);
  //     } catch (e) {
  //       if (e instanceof Error) {
  //         console.info(e.message);
  //       }
  //     }
  //   };
  //   dataFetch();
  // }, []);

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
