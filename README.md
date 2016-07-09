# `download-in-browser`
[![Travis](https://img.shields.io/travis/ezekg/download-in-browser.svg?style=flat-square)](https://travis-ci.org/ezekg/download-in-browser)
[![NPM](https://img.shields.io/npm/v/download-in-browser.svg?style=flat-square)](https://www.npmjs.com/package/download-in-browser)

`download-in-browser` allows you to initiate a file download from your
browser's current window and then respond using a `Promise`.

## Installation
```bash
npm install download-in-browser
```

## Usage

### Download
Download a file by `url`. It will make an `XMLHttpRequest` `GET` request in order
to grab the response headers from the `url`. After receiving the headers, the
`download` function will abort the request and respond with a `Promise` that
will be resolved or rejected with the following properties from the
`XMLHttpRequest` object, depending on the response status,
```javascript
{
  status: xhr.status,
  statusText: xhr.statusText
}
```

Example,
```javascript
const download = require("download-in-browser")

download("https://github.com/ezekg/download-in-browser/blob/master/README.md")
  .then((data) => console.log(data.statusText)) // 2xx-3xx
  .catch((err) => console.log(err.statusText)) // 4xx-5xx
```

## License
MIT © [Ezekiel Gabrielse](https://github.com/ezekg)
