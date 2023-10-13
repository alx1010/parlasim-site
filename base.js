var SeatCount = [];
var SeatWinner = [];
var initSeatWinner = [];

var SeatFlip = [];

for(let x = 0; x < partyabbrv.length; x++){eval('var ' + partyabbrv[x] + 'sv = []')}

var WinningDiff = [];
var WinningPerc = [];

// Margin is default map mode
var mapMode = 0;

function twoDecRound(num) {
  return Math.round(num * 1e2) / 1e2;
}

function fourDecRound(num) {
  return Math.round(num * 1e4) / 1e4;
}

function sad(arr, div) {
  var sum = 0;
  for (let y = 0; y < arr.length; y++) {
    sum = sum + arr[y];
  }
  if (div != 0) {
    return fourDecRound(sum / div);
  } else {
    return twoDecRound(sum);
  }
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
  }
}

initJurisVote();

function initNationalVote() {
  var nvsum = 0
  for(let x = 0; x < partyabbrv.length; x++){
    eval('nvsum = nvsum + sad(' + partyabbrv[x] + 'raw, 0)')
  }
  nvsum = nvsum + sad(othraw, 0)
  for (let x = 0; x < partyabbrv.length; x++) {
    eval("nationalvote[x] = twoDecRound((sad(" + partyabbrv[x] + "raw, 0)/nvsum))")
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

    // Finding the second max
    
    for(let y = 0; y < partyabbrv.length; y++){
        if(eval(partyabbrv[y] + 'sv[x]') > sw && eval(partyabbrv[y] + 'sv[x]') != w){
            sw = eval(partyabbrv[y] + 'sv[x]')
        }
    }

    WinningDiff[x] = fourDecRound(w - sw);

    WinningPerc[x] = w;

    for (let y = 0; y < partyabbrv.length; y++) {
      eval(
        "if(" + partyabbrv[y] + "sv[x] == w){SeatCount[y]++; SeatWinner[x] = y}"
      );
    }

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
    
    for(let x = 0; x < partyabbrv.length; x++){
        eval('var ' + partyabbrv[x] + 'Juris = document.getElementById("' + partyabbrv[x] + 'Juris")')
    }

  function onJurisClick(x) {
    jurisName.innerText = jurisnames[x];
    jurisMargin.innerText = "Margin: " + fourDecRound(WinningDiff[x] * 100) +"% => " + partyabbrv[SeatWinner[x]].toUpperCase();
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

  if (mapMode == 0) {
    // Colours the map based on the margin of victory, default
    for (let x = jts; x < jtc; x++) {
      console.log(juris[x])
      if (WinningDiff[x] >= 0.25) {
        eval(
          'setSVGColour("' +
            idprefix+ juris[x] +
            '", ' +
            partyabbrv[SeatWinner[x]] +
            "palette[0])"
        );
      } else if (WinningDiff[x] < 0.25 && WinningDiff[x] >= 0.2) {
        eval(
          'setSVGColour("' +
            idprefix + juris[x] +
            '", ' +
            partyabbrv[SeatWinner[x]] +
            "palette[1])"
        );
      } else if (WinningDiff[x] < 0.2 && WinningDiff[x] >= 0.15) {
        eval(
          'setSVGColour("' +
            idprefix + juris[x] +
            '", ' +
            partyabbrv[SeatWinner[x]] +
            "palette[2])"
        );
      } else if (WinningDiff[x] < 0.15 && WinningDiff[x] >= 0.1) {
        eval(
          'setSVGColour("' +
            idprefix + juris[x] +
            '", ' +
            partyabbrv[SeatWinner[x]] +
            "palette[3])"
        );
      } else if (WinningDiff[x] < 0.1 && WinningDiff[x] >= 0.05) {
        eval(
          'setSVGColour("' +
            idprefix + juris[x] +
            '", ' +
            partyabbrv[SeatWinner[x]] +
            "palette[4])"
        );
      } else if (WinningDiff[x] < 0.05) {
        eval(
          'setSVGColour("' +
            idprefix + juris[x] +
            '", ' +
            partyabbrv[SeatWinner[x]] +
            "palette[5])"
        );
      } else
        console.log("Something went wrong. WinningDiff: " + WinningDiff[x]);
    }
  }

  if (mapMode == 1) {
    // Colours the map based on the percentage of vote recieved by the winner
    for (let x = jts; x < jtc; x++) {
      //console.log(juris[x])
      if (WinningPerc[x] >= 0.7) {
        eval(
          'setSVGColour("' +
            idprefix + juris[x] +
            '", ' +
            partyabbrv[SeatWinner[x]] +
            "palette[0])"
        );
      } else if (WinningPerc[x] < 0.7 && WinningPerc[x] >= 0.6) {
        eval(
          'setSVGColour("' +
            idprefix + juris[x] +
            '", ' +
            partyabbrv[SeatWinner[x]] +
            "palette[1])"
        );
      } else if (WinningPerc[x] < 0.6 && WinningPerc[x] >= 0.5) {
        eval(
          'setSVGColour("' +
            idprefix + juris[x] +
            '", ' +
            partyabbrv[SeatWinner[x]] +
            "palette[2])"
        );
      } else if (WinningPerc[x] < 0.5 && WinningPerc[x] >= 0.4) {
        eval(
          'setSVGColour("' +
            idprefix + juris[x] +
            '", ' +
            partyabbrv[SeatWinner[x]] +
            "palette[3])"
        );
      } else if (WinningPerc[x] < 0.4 && WinningPerc[x] >= 0.3) {
        eval(
          'setSVGColour("' +
            idprefix + juris[x] +
            '", ' +
            partyabbrv[SeatWinner[x]] +
            "palette[4])"
        );
      } else if (WinningPerc[x] < 0.3) {
        eval(
          'setSVGColour("' +
            idprefix + juris[x] +
            '", ' +
            partyabbrv[SeatWinner[x]] +
            "palette[5])"
        );
      } else
        console.log("Something went wrong. WinningPerc: " + WinningPerc[x]);
    }
  }

  if (mapMode == 2) {
    // Colours the map based on seats that flip from the 2021 Canadian Election
    for (let x = jts; x < jtc; x++) {
      if (SeatFlip[x] == 999) {
        eval(
          'setSVGColour("' +
            idprefix + juris[x] +
            '", ' +
            partyabbrv[SeatWinner[x]] +
            "palette[5])"
        );
      } else if (SeatFlip[x] != 999) {
        eval(
          'setSVGColour("' +
            idprefix + juris[x] +
            '", ' +
            partyabbrv[SeatWinner[x]] +
            "palette[1])"
        );
      } else console.log("Something went wrong. SeatFlip: " + SeatFlip[x]);
    }
  }

  if (mapMode == 3) {
    // Colours the map solid colours
    for (let x = jts; x < jtc; x++) {
      eval(
        'setSVGColour("' +
          juris[x] +
          '", ' +
          partyabbrv[SeatWinner[x]] +
          "palette[3])"
      );
    }
  }
}

// Seat and Vote Outputs

function setTextVotes() {
  for (let x = 0; x < partyabbrv.length; x++) {
    var p = Math.round(nationalvote[x] * 100) + "%";
    eval(partyabbrv[x] + "OutputVotes.innerText = p");
  }
  sumCheck.innerText = Math.round(sad(nationalvote, 0) * 100) + "%";
}

function setTextSeats() {
  for (let x = 0; x < partyabbrv.length; x++) {
    var s = SeatCount[x];
    eval(partyabbrv[x] + 'OutputSeats.innerText = s + " seats"');
  }
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
  mapMode = 0;
  colourmap();
});
modeTwoButton.addEventListener("click", () => {
  mapMode = 1;
  colourmap();
});
modeThreeButton.addEventListener("click", () => {
  mapMode = 2;
  colourmap();
});
modeFourButton.addEventListener("click", () => {
  mapMode = 3;
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

    // Tells the user how many seats are needed for a majority

    const lblMaj = document.getElementById("maj")
    
    lblMaj.innerText = (Math.floor(juris.length/2) + 1) + " needed for majority"

    colourmap();
    setTextVotes();
    setTextSeats();
    jurisClicks();
  });
});

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
