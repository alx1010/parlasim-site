// Codes for regional swing

var codes = ["ATL", "QC", "ON", "PR", "AB", "BC"];
var codesJuris = [32, 78, 121, 28, 34, 42];

for (let x = 0; x < codes.length; x++) {
  eval("var " + codes[x] + "DataInit = 0");
  eval("var " + codes[x] + "DataRawInit = 0");
}

ATLDataInit = [0.43, 0.31, 0.17, 0.03, 0.04, 0.0];
QCDataInit = [0.31, 0.17, 0.09, 0.01, 0.02, 0.3];
ONDataInit = [0.39, 0.34, 0.18, 0.02, 0.05, 0.0];
PRDataInit = [0.19, 0.47, 0.21, 0.01, 0.07, 0.0];
ABDataInit = [0.14, 0.51, 0.18, 0.01, 0.07, 0.0];
BCDataInit = [0.26, 0.33, 0.29, 0.05, 0.05, 0.0];

function Swinger() {
  var sts = 0;
  var stc = 0;

  for (let c = 0; c < codes.length; c++) {
    stc = sts + codesJuris[c];

    for (let y = 0; y < partyabbrv.length; y++) {
      if (partyabbrv[y] == "bloc" && codes[c] != "QC") {
        break;
      }

      var swing = twoDecRound(
        eval(
          "(" +
            codes[c] +
            "Data[y] -" +
            codes[c] +
            "DataInit[y]) /" +
            codes[c] +
            "DataInit[y]"
        )
      );

      for (let s = sts; s < stc; s++) {
        eval(
          partyabbrv[y] +
            "raw[s] = Math.round(" +
            partyabbrv[y] +
            "rawinit[s] + (" +
            partyabbrv[y] +
            "rawinit[s] * swing))"
        );
      }
    }
    sts = stc;
  }

  initNationalVote();

  for (let x = 335; x < 338; x++) {
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

for (let x = 0; x < codes.length; x++) {
  eval("var " + codes[x] + "Data = [0,0,0,0,0,0]");
  eval("var " + codes[x] + "DataRaw = [0,0,0,0,0,0]");
}

function initSubmissionBoxes() {
  for (let x = 0; x < codes.length; x++) {
    for (let y = 0; y < partyabbrv.length; y++) {
      if (partyabbrv[y] == "bloc" && codes[x] != "QC") {
        break;
      }
      var elementid = partyabbrv[y] + codes[x];
      eval(
        "const " + elementid + ' = document.querySelector("' + elementid + '")'
      );
    } // eg. lpcATL to access input box
  }

  function initCodeData() {
    var sts = 0;
    var stc = 0;

    for (let x = 0; x < codes.length; x++) {
      var codesRawSum = 0;
      var codesRawOthSum = 0;
      stc = sts + codesJuris[x];

      for (let y = 0; y < partyabbrv.length; y++) {
        if (partyabbrv[y] == "bloc" && codes[x] != "QC") {
          break;
        }
        for (let s = sts; s < stc; s++) {
          eval(
            codes[x] +
              "Data[y] = " +
              codes[x] +
              "Data[y] + " +
              partyabbrv[y] +
              "raw[s]"
          );
          codesRawOthSum = codesRawOthSum + othraw[s];
        }
        eval("codesRawSum = codesRawSum + " + codes[x] + "Data[y]");
        eval(codes[x] + "DataRaw[y] = " + codes[x] + "Data[y]");
      }

      codesRawSum = codesRawSum + codesRawOthSum;
      sts = stc;

      for (let y = 0; y < partyabbrv.length; y++) {
        if (partyabbrv[y] == "bloc" && codes[x] != "QC") {
          break;
        }
        var elementid = partyabbrv[y] + codes[x];
        eval(
          codes[x] +
            "Data[y] = twoDecRound(" +
            codes[x] +
            "Data[y] / codesRawSum)"
        );
        eval(
          elementid + ".value = Math.round(" + codes[x] + 'Data[y] * 100) + "%"'
        );
      }
    }
  }

  initCodeData();
}

document.addEventListener("DOMContentLoaded", function () {
  initSubmissionBoxes();
});

simButton.addEventListener("click", () => {
  Swinger();
  initJurisVote();
  initNationalVote();
  SeatResults();
  colourmap();
  setTextVotes();
  setTextSeats();
  jurisClicks();

  document.getElementById("submitCheck").innerText = "Waiting...";
});

function gatherCodesResults() {
  var value = 0;

  for (let x = 0; x < codes.length; x++) {
    for (let y = 0; y < partyabbrv.length; y++) {
      if (partyabbrv[y] == "bloc" && codes[x] != "QC") {
        break;
      }
      var elementid = partyabbrv[y] + codes[x];
      eval("value = " + elementid + ".value");
      value = parseInt(value);
      value = twoDecRound(value / 100);
      eval(codes[x] + "Data[y] = value");
    }
  }
  document.getElementById("submitCheck").innerText = "Submitted!";
}

const btnSubmit = document.querySelector("#btnSubmit");
btnSubmit.addEventListener("click", () => {
  gatherCodesResults();
});
