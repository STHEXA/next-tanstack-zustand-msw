import { http, HttpResponse } from "msw";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

export const handlers = [
  http.get(`${baseUrl}/api/posts`, () => {
    return HttpResponse.json([
      { id: "1", title: "投稿A" },
      { id: "2", title: "投稿B" },
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
