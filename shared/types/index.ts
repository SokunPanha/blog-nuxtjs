export type AuthorCardType = {
  name: string;
  image: string;
};

export type Localized<T extends string | null = string> = {
  en: T;
  kh: string | null;
};

export type BlogCardType = {
  id: string;
  title: Localized;
  excerpt: Localized<string | null>;
  image: string | null;
  author: AuthorCardType;
  date: string;
  slug: string;
};

export type CategoryType = {
  id: string;
  name: Localized;
  description: Localized<string | null>;
  slug: string;
  coverImage: string | null;
  postCount: number;
};
