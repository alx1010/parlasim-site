for (let x = 0; x < codes.length; x++) {
  eval("var " + codes[x] + "DataInit = []");
}

ATLDataInit = [0.43, 0.31, 0.17, 0.03, 0.04, 0.0];
QCDataInit = [0.31, 0.17, 0.09, 0.01, 0.02, 0.3];
ONDataInit = [0.39, 0.34, 0.18, 0.02, 0.05, 0.0];
PRDataInit = [0.19, 0.47, 0.21, 0.01, 0.07, 0.0];
ABDataInit = [0.14, 0.51, 0.18, 0.01, 0.07, 0.0];
BCDataInit = [0.26, 0.33, 0.29, 0.05, 0.05, 0.0];

function RegionalSwinger() {
  var sts = 0;
  var stc = 0;

  for (let c = 0; c < codes.length; c++) {
    stc = sts + codesJuris[c];

    for (let y = 0; y < partyabbrv.length; y++) {
      if(eval(codes[c] + "DataInit[y]") == 0){console.log("DIV 0 FAIL, REGIONAL")}
      else{
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
    }
    sts = stc;
  }

  initNationalVote();

  for (let x = (juris.length-3); x < juris.length; x++) {
    for (let y = 0; y < partyabbrv.length; y++) {
      if(initelec[y] == 0){console.log("DIV 0 FAIL")}
      else{
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
}

for (let x = 0; x < codes.length; x++) {
  eval("var " + codes[x] + "Data = [0,0,0,0,0,0]");
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
      eval(elementid + ".value = value.toString() + '%'")
      value = twoDecRound(value / 100);
      eval(codes[x] + "Data[y] = value");
    }
  }
  document.getElementById("submitCheck").innerText = "Submitted!";
}

const btnSubmit = document.querySelector("#btnSubmit");
btnSubmit.addEventListener("click", () => {
  rgnl = 1
  gatherCodesResults();
  //for (let x = 0; x < codes.length; x++) {
  //  console.log(eval(codes[x] + "Data"));
  //}
});
