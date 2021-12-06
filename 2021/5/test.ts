const obj = {
  data: [1, 2, 3],
};

const mut = (o: any) => {
  o.data[0]++;
};

console.log(obj);
mut(obj);
console.log(obj);
