// @format
const parseInput = async () => {
  const lines = await Deno.readTextFile('./inputs/2');
  return lines
    .trim()
    .split(/\n/)
    .map(e => {
      const [cmd, amt] = e.split(/\s+/);
      return [cmd, parseInt(amt, 10)];
    });
};

const registers = {
  x: 0,
  y: 0,
  a: 0, // aim
};

type Operators = {
  [key: string]: any;
};

const operators: Operators = {
  up: (amt: number) => (registers.a -= amt),
  down: (amt: number) => (registers.a += amt),
  forward: (amt: number) => {
    registers.x += registers.a * amt;
    registers.y += amt;
  },
};

const cmd = (op: string, arg: number) => {
  operators[op](arg);
};

const run = async () => {
  const commands = await parseInput();
  for (const [op, arg] of commands) {
    cmd(op as string, arg as number);
  }
  return registers.x * registers.y;
};

console.log(await run());
