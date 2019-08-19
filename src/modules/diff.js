module.exports = (text1, text2) => {
  let table = "";
  let diffResult = "";
  let diffCheck = false;

  const make_row = (x, y, type, text) => {
    if (type == " ") console.log(x, y);
    var row = "<tr";
    if (type == "+") row += ' class="add"';
    else if (type == "-") row += ' class="del"';
    row += ">";

    row += '<td class="lineno">' + y;
    row += '<td class="lineno">' + x;
    if (type == " ") {
      row += '<td class="difftext">' + type + " " + text;
      row += '<td class="difftext">' + type + " " + text;
    }
    if (type == "+") {
      row += '<td class="difftext">' + " ";
      row += '<td class="difftext">' + type + " " + text;
    }
    if (type == "-") {
      row += '<td class="difftext">' + type + " " + text;
      row += '<td class="difftext">' + " ";
    }

    table += row;
  };

  // function make_row(x, y, type, text) {
  //   if (type == " ") console.log(x, y);
  //   var row = "<tr";
  //   if (type == "+") row += ' class="add"';
  //   else if (type == "-") row += ' class="del"';
  //   row += ">";

  //   row += '<td class="lineno">' + y;
  //   row += '<td class="lineno">' + x;
  //   row += '<td class="difftext">' + type + " " + text;

  //   table += row;
  // }

  const get_diff = (matrix, a1, a2, x, y) => {
    if (x > 0 && y > 0 && a1[y - 1] === a2[x - 1]) {
      get_diff(matrix, a1, a2, x - 1, y - 1);
      make_row(x, y, " ", a1[y - 1]);
    } else {
      if (x > 0 && (y === 0 || matrix[y][x - 1] >= matrix[y - 1][x])) {
        get_diff(matrix, a1, a2, x - 1, y);
        make_row(x, "", "+", a2[x - 1]);
        diffCheck = true;
      } else if (y > 0 && (x === 0 || matrix[y][x - 1] < matrix[y - 1][x])) {
        get_diff(matrix, a1, a2, x, y - 1);
        make_row("", y, "-", a1[y - 1]);
        diffCheck = true;
      } else {
        return;
      }
    }
  };

  const diff = (a1, a2) => {
    var matrix = new Array(a1.length + 1);
    var x, y;

    for (y = 0; y < matrix.length; y++) {
      matrix[y] = new Array(a2.length + 1);

      for (x = 0; x < matrix[y].length; x++) {
        matrix[y][x] = 0;
      }
    }

    for (y = 1; y < matrix.length; y++) {
      for (x = 1; x < matrix[y].length; x++) {
        if (a1[y - 1] === a2[x - 1]) {
          matrix[y][x] = 1 + matrix[y - 1][x - 1];
        } else {
          matrix[y][x] = Math.max(matrix[y - 1][x], matrix[y][x - 1]);
        }
      }
    }

    get_diff(matrix, a1, a2, x - 1, y - 1);
  };

  if (diffCheck) {
    diffResult = '<table class="diff_text">' + table + "</table>";
  } else {
    diffResult = "```変化なし```";
  }
  diff(text1.split("\n"), text2.split("\n"));
  return;
};
