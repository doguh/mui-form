export default (array, callback) => {
  let value;
  array.find((e, i, a, t) => {
    return (value = callback(e, i, a, t));
  });
  return value;
};
