export {};
const getRunner = (content: string) => `
  ;const { __biotope_sketcher_run } = ${content};
`;

const contentToScript = (content: string, suffix: string = '') => ({
  content: getRunner(content),
  runner: '__biotope_sketcher_run',
});

module.exports = {
  contentToScript,
};
