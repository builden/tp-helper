var spawn = require('child_process').spawn;
var log = require('debug')('tp');
var iconv = require('iconv-lite');
var path = require('path');
require('colors');

exports.create = function create(srcDir, destDir, opts, cb) {
  if (typeof (opts) === 'function') {
    cb = opts;
    opts = {};
  }

  var base = path.basename(srcDir);
  var plistFile = path.join(destDir, base + '.plist');
  var imgFile = path.join(destDir, base + (opts.ext || '.png'));

  var cmd = 'TexturePacker';
  var args = [
    '--data',
    plistFile,
    '--sheet',
    imgFile,
    '--max-size',
    opts.maxSize || 1024,
    '--size-constraints',
    'AnySize',
    srcDir
  ];

  if (opts.scale) {
    args.push('--scale');
    args.push(opts.scale);
  }

  if (opts.noTrim) {
    args.push('--trim-mode');
    args.push('None');
  }

  var ls = spawn(cmd, args);
  ls.stdout.on('data', function (data) {
    log(iconv.decode(data, 'gbk').green);
  });

  ls.stderr.on('data', function (data) {
    log(iconv.decode(data, 'gbk').red);
  });

  ls.on('exit', function (code) {
    var err = (0 !== code) ? (srcDir + '; code:' + code): null;
    cb(err, code);
  });
};

exports.reverse = function reverse(srcPlist, cb) {
  cb();
};