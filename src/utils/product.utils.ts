import { Category } from "@/interfaces/product.interface";

export const categoryNames: {[key: string]: string} = {
  [Category.Electronics]: 'Electrónicos',
  [Category.Jewelery]: 'Joyería',
  [Category.MenSClothing]: 'Ropa de hombre',
  [Category.WomenSClothing]: 'Ropa de mujer',
  default: 'Todas las categorías'
}