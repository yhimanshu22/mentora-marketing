import puppeteer from 'puppeteer';
import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

async function generateFavicons() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const logoData = readFileSync('public/logo.png').toString('base64');

  const html = `<!DOCTYPE html>
<html>
  <body style="margin:0;padding:0;background:transparent;display:flex;align-items:center;justify-content:center;width:512px;height:512px;">
    <img src="data:image/png;base64,${logoData}" style="width:512px;height:512px;object-fit:contain;" />
  </body>
</html>`;

  await page.setContent(html);
  await page.setViewport({ width: 512, height: 512, deviceScaleFactor: 1 });

  const icon512 = await page.screenshot({ omitBackground: true, type: 'png' });
  writeFileSync('public/favicon.png', icon512);
  writeFileSync('public/apple-touch-icon.png', icon512);

  const html48 = `<!DOCTYPE html>
<html>
  <body style="margin:0;padding:0;background:transparent;display:flex;align-items:center;justify-content:center;width:48px;height:48px;">
    <img src="data:image/png;base64,${logoData}" style="width:48px;height:48px;object-fit:contain;" />
  </body>
</html>`;
  await page.setContent(html48);
  await page.setViewport({ width: 48, height: 48, deviceScaleFactor: 1 });
  const icon48 = await page.screenshot({ omitBackground: true, type: 'png' });
  writeFileSync('public/favicon.ico', icon48);

  await browser.close();
  console.log('Favicons generated successfully.');
}

generateFavicons().catch(console.error);
