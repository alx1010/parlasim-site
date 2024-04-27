var retention = []

let t = 0

for(let m = 0; m < Math.pow(partyabbrv.length, 2); m++){
    if(m == t){retention[m] = 1; t += (1 + partyabbrv.length)}
    else{retention[m] = 0}
}

const rInputs = document.getElementsByClassName("rInputs")

for(let i = 0; i < rInputs.length; i++){
    rInputs[i].getElementsByTagName("input")[0].value = (retention[i]*100) + "%"
}

function retentionSwinger(){
    for(let m = 0; m < rInputs.length; m++){
        retention[m] = (parseInt(rInputs[m].getElementsByTagName("input")[0].value) / 100)
    }

    for(let y = 0; y < partyabbrv.length; y++){
        for(let x = 0; x < juris.length; x++){
            eval(partyabbrv[y] + 'raw[x] = 0')
        }
        for(let i = 0; i < partyabbrv.length; i++){
            for(let x = 0; x < juris.length; x++){
                eval(partyabbrv[y] + 'raw[x] += Math.round(' + partyabbrv[i] + 'rawinit[x] * retention[((4 * y) + i)])')
            }
        }
    }

    for(let m = 0; m < rInputs.length; m++){
        rInputs[m].getElementsByTagName("input")[0].value = Math.round((retention[m]*100)) + "%"
    }
}

const rSubmit = document.getElementById("rSubmit")

simButton.addEventListener('click', () => {
    retentionSwinger()
    
    initJurisVote();
    initNationalVote();
    SeatResults();
    colourmap();
    setTextVotes();
    setTextSeats();
    jurisClicks();
})

