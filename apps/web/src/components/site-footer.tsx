import { useTranslations } from 'next-intl';

export function SiteFooter() {
  const t = useTranslations();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t bg-muted/60">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-8 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
        <div>
          <strong className="text-primary">Magnus Servis</strong>
          <p>TODO: Dodati adresu i kontakt podatke.</p>
        </div>
        <p>{t('footer.copy', { year })}</p>
      </div>
    </footer>
  );
}
