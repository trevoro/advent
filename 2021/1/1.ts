// @format
const parseInput = async () => {
  const lines = await Deno.readTextFile('./inputs/1');
  return lines
    .trim()
    .split(/\n/)
    .map(e => parseInt(e, 10));
};

const numIncreases = (arr: number[]): number => {
  let count = 0;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] < arr[i + 1]) {
      count++;
    }
  }
  return count;
};

const rollingWindow = (arr: number[]): number[] => {
  const res = [];
  for (let i = 0; i < arr.length - 2; i++) {
    const sum = arr[i] + arr[i + 1] + arr[i + 2];
    res.push(sum);
  }
  return res;
};

const items = await parseInput();
console.log(numIncreases(rollingWindow(items)));
