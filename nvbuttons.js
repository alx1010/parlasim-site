var keyID = 0

// Function to handle keydown event
function handleKeyDown(event) {
  if (event.shiftKey) {keyID = 1}
  else if(event.ctrlKey) {keyID = 2}
}

// Function to handle keyup event
function handleKeyUp() {
  keyID = 0
}

// Attach event listeners to the document
document.addEventListener('keydown', handleKeyDown);
document.addEventListener('keyup', handleKeyUp);

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
      ", () => {" + 
      "if(keyID == 1){nationalvote[x] += 0.001;setTextVotes()} " + 
      "else if(keyID == 2) {nationalvote[x] += 0.0001;setTextVotes()}" + 
      "else if(keyID == 0) {nationalvote[x] += 0.01;setTextVotes()}})"
  );
  eval(
    partyabbrv[x] +
      "DownButton.addEventListener(" +
      c +
      ", () => {" + 
      "if(keyID == 1){nationalvote[x] += -0.001;setTextVotes()} " + 
      "else if(keyID == 2) {nationalvote[x] += -0.0001;setTextVotes()}" + 
      "else if(keyID == 0) {nationalvote[x] += -0.01;setTextVotes()}})"
  );
}
