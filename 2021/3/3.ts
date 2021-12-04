// @format

const _bit = (n: number): string => {
  return n.toString(2).padStart(wordLength, '0');
};

const readFile = async (): Promise<[number, string[]]> => {
  const lines = (await Deno.readTextFile('./inputs/3')).trim().split(/\n/);
  const len = lines[0].length;
  return [len, lines];
};

const [wordLength, lines] = await readFile();

const frequency = (list: string[], pos: number) => {
  let i = 0;
  let m = '';
  for (const item of list) {
    const x = item.charAt(pos);
    if (i === 0) {
      m = x;
      i = 1;
    } else if (m === x) {
      i += 1;
    } else {
      i -= 1;
    }
  }
  return m;
};

const epsilonRate = (numbers: string[]) => {
  const epsilon = [];
  for (let p = 0; p < wordLength; p++) {
    epsilon.push(frequency(numbers, p));
  }
  return parseInt(epsilon.join(''), 2);
};

const gammaRate = (numbers: string[]) => {
  const mask = Math.pow(2, wordLength) - 1;
  const e = epsilonRate(numbers);
  return e ^ mask;
};

const powerConsumption = () => {
  return gammaRate(lines) * epsilonRate(lines);
};

const oxygenRating = () => {
  // the set of numbers reduces so we have to re-calculate the frequency every
  // single time. this is a pain and I should have used a trie or something
  // instead. otherwise we traverse twice which suckksss
  let list = [...lines];
  for (let p = 0; p < wordLength; p++) {
    const mask = frequency(list, p);
    list = list.filter(e => e.charAt(p) === mask);
    if (list.length === 2) {
      const n = list.filter(e => e.charAt(p + 1) === '1')[0];
      return parseInt(n, 2);
    }
  }
  return 0;
};

const scrubberRating = () => {
  let list = [...lines];
  for (let p = 0; p < wordLength; p++) {
    const mask = frequency(list, p);
    list = list.filter(e => e.charAt(p) !== mask);
    if (list.length === 2) {
      const n = list.filter(e => e.charAt(p + 1) === '0')[0];
      return parseInt(n, 2);
    }
  }
  return 0;
};

const lifeSupport = () => {
  return scrubberRating() * oxygenRating();
};

console.log(epsilonRate(lines));
console.log(gammaRate(lines));
console.log(oxygenRating());
console.log(scrubberRating());
console.log(lifeSupport());
