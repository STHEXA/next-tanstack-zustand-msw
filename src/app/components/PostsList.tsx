"use client";
import { PostsData } from "@/types/api";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type PostsListProps = {
  initialPosts: PostsData[];
};

export default function PostsList({ initialPosts }: PostsListProps) {
  const [posts, setPosts] = useState(initialPosts);

  const { refetch, isFetching } = useQuery({
    queryKey: ["posts"],
    queryFn: async (): Promise<PostsData[]> => {
      const baseUrl =
        process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
      const res = await fetch(`${baseUrl}/api/posts/add`);
      if (!res.ok) {
        throw new Error("データの取得に失敗しました。");
      }
      return res.json();
    },
    enabled: false,
  });

  const addPosts = async () => {
    console.log(isFetching);
    const { data } = await refetch();
    if (data) {
      setPosts((prevData) => [...prevData, ...data]);
    }
    console.log(isFetching);
  };

  return (
    <div>
      {isFetching ? (
        <div className="text-center py-4">
          <span className="text-white">読み込み中...</span>
        </div>
      ) : (
        <ul className="flex flex-wrap gap-3 w-[1048px] mx-auto">
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
      )}
      {posts.length <= 10 && (
        <div className="text-center m-[20px]">
          <button onClick={addPosts}>もっと表示</button>
        </div>
      )}
    </div>
  );
}
