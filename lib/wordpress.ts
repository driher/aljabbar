// ============================================
// lib/wordpress.ts
// WordPress REST API Helper
// Masjid Raya Al-Jabbar
// ============================================

const WORDPRESS_API =
  process.env.NEXT_PUBLIC_WORDPRESS_API ||
  "https://pas.akarmusic.com/wp-json/wp/v2";


// ============================================
// TYPES
// ============================================

export interface WordPressRendered {
  rendered: string;
}

export interface WordPressMedia {
  source_url?: string;
  alt_text?: string;

  media_details?: {
    sizes?: {
      thumbnail?: {
        source_url: string;
        width?: number;
        height?: number;
      };

      medium?: {
        source_url: string;
        width?: number;
        height?: number;
      };

      medium_large?: {
        source_url: string;
        width?: number;
        height?: number;
      };

      large?: {
        source_url: string;
        width?: number;
        height?: number;
      };

      full?: {
        source_url: string;
        width?: number;
        height?: number;
      };
    };
  };
}


export interface WordPressPost {
  id: number;

  date: string;

  modified?: string;

  slug: string;

  link?: string;

  title: WordPressRendered;

  content: WordPressRendered;

  excerpt: WordPressRendered;

  featured_media?: number;

  categories?: number[];

  tags?: number[];

  _embedded?: {
    ["wp:featuredmedia"]?: WordPressMedia[];

    ["wp:term"]?: Array<
      Array<{
        id: number;
        name: string;
        slug: string;
        taxonomy: string;
      }>
    >;
  };
}


export interface GetPostsOptions {
  page?: number;

  perPage?: number;

  search?: string;

  categories?: number | number[];

  exclude?: number | number[];

  include?: number | number[];

  slug?: string;

  order?: "asc" | "desc";

  orderby?:
    | "date"
    | "id"
    | "title"
    | "slug"
    | "modified"
    | "relevance";

  after?: string;

  before?: string;
}


// ============================================
// API URL
// ============================================

function getApiUrl(endpoint: string): string {
  const base = WORDPRESS_API.replace(/\/$/, "");

  const cleanEndpoint =
    endpoint.replace(/^\//, "");

  return `${base}/${cleanEndpoint}`;
}


// ============================================
// FETCH WORDPRESS
// ============================================

async function wpFetch<T>(
  endpoint: string
): Promise<T> {

  const url = getApiUrl(endpoint);

  console.log(
    "Fetching WordPress:",
    url
  );


  const response = await fetch(url, {
    method: "GET",

    headers: {
      Accept: "application/json",
    },

    cache: "no-store",
  });


  console.log(
    "WordPress response:",
    response.status,
    response.statusText
  );


  if (!response.ok) {

    const body =
      await response.text();

    console.error(
      "WordPress API Error:",
      response.status,
      body.substring(0, 500)
    );

    throw new Error(
      `WordPress API Error: ${response.status} ${response.statusText}`
    );
  }


  return response.json();
}


// ============================================
// GET POSTS
// ============================================

export async function getPosts(
  options: GetPostsOptions = {}
): Promise<WordPressPost[]> {

  const {
    page = 1,

    perPage = 10,

    search,

    categories,

    exclude,

    include,

    slug,

    order = "desc",

    orderby = "date",

    after,

    before,

  } = options;


  const params =
    new URLSearchParams();


  params.set(
    "page",
    String(page)
  );


  params.set(
    "per_page",
    String(perPage)
  );


  params.set(
    "order",
    order
  );


  params.set(
    "orderby",
    orderby
  );


  // Featured image + taxonomy
  params.set(
    "_embed",
    "1"
  );


  if (search) {

    params.set(
      "search",
      search
    );

  }


  if (slug) {

    params.set(
      "slug",
      slug
    );

  }


  if (categories !== undefined) {

    params.set(
      "categories",

      Array.isArray(categories)
        ? categories.join(",")
        : String(categories)
    );

  }


  if (exclude !== undefined) {

    params.set(
      "exclude",

      Array.isArray(exclude)
        ? exclude.join(",")
        : String(exclude)
    );

  }


  if (include !== undefined) {

    params.set(
      "include",

      Array.isArray(include)
        ? include.join(",")
        : String(include)
    );

  }


  if (after) {

    params.set(
      "after",
      after
    );

  }


  if (before) {

    params.set(
      "before",
      before
    );

  }


  return wpFetch<WordPressPost[]>(
    `posts?${params.toString()}`
  );
}


// ============================================
// GET SINGLE POST
// ============================================

export async function getPost(
  slug: string
): Promise<WordPressPost | null> {

  try {

    const posts =
      await getPosts({
        slug,
        perPage: 1,
      });


    return (
      posts[0] || null
    );

  } catch (error) {

    console.error(
      "getPost error:",
      error
    );

    return null;
  }
}


// ============================================
// GET FEATURED IMAGE
// ============================================

export function getFeaturedImage(
  post: WordPressPost
): string {

  const media =
    post._embedded?.[
      "wp:featuredmedia"
    ]?.[0];


  if (!media) {
    return "/placeholder.jpg";
  }


  if (
    media.media_details
      ?.sizes
      ?.medium_large
      ?.source_url
  ) {

    return media
      .media_details
      .sizes
      .medium_large
      .source_url;

  }


  if (
    media.media_details
      ?.sizes
      ?.large
      ?.source_url
  ) {

    return media
      .media_details
      .sizes
      .large
      .source_url;

  }


  if (
    media.media_details
      ?.sizes
      ?.medium
      ?.source_url
  ) {

    return media
      .media_details
      .sizes
      .medium
      .source_url;

  }


  if (media.source_url) {

    return media.source_url;

  }


  return "/placeholder.jpg";
}


// ============================================
// GET FEATURED IMAGE ALT
// ============================================

export function getFeaturedImageAlt(
  post: WordPressPost
): string {

  const media =
    post._embedded?.[
      "wp:featuredmedia"
    ]?.[0];


  return (
    media?.alt_text ||
    stripHtml(
      post.title?.rendered || ""
    ) ||
    "Masjid Raya Al-Jabbar"
  );
}


// ============================================
// STRIP HTML
// ============================================

export function stripHtml(
  html: string = ""
): string {

  return html
    .replace(
      /<[^>]*>/g,
      ""
    )

    .replace(
      /&nbsp;/gi,
      " "
    )

    .replace(
      /&amp;/gi,
      "&"
    )

    .replace(
      /&quot;/gi,
      '"'
    )

    .replace(
      /&#039;/gi,
      "'"
    )

    .replace(
      /&#8217;/gi,
      "'"
    )

    .replace(
      /&#8216;/gi,
      "'"
    )

    .replace(
      /&#8220;/gi,
      '"'
    )

    .replace(
      /&#8221;/gi,
      '"'
    )

    .replace(
      /&#8211;/gi,
      "-"
    )

    .replace(
      /&#8212;/gi,
      "-"
    )

    .replace(
      /&#8230;/gi,
      "..."
    )

    .replace(
      /\s+/g,
      " "
    )

    .trim();
}


// ============================================
// FORMAT DATE
// ============================================

export function formatDate(
  date: string
): string {

  if (!date) {
    return "";
  }


  const parsedDate =
    new Date(date);


  if (
    Number.isNaN(
      parsedDate.getTime()
    )
  ) {

    return date;

  }


  return new Intl.DateTimeFormat(
    "id-ID",
    {
      day: "numeric",
      month: "long",
      year: "numeric",
    }
  ).format(parsedDate);
}


// ============================================
// FORMAT DATE SHORT
// ============================================

export function formatDateShort(
  date: string
): string {

  if (!date) {
    return "";
  }


  const parsedDate =
    new Date(date);


  if (
    Number.isNaN(
      parsedDate.getTime()
    )
  ) {

    return date;

  }


  return new Intl.DateTimeFormat(
    "id-ID",
    {
      day: "numeric",
      month: "short",
      year: "numeric",
    }
  ).format(parsedDate);
}


// ============================================
// GET CATEGORY NAME
// ============================================

export function getCategoryName(
  post: WordPressPost
): string {

  const terms =
    post._embedded?.[
      "wp:term"
    ] || [];


  for (const group of terms) {

    for (const term of group) {

      if (
        term.taxonomy ===
        "category"
      ) {

        return term.name;

      }

    }

  }


  return "Berita";
}


// ============================================
// GET CATEGORY SLUG
// ============================================

export function getCategorySlug(
  post: WordPressPost
): string {

  const terms =
    post._embedded?.[
      "wp:term"
    ] || [];


  for (const group of terms) {

    for (const term of group) {

      if (
        term.taxonomy ===
        "category"
      ) {

        return term.slug;

      }

    }

  }


  return "";
}


// ============================================
// GET EXCERPT
// ============================================

export function getExcerpt(
  post: WordPressPost,
  maxLength: number = 160
): string {

  const excerpt =
    stripHtml(
      post.excerpt?.rendered ||
      ""
    );


  if (
    excerpt.length <=
    maxLength
  ) {

    return excerpt;

  }


  return (
    excerpt
      .substring(
        0,
        maxLength
      )
      .trim() +
    "..."
  );
}


// ============================================
// GET CONTENT TEXT
// ============================================

export function getContentText(
  post: WordPressPost
): string {

  return stripHtml(
    post.content?.rendered ||
    ""
  );
}


// ============================================
// GET POST IMAGE
// ============================================

export function getPostImage(
  post: WordPressPost
): string {

  return getFeaturedImage(
    post
  );
}


// ============================================
// GET POSTS BY CATEGORY
// ============================================

export async function getPostsByCategory(
  categoryId: number,
  perPage: number = 10
): Promise<WordPressPost[]> {

  return getPosts({
    categories: categoryId,
    perPage,
  });
}


// ============================================
// GET LATEST POSTS
// ============================================

export async function getLatestPosts(
  perPage: number = 3
): Promise<WordPressPost[]> {

  return getPosts({
    perPage,
    order: "desc",
    orderby: "date",
  });
}


// ============================================
// GET FEATURED POSTS
// ============================================

export async function getFeaturedPosts(
  perPage: number = 3
): Promise<WordPressPost[]> {

  return getPosts({
    perPage,
    order: "desc",
    orderby: "date",
  });
}