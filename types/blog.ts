export interface Category {
  id: number;
  name: string;
  slug: string;
  description?: string;
  parent?: {
    id: number;
    name: string;
    slug: string;
  };
}

export interface Tag {
  id: number;
  name: string;
  slug: string;
  description?: string;
}

export interface FeaturedImage {
  url: string;
  original: string;
  id: number;
}

export interface PostImage {
  original: string;
  clean: string;
  alt: string;
  width?: string;
  height?: string;
}

export interface Post {
  id: number;
  slug: string;
  title: string;
  content: string;
  excerpt: string;
  date: string;
  modified: string;
  author: number;
  featuredImage: FeaturedImage | null;
  categories: Category[];
  tags: Tag[];
  status: string;
  commentStatus: string;
  images: PostImage[];
  meta: {
    originalLink: string;
    format: string;
  };
}

export interface PostIndex {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  modified: string;
  featuredImage: FeaturedImage | null;
  categories: Category[];
  tags: Tag[];
}

export interface Page {
  id: number;
  slug: string;
  title: string;
  content: string;
  date: string;
  modified: string;
  author: number;
  featuredImage: FeaturedImage | null;
  parent: number;
  menuOrder: number;
  status: string;
  images: PostImage[];
  meta: {
    originalLink: string;
    template: string;
  };
}

export interface PageIndex {
  id: number;
  slug: string;
  title: string;
  date: string;
  modified: string;
  parent: number;
  menuOrder: number;
}
