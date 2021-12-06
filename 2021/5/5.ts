// @format
//

// I know this is really bad. The reason I created the entire bitmap space was
// because I wanted to see if it would turn into a picture. It does not.
//
// IRL you would just use a sparse set of points with Set(x) => Set(y) instead
//

interface Table {
  size: {
    x: number;
    y: number;
  };
  data: number[];
}

const readFile = async (): Promise<number[][]> => {
  const data = await Deno.readTextFile('./inputs/5');
  const parse = (s: string) => parseInt(s, 10);
  return data
    .trim()
    .split(/\n/)
    .map(e => e.match(/\d+/g)?.map(parse)) as number[][];
};

const onlyStraight = (input: number[][]) => {
  return input.filter(e => e[0] === e[2] || e[1] === e[3]);
};

// could happen during initial read if we wanted to be pedantic.
const dimensions = (list: number[][]) => {
  let maxX = 0;
  let maxY = 0;
  for (let l of list) {
    const my = Math.max(l[0], l[2]);
    const mx = Math.max(l[1], l[3]);
    if (my > maxY) {
      maxY = my;
    }
    if (mx > maxX) {
      maxX = mx;
    }
  }
  return [++maxX, ++maxY];
};

const createTable = (x: number, y: number) => {
  return {
    size: {x, y},
    data: new Array(x * y).fill(0),
  } as Table;
};

// lines are either vertical or horizontal only but can go up or down or left
// or right.
const draw = (table: Table, [x0, y0, x1, y1]: number[]) => {
  var dx = Math.abs(x1 - x0);
  var dy = Math.abs(y1 - y0);
  var sx = x0 < x1 ? 1 : -1;
  var sy = y0 < y1 ? 1 : -1;
  var err = dx - dy;

  while (true) {
    plot(table, x0, y0);

    if (x0 === x1 && y0 === y1) break;
    const e2 = 2 * err;
    if (e2 > -dy) {
      err -= dy;
      x0 += sx;
    }
    if (e2 < dx) {
      err += dx;
      y0 += sy;
    }
  }
};

// not sure where the variables are getting flipped...
const plot = (table: Table, y: number, x: number) => {
  const pos = y + table.size.x * x;
  table.data[pos]++;
};

const overlaps = (table: Table) => {
  return table.data.filter(e => e > 1).length;
};

const _main = async () => {
  const input = await readFile();
  // input = onlyStraight(input);
  const [x, y] = dimensions(input);
  const table = createTable(x, y);
  for (const i of input) {
    draw(table, [...i]);
  }
  console.log(overlaps(table));
};

_main();
