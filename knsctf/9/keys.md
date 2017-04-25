## First request
- Digest username="q9"
- realm="secret"
- nonce="bbKtsfbABAA=5dad3cce7a7dd2c3335c9b400a19d6ad02df299b"
- uri="/~q9/"
- algorithm=MD5
- response="c3077454ecf09ecef1d6c1201038cfaf"
- qop=auth
- nc=00000001
- cnonce="9691c249745d94fc"

## First response
- Authentication-Info: rspauth="42b425bdd3ad27086858915611646f7c"
- cnonce="9691c249745d94fc"
- nc=00000001
- qop=auth

## First calcs
A1 = q9:secret:???
A2 = GET:/~q9/
response
= MD5( MD5(A1):nonce:nc:cnonce:qop:MD5(A2) )
= MD5( MD5(A1):bbKtsfbABAA=5dad3cce7a7dd2c3335c9b400a19d6ad02df299b:00000001:9691c249745d94fc:auth:31e101310bcd7fae974b921eb148099c )
= c3077454ecf09ecef1d6c1201038cfaf

## Second request
- Digest username="q9"
- realm="secret"
- nonce="bbKtsfbABAA=5dad3cce7a7dd2c3335c9b400a19d6ad02df299b"
- uri="/~q9/htdigest"
- algorithm=MD5
- response="d9f18946e5587401c303b34e00a059eb"
- qop=auth
- nc=00000002
- cnonce="6945eb2a7ba8cf7f"

## Second response
- Authentication-Info: rspauth="022023eac9b9e023d50cca5eef69c287"
- cnonce="6945eb2a7ba8cf7f"
- nc=00000002
- qop=auth

- q9:secret:c627e19450db746b739f41b64097d449
