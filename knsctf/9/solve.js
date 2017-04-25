const fetch = require('isomorphic-fetch');
const FormData = require('form-data');

function f() {
  return fetch(
    "http://ctfq.sweetduet.info:10080/~q9/",
    {
      method: "GET",
      headers: createHeaders(),
    }
  ).then((res) => res.text());
}

function createHeaders() {
  return {
    "Authorization": 'Digest username="q9", realm="secret", nonce="bbKtsfbABAA=5dad3cce7a7dd2c3335c9b400a19d6ad02df299b", uri="/~q9/htdigest", algorithm=MD5, response="d9f18946e5587401c303b34e00a059eb", qop=auth, nc=00000010, cnonce="9691c249745d94fc"'
  };
}

f()
.catch((err) => {
  console.log(err);
})
.then((body) => {
  console.log(body);
});
