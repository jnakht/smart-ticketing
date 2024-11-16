

function setBackgroundOfSeatById(elementId, ariaPressedValueInBoolean) {
    const element = document.getElementById(elementId);
    if (ariaPressedValueInBoolean === false) {
        element.classList.add('selected');
    }
    else {
        element.classList.remove('selected');
    }
}

function reCalculateSeatNumber(totalSeats, isPressed) {
    if (isPressed === true) {
        totalSeats++;
    }
    else {
        totalSeats--;
    }
    return totalSeats;
}

function resetSeatNumberById(elementId, value) {
    const element = document.getElementById(elementId);
    element.innerText = value;
}

function addDiv(elementId, seatName) {
    const element = document.getElementById(elementId);
    const newDiv = document.createElement('div');
    newDiv.innerHTML = `<div class="seat-name flex justify-between text-[#03071299] font-inter text-base font-normal mb-3 md:mb-0">
                  <p>C2</p>
                  <p>Economoy</p>
                  <p>550</p>
                </div>`;
    element.appendChild(newDiv);
    const secondDiv = element.lastChild;
    const firstParagraph = secondDiv.querySelector('p');
    firstParagraph.innerText = seatName;
    // firstParagraph.setAttribute('id', seatName);
    newDiv.setAttribute('id', seatName);
    // console.log("attribute names: ", firstParagraph.getAttribute('id'));
}

function removeDiv(elementId) {
    const element = document.getElementById(elementId);
    if (element.lastChild) {
        element.removeChild(element.lastChild);
    }
}
function removeDivOfSeat(elementId, seatName) {
    const element = document.getElementById(elementId);
    // if (element.lastChild) {
    //     element.removeChild(element.lastChild);
    // }

    const childElements = element.querySelectorAll('div');
    // const lastDiv = childElements.querySelectorAll('div');
    for (const child of childElements) {
        // console.log("this is the child", child.querySelector('p'));
        // console.log(child) 
        // console.log(child.id);
        if (child.id === seatName) {
            // console.log('remove kor vai');
            element.removeChild(child);
        }
    }

    // 
    // const elementChildes = element.querySelectorAll('div');
    // for (const child of elementChildes) {
    //     const chidlId = child.getAttribute('id');
    //     if (chidlId === seatName) {
    //         element.removeChild(child);
    //         console.log('child successfully removed');
    //         break;
    //     }
    //     else {
    //         console.log('child id: ', chidlId);
    //         console.log('seat name: ', seatName);
    //     }
        // 


        // console.log("seatname: ", seatName);
        // console.log("child id = ", child.id);
    // }
}

function getInnerTextById(elementId) {
    const element = document.getElementById(elementId);
    const elementText = element.innerText;
    const elementValue = parseInt(elementText);
    return elementValue;
}

function setInnerTextById(elementId, text) {
    const element = document.getElementById(elementId);
    // console.log('ekhane ashce')
    element.innerText = text;
}

function hideElementById(elementId) {
    const element = document.getElementById(elementId);
    element.classList.add('hidden');
}

function showElementById(elementId) {
    const element = document.getElementById(elementId);
    element.classList.remove('hidden');
}

function deleteDisableProperty(elementId) {
    const element = document.getElementById(elementId);
    element.removeAttribute('disabled');
}

function applyDisabledProperty(elementId) {
    const element = document.getElementById(elementId);
    element.setAttribute('disabled', true);
}


function showAlert() {
    alert("You can't select more that four seats at once");
}
