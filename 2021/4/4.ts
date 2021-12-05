// @format
//

// if we stick with strings the insert order will be preserved
// as the order
type Board = Map<string, boolean>;

const readFile = async (): Promise<[string[], Board[]]> => {
  const raw = (await Deno.readTextFile('./inputs/4')).trim().split(/\n\n/);
  const input = raw?.shift()?.split(',') as string[];
  const boards = raw.map((e, i) => {
    return new Map(
      e
        .trim()
        .split(/\s+/)
        .map(e => [e, false]),
    ) as Board;
  }) as Board[];
  if (boards === null) {
    throw new Error('uhoh');
  }
  return [input, boards];
};

const [input, boards] = await readFile();

const winner = (b: Board): boolean => {
  const entries = Array.from(b);
  const rows = () => {
    for (let i = 0; i < 5; i++) {
      const c = [0, 1, 2, 3, 4].map(e => entries[e + 5 * i][1]).every(e => e);
      if (c) {
        return true;
      }
    }
    return false;
  };
  const cols = () => {
    for (let i = 0; i < 5; i++) {
      const c = [0, 5, 10, 15, 20].map(e => entries[e + i][1]).every(e => e);
      if (c) {
        return true;
      }
    }
    return false;
  };
  return rows() || cols();
};

const score = (b: Board): number => {
  return Array.from(b)
    .filter(e => !e[1])
    .map(e => parseInt(e[0], 10))
    .reduce((p, c) => p + c);
};

const winners: number[] = [];
const draw = (v: string) => {
  let win;
  for (let i = 0; i < boards.length; i++) {
    if (winners.includes(i)) {
      continue;
    }
    const board = boards[i];
    if (!board.has(v)) {
      continue;
    }
    // we have to keep going
    board.set(v, true);
    if (winner(board)) {
      winners.push(i);
      win = [i, board];
    }
  }
  if (win) {
    return win;
  }
};

const pretty = (b: Board) => {
  const entries = Array.from(b);
  const rows = [0, 1, 2, 3, 4].map(e =>
    entries
      .slice(e * 5, e * 5 + 5)
      .map(e => {
        const c = e[0].padStart(2, ' ');
        if (e[1]) {
          return '\x1b[33m' + c + '\x1b[0m';
        }
        return c;
      })
      .join(' '),
  );
  return rows.join('\n');
};

const _main = () => {
  for (const n of input) {
    const res = draw(n);
    if (res) {
      const b = res[1] as Board;
      console.log('winner is board:', res[0]);
      console.log(pretty(b));
      console.log(score(b) * parseInt(n, 10));
      // break;
    }
  }
};

_main();
