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

// Function for changing vote

function voteChange(t,n){
  if((nationalvote[t] + n) >= 0){
    nationalvote[t] += n
    setTextVotes()
  }
  else{nationalvote[t] = 0;setTextVotes()}
}

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
      "if(keyID == 0){voteChange(x,0.01)}" + 
      "else if(keyID == 1){voteChange(x,0.001)}" + 
      "else if(keyID == 2){voteChange(x,0.0001)}})"
  );
  eval(
    partyabbrv[x] +
      "DownButton.addEventListener(" +
      c +
      ", () => {" + 
      "if(keyID == 0){voteChange(x,-0.01)}" + 
      "else if(keyID == 1){voteChange(x,-0.001)}" + 
      "else if(keyID == 2){voteChange(x,-0.0001)}})"
  );
}