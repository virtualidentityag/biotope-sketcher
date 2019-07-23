export {};
const {
  readdirSync, lstatSync, readFileSync, writeFileSync,
} = require('fs');

const isDirectory = (file: any) => lstatSync(file).isDirectory();

const getFiles = (path: string) => readdirSync(path)
  .map((file: string) => `${path}/${file}`)
  .filter((file: string)  => !isDirectory(file));

const getContent = (path: string) => readFileSync(path, { encoding: 'utf8' });

const write = (path: string, content: string) => writeFileSync(path, content, { encoding: 'utf8' }, console.error);

module.exports = {
  isDirectory,
  getFiles,
  getContent,
  write,
};
