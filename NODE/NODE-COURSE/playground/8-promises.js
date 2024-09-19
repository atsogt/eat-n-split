const add = (a, b) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(a + b);
    }, 2000);
  });
};

add(2, 3)
  .then((sum) => {
    console.log(sum);
    return add(sum, 5);
  })
  .then((sum2) => {
    console.log(sum2);
    return add(sum2, 5);
  })
  .then((sum3) => console.log(sum3))
  .catch((e) => console.log(e));
