var totalevs = [0]
var StateWinner = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

var WinningDiffState = []
var WinningPercState = []

function setSVGColourStates(id, colour) {
  STATEMAP.getElementById(id).style.fill = colour;
}

for(let y = 0; y < partyabbrv.length; y++){
  eval("var " + partyabbrv[y] + "rawStates = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]")
  eval("var " + partyabbrv[y] + "voteStates = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]")
  var othrawStates = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  totalevs[y] = 0
}

function CalculateEVs() {
  for(let y = 0; y < partyabbrv.length; y++){
    eval(partyabbrv[y] + "rawStates = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]")
    eval(partyabbrv[y] + "voteStates = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]")
    othrawStates = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    totalevs[y] = 0
  }
  var statesum = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  var sts = 0
  for(let x = 0; x < states.length; x++){
    var w = 0
    var sw = 0
    for(let y = 0; y < partyabbrv.length; y++){
      for(let z = sts; z < (statesJuris[x] + sts); z++){
        eval(partyabbrv[y] + "rawStates[x] += " + partyabbrv[y] + "raw[z]")
      }
      eval(partyabbrv[y] + "rawStates[x] = Math.round(" + partyabbrv[y] + "rawStates[x])")
      eval("statesum[x] += " + partyabbrv[y] + "rawStates[x]")
      eval("if(" + partyabbrv[y] + "rawStates[x] > w){w = " + partyabbrv[y] + "rawStates[x]}")
    }

    // Finding the max and winner

    for(let y = 0; y < partyabbrv.length; y++){
      eval("if(" + partyabbrv[y] + "rawStates[x] == w){totalevs[y] += statesevs[x]; StateWinner[x] = y;}")
      eval(partyabbrv[y] + "voteStates[x] = fourDecRound(" + partyabbrv[y] + "rawStates[x] / statesum[x])")
    }

    // Finding the second max
  
    for(let y = 0; y < partyabbrv.length; y++){
      if(eval(partyabbrv[y] + 'rawStates[x]') > sw && eval(partyabbrv[y] + 'rawStates[x]') != w){
          sw = eval(partyabbrv[y] + 'rawStates[x]')
      }
    }

    w = fourDecRound(w/statesum[x])
    sw = fourDecRound(sw/statesum[x])
    WinningDiffState[x] = fourDecRound(w - sw)
    WinningPercState[x] = w

    sts += statesJuris[x]
  }

  function colourstates(){
    if (mapMode == 1) {
      var top = 0.25
      var decrement = 0.05
      var bottom = (top-(decrement*goppalette.length))
      // Colours the map based on the margin of victory, default
      for (let x = 0; x < states.length; x++) {
        eval('setSVGColourStates("' + states[x] + '", ' + partyabbrv[StateWinner[x]] + "palette[Math.ceil((top-WinningDiffState[x])/decrement)])")
        if(WinningDiffState[x]>top){eval('setSVGColourStates("' + states[x] + '", ' + partyabbrv[StateWinner[x]] + "palette[0])")}
        if(WinningDiffState[x]<bottom){eval('setSVGColourStates("' + states[x] + '", ' + partyabbrv[StateWinner[x]] + "palette[5])")}
      }
    }

    if (mapMode == 2) {
      var top = 0.70
      var decrement = 0.10
      var bottom = (top-(decrement*goppalette.length))
      // Colours the map based on the margin of victory, default
      for (let x = 0; x < states.length; x++) {
        eval('setSVGColourStates("' + states[x] + '", ' + partyabbrv[StateWinner[x]] + "palette[Math.ceil((top-WinningPercState[x])/decrement)])");
        if(WinningPercState[x]>top){eval('setSVGColourStates("' + states[x] + '", ' + partyabbrv[StateWinner[x]] + "palette[0])")}
        if(WinningPercState[x]<bottom){eval('setSVGColourStates("' + states[x] + '", ' + partyabbrv[StateWinner[x]] + "palette[5])")}
      }
    }
  
    if (mapMode == 4) {
      // Colours the map solid colours
      for (let x = 0; x < states.length; x++) {
        eval(
          'setSVGColourStates("' +
            states[x] +
            '", ' +
            partyabbrv[StateWinner[x]] +
            "palette[3])"
        );
      }
    }
  }

  colourstates()
}

function stateClicks() {
  const jurisName = document.getElementById("jurisName");
  const jurisMargin = document.getElementById("jurisMargin");
  const jurisFlip = document.getElementById("jurisFlip");
  
  for(let x = 0; x < partyabbrv.length; x++){
    eval('var ' + partyabbrv[x] + 'Juris = document.getElementById("' + partyabbrv[x] + 'Juris")')
  }

function onJurisClick(x) {
  jurisName.innerText = states[x].toUpperCase();
  jurisMargin.innerText = "Margin: " + fourDecRound(WinningDiffState[x] * 100) + "% => " + partyabbrv[StateWinner[x]].toUpperCase();
  jurisFlip.innerText = "~~~"
  for(let y = 0; y < partyabbrv.length; y++){
      eval(partyabbrv[y] + 'Juris.innerText = fourDecRound(' + partyabbrv[y] + 'voteStates[x] * 100) + "%"')
  }
  clicked = x;
}

var c = "'click'";
for (let x = 0; x < states.length; x++) {
  eval(
    'STATEMAP.getElementById("' +
      states[x] +
      '").addEventListener(' +
      c +
      " , () => {onJurisClick(x)})"
  );
}

onJurisClick(clicked);
}

function setTextSeatsEVs() {
  for (let x = 0; x < partyabbrv.length; x++) {
    var s = totalevs[x];
    eval(partyabbrv[x] + 'OutputSeats.innerText = s + " EVs"');
  }
}

var STATEMAP 

document.addEventListener("DOMContentLoaded", function () {
  // get first <object>
  const objTag = document.querySelector(".svgmap2");

  // wait for SVG to load
  objTag.addEventListener("load", () => {
    // reference to SVG document
    STATEMAP = objTag.getSVGDocument();

    CalculateEVs()
    setTextSeatsEVs()
    stateClicks()
  });

  const lblMaj = document.getElementById("maj")
  lblMaj.innerText = "270 EVs needed to win" 
})

simButton.addEventListener("click", () => {
  CalculateEVs()
  setTextSeatsEVs()
  stateClicks()
})

modeOneButton.addEventListener("click", () => {
  mapMode = 1;
  CalculateEVs();
});
modeTwoButton.addEventListener("click", () => {
  mapMode = 2;
  CalculateEVs();
});
modeThreeButton.addEventListener("click", () => {
  mapMode = 3;
  CalculateEVs();
});
modeFourButton.addEventListener("click", () => {
  mapMode = 4;
  CalculateEVs();
});