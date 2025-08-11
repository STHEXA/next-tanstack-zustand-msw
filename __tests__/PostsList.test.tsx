import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import PostsList from "../src/app/components/PostsList";
import { useQuery } from "@tanstack/react-query";

// filepath: src/app/components/__tests__/PostsList.test.tsx

// next/imageのモック
const MockNextImage = (props: React.ComponentProps<"img">) => {
  // eslint-disable-next-line @next/next/no-img-element
  return <img {...props} alt={props.alt || ""} />;
};
MockNextImage.displayName = "MockNextImage";
jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: any) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} alt={props.alt || ""} />;
  },
}));

// next/linkのモック
const MockNextLink = ({
  children,
  href,
}: {
  children: React.ReactNode;
  href: string;
}) => <a href={href}>{children}</a>;
MockNextLink.displayName = "MockNextLink";
jest.mock("next/link", () => ({
  __esModule: true,
  default: ({
    children,
    href,
  }: {
    children: React.ReactNode;
    href: string;
  }) => <a href={href}>{children}</a>,
}));

// useQueryのモック
const refetchMock = jest.fn();
jest.mock("@tanstack/react-query", () => ({
  useQuery: jest.fn(),
}));

const mockInitialPosts = [
  { id: "1", title: "Post 1", image: "/img1.jpg" },
  { id: "2", title: "Post 2", image: "/img2.jpg" },
];
const mockFetchedPosts = [{ id: "3", title: "Post 3", image: "/img3.jpg" }];

describe("PostsList", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.mocked(useQuery).mockReturnValue({
      refetch: refetchMock.mockResolvedValue({ data: mockFetchedPosts }),
      isFetching: false,
      data: undefined,
      isError: false,
      error: null,
      isPending: false,
      status: "success",
      failureCount: 0,
      isFetched: true,
      isLoading: false,
      isRefetching: false,
      isSuccess: true,
      isStale: false,
      isPaused: false,
      fetchStatus: "idle",
      // remove: jest.fn(),
      // refetchInterval: undefined,
      // refetchIntervalInBackground: false,
      dataUpdatedAt: 0,
      errorUpdatedAt: 0,
      isInitialLoading: false,
      isPlaceholderData: false,
      // isPreviousData: false,
      isRefetchError: false,
      isLoadingError: false,
      isFetchedAfterMount: true,
      // failureReason: null,
      // errorUpdateCount: 0,
      // isEnabled: true,
      // promise: Promise.resolve(),
      failureReason: null,
      errorUpdateCount: 0,
      isEnabled: true,
      promise: Promise.resolve(),
    });
  });

  it("初期投稿が表示される", () => {
    render(<PostsList initialPosts={mockInitialPosts} />);
    expect(screen.getByText("Post 1")).toBeInTheDocument();
    expect(screen.getByText("Post 2")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "もっと表示" })
    ).toBeInTheDocument();
  });

  it("isFetchingがtrueのときローディング表示", () => {
    jest.mocked(useQuery).mockReturnValue({
      refetch: refetchMock,
      isFetching: true,
      data: undefined,
      isError: false,
      error: null,
      isPending: false,
      status: "success",
      failureCount: 0,
      isFetched: true,
      isLoading: false,
      isRefetching: false,
      isSuccess: true,
      isStale: false,
      isPaused: false,
      fetchStatus: "idle",
      // remove: jest.fn(),
      // refetchInterval: undefined,
      // refetchIntervalInBackground: false,
      dataUpdatedAt: 0,
      errorUpdatedAt: 0,
      isInitialLoading: false,
      isPlaceholderData: false,
      // isPreviousData: false,
      isRefetchError: false,
      isLoadingError: false,
      isFetchedAfterMount: true,
      isFetchingNextPage: false,
      isFetchingPreviousPage: false,
      isRefetchingNextPage: false,
      isRefetchingPreviousPage: false,
      fetchNextPage: jest.fn(),
      fetchPreviousPage: jest.fn(),
      hasNextPage: false,
      hasPreviousPage: false,
      isFetchingPage: false,
      isRefetchingPage: false,
      pages: [],
      pageParams: [],
    });
    render(<PostsList initialPosts={mockInitialPosts} />);
    expect(screen.getByText("読み込み中...")).toBeInTheDocument();
  });

  it("もっと表示ボタンでrefetchが呼ばれ、投稿が追加される", async () => {
    render(<PostsList initialPosts={mockInitialPosts} />);
    fireEvent.click(screen.getByRole("button", { name: "もっと表示" }));
    await waitFor(() => {
      expect(refetchMock).toHaveBeenCalled();
      expect(screen.getByText("Post 3")).toBeInTheDocument();
    });
  });
});
