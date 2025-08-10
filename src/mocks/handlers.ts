import { http, HttpResponse } from "msw";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

export const handlers = [
  http.get(`${baseUrl}/api/posts`, () => {
    return HttpResponse.json([
      { id: "1", title: "投稿1", image: "https://picsum.photos/id/11/200/300" },
      { id: "2", title: "投稿2", image: "https://picsum.photos/id/22/200/300" },
      { id: "3", title: "投稿3", image: "https://picsum.photos/id/33/200/300" },
      { id: "4", title: "投稿4", image: "https://picsum.photos/id/44/200/300" },
      { id: "5", title: "投稿5", image: "https://picsum.photos/id/55/200/300" },
      { id: "6", title: "投稿6", image: "https://picsum.photos/id/66/200/300" },
      { id: "7", title: "投稿7", image: "https://picsum.photos/id/77/200/300" },
      { id: "8", title: "投稿8", image: "https://picsum.photos/id/88/200/300" },
      { id: "9", title: "投稿9", image: "https://picsum.photos/id/99/200/300" },
      {
        id: "10",
        title: "投稿10",
        image: "https://picsum.photos/id/100/200/300",
      },
    ]);
  }),

  http.get(`${baseUrl}/api/posts/:id`, ({ params }) => {
    const { id } = params;
    return HttpResponse.json({
      id,
      title: `投稿 ${id}`,
      body: `本文 for ${id}`,
    });
  }),
];
