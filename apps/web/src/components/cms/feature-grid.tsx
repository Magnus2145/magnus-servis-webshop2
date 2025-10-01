import { CmsFeatureGridSection } from '@/src/lib/cms';
import { cn } from './utils';
import * as Icons from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

function toPascalCase(value: string) {
  return value
    .split(/[-_\s]/)
    .filter(Boolean)
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join('');
}

function featureIcon(icon?: string | null): LucideIcon {
  const fallback = Icons.Sparkles;
  if (!icon) {
    return fallback;
  }

  const iconName = toPascalCase(icon);
  const match = (Icons as Record<string, LucideIcon | undefined>)[iconName];
  return match ?? fallback;
}

export function FeatureGrid({ data }: { data: CmsFeatureGridSection }) {
  const columns = Math.min(Math.max(data.columns ?? 3, 1), 4);
  const gridCols = {
    1: 'grid-cols-1',
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-3',
    4: 'md:grid-cols-4',
  }[columns];

  return (
    <section className="space-y-6">
      {(data.title || data.subtitle) && (
        <div className="text-center md:text-left">
          {data.title && <h2 className="text-2xl font-semibold text-primary">{data.title}</h2>}
          {data.subtitle && <p className="mt-2 text-sm text-muted-foreground">{data.subtitle}</p>}
        </div>
      )}
      <div className={cn('grid gap-5', gridCols)}>
        {data.features.map((feature, index) => {
          const Icon = featureIcon(feature.icon);
          return (
            <div key={`${feature.title}-${index}`} className="rounded-xl border border-border bg-white p-6 shadow-sm">
              <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-accent/20 text-accent">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-semibold text-primary">{feature.title}</h3>
              {feature.description && <p className="mt-2 text-sm text-muted-foreground">{feature.description}</p>}
            </div>
          );
        })}
      </div>
    </section>
  );
}
