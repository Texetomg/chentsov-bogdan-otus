import _ from 'lodash'
const obj1 = {
  a: 0
}

const obj2 = {
  a: {
    b: null,
    d: 0,
    c: [1, 2 , {d : 2}]
  },
};

const obj3 = {
  a: {
    b: null,
    c: [1, 2, { d: 1 }],
    d: 0,
  },
};

const deepEqual = (actual, expected, path = '') => {
  if (
    (typeof actual !== 'object' || actual === null) 
    && (typeof expected !== 'object' || expected === null)
  ) {
   
    if (actual !== expected) {
      console.error(`Error: ${path}`);
      return false;
    } else {
      return true;
    }
  }

  for (let prop in actual) {
    if (!expected.hasOwnProperty(prop)) {
      console.error(`Error: ${path}`);
      return false
    }
    if (!deepEqual(actual[prop], expected[prop], `${path}${path !== '' ? '.' : ''}${prop}`)) {
      return false;
    }
  }

  if (path === '') {
    console.log("OK")
  }

  return true;
}

deepEqual(obj2, obj3)