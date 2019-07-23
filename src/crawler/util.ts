export {};
const asyncForEach = async (array: string[], callback: Function) => {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
};

module.exports = {
  asyncForEach,
};
