import Link from 'next/link';
import * as Icons from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { CmsContactBlockSection } from '@/src/lib/cms';

function toPascalCase(value?: string | null) {
  if (!value) {
    return '';
  }
  return value
    .split(/[-_\s]/)
    .filter(Boolean)
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join('');
}

function resolveContactIcon(name?: string | null): LucideIcon {
  const fallback = Icons.Info;
  if (!name) {
    return fallback;
  }
  const key = toPascalCase(name);
  const icon = (Icons as Record<string, LucideIcon | undefined>)[key];
  return icon ?? fallback;
}

function normalizeContactValue(value?: string | null) {
  if (!value) {
    return null;
  }
  const trimmed = value.trim();
  if (trimmed.startsWith('http')) {
    return { href: trimmed, label: trimmed, external: true };
  }
  if (trimmed.includes('@')) {
    return { href: `mailto:${trimmed}`, label: trimmed, external: false };
  }
  if (trimmed.startsWith('+') || /^0[0-9]/.test(trimmed)) {
    const tel = trimmed.replace(/\s+/g, '');
    return { href: `tel:${tel}`, label: trimmed, external: false };
  }
  return { href: '', label: trimmed, external: false };
}

export function ContactBlock({ data, locale }: { data: CmsContactBlockSection; locale: string }) {
  return (
    <section className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
      <div className="space-y-6 rounded-2xl border border-border bg-white p-8 shadow-sm">
        <div className="space-y-2">
          {data.title && <h2 className="text-2xl font-semibold text-primary">{data.title}</h2>}
          {data.description && <p className="text-sm text-muted-foreground">{data.description}</p>}
        </div>
        <div className="space-y-4">
          {data.contactItems.map((item, index) => {
            const Icon = resolveContactIcon(item.icon);
            const value = normalizeContactValue(item.value);
            return (
              <div key={`${item.label}-${index}`} className="flex items-start gap-3 rounded-xl border border-border/60 p-4">
                <div className="mt-1 inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Icon className="h-4 w-4" />
                </div>
                <div>
                  {item.label && <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{item.label}</p>}
                  {value ? (
                    value.href ? (
                      <Link
                        href={value.href}
                        target={value.external ? '_blank' : undefined}
                        rel={value.external ? 'noreferrer noopener' : undefined}
                        className="text-sm font-medium text-primary hover:underline"
                      >
                        {value.label}
                      </Link>
                    ) : (
                      <p className="text-sm font-medium text-primary">{value.label}</p>
                    )
                  ) : (
                    <p className="text-sm text-muted-foreground">TODO: Dodati podatke.</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        {data.showForm && (
          <form className="mt-6 space-y-4" action="#" method="post">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="text-sm font-medium text-muted-foreground" htmlFor="contact-name">
                  Ime i prezime
                </label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  className="mt-1 w-full rounded-md border border-border px-3 py-2"
                  placeholder="Vaše ime"
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground" htmlFor="contact-email">
                  E-mail
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  className="mt-1 w-full rounded-md border border-border px-3 py-2"
                  placeholder="primjer@magnus-servis.com"
                  required
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground" htmlFor="contact-message">
                Poruka
              </label>
              <textarea
                id="contact-message"
                name="message"
                rows={4}
                className="mt-1 w-full rounded-md border border-border px-3 py-2"
                placeholder="Kako vam možemo pomoći?"
              />
            </div>
            <button type="submit" className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">
              Pošalji poruku (TODO: povezati s backendom)
            </button>
          </form>
        )}
      </div>
      <div className="space-y-4">
        <div className="aspect-[4/3] overflow-hidden rounded-2xl border border-border bg-muted">
          {data.mapEmbedUrl ? (
            <iframe
              src={data.mapEmbedUrl}
              className="h-full w-full"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              title={data.title ?? 'Lokacija Magnus Servisa'}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-sm text-muted-foreground">
              TODO: Dodati Google Maps embed u CMS-u.
            </div>
          )}
        </div>
        <div className="rounded-2xl border border-border bg-muted/40 p-4 text-xs text-muted-foreground">
          Sve podatke i izgled možete urediti u Strapi admin panelu &rarr; Global settings ili unutar stranice.
        </div>
      </div>
    </section>
  );
}
