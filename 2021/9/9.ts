// @format

// we'll take advantage of the fact that the charcode for these digits also
// matches their value comparisons of their numeric representations.
const input = Deno.readTextFileSync('./input/9')
  .toString()
  .trim()
  .split(/\n/)
  .map(l => l.split('').map(e => parseInt(e, 10)));

const list = input.flat();
const len = input[0].length;
const max = list.length;

const adj = (idx: number): number[] => {
  // left, right, bottom, top
  const pos = [
    idx % len === 0 ? -1 : idx - 1,
    (idx + 1) % len === 0 ? -1 : idx + 1,
    idx + len < max ? idx + len : -1,
    idx - len < 0 ? -1 : idx - len,
  ];
  return pos.filter(e => e !== -1);
};

// all we need to check is whether or not the number we're currently looking at
// is the lowest amongst all adjacent numbers
const low = (p: number): number | null => {
  const idx = adj(p);
  let ele = p;
  let min = list[p];
  while (idx.length) {
    const i = idx.shift() as number;
    const v = list[i];
    if (v <= min) {
      min = v;
      ele = i;
    }
  }
  return ele === p ? p : null;
};

// this is where you might think for a second something stupid like "oh
// indexing by a truly value is good!"
const lowest = list.map((_, i) => low(i)).filter(e => e !== null) as number[];
const score = list
  .filter((_, i) => lowest.indexOf(i) > -1)
  .reduce((p, c) => p + c + 1, 0);

console.log(lowest);
console.log(score);

const basin = (p: number) => {
  const seen: Set<number> = new Set([p]);
  let idx = adj(p);
  while (idx.length) {
    const i = idx.shift() as number;
    if (seen.has(i)) {
      continue;
    }
    if (list[i] === 9) {
      continue;
    }
    seen.add(i);
    idx = idx.concat(adj(i));
  }
  return seen.size;
};

console.log('basins');
const basins = lowest
  .map(e => ({i: e, s: basin(e)}))
  .sort((a, b) => b.s - a.s)
  .slice(0, 3)
  .reduce((p, c) => p * c.s, 1);
console.log(basins);
