process.env.NODE_ENV = 'production'

const fs = require('fs-extra')
const path = require('path')
const webpack = require('webpack')

const webpackMainConfig = require('./webpack.main.config')
const webpackBgConfig = require('./webpack.bg.config')

const manifest = require('../package')

var NwBuilder = require('nw-builder');

function cleanDist () {
  return fs.emptydir(path.resolve(__dirname, '../', 'dist'))
}

function cleanBuild () {
  return fs.emptydir(path.resolve(__dirname, '../', manifest.build.output))
}

function pack (config) {
  return new Promise((resolve, reject) => {
    webpack(config, (err, stats) => {
      if (err) reject(err)
      else if (stats.hasErrors()) reject(stats.toString({ chunks: false, colors: true }))
      else resolve()
    })
  })
}

function packMain () {
  return pack(webpackMainConfig)
}

function packBg () {
  return pack(webpackBgConfig)
}

function build () {
  var nw = new NwBuilder({
    files: './dist/**/**', // use the glob format
    platforms: manifest.build.nwPlatforms,
    version: manifest.build.nwVersion,
    appName: manifest.name,
    appVersion: manifest.version,
    buildDir: manifest.build.output
  });

  nw.on('log',  console.log);

  nw.build().then(function () {
    console.log('all done!');
  }).catch(function (error) {
      console.error(error);
  });
}

const npmWhich = require('npm-which')(__dirname)
const buildPath = npmWhich.sync('build')
const { spawnSync } = require('child_process')
function build2 () {
  spawnSync(buildPath, [`--tasks`, `win-x64,mac-x64,linux-x64`, `--mirror`, `https://dl.nwjs.io/`, '--concurrent', '.'], { stdio: 'inherit' })
}

async function main () {
  await Promise.all([cleanDist(), cleanBuild()])
  await Promise.all([packMain(), packBg()])
  build()
}

main()
