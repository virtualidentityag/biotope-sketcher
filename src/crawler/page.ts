export{};
const puppeteer = require('puppeteer');
const { Document, Page } = require('@brainly/html-sketchapp');

const { getContent, write } = require('./files');
const { contentToScript } = require('./scripts');
const { asyncForEach } = require('./util');
const { evaluateDesignSystem, evaluateComponent } = require('./evaluators');

const blacklistedLinks = [
  '^#',
  '^browserSupport.',
];

const openPage = async (url: string) => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  page.setViewport({ width: 1920, height: 1080 });

  // add logger bubbling from puppeter to node process
  page.on('console', (messages: any) => Array.from(messages.args())
    .forEach((message, index) => console.log(`${index}: ${message}`)));

  const sketchFile = new Document();
  sketchFile.setName('basf-styleguide');
  const sketchDocument = JSON.stringify(sketchFile.toJSON());

  await page.goto(url);

  return {
    browser,
    page,
    sketchDocument
  };
};

const processPage = (outputPrefix: string) => 
  async ({ browser, page, sketchDocument }: { browser: any; page: any, sketchDocument: any}) => 
{
  const { content } = contentToScript(getContent('./bin/lib/dom-parser/domToAlmostSketch.js'));

  const componentLinks = JSON.parse(await page.evaluate(evaluateDesignSystem, {
    blacklistedLinks,
  }));
  
  const sketchDocumentRevived = JSON.parse(sketchDocument);

  await asyncForEach(componentLinks, async (link: string) => {
    const linkSplit = link.split('/');
    const componentName = linkSplit[linkSplit.length - 1].replace('.html', '.asketch.json');

    await page.goto(link, { waitUntil: 'networkidle2' });
    await page.addScriptTag({ content });

    const pageData = await page.evaluate(evaluateComponent);
    
    // manually add page to converted document
    sketchDocumentRevived.pages.push({
        _class: 'MSJSONFileReference',
        _ref_class: 'MSImmutablePage',
        _ref: JSON.parse(pageData).do_objectID
    })
    write(`${outputPrefix}${componentName}`, pageData);

    // const pageDataAsPageInstance = pageData;
    // const pageInstance = new Page({ 
    //   width: 1280, 
    //   height: 4000
    // });

    // pageDataAsPageInstance.__proto__ = pageInstance;
    // console.log(JSON.stringify(pageDataAsPageInstance));

    // sketchDocument.addPage(pageDataAsPageInstance);
    // write(`${outputPrefix}${componentName}`, JSON.stringify(pageDataAsPageInstance.toJSON()));
  });

  write(`${outputPrefix}_document.asketch.json`, JSON.stringify(sketchDocumentRevived));

  browser.close();
  process.exit();
};

module.exports = {
  openPage,
  processPage,
};
