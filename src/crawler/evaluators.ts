
export {};
declare var __biotope_sketcher_run: Function;

const evaluateDesignSystem = ({ blacklistedLinks }: { blacklistedLinks: string[]}) => {
  let url: string | string[] = (new URL(window.location.href)).href.split('/');
  url.pop();
  url = url.join('/');

  const componentLinks = Array.from(window.document.body.querySelectorAll('a'))
    .map(element => element.getAttribute('href'))
    .filter((link: string | null) => !blacklistedLinks.some(item => RegExp(item).test(link as string)))
    .map(link => `${url}/${link}`);

  return JSON.stringify(componentLinks);
};

const evaluateComponent = () => JSON.stringify(__biotope_sketcher_run());

module.exports = {
  evaluateDesignSystem,
  evaluateComponent,
};
