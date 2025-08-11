import { delay, http, HttpResponse } from "msw";

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

  http.get(`${baseUrl}/api/posts/add`, async () => {
    await delay(1000);
    return HttpResponse.json([
      {
        id: "11",
        title: "投稿11",
        image: "https://picsum.photos/id/111/200/300",
      },
      {
        id: "12",
        title: "投稿12",
        image: "https://picsum.photos/id/221/200/300",
      },
      {
        id: "13",
        title: "投稿13",
        image: "https://picsum.photos/id/331/200/300",
      },
      {
        id: "14",
        title: "投稿14",
        image: "https://picsum.photos/id/441/200/300",
      },
      {
        id: "15",
        title: "投稿15",
        image: "https://picsum.photos/id/551/200/300",
      },
      {
        id: "16",
        title: "投稿16",
        image: "https://picsum.photos/id/661/200/300",
      },
      {
        id: "17",
        title: "投稿17",
        image: "https://picsum.photos/id/770/200/300",
      },
      {
        id: "18",
        title: "投稿18",
        image: "https://picsum.photos/id/881/200/300",
      },
      {
        id: "19",
        title: "投稿19",
        image: "https://picsum.photos/id/991/200/300",
      },
      {
        id: "20",
        title: "投稿20",
        image: "https://picsum.photos/id/101/200/300",
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
