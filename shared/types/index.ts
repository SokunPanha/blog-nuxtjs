export type AuthorCardType = {
  name: string;
  image: string;
};

export type BlogCardType = {
  id: string; // Changed from number to string to match Prisma ID
  title: string;
  image: string | null;
  author: AuthorCardType;
  date: string;
  slug: string;
  excerpt?: string | null;
};

export type CategoryType = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  coverImage: string | null;
  postCount: number;
};
