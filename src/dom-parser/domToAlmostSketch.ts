import { fixPseudoElements, fixVideoPoster } from './fixPseudoElements';
import { removeInvisibleNodes, removeNodes } from './removeInvisibleNodes';
import { flatten, buildLayerNameFromBEM, createSymbolName } from './utils';
import { Page, Artboard, SymbolMaster, nodeToSketchLayers } from '@brainly/html-sketchapp';
declare global {
  interface Window { page: any; }
}

// Node: we could also use nodeTreeToSketchPage here and avoid traversing DOM ourselves
export function __biotope_sketcher_run(mainNode = document.body) {
  fixPseudoElements();
  fixVideoPoster();
  // removeInvisibleNodes(['headerCw__logoRowFlexFill']);
  removeNodes(['.overlayContainer', '.cookiecontainer', '.disclaimercontainer']);
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
  const arrayOfSymbols = [];

  while (queue.length) {
    const node = queue.pop();
    let symbol: any;

    if (!node) {
      return;
    }

    // create symbols
    if (node.classList.contains(window.location.href.split('.').reverse()[1])) {
      // check if symbol already exists and grab the the symbol master if it does
      const name = createSymbolName(node.classList, offsetWidth);
      const existingSymbolMaster = arrayOfSymbols.filter(symbolMaster => symbolMaster._symbolID === name).pop();
      const { left, top, width, height } = node.getBoundingClientRect();

      symbol = existingSymbolMaster 
        ? existingSymbolMaster.getSymbolInstance({ x: left, y: top, width, height })
        : new SymbolMaster({ x: left, y: top, width, height });
      
      if (!existingSymbolMaster) {
        const parentAndChildren = [node, ...node.querySelectorAll('*')];
        Array.from(parentAndChildren)
          .map(n => {
            const layers = nodeToSketchLayers(n);
            layers.forEach((layer: any) => layer.setName(buildLayerNameFromBEM(n.classList)));

            return layers;
          })
          .reduce((prev, current) => prev.concat(current), [])
          .filter((layer: any) => layer !== null)
          .forEach((layer: any) => symbol.addLayer(layer));

        symbol.setId(name);
        arrayOfSymbols.push(symbol);
      }
      symbol.setName(name);
      if (symbol.getSymbolInstance) {
        arrayOfLayers.push(symbol.getSymbolInstance({ x: left, y: top, width, height }));
      }
    }
    else { 
      arrayOfLayers.push(nodeToSketchLayers(node));
    }

    Array.from(node.children).forEach(child => queue.push(child as any));
  }

  flatten(arrayOfLayers).forEach(layer => artboard.addLayer(layer));
  arrayOfSymbols.forEach(symbol => {
    window.page.addLayer(symbol);
  });
  window.page.addLayer(artboard);
  
  return window.page.toJSON();
}
