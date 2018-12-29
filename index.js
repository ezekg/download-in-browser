"use strict"

/**
 * @param {Str} fileUrl
 * @param {Str} fileName
 *
 * @return {Promise}
 */
module.exports = (fileUrl, fileName) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()

    const initiateBrowserDownload = () => {
      const a = document.createElement("a")
      document.body.appendChild(a)

      a.setAttribute("download", fileName || true)
      a.setAttribute("style", "display: none;")
      a.setAttribute("href", fileUrl)
      a.click()

      document.body.removeChild(a)
    }

    const respond = () => ({
      status: xhr.status,
      statusText: xhr.statusText
    })

    xhr.onerror = () => reject(respond())
    xhr.onreadystatechange = () => {
      if (xhr.readyState !== 2) { // XMLHttpRequest.HEADERS_RECEIVED
        return
      }

      if (xhr.status >= 200 && xhr.status < 400) {
        initiateBrowserDownload()
        resolve(respond())
      } else {
        reject(respond())
      }

      xhr.abort() // We just need the headers
    }

    xhr.open("GET", fileUrl)
    xhr.send()
  })
}
