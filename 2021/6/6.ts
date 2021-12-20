// @format
//
const numTicks = 256;

const zero = (size: number): number[] => new Array(size).fill(0);

const input = Deno.readTextFileSync('./input/6')
  .split(',')
  .map(e => parseInt(e, 10)) as number[];

const school = (input: number[]) =>
  input.reduce((p, c) => {
    p[c]++;
    return p;
  }, zero(9));

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
