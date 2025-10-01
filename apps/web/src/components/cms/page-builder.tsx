import { CmsSection } from '@/src/lib/cms';
import { HeroSection } from './hero-section';
import { RichTextBlock } from './rich-text';
import { FeatureGrid } from './feature-grid';
import { MediaHighlight } from './media-highlight';
import { CallToAction } from './call-to-action';
import { ContactBlock } from './contact-block';
import { LinkGrid } from './link-grid';

export function PageBuilder({ sections, locale }: { sections: CmsSection[]; locale: string }) {
  if (!sections || sections.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
        TODO: Dodati sekcije u Strapi CMS-u kako bi se stranica prikazala.
      </div>
    );
  }

  return (
    <div className="space-y-12">
      {sections.map((section, index) => {
        switch (section.type) {
          case 'hero':
            return <HeroSection key={`hero-${index}`} data={section} locale={locale} />;
          case 'rich-text':
            return <RichTextBlock key={`rich-${index}`} data={section} />;
          case 'feature-grid':
            return <FeatureGrid key={`features-${index}`} data={section} />;
          case 'media-highlight':
            return <MediaHighlight key={`media-${index}`} data={section} locale={locale} />;
          case 'call-to-action':
            return <CallToAction key={`cta-${index}`} data={section} locale={locale} />;
          case 'contact-block':
            return <ContactBlock key={`contact-${index}`} data={section} locale={locale} />;
          case 'link-grid':
            return <LinkGrid key={`links-${index}`} data={section} locale={locale} />;
          default:
            return null;
        }
      })}
    </div>
  );
}
