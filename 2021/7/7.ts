// @format
//
//
// brute force today

const read = () => {
  return Deno.readTextFileSync('./input/7')
    .split(',')
    .map(e => parseInt(e, 10));
};

const fuel = (n: number) => {
  let rval = 1;
  for (let i = 2; i <= n; i++) rval = rval + i;
  return rval;
};

const min = (input: number[]) => {
  input.sort((a, b) => a - b);
  const max = input.at(-1) as number;
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
