const puppeteer = require('puppeteer');

const { getContent, write } = require('./files');
const { contentToScript } = require('./scripts');
const { asyncForEach } = require('./util');
const { evaluateDesignSystem, evaluateComponent } = require('./evaluators');

const blacklistedLinks = [
  '^#',
  '^browserSupport.',
];

const openPage = async (url: string) => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  page.setViewport({ width: 1920, height: 1080 });

  // add logger bubbling from puppeter to node process
  page.on('console', (messages: any) => Array.from(messages.args())
    .forEach((message, index) => console.log(`${index}: ${message}`)));

  await page.goto(url);

  return {
    browser,
    page,
  };
};

const processPage = (outputPrefix: string) => async ({ browser, page }: { browser: any; page: any}) => {
  const { content } = contentToScript(getContent('./bin/lib/dom-parser/domToAlmostSketch.js'));

  const componentLinks = JSON.parse(await page.evaluate(evaluateDesignSystem, {
    blacklistedLinks,
  }));

  await asyncForEach(componentLinks, async (link: string) => {
    const linkSplit = link.split('/');
    const componentName = linkSplit[linkSplit.length - 1].replace('.html', '.json');

    await page.goto(link, { waitUntil: 'networkidle2' });
    await page.addScriptTag({ content });

    const pageData = await page.evaluate(evaluateComponent);

    write(`${outputPrefix}${componentName}`, pageData);
  });

  browser.close();
  process.exit();
};

module.exports = {
  openPage,
  processPage,
};
