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
Download a file by URL, with an optional `fileName` param. It will make an `XMLHttpRequest`
`GET` request in order to grab the response headers from the URL.

After receiving the headers, the `download` function will abort the request (so
as to not begin streaming the download) and respond with a `Promise` that will
be resolved or rejected with the following properties from the `XMLHttpRequest`
object, depending on the response status,
```javascript
{
  status: xhr.status,
  statusText: xhr.statusText
}
```

At the same time the `Promise` is dispatched and if the `GET` request was successful,
an invisible link will be created and then followed, initiating the download.

Example,
```javascript
const download = require("download-in-browser")

download("https://github.com/ezekg/download-in-browser/blob/master/README.md", "readme.md")
  .then((data) => console.log(`${data.statusText}: Download has started...`))
  .catch((err) => console.log(`${err.statusText}: Download failed to start`))
```

## License
MIT © [Ezekiel Gabrielse](https://github.com/ezekg)
