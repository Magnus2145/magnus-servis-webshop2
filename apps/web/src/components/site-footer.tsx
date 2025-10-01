import Link from 'next/link';
import { GlobalSettings } from '@/src/lib/cms';
import { resolveHref } from '@/src/components/cms/utils';

export function SiteFooter({ locale, global }: { locale: string; global: GlobalSettings }) {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t bg-muted/60">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-10 text-sm text-muted-foreground md:flex-row md:items-start md:justify-between">
        <div className="max-w-sm space-y-3">
          <h3 className="text-lg font-semibold text-primary">{global.siteName}</h3>
          {global.tagline && <p className="text-sm text-muted-foreground">{global.tagline}</p>}
          {global.address && <p className="text-sm">{global.address}</p>}
          <ul className="space-y-2 text-sm">
            {global.contactEmail && (
              <li>
                <a href={`mailto:${global.contactEmail}`} className="hover:text-primary">
                  {global.contactEmail}
                </a>
              </li>
            )}
            {global.contactPhone && (
              <li>
                <a href={`tel:${global.contactPhone.replace(/\s+/g, '')}`} className="hover:text-primary">
                  {global.contactPhone}
                </a>
              </li>
            )}
          </ul>
        </div>
        <div className="grid flex-1 gap-8 md:grid-cols-3">
          {global.footerColumns.length > 0 ? (
            global.footerColumns.map((column, index) => (
              <div key={`${column.title}-${index}`} className="space-y-3">
                {column.title && <h4 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{column.title}</h4>}
                <ul className="space-y-2">
                  {column.links.map((link, idx) => {
                    const href = resolveHref(link.href, locale);
                    if (!href) {
                      return null;
                    }
                    return (
                      <li key={`${link.label}-${idx}`}>
                        <Link
                          href={href.href}
                          target={href.external ? '_blank' : undefined}
                          rel={href.external ? 'noreferrer noopener' : undefined}
                          className="transition hover:text-primary"
                        >
                          {link.label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))
          ) : (
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>TODO: Dodati footer linkove u CMS-u (Global settings &rarr; Footer columns).</p>
            </div>
          )}
        </div>
        <div className="space-y-3 text-sm">
          <h4 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Poveži se</h4>
          <ul className="space-y-2">
            {global.socialLinks.map((social, index) => (
              <li key={`${social.platform}-${index}`}>
                {social.url ? (
                  <a href={social.url} target="_blank" rel="noreferrer noopener" className="transition hover:text-primary">
                    {social.label ?? social.platform}
                  </a>
                ) : (
                  <span className="text-muted-foreground">{social.label ?? social.platform}</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t bg-muted/80">
        <div className="mx-auto max-w-6xl px-4 py-4 text-xs text-muted-foreground">
          © {year} {global.siteName}. Sva prava pridržana.
        </div>
      </div>
    </footer>
  );
}
