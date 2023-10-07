for (let x = 0; x < partyabbrv.length; x++) {
  eval(
    "var " +
      partyabbrv[x] +
      'UpButton = document.getElementById("' +
      partyabbrv[x] +
      'up")'
  );
  eval(
    "var " +
      partyabbrv[x] +
      'DownButton = document.getElementById("' +
      partyabbrv[x] +
      'down")'
  );
}

for (let x = 0; x < partyabbrv.length; x++) {
  var c = "'click'";
  eval(
    partyabbrv[x] +
      "UpButton.addEventListener(" +
      c +
      ", () => {nationalvote[x] = nationalvote[x] + 0.01;setTextVotes()})"
  );
  eval(
    partyabbrv[x] +
      "DownButton.addEventListener(" +
      c +
      ", () => {nationalvote[x] = nationalvote[x] - 0.01;setTextVotes()})"
  );
}
