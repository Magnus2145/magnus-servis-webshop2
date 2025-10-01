import PDFDocument from 'pdfkit';
import { Response } from 'express';

export type PdfTemplate = 'ponuda' | 'racun' | 'servisni-izvjestaj';

const companyInfo = {
  name: 'Magnus Servis d.o.o.',
  address: 'TODO: Ulica 1, 10000 Zagreb',
  oib: 'TODO: OIB',
  phone: 'TODO: +385 xx xxx xxxx',
  email: 'servis@magnus-servis.com',
};

export function streamPdf(res: Response, template: PdfTemplate) {
  const doc = new PDFDocument({ margin: 50 });
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `inline; filename=${template}.pdf`);
  doc.pipe(res);

  doc.fontSize(18).text('Magnus Servis', { align: 'left' });
  doc.moveDown();
  doc.fontSize(10).text(companyInfo.name);
  doc.text(companyInfo.address);
  doc.text(`OIB: ${companyInfo.oib}`);
  doc.text(`Tel: ${companyInfo.phone}`);
  doc.text(`E-mail: ${companyInfo.email}`);
  doc.moveDown();

  switch (template) {
    case 'ponuda':
      doc.fontSize(14).text('Ponuda', { underline: true });
      doc.moveDown();
      doc.text('TODO: Dinamički popis stavki ponude.');
      break;
    case 'racun':
      doc.fontSize(14).text('Račun', { underline: true });
      doc.moveDown();
      doc.text('TODO: Dinamički prikaz računa.');
      break;
    case 'servisni-izvjestaj':
      doc.fontSize(14).text('Servisni izvještaj', { underline: true });
      doc.moveDown();
      doc.text('TODO: Detalji servisnog zahvata i potpis klijenta.');
      break;
  }

  doc.moveDown();
  doc.text('Generirano automatski.');
  doc.end();
}
