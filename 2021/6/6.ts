// @format

const input = Deno.readTextFileSync('./input/6')
  .split(',')
  .map(e => parseInt(e, 10)) as number[];

const fish = input.reduce((p: number[], c) => {
  p[c]++;
  return p;
}, new Array(9).fill(0));

const _main = () => {
  for (let i = 0; i < 256; i++) {
    tick();
  }
  console.log(fish.reduce((p, c) => p + c));
};

const tick = () => {
  const x = fish.shift() as number;
  fish[8] = x;
  fish[6] += x;
};

_main();
