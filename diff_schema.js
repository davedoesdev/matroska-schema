const schema = require('./schema.js');
const matroska_schema = require('matroska/lib/schema');

matroska_schema.byEbmlID[matroska_schema.byName.Slices].maxver = 0;
matroska_schema.byEbmlID[matroska_schema.byName.CRC_32].description += '.';
matroska_schema.byEbmlID[matroska_schema.byName.EBMLMaxIDLength].range = '>=' + matroska_schema.byEbmlID[matroska_schema.byName.EBMLMaxIDLength].range;
matroska_schema.byEbmlID[matroska_schema.byName.EBMLMaxSizeLength].range = 'not 0';
matroska_schema.byEbmlID[matroska_schema.byName.SignedElement].level = 2;
matroska_schema.byEbmlID[matroska_schema.byName.SignatureAlgo].level = 2;
matroska_schema.byEbmlID[matroska_schema.byName.SignatureHash].level = 2;
matroska_schema.byEbmlID[matroska_schema.byName.SignaturePublicKey].level = 2;
matroska_schema.byEbmlID[matroska_schema.byName.Signature].level = 2;
matroska_schema.byEbmlID[matroska_schema.byName.SignatureSlot].level = 1;
matroska_schema.byEbmlID[matroska_schema.byName.EBML].multiple = false;

for (let p in matroska_schema.byEbmlID) {
    const v = matroska_schema.byEbmlID[p].default;
    if (v !== undefined) {
        matroska_schema.byEbmlID[p].default = v.toString();
    }
    matroska_schema.byEbmlID[p].level = parseInt(matroska_schema.byEbmlID[p].level);
}

for (let k in matroska_schema.byName) {
    if (matroska_schema.byName[k] !== schema.byName[k]) {
        throw new Error(`missing element: ${k}`);
    }
}

for (let k in matroska_schema.byEbmlID) {
    const v = matroska_schema.byEbmlID[k];
    for (p in v) {
        const v1 = v[p];
        const v2 = schema.byEbmlID[k][p];
        if (v1 !== v2) {
            throw new Error(`mismatch: ${v.name}.${p} ${v1}|${v2}`);
        }
    }
}

