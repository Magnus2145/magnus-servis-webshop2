import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/src/lib/auth';

export default async function AdminPlaceholder({
  params,
}: {
  params: { locale: string };
}) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect(`/${params.locale}/auth/login`);
  }

  return (
    <section className="space-y-4">
      <h1 className="text-3xl font-semibold text-primary">Admin sučelje</h1>
      <p className="text-sm text-muted-foreground">
        TODO: Implementirati upravljačko sučelje (Next.js + Medusa API + CMS upravljanje).
      </p>
      <ul className="list-disc space-y-2 pl-5 text-sm text-muted-foreground">
        <li>Pregled narudžbi i servisnih naloga</li>
        <li>Upravljanje proizvodima i kategorijama</li>
        <li>B2B cjenici i ponude na upit</li>
      </ul>
    </section>
  );
}
