const { readFile } = require('fs');
const { parseString } = require('xml2js');
const { EOL } = require('os');
const { inspect } = require('util');

const byEbmlID = {};
const byName = {};

function parse(fname, cb) {
    readFile(fname, (err, data) => {
        if (err) {
            return cb(err);
        }

        parseString(data, (err, spec) => {
            if (err) {
                return cb(erR);
            }

            for (el of spec.EBMLSchema.element) {
                const id = parseInt(el.$.id);
                const name = el.$.name;

                const docs = new Map((el.documentation || []).map(d => [d.$.purpose, d]));
                const exts = new Map((el.extension || []).map(e => [e.$.type, e]));

                const info = {
                    name,
                    level: el.$.path && el.$.path.replace(/\\[()]/g, '').split('\\').length - 2,
                    type: el.$.type && (el.$.type === 'utf-8' ? '8' : el.$.type.substring(0, 1)),
                    multiple: el.$.maxOccurs !== '1',
                    webm: exts.get('webmproject.org') ? exts.get('webmproject.org').$.webm === '1' : undefined,
                    description: docs.get('definition') ? docs.get('definition')._.replace(/\n */g, ' ') : undefined,
                    mandatory: el.$.minOccurs && el.$.minOccurs !== '0',
                    range: el.$.range,
                    cppname: exts.get('libmatroska') ? exts.get('libmatroska').$.cppname : undefined,
                    minver: el.$.minver ? parseInt(el.$.minver) : 1,
                    maxver: el.$.maxver && parseInt(el.$.maxver),
                    default: el.$.default,
                    divx: exts.get('divx.com') ? exts.get('divx.com').$.divx === '1' : undefined,
                    crc: name == 'CRC-32',
                    i: el.$.i
                }

                byEbmlID[id] = byEbmlID[id] || {};
                for (let p in info) {
                    if (info[p] !== undefined) {
                        byEbmlID[id][p] = info[p];
                    }
                }

                byName[name.replace(/-/g, '_')] = id;
            }

            cb();
        });
    });
}

parse('ebml_matroska.xml', err => {
    if (err) {
        throw err;
    }

    parse('ebml.xml', err => {
        if (err) {
            throw err;
        }

        parse('overrides.xml', err => {
            if (err) {
                throw err;
            }

            function writeln(s) {
                process.stdout.write(s);
                process.stdout.write(EOL);
            }

            function indent(s, n) {
                return s.split(EOL).join(EOL + ' '.repeat(n));
            }

            writeln('module.exports = {');

            writeln('  byEbmlID: {');
            for (let k in byEbmlID) {
                process.stdout.write(`    0x${parseInt(k).toString(16)}: `);
                process.stdout.write(indent(inspect(byEbmlID[k], {
                    depth: null,
                    maxArrayLength: null,
                    maxStringLength: null
                }), 4));
                writeln(',');
            }
            writeln('  },');

            writeln('  byName: {');
            for (let k in byName) {
                writeln(`    ${k}: 0x${byName[k].toString(16)},`);
            }
            writeln('  }');

            writeln('};');
        });
    });
});
