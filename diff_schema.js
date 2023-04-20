const schema = require('./schema.js');
const matroska_schema = require('matroska/lib/schema');

matroska_schema.byEbmlID[matroska_schema.byName.ChapLanguageIETF].name = 'ChapLanguageBCP47';
matroska_schema.byEbmlID[matroska_schema.byName.ChapLanguageIETF].cppname = 'ChapLanguageIETF';
matroska_schema.byName.ChapLanguageBCP47 = matroska_schema.byName.ChapLanguageIETF;
delete matroska_schema.byName.ChapLanguageIETF;

matroska_schema.byEbmlID[matroska_schema.byName.TagLanguageIETF].name = 'TagLanguageBCP47';
matroska_schema.byEbmlID[matroska_schema.byName.TagLanguageIETF].cppname = 'TagLanguageIETF';
matroska_schema.byName.TagLanguageBCP47 = matroska_schema.byName.TagLanguageIETF;
delete matroska_schema.byName.TagLanguageIETF;

matroska_schema.byEbmlID[matroska_schema.byName.LanguageIETF].name = 'LanguageBCP47';
matroska_schema.byEbmlID[matroska_schema.byName.LanguageIETF].cppname = 'LanguageIETF';
matroska_schema.byName.LanguageBCP47 = matroska_schema.byName.LanguageIETF;
delete matroska_schema.byName.LanguageIETF;

matroska_schema.byEbmlID[matroska_schema.byName.FileMimeType].name = 'FileMediaType';
matroska_schema.byName.FileMediaType = matroska_schema.byName.FileMimeType;
delete matroska_schema.byName.FileMimeType;

matroska_schema.byEbmlID[matroska_schema.byName.ChapterSegmentUID].name = 'ChapterSegmentUUID';
matroska_schema.byEbmlID[matroska_schema.byName.ChapterSegmentUID].cppname = 'ChapterSegmentUID';
matroska_schema.byName.ChapterSegmentUUID = matroska_schema.byName.ChapterSegmentUID;
delete matroska_schema.byName.ChapterSegmentUID;

matroska_schema.byEbmlID[matroska_schema.byName.SegmentUID].name = 'SegmentUUID';
matroska_schema.byEbmlID[matroska_schema.byName.SegmentUID].cppname = 'SegmentUID';
matroska_schema.byName.SegmentUUID = matroska_schema.byName.SegmentUID;
delete matroska_schema.byName.SegmentUID;

matroska_schema.byEbmlID[matroska_schema.byName.PrevUID].name = 'PrevUUID';
matroska_schema.byEbmlID[matroska_schema.byName.PrevUID].cppname = 'PrevUID';
matroska_schema.byName.PrevUUID = matroska_schema.byName.PrevUID;
delete matroska_schema.byName.PrevUID;

matroska_schema.byEbmlID[matroska_schema.byName.NextUID].name = 'NextUUID';
matroska_schema.byEbmlID[matroska_schema.byName.NextUID].cppname = 'NextUID';
matroska_schema.byName.NextUUID = matroska_schema.byName.NextUID;
delete matroska_schema.byName.NextUID;

matroska_schema.byEbmlID[matroska_schema.byName.OldStereoMode].maxver = 2;
matroska_schema.byEbmlID[matroska_schema.byName.PrimaryRChromaticityX].range = '0x0p+0-0x1p+0';
matroska_schema.byEbmlID[matroska_schema.byName.PrimaryRChromaticityY].range = '0x0p+0-0x1p+0';
matroska_schema.byEbmlID[matroska_schema.byName.PrimaryGChromaticityX].range = '0x0p+0-0x1p+0';
matroska_schema.byEbmlID[matroska_schema.byName.PrimaryGChromaticityY].range = '0x0p+0-0x1p+0';
matroska_schema.byEbmlID[matroska_schema.byName.PrimaryBChromaticityX].range = '0x0p+0-0x1p+0';
matroska_schema.byEbmlID[matroska_schema.byName.PrimaryBChromaticityY].range = '0x0p+0-0x1p+0';
matroska_schema.byEbmlID[matroska_schema.byName.WhitePointChromaticityX].range = '0x0p+0-0x1p+0';
matroska_schema.byEbmlID[matroska_schema.byName.WhitePointChromaticityY].range = '0x0p+0-0x1p+0';
delete matroska_schema.byEbmlID[matroska_schema.byName.ChapterSegmentUUID].range;
delete matroska_schema.byEbmlID[matroska_schema.byName.SegmentUUID].range;

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
