const mySum = (...args) => {
  //acc: accumulator => 配列.reduce(function(累積値, 要素) { })
  return args.reduce((acc, val) => acc + val, 0);
}

export default mySum;