import { fixPseudoElements, fixVideoPoster } from './fixPseudoElements';
import { Page, Artboard, nodeToSketchLayers } from '@brainly/html-sketchapp';
declare global {
  interface Window { page: any; }
}

function flatten(arr: any[]) {
  return [].concat(...arr);
}

// Node: we could also use nodeTreeToSketchPage here and avoid traversing DOM ourselves
export function __biotope_sketcher_run(mainNode = document.body) {
  fixPseudoElements();
  fixVideoPoster();
  const { offsetWidth, offsetHeight } = document.body;

  // create a page object in case there isn't one already
  if (!window.page) {
    window.page = new Page({
      width: offsetWidth,
      height: offsetWidth
    });

    window.page.setName(document.title);
  }

  const previous = [0,...JSON.parse(JSON.stringify(window.page)).layers].map(el => el.frame ? el.frame.width + 100 : 0);

  const artboard = new Artboard({
    x: previous.reduce((a,v) => a + v),
    y: 0,
    width: offsetWidth,
    height: offsetHeight
  })

  artboard.setName(`${offsetWidth}`);

  const queue = [mainNode];
  const arrayOfLayers = [];

  while (queue.length) {
    const node = queue.pop();

    if (!node) {
      return;
    }

    arrayOfLayers.push(nodeToSketchLayers(node));

    Array.from(node.children).forEach(child => queue.push(child as any));
  }

  flatten(arrayOfLayers).forEach(layer => artboard.addLayer(layer));
  window.page.addLayer(artboard);
  
  return window.page.toJSON();
}
