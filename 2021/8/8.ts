// @format
//
//
const notes = Deno.readTextFileSync('./input/8')
  .toString()
  .trim()
  .split(/\n/)
  .map(e => {
    return e.split(' | ').map(t => t.split(/\s/));
  });

// make a map from the digits to the locations
/*

  aaaa 
 b    c
 b    c
  dddd 
 e    f
 e    f
  gggg 


 2 wires => value 1 => [C,F]
 3 wires => value 7 => [A,C,F]
 4 wires => value 4 => [B,C,D,F]
 5 Wires => value 2 => [A,C,D,E,G]
 5 Wires => value 3 => [A,B,D,F,G]
 5 Wires => value 5 => [A,C,D,F,G]
 7 wires => value 8 => [A,B,C,D,E,F,G]

*/

let cnt = 0;
let sum = 0;

const intersection = (s1: string, s2: string): string[] => {
  const a1 = s1.split('');
  const a2 = s2.split('');
  return a1.filter(e => a2.includes(e));
};

for (const i of notes) {
  const res = [];
  const d = i[0]
    .filter(e => [2, 4].indexOf(e.length) > -1)
    .sort((a, b) => a.length - b.length);
  for (const j of i[1]) {
    switch (j.length) {
      case 2:
        res.push(1);
        cnt++;
        break;
      case 3:
        res.push(7);
        cnt++;
        break;
      case 4:
        res.push(4);
        cnt++;
        break;
      case 7:
        res.push(8);
        cnt++;
        break;
      case 5:
        if (intersection(j, d[0]).length === 2) {
          res.push(3);
        } else if (intersection(j, d[1]).length === 2) {
          res.push(2);
        } else {
          res.push(5);
        }
        break;
      case 6:
        if (intersection(j, d[0]).length === 1) {
          res.push(6);
        } else if (intersection(j, d[1]).length === 4) {
          res.push(9);
        } else {
          res.push(0);
        }
        break;
    }
  }
  sum += parseInt(res.join(''), 10);
}
console.log(cnt);
console.log(sum);
