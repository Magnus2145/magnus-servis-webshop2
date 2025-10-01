import Image from 'next/image';
import Link from 'next/link';
import { CmsHeroSection } from '@/src/lib/cms';
import { buttonToneClasses, cn, resolveHref } from './utils';

function heroBackgroundClasses(style: CmsHeroSection['backgroundStyle']) {
  switch (style) {
    case 'light':
      return 'bg-muted text-foreground';
    case 'dark':
      return 'bg-slate-900 text-white';
    case 'image':
      return 'text-white';
    case 'gradient':
    default:
      return 'bg-gradient-to-br from-primary via-primary/90 to-secondary text-primary-foreground shadow-lg';
  }
}

export function HeroSection({ data, locale }: { data: CmsHeroSection; locale: string }) {
  const primaryHref = resolveHref(data.primaryCtaHref ?? null, locale);
  const secondaryHref = resolveHref(data.secondaryCtaHref ?? null, locale);
  const hasImage = data.backgroundStyle === 'image' && data.backgroundImage;
  const subtitleClass = data.backgroundStyle === 'light' ? 'text-muted-foreground md:text-lg' : 'text-white/80 md:text-xl';

  return (
    <section
      className={cn(
        'relative overflow-hidden rounded-3xl px-6 py-16 shadow-lg md:px-10',
        heroBackgroundClasses(data.backgroundStyle)
      )}
    >
      {hasImage && (
        <div className="absolute inset-0 opacity-40">
          <Image
            src={data.backgroundImage!.url}
            alt={data.backgroundImage?.alternativeText ?? data.title}
            fill
            className="object-cover"
            sizes="100vw"
          />
        </div>
      )}
      <div className={cn('relative z-10 mx-auto flex w-full flex-col gap-8', data.layout === 'split' ? 'md:flex-row md:items-center md:justify-between' : 'items-center text-center')}>
        <div className={cn('space-y-4', data.layout === 'split' ? 'md:max-w-xl' : 'mx-auto max-w-2xl')}>
          {data.eyebrow && <span className="text-sm font-semibold uppercase tracking-wide text-accent">{data.eyebrow}</span>}
          <h1 className="text-3xl font-bold md:text-4xl">{data.title}</h1>
          {data.subtitle && <p className={cn('text-lg', subtitleClass)}>{data.subtitle}</p>}
          {(primaryHref || secondaryHref) && (
            <div className={cn('flex flex-wrap gap-4', data.layout === 'split' ? '' : 'justify-center')}>
              {primaryHref && (
                <Link
                  href={primaryHref.href}
                  target={primaryHref.external ? '_blank' : undefined}
                  rel={primaryHref.external ? 'noreferrer noopener' : undefined}
                  className={cn('inline-flex items-center rounded-lg px-6 py-3 text-sm font-semibold shadow transition', buttonToneClasses('primary'))}
                >
                  {data.primaryCtaLabel ?? 'Saznaj više'}
                </Link>
              )}
              {secondaryHref && (
                <Link
                  href={secondaryHref.href}
                  target={secondaryHref.external ? '_blank' : undefined}
                  rel={secondaryHref.external ? 'noreferrer noopener' : undefined}
                  className="inline-flex items-center rounded-lg border border-white/60 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  {data.secondaryCtaLabel ?? 'Kontakt'}
                </Link>
              )}
            </div>
          )}
        </div>
        {data.layout === 'split' && data.backgroundStyle !== 'image' && data.backgroundImage && (
          <div className="mx-auto w-full max-w-sm overflow-hidden rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur">
            <Image
              src={data.backgroundImage.url}
              alt={data.backgroundImage.alternativeText ?? data.title}
              width={data.backgroundImage.width ?? 600}
              height={data.backgroundImage.height ?? 400}
              className="h-full w-full rounded-xl object-cover"
            />
          </div>
        )}
      </div>
    </section>
  );
}
