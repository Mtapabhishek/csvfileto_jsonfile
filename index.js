const fs = require("fs");

let csv = [
  "Ball_by_Ball.csv",
  "Match.csv",
  "Player_Match.csv",
  "Player.csv",
  "Season.csv",
  "Team.csv",
];
let stored;
for (let i = 0; i < csv.length; i++) {
  stored = fs.readFileSync(csv[i], "utf8");

  let output = converttojson(stored);
  let json1 = JSON.stringify(output);
  fs.writeFileSync(csv[i].replace("csv", "json"), json1);
}
let result = [];
JSON.parse(fs.readFileSync("Ball_by_Ball.json", "utf8")).forEach((x) => {
  let obj = { ...x };
  JSON.parse(fs.readFileSync("Match.json", "utf8")).forEach((t) => {
    if (t.Match_Id === obj.Match_Id) {
      obj = { ...obj, ...t };
      //return
    }
  });
  JSON.parse(fs.readFileSync("Player_Match.json", "utf8")).forEach((t) => {
    if (t.Match_Id === obj.Match_Id) {
      obj = { ...obj, ...t };
      //  return
    }
    //console.log(obj)
  });
  JSON.parse(fs.readFileSync("Player.json", "utf8")).forEach((t) => {
    if (t.Player_Id.trim() == obj.Player_Id.trim()) {
      obj = { ...obj, ...t };
      // return
    }
  });
  JSON.parse(fs.readFileSync("Team.json", "utf8")).forEach((t) => {
    if (t.Team_Id.trim() == obj.Team_Id.trim()) {
      obj = { ...obj, ...t };
      obj.Team_Name = t.Team_Name;
      // return;
    }
  });
  console.log(obj);
  // result.push(obj);
  return;
});
// console.log(result)

function converttojson(csv) {
  var array = csv.toString().split("\r"); 
  let headers = array[0].split(", ");
  headers = headers[0].split(",");
  let csvarray = [];
  for (let i = 1; i < array.length; i++) {
    let temp = {};
    let currentline = array[i].split(",");
    for (let j = 0; j < headers.length; j++) {
      temp[headers[j]] = currentline[j];
    }

    csvarray.push(temp);
  }
  return csvarray;
}
