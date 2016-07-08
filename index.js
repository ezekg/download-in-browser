"use strict"

const Promise = require("bluebird")

/**
 * @param {Str} url
 *
 * @return {Promise}
 */
module.exports = (url) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()

    const initiateBrowserDownload = (url) => {
      const a = document.createElement("a")
      document.body.appendChild(a)

      a.setAttribute("style", "display: none;")
      a.setAttribute("href", url)
      a.click()

      document.body.removeChild(a)
    }

    xhr.onreadystatechange = () => {
      if (xhr.readyState !== 2) { // XMLHttpRequest.HEADERS_RECEIVED
        return
      }

      if (xhr.status >= 200 && xhr.status < 400) {
        initiateBrowserDownload(url)
        resolve({
          status: xhr.status,
          statusText: xhr.statusText,
          response: xhr.response,
          responseText: xhr.responseText
        })
      } else {
        reject({
          status: xhr.status,
          statusText: xhr.statusText,
          response: xhr.response,
          responseText: xhr.responseText
        })
      }

      xhr.abort() // We just need the headers
    }

    xhr.open("GET", url)
    xhr.send()
  })
}
