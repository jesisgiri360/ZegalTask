"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readFile = exports.importClassesFromDirectories = void 0;
const path = require("path");
const fs = require("fs");
const readFilesFromFolder = (directory, filterFile, allFiles) => {
    const files = allFiles || [];
    const filesAndFolders = fs
        .readdirSync(directory)
        .map((fileName) => {
        return path.join(directory, fileName);
    });
    filesAndFolders.forEach((file) => {
        if (fs.statSync(file).isDirectory()) {
            console.log(file, files, filterFile);
            readFilesFromFolder(file, filterFile, files);
        }
        else {
            for (const expectedName of filterFile) {
                if (file.endsWith(expectedName))
                    files.push(file);
            }
        }
    });
    return files;
};
exports.readFile = readFilesFromFolder;
function importClassesFromDirectories() {
    const paths = readFilesFromFolder(path.resolve(__dirname + "/../../src/core/"), ["module.js", "module.ts"]);
    const loadFileClasses = function (exported, allLoaded) {
        if (exported instanceof Function) {
            allLoaded.push(exported);
        }
        else if (exported instanceof Array) {
            exported.forEach((i) => loadFileClasses(i, allLoaded));
        }
        else if (exported instanceof Object || typeof exported === "object") {
            Object.keys(exported).forEach((key) => loadFileClasses(exported[key], allLoaded));
        }
        return allLoaded;
    };
    const modules = paths.reduce((allDirs, dir) => {
        return allDirs.concat(require("glob").sync(path.normalize(dir)));
    }, []);
    const dirs = modules
        .filter((file) => {
        const dtsExtension = file.substring(file.length - 5, file.length);
        return ([".js", ".ts"].indexOf(path.extname(file)) !== -1 &&
            dtsExtension !== ".d.ts");
    })
        .map((file) => {
        return require(file);
    });
    return loadFileClasses(dirs, []);
}
exports.importClassesFromDirectories = importClassesFromDirectories;
//# sourceMappingURL=file.to.class.converter.js.map