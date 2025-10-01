import nodemailer from 'nodemailer';
import fs from 'node:fs';
import path from 'node:path';
import Handlebars from 'handlebars';
import { logger } from '../utils/logger';

const transport = nodemailer.createTransport({
  streamTransport: true,
  newline: 'unix',
  buffer: true,
});

type TemplateName = 'order-confirmation' | 'service-ticket';

type TemplateContext = Record<string, unknown>;

export async function sendTemplateEmail(
  template: TemplateName,
  to: string,
  subject: string,
  context: TemplateContext,
) {
  const templatePath = path.join(__dirname, '../emails/templates', `${template}.hbs`);
  const templateSource = await fs.promises.readFile(templatePath, 'utf-8');
  const compiled = Handlebars.compile(templateSource);
  const html = compiled(context);

  await transport.sendMail({
    to,
    from: 'noreply@magnus-servis.local',
    subject,
    html,
  });

  logger.info(`Email ${template} prepared for ${to}`);
}
