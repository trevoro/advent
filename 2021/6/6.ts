// @format
//
const numTicks = 256;

const input = Deno.readTextFileSync('./input/6')
  .split(',')
  .map(e => parseInt(e, 10)) as number[];

const school = (input: number[]): number[] => {
  return input.reduce((p: number[], c) => {
    p[c]++;
    return p;
  }, new Array(9).fill(0));
};

const tick = (fish: number[]) => {
  const x = fish.shift() as number;
  fish[8] = x;
  fish[6] += x;
};

const _main = () => {
  const fish = school(input);
  for (let i = 0; i < numTicks; i++) {
    tick(fish);
  }
  console.log(fish.reduce((p, c) => p + c));
};

_main();
