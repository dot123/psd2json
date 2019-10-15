/*
 * @Author: conjurer
 * @Github: https://github.com/dot123
 * @Date: 2019-10-15 14:34:14
 * @LastEditors: conjurer
 * @LastEditTime: 2019-10-15 15:56:49
 * @Description:
 */
const psd2json = require("../index.js");
const fs = require("fs");
const rimraf = require("rimraf");
const commander = require("commander");
const path = require("path");

commander
    .version("0.1.0")
    .option("-i, --inputDir <inputDir>", "input directory")
    .option("-o, --outputDir <outputDir>", "output directory")
    .parse(process.argv);

const inputDir = commander.inputDir;
const outputDir = commander.outputDir;

rimraf.sync(outputDir);

fs.readdir(inputDir, function(err, files) {
    if (err) {
        console.error(err);
        return;
    }
    files.forEach(function(fileName) {
        fileName = fileName.split(".")[0];
        let returnData = psd2json(path.join(inputDir, fileName) + ".psd", { outImgDir: outputDir });

        fs.writeFile(path.join(outputDir, fileName, fileName) + ".json", returnData, { flag: "w" }, function(err) {
            if (err) {
                return console.error(err);
            } else {
                console.log(path.join(inputDir, fileName) + ".psd");
            }
        });
    });
});
