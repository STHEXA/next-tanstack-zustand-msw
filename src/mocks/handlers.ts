import { http, HttpResponse } from "msw";

export const handlers = [
  http.get("http://localhost:3000/api/posts", () => {
    return HttpResponse.json([
      { id: "1", title: "投稿A" },
      { id: "2", title: "投稿B" },
    ]);
  }),

  http.get("/api/posts/:id", ({ params }) => {
    const { id } = params;
    return HttpResponse.json({
      id,
      title: `投稿 ${id}`,
      body: `本文 for ${id}`,
    });
  }),
];
