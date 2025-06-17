const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  const url = 'https://wilsonstore.com.pe/collections/cuerdas-luxilon?page=1';
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: 'domcontentloaded' });

  // Espera a que carguen los elementos del producto
  await page.waitForSelector('.product-grid__item', { timeout: 10000 });

  const products = await page.evaluate(() => {
    const productCards = Array.from(document.querySelectorAll('.product-grid__item'));

    return productCards.map(card => {
      const img = card.querySelector('img.product-item__primary-image');
      const name = img?.alt?.trim();
      const rawSrc = img?.getAttribute('src');
      const imgUrl = rawSrc?.startsWith('//') ? 'https:' + rawSrc : rawSrc;

      const priceEl = card.querySelector('.price__regular, .price__sale');
      const price = priceEl?.textContent?.trim();

      return {
        nombre: name || null,
        precio: price || null,
        imagen: imgUrl || null
      };
    }).filter(p => p.nombre && p.precio);
  });

  fs.writeFileSync('productos.json', JSON.stringify(products, null, 2));
  console.log('✅ Productos extraídos correctamente.');
  await browser.close();
})();
