import Image from 'next/image';
import Link from 'next/link';
import { CmsMediaHighlightSection } from '@/src/lib/cms';
import { cn, resolveHref } from './utils';

export function MediaHighlight({ data, locale }: { data: CmsMediaHighlightSection; locale: string }) {
  const href = resolveHref(data.ctaHref ?? null, locale);
  const mediaLeft = data.mediaPosition === 'left';

  return (
    <section className="grid gap-8 md:grid-cols-2 md:items-center">
      <div className={cn('space-y-4', mediaLeft ? 'md:order-2' : '')}>
        {data.title && <h2 className="text-2xl font-semibold text-primary">{data.title}</h2>}
        {data.body ? (
          <div className="prose prose-slate max-w-none text-sm text-muted-foreground dark:prose-invert">
            <div dangerouslySetInnerHTML={{ __html: data.body }} />
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">TODO: Dodati sadržaj u CMS-u.</p>
        )}
        {href && data.ctaLabel && (
          <Link
            href={href.href}
            target={href.external ? '_blank' : undefined}
            rel={href.external ? 'noreferrer noopener' : undefined}
            className="inline-flex items-center rounded-md bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground shadow hover:bg-accent/90"
          >
            {data.ctaLabel}
          </Link>
        )}
      </div>
      <div className={cn('relative aspect-video overflow-hidden rounded-2xl border border-border bg-muted', mediaLeft ? 'md:order-1' : '')}>
        {data.image ? (
          <Image
            src={data.image.url}
            alt={data.image.alternativeText ?? data.title ?? 'Media highlight'}
            fill
            className="object-cover"
            sizes="(min-width: 768px) 50vw, 100vw"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-sm text-muted-foreground">
            TODO: Dodati fotografiju u CMS-u.
          </div>
        )}
      </div>
    </section>
  );
}
