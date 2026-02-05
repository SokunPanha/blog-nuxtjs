export type AuthorCardType = {
    name: string;
    image: string;
}

export type BlogCardType = {
    id: number;
    title: string;
    image: string;
    author: AuthorCardType;
    date: string;
}