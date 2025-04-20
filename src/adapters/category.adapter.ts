import { Category } from "@/interfaces/product.interface";
import { categoryNames } from "@/utils/product.utils";

export const formatCategories = (categories?: Category[]) => (
  categories?.map((category) => ({
    key: category,
    label: categoryNames[category]
  }))
)