var SeatCount = [];
var SeatWinner = [];
var initSeatWinner = [];

var SeatFlip = [];

for(let x = 0; x < partyabbrv.length; x++){eval('var ' + partyabbrv[x] + 'sv = []')}
var othsv = []
var othsv = []

var WinningDiff = [];
var WinningPerc = [];

// Dynamic site styling for result table based on colour palette

for(let x = 0; x < partyabbrv.length; x++){
  var s = document.getElementsByClassName(partyabbrv[x])
  for(let y = 0; y < s.length; y++){
    eval("s[y].style.background = " + partyabbrv[x] + "palette[4]")
    s[y].style.color = "white"
  }
  var s = document.getElementsByClassName(partyabbrv[x] + "header")
  for(let y = 0; y < s.length; y++){
    eval("s[y].style.background = " + partyabbrv[x] + "palette[2]")
    s[y].style.color = "white"
  }
}

// Margin is default map mode
var mapMode = 1;

function twoDecRound(num) {
  return Math.round(num * 1e2) / 1e2;
}

function fourDecRound(num) {
  return Math.round(num * 1e4) / 1e4;
}

function sum(arr) {
  var s = 0;
  for (let y = 0; y < arr.length; y++) {
    s = s + arr[y];
  }
  return s
}

var nationalvote = [];
var initelec = [];

function initJurisVote() {
  for (let y = 0; y < juris.length; y++) {
    var jurisSum = 0
    for(let x = 0; x < partyabbrv.length; x++) {
        eval('jurisSum = jurisSum + ' + partyabbrv[x] + 'raw[y]')
    }
    jurisSum = jurisSum + othraw[y];
    for(let x = 0; x < partyabbrv.length; x++) {
      eval(
        partyabbrv[x] +
          "sv[y] = fourDecRound(" +
          partyabbrv[x] +
          "raw[y] / jurisSum)"
      );
    }
    othsv[y] = fourDecRound(othraw[y] / jurisSum)
  }
}

initJurisVote();

function initNationalVote() {
  var nvsum = 0
  for(let x = 0; x < partyabbrv.length; x++){
    eval('nvsum = nvsum + sum(' + partyabbrv[x] + 'raw)')
  }
  nvsum = nvsum + sum(othraw, 0)
  for (let x = 0; x < partyabbrv.length; x++) {
    eval("nationalvote[x] = fourDecRound((sum(" + partyabbrv[x] + "raw)/nvsum))")
  }
  
}

initNationalVote();

// Seat Result Tabulator

function SeatResults() {
  for (let y = 0; y < partyabbrv.length; y++) {
    SeatCount[y] = 0;
  }
  for (let x = 0; x < juris.length; x++) {
    SeatFlip[x] = 999;

    var w = 0
    var sw = 0

    // Finding the max

    for(let y = 0; y < partyabbrv.length; y++){
        if(eval(partyabbrv[y] + 'sv[x]') > w){
            w = eval(partyabbrv[y] + 'sv[x]')
        }
    }
    if(othsv[x]>w){w=othsv[x]; console.log("OTH WINNER"); console.log(othsv[x] + " and " + w)}

    // Finding the second max
    
    for(let y = 0; y < partyabbrv.length; y++){
        if(eval(partyabbrv[y] + 'sv[x]') > sw && eval(partyabbrv[y] + 'sv[x]') != w){
            sw = eval(partyabbrv[y] + 'sv[x]')
        }
    }

    if(othsv[x]>sw && othsv[x]!=w){sw=othsv[x]}

    WinningDiff[x] = fourDecRound(w - sw);

    WinningPerc[x] = w;

    for (let y = 0; y < partyabbrv.length; y++) {
      eval(
        "if(" + partyabbrv[y] + "sv[x] == w){SeatCount[y]++; SeatWinner[x] = partyabbrv[y]}"
      );
    }

    if(othsv[x]==w){SeatWinner[x]="oth"}

    if (initSeatWinner[x] != undefined) {
      if (initSeatWinner[x] != SeatWinner[x]) {
        SeatFlip[x] = SeatWinner[x];
      }
    }
  }
}

// Applies the swing

function Swinger() {
  for (let x = 0; x < juris.length; x++) {
    for (let y = 0; y < partyabbrv.length; y++) {
      if(initelec[y] == 0){break;}
      eval(
        partyabbrv[y] +
          "raw[x] = " +
          partyabbrv[y] +
          "rawinit[x] + (" +
          partyabbrv[y] +
          "rawinit[x] * (nationalvote[y] - initelec[y])/initelec[y])"
      );
    }
  }
}

// Gets the max from the array

function arrayMax(numArray) {
  return Math.max.apply(null, numArray);
}

// Gets the second max from the array

function arraySecondMax(numArray) {
  let max = -Infinity,
    result = -Infinity;

  for (const value of numArray) {
    const nr = Number(value);

    if (nr > max) {
      [result, max] = [max, nr]; // save previous max
    } else if (nr < max && nr > result) {
      result = nr; // new second biggest
    }
  }

  return result;
}

// Sets up the ability to click individual districts and see results

var clicked = 0;

function jurisClicks() {
    const jurisName = document.getElementById("jurisName");
    const jurisMargin = document.getElementById("jurisMargin");
    const jurisFlip = document.getElementById("jurisFlip");
    
    for(let x = 0; x < partyabbrv.length; x++){
        eval('var ' + partyabbrv[x] + 'Juris = document.getElementById("' + partyabbrv[x] + 'Juris")')
    }

  function onJurisClick(x) {
    jurisName.innerText = jurisnames[x];
    jurisMargin.innerText = "Margin: " + fourDecRound(WinningDiff[x] * 100) +"% => " + SeatWinner[x].toUpperCase();
    if(SeatWinner[x]==initSeatWinner[x]){jurisFlip.innerText = SeatWinner[x].toUpperCase() + " Hold"}
    else {jurisFlip.innerText = initSeatWinner[x].toUpperCase() + " => " + SeatWinner[x].toUpperCase() + " Flip"}
    for(let y = 0; y < partyabbrv.length; y++){
        eval(partyabbrv[y] + 'Juris.innerText = fourDecRound(' + partyabbrv[y] + 'sv[x] * 100) + "%"')
    }
    clicked = x;
  }

  var c = "'click'";
  for (let x = 0; x < juris.length; x++) {
    var jurisid = idprefix + juris[x];
    eval(
      'SVGMAP.getElementById("' +
        jurisid +
        '").addEventListener(' +
        c +
        " , () => {onJurisClick(x)})"
    );
  }

  onJurisClick(clicked);
}

// Colours the map

function colourmap() {
  function setSVGColour(id, colour) {
    SVGMAP.getElementById(id).style.fill = colour;
  }
  
  // testing purposes
  var jtc = juris.length; // juris to count
  var jts = 0; // juris to skip

  if (mapMode == 1) {
    var top = 0.25
    var decrement = 0.05
    var bot = twoDecRound(top-(decrement*(eval*(partyabbrv[0] + 'palette.length - 1'))))
    // Colours the map based on the margin of victory, default
    for (let x = 0; x < juris.length; x++) {
      id = idprefix + juris[x]
      eval('setSVGColour("' + id + '", ' + SeatWinner[x] + "palette[Math.ceil((top-WinningDiff[x])/decrement)])")
      if(WinningDiff[x]>top){eval('setSVGColour("' + id + '", ' + SeatWinner[x] + "palette[0])")}
      if(WinningDiff[x]<bot){eval('setSVGColour("' + id + '", ' + SeatWinner[x] + "palette[" + SeatWinner[x] + "palette.length-1])")}
    }
  }

  if (mapMode == 2) {
    var top = 0.70
    var decrement = 0.10
    var bot = twoDecRound(top-(decrement*(eval*(partyabbrv[0] + 'palette.length - 1'))))
    // Colours the map based on the margin of victory, default
    for (let x = 0; x < juris.length; x++) {
      id = idprefix + juris[x]
      eval('setSVGColour("' + id + '", ' + SeatWinner[x] + "palette[Math.ceil((top-WinningPerc[x])/decrement)])")
      if(WinningPerc[x]>top){eval('setSVGColour("' + id + '", ' + SeatWinner[x] + "palette[0])")}
      if(WinningPerc[x]<bot){eval('setSVGColour("' + id + '", ' + SeatWinner[x] + "palette[" + SeatWinner[x] + "palette.length-1])")}
    }
  }

  if (mapMode == 3) {
    // Colours the map based on seats that flip from init winner
    for (let x = 0; x < juris.length; x++) {
      if (SeatFlip[x] == 999) {
        eval(
          'setSVGColour("' +
            idprefix + juris[x] +
            '", ' +
            SeatWinner[x] +
            "palette[5])"
        );
      } else if (SeatFlip[x] != 999) {
        eval(
          'setSVGColour("' +
            idprefix + juris[x] +
            '", ' +
            SeatWinner[x] +
            "palette[1])"
        );
      } else console.log("Something went wrong. SeatFlip: " + SeatFlip[x]);
    }
  }

  if (mapMode == 4) {
    // Colours the map solid colours
    for (let x = 0; x < juris.length; x++) {
      eval(
        'setSVGColour("' +
          idprefix + juris[x] +
          '", ' +
          SeatWinner[x] +
          "palette[3])"
      );
    }
  }
}

// Seat and Vote Outputs

function setTextSeats() {
  for (let x = 0; x < partyabbrv.length; x++) {
    var s = SeatCount[x];
    eval(partyabbrv[x] + 'OutputSeats.innerText = s + " seats"');
  }
}

function setTextVotes() {
  for (let x = 0; x < partyabbrv.length; x++) {
    var p = (twoDecRound(nationalvote[x] * 100)).toFixed(2) + "%";
    eval(partyabbrv[x] + "OutputVotes.innerText = p");
  }
  sumCheck.innerText = (twoDecRound(sum(nationalvote)* 100)).toFixed(2) + "%";
}

for(let x = 0; x < partyabbrv.length; x++){
    eval('var ' + partyabbrv[x] + 'OutputVotes = document.getElementById("' + partyabbrv[x] + 'Votes")')
    eval('var ' + partyabbrv[x] + 'OutputSeats = document.getElementById("' + partyabbrv[x] + 'Seats")')
}

const sumCheck = document.getElementById("sumcheck");

const simButton = document.querySelector(".sim");
const modeOneButton = document.querySelector(".modeone");
const modeTwoButton = document.querySelector(".modetwo");
const modeThreeButton = document.querySelector(".modethree");
const modeFourButton = document.querySelector(".modefour");

// Mode Buttons

modeOneButton.addEventListener("click", () => {
  mapMode = 1;
  colourmap();
});
modeTwoButton.addEventListener("click", () => {
  mapMode = 2;
  colourmap();
});
modeThreeButton.addEventListener("click", () => {
  mapMode = 3;
  colourmap();
});
modeFourButton.addEventListener("click", () => {
  mapMode = 4;
  colourmap();
});

// Does initial setup once all content has loaded

var SVGMAP;

document.addEventListener("DOMContentLoaded", function () {
  // get first <object>
  const objTag = document.querySelector(".svgmap");

  // wait for SVG to load
  objTag.addEventListener("load", () => {
    // reference to SVG document
    SVGMAP = objTag.getSVGDocument();

    SeatResults();

    for (let x = 0; x < juris.length; x++) {
      initSeatWinner[x] = SeatWinner[x];
    }

    for (let x = 0; x < partyabbrv.length; x++) {
      initelec[x] = nationalvote[x];
    }
    
    colourmap();
    setTextVotes();
    setTextSeats();
    jurisClicks();
  });
});

// Tells the user how many seats are needed for a majority, dynamic

const lblMaj = document.getElementById("maj")
    
lblMaj.innerText = (Math.floor(juris.length/2) + 1) + " needed for majority"

simButton.addEventListener("click", () => {
  Swinger();
  initJurisVote();
  //initNationalVote()
  SeatResults();
  colourmap();
  setTextVotes();
  setTextSeats();
  jurisClicks();
});
