// @format
//
//
// brute force today

const read = () => {
  return Deno.readTextFileSync('./input/7')
    .split(',')
    .map(e => parseInt(e, 10));
};

const fuel = (n: number) => (n * (n + 1)) / 2;

const min = (input: number[]) => {
  const max = Math.max(...input);
  const set = [...Array(max).keys()].map(i => {
    return input.map(e => fuel(Math.abs(e - i))).reduce((p, c) => p + c);
  });
  return Math.min(...set);
};

const _main = () => {
  const input = read();
  console.log(min(input));
};

_main();
