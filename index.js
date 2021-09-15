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
JSON.parse(fs.readFileSync("Match.json", "utf8")).forEach((x) => {
  let obj = { ...x };
  JSON.parse(fs.readFileSync("Team.json", "utf8")).forEach((t) => {
    if (obj.Team_Name_Id && t.Team_Id.trim() == obj.Team_Name_Id.trim()) {
      obj.Team_Name = t;
      delete obj.Team_Name_Id;
    }
    if (
      obj.Opponent_Team_Id &&
      t.Team_Id.trim() == obj.Opponent_Team_Id.trim()
    ) {
      obj.Opponent_Team = t;
      delete obj.Opponent_Team_Id;
    }
    if (obj.Toss_Winner_Id && t.Team_Id.trim() == obj.Toss_Winner_Id.trim()) {
      obj.Toss_Winner = t;
    }
    if (obj.Match_Winner_Id && t.Team_Id.trim() == obj.Match_Winner_Id.trim()) {
      obj.Match_Winner = t;
    }
    if (
      obj.Man_Of_The_Match_Id &&
      t.Team_Id.trim() == obj.Man_Of_The_Match_Id.trim()
    ) {
      obj.Man_Of_The_Match = t;
    }
  });
  JSON.parse(fs.readFileSync("Season.json", "utf8")).forEach((t) => {
    if (obj.Season_Id && t.Season_Id.trim() == obj.Season_Id.trim()) {
      obj.Season = t;
      delete obj.Season_Id;
      JSON.parse(fs.readFileSync("Player.json", "utf8")).forEach((p) => {
        if (
          obj.Season.Orange_Cap_Id &&
          p.Player_Id.trim() == obj.Season.Orange_Cap_Id.trim()
        ) {
          obj.Season.Orange_Cap = p;
          delete obj.Season.Orange_Cap_Id;
        }
        if (
          obj.Season.Purple_Cap_Id &&
          p.Player_Id.trim() == obj.Season.Purple_Cap_Id.trim()
        ) {
          obj.Season.Purple_Cap = p;
          delete obj.Season.Purple_Cap_Id;
        }
        if (
          obj.Season.Man_of_the_Series_Id &&
          p.Player_Id.trim() == obj.Season.Man_of_the_Series_Id.trim()
        ) {
          obj.Season.Man_of_the_Series = p;
          delete obj.Season.Man_of_the_Series_Id;
        }
      });
      JSON.parse(fs.readFileSync("Player.json", "utf8")).forEach((p) => {
        if (
          obj.First_Umpire_Id &&
          p.Player_Id.trim().indexOf(obj.First_Umpire_Id.trim()) > -1
        ) {
          obj.First_Umpire = p;
          delete obj.First_Umpire_Id;
        }
        if (
          obj.Second_Umpire_Id &&
          p.Player_Id.trim().indexOf(obj.Second_Umpire_Id.trim()) > -1
        ) {
          obj.Second_Umpire = p;
          delete obj.Second_Umpire_Id;
        }
      });
    }
  });

  delete obj.Man_Of_The_Match_Id;
  delete obj.Toss_Winner_Id;
  delete obj.Match_Winner_Id;
  console.log(obj);
  return;
});
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
