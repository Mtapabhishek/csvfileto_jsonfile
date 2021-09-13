const fs = require("fs");

let csv = [
  "Ball_by_Ball.csv",
  "Match.csv",
  "Player_Match.csv",
  "Player.csv",
  "Season.csv",
  "Team.csv",
];
for (let i = 0; i < csv.length; i++) {
  let stored = fs.readFileSync(csv[i], "utf8");
  let output = converttojson(stored);
  let json1 = JSON.stringify(output);
  fs.writeFileSync(csv[i].replace("csv", "json"), json1);
}

function converttojson(csv) {
  var array = csv.toString().split("\r"); //
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
var myarray=["Ball_by_Ball.json",
"Match.json",
"Player_Match.json",
"Player.json",
"Season.json",
"Team.json"]
let resultss=[];
 for(let i=0;i<myarray.length;i++){
JSON.parse(fs.readFileSync(myarray[i], "utf8")).map((x)=> resultss.push(x)) 
console.log(resultss)
}






