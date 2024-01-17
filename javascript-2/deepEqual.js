const obj1 = {
  a: 1
}

const obj2 = {
  a: {
    b: 1,
    d: 1,
    c: [1, 2 , {d : 3}]
  },
};

const obj3 = {
  a: {
    b: 1,
    c: [1, 2, { d: 4 }],
    d: 1,
  },
};

const deepEqual = (actual, expected, path = '') => {
  if (!actual || !expected || typeof actual !== typeof expected) {
    console.error('Error: type error');
    return false;
  }

  if (Object.keys(actual).length !== Object.keys(expected).length) {
    console.error(`Error: ${path}`);
    return false;
  }

  if (typeof actual !== 'object' && typeof expected !== 'object') {
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
