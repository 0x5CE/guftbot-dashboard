import { Category } from "./category";

export interface Question {
  id: string;
  text: string;
  image_url: string;
  categories: Promise<Category[]>;

  createdAt: Date;

  updatedAt: Date;
}
