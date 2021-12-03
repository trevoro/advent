// @format

const _bit = (n: number): string => {
  return n.toString(2).padStart(wordLength, '0');
};

const parseInput = async (): Promise<[number, number[]]> => {
  const lines = (await Deno.readTextFile('./inputs/3')).trim().split(/\n/);
  const len = lines[0].length;
  const nums = lines.map(e => parseInt(e, 2));
  return [len, nums];
};

const [wordLength, lines] = await parseInput();

const epsilonRate = () => {
  let epsilon = 0;
  for (let p = 0; p < wordLength; p++) {
    let i = 0;
    let m = 0;
    for (const num of lines) {
      const x = (num >> p) % 2;
      if (i === 0) {
        m = x;
        i = 1;
      } else if (m === x) {
        i += 1;
      } else {
        i -= 1;
      }
    }
    epsilon |= m << p;
  }
  return epsilon;
};

const gammaRate = () => {
  const mask = Math.pow(2, wordLength) - 1;
  const e = epsilonRate();
  return e ^ mask;
};

console.log(gammaRate());
console.log(epsilonRate());
