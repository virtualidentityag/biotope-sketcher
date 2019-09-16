# BIOTOPE-SKETCHER
[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/biotope-sketcher-cli.svg)](https://npmjs.org/package/biotope-sketcher-cli)
[![Downloads/week](https://img.shields.io/npm/dw/biotope-sketcher-cli.svg)](https://npmjs.org/package/biotope-sketcher-cli)
[![License](https://img.shields.io/npm/l/biotope-sketcher-cli.svg)](https://github.com/virtual-identity/biotope-sketcher-cli/blob/master/package.json)

Transform, Edit and Create astonishing Biotope Design Systems instantly in all viewports from HTML to Sketch.
Biotope-Sketcher works only with macOS if you have an issue please [file an issue](https://github.com/virtualidentityag/biotope-sketcher/issues).

## Instalation
You can install the biotope-sketcher on your machine by cloning this project

```bash
git clone https://github.com/virtualidentityag/biotope-sketcher.git
cd my-repository
npm install
```

This project is a custom version of the already stable HTML-Sketchapp which you can install by cloning on github:

```bash
git clone https://github.com/ctmm/html-sketchapp.git
cd my-repository
npm install
```
You can check out the official documentation on HTML-Sketchapp project [here](https://github.com/html-sketchapp/html-sketchapp/blob/master/README.md).

## Build
To use this project on Sketch, navigate to the HTML-sketchap folder and them:

```bash
npm run build
npm start
cd build
```
This last step will generate a new executable file to be placed inside the Plugins folder on Sketch.

## Usage
Open sketch; <br />
Inside the Plugins tab choose From Almost Sketch to Sketch and import the files

<img src='biotope-sketcher.gif' alt='Import html-Sketchapp'>

