// @format
//
//
// brute force today

const read = () => {
  return Deno.readTextFileSync('./input/7')
    .split(',')
    .map(e => parseInt(e, 10));
};

const fuel = (p: number, c: number) => {
  const n = Math.abs(p - c);
  return (n * (n + 1)) / 2;
};

const sum = (p: number, c: number) => p + c;

const range = (n: number) => [...Array(n).keys()];

const min = (input: number[]) => {
  const max = Math.max(...input);
  const set = range(max).map(i => input.map(e => fuel(e, i)).reduce(sum));
  return Math.min(...set);
};

const _main = () => {
  const input = read();
  console.log(min(input));
};

_main();
