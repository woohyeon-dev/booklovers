export interface SearchResultType {
  likesCount?: number;
  isLikes?: boolean;
  title?: string;
  link?: string;
  image?: string;
  author?: string;
  discount?: string | number;
  publisher?: string;
  pubdate?: string | number | Date;
  isbn?: string | number;
  description?: string;
}
