import { Page, nodeToSketchLayers } from '@brainly/html-sketchapp';

function flatten(arr) {
  return [].concat(...arr);
}

// Node: we could also use nodeTreeToSketchPage here and avoid traversing DOM ourselves
export function __biotope_sketcher_run(mainNode = document.body) {
  const page = new Page({
    width: document.body.offsetWidth,
    height: document.body.offsetHeight
  });

  page.setName(document.title);

  const queue = [mainNode];
  const arrayOfLayers = [];

  while (queue.length) {
    const node = queue.pop();

    arrayOfLayers.push(nodeToSketchLayers(node));

    Array.from(node.children).forEach(child => queue.push(child));
  }

  flatten(arrayOfLayers).forEach(layer => page.addLayer(layer));

  return page.toJSON();
}
