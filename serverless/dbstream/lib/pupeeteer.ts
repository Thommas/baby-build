/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { puppeteerService } from './services'

async function fetchImages() {
  const imgs = await puppeteerService.fetchImage(
    `sonic png`,
    1,
    true
  );
  console.log('DONE');
  process.exit();
}
fetchImages();
