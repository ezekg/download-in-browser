"use strict"

const jsdom = require("jsdom-global")
const sinon = require("sinon")
const chai = require("chai")

describe("download", () => {
  let download
  let request
  let xhr

  beforeEach(() => {
    jsdom()

    sinon.spy(document, "createElement")
    sinon.spy(document.body, "appendChild")
    sinon.spy(document.body, "removeChild")

    xhr = sinon.useFakeXMLHttpRequest()
    global.XMLHttpRequest = xhr

    request = null
    xhr.onCreate = (xhr) => {
      request = xhr
    }

    download = require("../")
  })

  afterEach(() => {
    if (global.document) global.document.destroy()
    xhr.restore()
  })

  it("should test the download url", (done) => {
    download("/good-file.txt")
      .then((data) => {
        chai.expect(data.status).to.equal(200)
        done()
      })

    try {
      request.respond(200, null, null)
    } catch (e) {}
  })

  it("should report a failed download", (done) => {
    download("/bad-file.txt")
      .catch((err) => {
        chai.expect(err).to.not.equal(null)
        done()
      })

    try {
      request.respond(401, null, null)
    } catch (e) {}
  })

  it("should create an Anchor DOM node when url is OK", (done) => {
    download("/good-file.txt")
      .then(() => {
        sinon.assert.calledWith(document.createElement, "a")
        sinon.assert.calledOnce(document.body.appendChild)
        done()
      })

    try {
      request.respond(200, null, null)
    } catch (e) {}
  })

  it("should click the Anchor DOM node", (done) => {
    download("/good-file.txt")
      .then(() => {
        done() // TODO: Stub this
      })

    try {
      request.respond(200, null, null)
    } catch (e) {}
  })

  it("should remove the Anchor DOM node", (done) => {
    download("/good-file.txt")
      .then(() => {
        sinon.assert.calledOnce(document.body.removeChild)
        done()
      })

    try {
      request.respond(200, null, null)
    } catch (e) {}
  })

  it("should not create an Anchor DOM node when url isn't OK", (done) => {
    download("/good-file.txt")
      .catch(() => {
        sinon.assert.neverCalledWith(document.createElement, "a")
        done()
      })

    try {
      request.respond(401, null, null)
    } catch (e) {}
  })
})
