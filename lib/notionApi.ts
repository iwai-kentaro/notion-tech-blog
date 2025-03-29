import { NUMBER_OF_POSTS_PER_PAGE } from "@/constants/constants";
import { Client } from "@notionhq/client";
import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { NotionToMarkdown } from "notion-to-md";

export type Post = {
  id?: string;
  title?: string;
  slug?: string;
  tags?: string[];
  created_time?: string;
  updated_time?: string;
  description?: string;
  isPaginationPage?: boolean;
};

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

const n2m = new NotionToMarkdown({ notionClient: notion });

export const getAllPosts = async (): Promise<Post[]> => {
  const posts = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID || "",
    page_size: 100,
    filter: {
      property: "Published",
      checkbox: {
        equals: true,
      },
    },
    sorts: [
      {
        property: "CreateDate",
        direction: "descending",
      },
    ],
  });

  const allPosts = posts.results;

  return allPosts.map((post) => {
    return getPageMetaData(post as PageObjectResponse);
  });
};

// metadata
export const getPageMetaData = (post: PageObjectResponse): Post => {
  // プロパティにアクセスするために型アサーションを使用
  const properties = post.properties as any;

  const getTags = (tags: any[]) => {
    return tags.map((tag) => tag.name);
  };

  return {
    id: post.id,
    title: properties?.Title?.title?.[0]?.text?.content ?? "No Title",
    slug: properties?.Slug?.rich_text?.[0]?.plain_text ?? "",
    tags: getTags(properties?.Tags?.multi_select ?? []),
    created_time: properties?.CreateDate?.date?.start || post.created_time,
    updated_time: properties?.UpdateDate?.date?.start ?? "",
    description: properties?.Description?.rich_text?.[0]?.plain_text ?? "",
  };
};

export const getSinglePost = async (slug: string) => {
  const res = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID || "",
    filter: {
      property: "Slug",
      rich_text: {
        equals: slug,
      },
    },
  });

  const page = res.results[0];
  const metadata = getPageMetaData(page as PageObjectResponse);

  const mdBlocks = await n2m.pageToMarkdown(page.id);
  const mdString = n2m.toMarkdownString(mdBlocks);

  return {
    metadata,
    markdown: mdString,
  };
};

// TOPページ用　5つ
export const getPostsFiveTopPage = async (pageSize = 5) => {
  const allPosts = await getAllPosts();
  const fivePosts = allPosts.slice(0, pageSize);
  return fivePosts;
};

export const getPostsByPage = async (page: number) => {
  const allPosts = await getAllPosts();
  const startIndex = (page - 1) * NUMBER_OF_POSTS_PER_PAGE;
  const endIndex = startIndex + NUMBER_OF_POSTS_PER_PAGE;
  const paginatedPosts = allPosts.slice(startIndex, endIndex);
  return paginatedPosts;
};

export const getNumberOfPages = async () => {
  const allPosts = await getAllPosts();
  return Math.ceil(allPosts.length / NUMBER_OF_POSTS_PER_PAGE);
};

export const getPostsByTagPage = async (tagName: string, page: number) => {
  const allPosts = await getAllPosts();

  const posts = allPosts.filter((post) => {
    return post.tags?.find((t) => t === tagName);
  });

  const startIndex = (page - 1) * NUMBER_OF_POSTS_PER_PAGE;
  const endIndex = startIndex + NUMBER_OF_POSTS_PER_PAGE;
  const paginatedPosts = posts.slice(startIndex, endIndex);
  return paginatedPosts;
};

// notionApi.ts に追加する関数
export const getNumberOfPagesByTag = async (tagName: string) => {
  const allPosts = await getAllPosts();
  const taggedPosts = allPosts.filter((post) =>
    post.tags?.find((t) => t === tagName)
  );

  return Math.ceil(taggedPosts.length / NUMBER_OF_POSTS_PER_PAGE);
};

export const getAllTags = async () => {
  const allPosts = await getAllPosts();
  const allTags = allPosts.flatMap((post) => post.tags ?? []);
  const uniqueTags = Array.from(new Set(allTags));
  return uniqueTags;
};
