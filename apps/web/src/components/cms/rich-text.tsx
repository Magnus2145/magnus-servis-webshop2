import { CmsRichTextSection } from '@/src/lib/cms';

export function RichTextBlock({ data }: { data: CmsRichTextSection }) {
  return (
    <section className="prose prose-slate max-w-none dark:prose-invert">
      {data.title && <h2>{data.title}</h2>}
      {data.body ? <div dangerouslySetInnerHTML={{ __html: data.body }} /> : <p>TODO: Dodati sadržaj u CMS-u.</p>}
    </section>
  );
}
