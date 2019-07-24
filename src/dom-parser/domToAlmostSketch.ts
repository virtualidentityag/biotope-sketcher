import { Page, nodeToSketchLayers } from '@brainly/html-sketchapp';
import { fixPseudoElements } from './fixPseudoElements';

function flatten(arr: any[]) {
  return [].concat(...arr);
}

// Node: we could also use nodeTreeToSketchPage here and avoid traversing DOM ourselves
export function __biotope_sketcher_run(mainNode = document.body) {
  const page = new Page({
    fixPseudoElements,
    width: document.body.offsetWidth,
    height: document.body.offsetHeight
  });

  page.setName(document.title);

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

  flatten(arrayOfLayers).forEach(layer => page.addLayer(layer));

  return page.toJSON();
}
