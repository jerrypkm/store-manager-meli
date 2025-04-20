import CategoryFilter from "@/components/category-filter";
import ProductGrid from "@/components/product-grid";
import { Button } from "@heroui/button";
import Link from "next/link";
import { Suspense } from "react";
import { LuPlus } from "react-icons/lu";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Productos</h1>
          <p className="text-muted-foreground mt-1">Explora y admistra el catálogo de productos</p>
        </div>
        <Link href="/new">
          <Button size="lg">
            <LuPlus className="mr-2 h-4 w-4" />
            Agregar producto
          </Button>
        </Link>
      </div>
        
      <div className="mb-8">
        <Suspense>
          <CategoryFilter />
        </Suspense>
      </div>
      <div className="mb-8">
        <Suspense>
          <ProductGrid></ProductGrid>
        </Suspense>
      </div>

    </div>

  );
}
