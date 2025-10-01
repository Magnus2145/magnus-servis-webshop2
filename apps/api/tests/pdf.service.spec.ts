import { streamPdf } from '../src/services/pdf.service';

describe('PDF service', () => {
  it('sets headers and streams content', () => {
    const chunks: Buffer[] = [];
    const res = {
      setHeader: jest.fn(),
      write: (chunk: Buffer) => {
        chunks.push(chunk);
      },
      end: jest.fn(),
    } as any;

    streamPdf(res, 'ponuda');

    expect(res.setHeader).toHaveBeenCalledWith('Content-Type', 'application/pdf');
    expect(res.setHeader).toHaveBeenCalledWith('Content-Disposition', expect.stringContaining('ponuda'));
  });
});
