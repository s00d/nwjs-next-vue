# nwjs-next-vue

> A NW.js & Vue.js quick start boilerplate.

## What new?
Update to lasst version 

> webpack 4
> babel 7
> nw-builder - build for win, mac, linux

### Getting Started

#### Installation

Install `vue-cli` and scaffold boilerplate:

``` bash
npm install -g vue-cli
vue init s00d/nwjs-next-vue <project name>
```

Install dependencies:

``` bash
cd <project name>
npm install
```

#### Development

Specify target NW.js version in `package.json`:

You can find available options [here](https://github.com/evshiron/nwjs-builder-phoenix).

```
{
  [...]
  "build": {
    [...]
    "nwVersion": "0.34.3",
    [...]
  },
  [...]
}
```

Run NW.js application for development:

``` bash
npm run dev
```

#### Production

Specify target platforms and architectures in `package.json`:

You can find available options [here](https://www.npmjs.com/package/nw-builder).

```
{
  [...]
  "build": {
    [...]
    "nwPlatforms": [
      "win32",
      "win64",
      "osx64",
      "linux32",
      "linux64"
    ]
    [...]
  },
  [...]
}
```

Build NW.js application for production:

``` bash
npm run build
```
