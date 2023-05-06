#!/usr/bin/bash
set -e
rm -rf tmp
mkdir -p tmp
cd tmp
echo '{}' > package.json
cp ../gen_schema.js ../diff_schema.js ../overrides.xml .
wget https://raw.githubusercontent.com/ietf-wg-cellar/matroska-specification/master/ebml_matroska.xml
wget https://raw.githubusercontent.com/ietf-wg-cellar/ebml-specification/master/ebml.xml
npm install xml2js oeuillot/node-matroska # matroska for verifying compatibility
node gen_schema.js > schema.js
node diff_schema.js
cp schema.js ..
