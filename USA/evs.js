var totalevs = [0]
var statewinner = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

function CalculateEVs() {
  var statemax = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  var statesum = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  
  for(let y = 0; y < partyabbrv.length; y++){
    eval("var " + partyabbrv[y] + "rawStates = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]")
    eval("var " + partyabbrv[y] + "voteStates = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]")
    var othrawStates = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    totalevs[y] = 0
  }
  var sts = 0
  for(let x = 0; x < states.length; x++){
    for(let y = 0; y < partyabbrv.length; y++){
      for(let z = sts; z < (statesJuris[x] + sts); z++){
        eval(partyabbrv[y] + "rawStates[x] += " + partyabbrv[y] + "raw[z]")
      }
      eval(partyabbrv[y] + "rawStates[x] = Math.round(" + partyabbrv[y] + "rawStates[x])")
      eval("statesum[x] += " + partyabbrv[y] + "rawStates[x]")
      eval("if(" + partyabbrv[y] + "rawStates[x] > statemax[x]){statemax[x] = " + partyabbrv[y] + "rawStates[x]}")
    }
    
    for(let y = 0; y < partyabbrv.length; y++){
      eval("if(" + partyabbrv[y] + "rawStates[x] == statemax[x]){totalevs[y] += statesevs[x]; statewinner[x] = y}")
      eval(partyabbrv[y] + "voteStates[x] = fourDecRound(" + partyabbrv[y] + "rawStates[x] / statesum[x])")
    }

    console.log("GOP VOTE RAW " + states[x] + ": " + goprawStates[x])
    console.log("DEM VOTE RAW " + states[x] + ": "+ demrawStates[x])
    console.log(states[x] + " VOTE SUM: " + statesum[x])
    console.log("GOP VOTE % " + states[x] + ": " + twoDecRound(gopvoteStates[x] * 100))
    console.log("DEM VOTE % " + states[x] + ": "+ twoDecRound(demvoteStates[x] * 100))
    console.log("")

    sts += statesJuris[x]
  }
  console.log(statewinner)
}

function setTextSeats() {
  for (let x = 0; x < partyabbrv.length; x++) {
    var s = 0;
    eval(partyabbrv[x] + 'OutputSeats.innerText = s + " EVs"');
  }
}

function setTextSeatsEVs() {
  for (let x = 0; x < partyabbrv.length; x++) {
    var s = totalevs[x];
    eval(partyabbrv[x] + 'OutputSeats.innerText = s + " EVs"');
  }
}

function toggleStates(){
  function setSVGColour(id, colour) {
    SVGMAP.getElementById(id).style.fill = colour;
  }

  var sts = 0; // juris to skip

   for(let x = 0; x < states.length; x++){
     for(let z = sts; z < (statesJuris[x] + sts); z++){
       eval(
         'setSVGColour("' + idprefix + juris[z] + '", ' + partyabbrv[statewinner[x]] + "palette[3])"
       );
     }0
     sts += statesJuris[x]
   }
}

document.addEventListener("DOMContentLoaded", function () {
  const lblMaj = document.getElementById("maj")
  lblMaj.innerText = "270 EVs needed to win"

  CalculateEVs()
  setTextSeats()
})

simButton.addEventListener("click", () => {
  CalculateEVs()
  setTextSeatsEVs()
  if(t==1){toggleStates()}
})

const toggleStatesButton = document.getElementById("toggleStates")

var t = 0

toggleStatesButton.addEventListener("click", () => {
  toggleStates()
  if(t==1){t=0}else{t=1}
})
