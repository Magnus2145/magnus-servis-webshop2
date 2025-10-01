import Link from 'next/link';
import { CmsLinkGridSection } from '@/src/lib/cms';
import { resolveHref } from './utils';

export function LinkGrid({ data, locale }: { data: CmsLinkGridSection; locale: string }) {
  return (
    <section className="space-y-6">
      {(data.title || data.description) && (
        <div className="space-y-2 text-center md:text-left">
          {data.title && <h2 className="text-2xl font-semibold text-primary">{data.title}</h2>}
          {data.description && <p className="text-sm text-muted-foreground">{data.description}</p>}
        </div>
      )}
      <div className="grid gap-4 md:grid-cols-2">
        {data.links.map((link, index) => {
          const href = resolveHref(link.href, locale);
          if (!href) {
            return null;
          }
          return (
            <Link
              key={`${link.label}-${index}`}
              href={href.href}
              target={href.external ? '_blank' : undefined}
              rel={href.external ? 'noreferrer noopener' : undefined}
              className="rounded-xl border border-border bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <h3 className="text-lg font-semibold text-primary">{link.label}</h3>
              {link.description && <p className="mt-2 text-sm text-muted-foreground">{link.description}</p>}
            </Link>
          );
        })}
      </div>
    </section>
  );
}
