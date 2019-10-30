# phantomjs-web-service

### Usage

```shell
 brew install phantomjs
```

```shell
 phantomjs ./src/phantom.js
```

default port 8081, change port

```shell
 phantomjs ./src/phantom.js 8080
```

and in your project request http://localhost:8081

you can copy 'request-promise.js' to your project,

then 

```js
	request(url)
		.then($ => {
			console.log($);
		})
		.catch(err => {
			throw err;
		})
```

#### Use Docker
docker-compose up -d