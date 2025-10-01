import Link from 'next/link';

const policies = [
  { slug: 'privatnost', label: 'Pravila privatnosti' },
  { slug: 'uvjeti', label: 'Uvjeti korištenja' },
  { slug: 'kolacici', label: 'Pravila o kolačićima' },
];

export default function PravilaIndexPage({ params: { locale } }: { params: { locale: string } }) {
  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold text-primary">Pravila i dokumenti</h1>
        <p className="text-sm text-muted-foreground">
          TODO: Dodati uvodni tekst koji objašnjava pravila privatnosti, uvjete korištenja i kolačiće.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {policies.map((policy) => (
          <Link
            key={policy.slug}
            href={`/${locale}/pravila/${policy.slug}`}
            className="rounded-lg border bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
          >
            <h2 className="text-xl font-semibold text-primary">{policy.label}</h2>
            <p className="mt-2 text-sm text-muted-foreground">Kliknite za pregled dokumenta.</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
