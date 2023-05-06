const schema = require('./schema.js');
const matroska_schema = require('matroska/lib/schema');

for (let p in matroska_schema.byEbmlID) {
    const v = matroska_schema.byEbmlID[p].default;
    if (v !== undefined) {
        matroska_schema.byEbmlID[p].default = v.toString();
    }
    matroska_schema.byEbmlID[p].level = parseInt(matroska_schema.byEbmlID[p].level);
}

for (let k in matroska_schema.byName) {
    const v1 = matroska_schema.byName[k];
    const v2 = schema.byName[k];
    if (v1 !== v2) {
        throw new Error(`missing element: ${k} 0x${v1.toString(16)}|0x${v2.toString(16)}`);
    }
}

for (let k in matroska_schema.byEbmlID) {
    const v = matroska_schema.byEbmlID[k];
    for (p in v) {
        if (p !== 'description') {
            const v1 = v[p];
            const v2 = schema.byEbmlID[k][p];
            if (v1 !== v2) {
                throw new Error(`mismatch: ${v.name}.${p} |${v1}|${v2}|`);
            }
        }
    }
}
