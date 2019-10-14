const psd2json = require("../index.js");
const fs = require("fs");
const rimraf = require("rimraf");
const commander = require("commander");

commander
    .version("0.1.0")
    .option("-i, --inputDir <inputDir>", "input directory")
    .option("-o, --outputDir <outputDir>", "output directory")
    .option("-f, --fileName <fileName>", "fileName")
    .parse(process.argv);

const inputDir = commander.inputDir;
const outputDir = commander.outputDir;
const fileName = commander.fileName;

rimraf.sync(outputDir);
let returnData = psd2json(inputDir + "\\" + fileName + ".psd", { outImgDir: outputDir });

fs.writeFile(outputDir + "\\" + fileName + "\\" + fileName + ".json", returnData, { flag: "w" }, function(err) {
    if (err) {
        return console.error(err);
    } else {
        console.log("导出json成功");
    }
});
