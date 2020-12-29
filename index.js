const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch({ headless: false }); //{headless: false}
  const page = await browser.newPage();
  await page.goto('https://www.instagram.com/officialtechwiki');

  const imgList = await page.evaluate(() => {
    //Browser executed
    //Get all images in post area
    const nodeList = document.querySelectorAll('article img');
    //Change nodeList in array
    const imgArray = [...nodeList];
    //Change the nodes(elements hmtl) in object JS
    const imgList = imgArray.map(({ src }) => ({
      src,
    }));
    // Output of function
    return imgList;
  });
  // write data in local Store (Json)
  await fs.writeFile(
    'instagram.json',
    JSON.stringify(imgList, null, 2),
    (err) => {
      if (err) {
        throw new Error('Something went wrong');
      }
      console.log('Well done');
    }
  );
  await browser.close();
})();
