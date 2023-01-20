export const objectToArray = (object) => {
  const array = [];
  for (const key in object) {
    array.push(object[key]);
  }  
  return array;
}

export const arrayToObject = (array) => {
  const object = {};
  array.forEach(e => {
    object[e.id] = e;
  });  
  return object;
}