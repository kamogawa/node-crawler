const diff = require("diff");

module.exports = text => {
  const check = filePath => {
    var isExist = false;
    try {
      fs.statSync(filePath);
      isExist = true;
    } catch (err) {
      isExist = false;
    }
    return isExist;
  };

  var diff = diff.createPatch(fileName, oldStr, newStr, oldHeader, newHeader);
};
