export const flatten = (arr: any[]) => [].concat(...arr);

export const bemClassToText = (bemClass: string) => bemClass.replace('sg-', '').replace('-', ' ');

export const createSymbolName = (classList: DOMTokenList, viewportWidth: number) => (
  `${Array.from(classList).reduce((a, v) => `${a}/${v}`).replace(' ', '')}/@${viewportWidth}`
);

export const buildLayerNameFromBEM = (classes: DOMTokenList) => {
  const mainClass = classes[0];

  if (mainClass) {
    // if node is an element (bEm)
    if (mainClass.indexOf('__') > -1) {
      return mainClass.replace(/^[a-z-]+__/, '');
    } else { 
      // if node is a block (Bem)
      return bemClassToText(mainClass);
    }
  }

  return 'text';
}
