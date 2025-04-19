import CategoryFilter from "@/components/category-filter";
import { Button } from "@heroui/button";
import Link from "next/link";
import { LuPlus } from "react-icons/lu";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Productos</h1>
          <p className="text-muted-foreground mt-1">Explora y admistra el catálogo de productos</p>
        </div>
        <Link href="/">
          <Button size="lg">
            <LuPlus className="mr-2 h-4 w-4" />
            Agregar producto
          </Button>
        </Link>
      </div>
        
      <div className="mb-8">
        <CategoryFilter />
      </div>
    </div>

  );
}
