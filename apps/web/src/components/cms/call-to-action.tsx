import Link from 'next/link';
import { CmsCallToActionSection } from '@/src/lib/cms';
import { buttonToneClasses, cn, resolveHref } from './utils';

export function CallToAction({ data, locale }: { data: CmsCallToActionSection; locale: string }) {
  const href = resolveHref(data.ctaHref ?? null, locale);

  return (
    <section className="rounded-3xl border border-border bg-gradient-to-r from-primary/10 to-secondary/10 p-8 text-center shadow-sm">
      <div className="mx-auto max-w-2xl space-y-4">
        <h2 className="text-2xl font-semibold text-primary">{data.title}</h2>
        {data.body && <p className="text-sm text-muted-foreground">{data.body}</p>}
        {href && data.ctaLabel && (
          <Link
            href={href.href}
            target={href.external ? '_blank' : undefined}
            rel={href.external ? 'noreferrer noopener' : undefined}
            className={cn('inline-flex items-center rounded-lg px-5 py-3 text-sm font-semibold shadow transition', buttonToneClasses(data.tone))}
          >
            {data.ctaLabel}
          </Link>
        )}
      </div>
    </section>
  );
}
