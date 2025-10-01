import Image from 'next/image';
import Link from 'next/link';

export type ProductCardProps = {
  id: string;
  title: string;
  price?: string;
  image?: string | null;
};

export function ProductCard({ id, title, price, image }: ProductCardProps) {
  return (
    <Link
      href={`#product-${id}`}
      className="group flex h-full flex-col overflow-hidden rounded-lg border bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="relative h-48 w-full bg-muted">
        {image ? (
          <Image src={image} alt={title} fill className="object-cover" />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-sm text-muted-foreground">
            TODO: Dodati sliku proizvoda
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <h3 className="text-base font-semibold text-primary/90 group-hover:text-primary">{title}</h3>
        <p className="text-sm text-muted-foreground">
          {price ?? 'TODO: Cijena i PDV prema cjeniku'}
        </p>
      </div>
    </Link>
  );
}
