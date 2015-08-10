var expect = require('chai').expect;
var tp = require('../lib/tp.js');
var fs = require('fs');
var del = require('del');

describe('tp-helper', function () {
  before(function () {
    del.sync('test/tmp-result-res');
  });

  it('tp error', function (done) {
    tp.create('test/res/tpss-not', 'test/tmp-result-res', function (err, code) {
      expect(err).to.not.be.ok;
      expect(code).to.equal(10);
      expect(fs.existsSync('test/tmp-result-res/tpss.plist')).to.not.be.ok;
      done();
    });
  });

  it('tp', function (done) {
    tp.create('test/res/tpss', 'test/tmp-result-res', {
      maxSize: 1024,
      scale: 0.5
    }, function (err, code) {
      expect(err).to.not.be.ok;
      expect(code).to.equal(0);
      expect(fs.existsSync('test/tmp-result-res/tpss.plist')).to.be.ok;
      done();
    });
  });
});