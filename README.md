![CI
status](https://github.com/davedoesdev/matroska-schema/workflows/ci/badge.svg)

Replacement for
[`schema.js`](https://github.com/oeuillot/node-matroska/blob/master/lib/schema.js)
from [node-matroska](https://github.com/oeuillot/node-matroska), which
is GPL-licenced.

This version is automatically generated from the Matroska
[EBML](https://github.com/ietf-wg-cellar/matroska-specification/blob/master/ebml_matroska.xml)
[specifications](https://github.com/ietf-wg-cellar/ebml-specification/blob/master/ebml.xml)
and is MIT-licensed.

This schema is in [schema.js](schema.js).

To generate it on your own machine, run [gen_schema.sh](gen_schema.sh).
You’ll need Node.js and wget. The script will complain if the result
differs from node-matroska’s schema.
