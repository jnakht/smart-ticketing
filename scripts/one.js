
function scrollToTicketSection() {
    document.getElementById('ticket-section').scrollIntoView({
        behavior: "smooth"
    });


}

const allSeats = document.querySelectorAll('.seats');
let totalSeatsElement = document.getElementById('current-available-seats').innerText;
// console.log(totalSeatsElement)
let totalSeats = parseInt(totalSeatsElement);
console.log(totalSeats)
// console.log(allSeats);
let seatSelectionCount = 0;
for (const seat of allSeats) {
    seat.addEventListener('click', function (event) {
        const selectedSeat = event.target.innerText;
        const ariaPressedValueInBoolean = seat.getAttribute('aria-pressed') === 'true';

        if (ariaPressedValueInBoolean) {
            seatSelectionCount--;
            console.log('remove div');
            removeDivOfSeat('adding-div', selectedSeat);
            console.log('end div');
        }
        else {
            seatSelectionCount++;
            // Enable the Next button if number is given
            const inputElement = document.getElementById('phone-input-field');
            const inputNumber = inputElement.value;
            if (inputNumber === '') {
                applyDisabledProperty('next-button');
            }
            else {
                deleteDisableProperty('next-button');
            }
            // if seats selection count is greater than 4
            // show alert message
            if (seatSelectionCount >= 5) {
                showAlert();
                seatSelectionCount--;
                return;
            }
            // adding div
            addDiv('adding-div', selectedSeat);
            // add seat-name to div
            // const seatNameClassed = document.querySelectorAll('.seat-name');

        }
        // console.log(seatSelectionCount)
        // update number of tickets
        const seatsCount = toString(seatSelectionCount);
        setInnerTextById('number-of-tickets', seatSelectionCount);

        // set total Price
        const totalPrice = seatSelectionCount * 550;
        setInnerTextById('total-price', totalPrice);

        // set grand total before discount or coupon code
        let grandTotal = totalPrice;
        setInnerTextById('grand-total', grandTotal);


        // if selected seat is four enable coupon section else disable 
        if (seatSelectionCount === 4) {
            deleteDisableProperty('input-field');
            deleteDisableProperty('button-field');
            // show coupon div
            showElementById('coupon-div');
            setInnerTextById('discounted-price', 0);
        }
        else {
            applyDisabledProperty('input-field');
            applyDisabledProperty('button-field');
            setInnerTextById('discounted-price', 0);
            hideElementById('discount-div');
            showElementById('coupon-div');
            hideElementById('incorrect-message');
        }

        setBackgroundOfSeatById(selectedSeat, ariaPressedValueInBoolean);
        seat.setAttribute('aria-pressed', !ariaPressedValueInBoolean);


        let newSeats = reCalculateSeatNumber(totalSeats, ariaPressedValueInBoolean);
        totalSeats = newSeats;
        resetSeatNumberById('current-available-seats', newSeats);
    })
}

document.getElementById('phone-input-field').addEventListener('keyup', function (event) {
    if (event.target.value !== '' && seatSelectionCount >= 1) {
        deleteDisableProperty('next-button');
    }
    else {
        applyDisabledProperty('next-button');
    }
})

document.getElementById('button-field').addEventListener('click', function () {
    const inputElement = document.getElementById('input-field');
    const couponCode = inputElement.value;
    let currentPrice = getInnerTextById('grand-total');
    if (couponCode === 'NEW15') {
        const discount = (15 * currentPrice) / 100;
        setInnerTextById('discounted-price', discount);
        currentPrice -= discount;
        hideElementById('coupon-div');
        // hideElementById('button-field');
        // show discount price
        showElementById('discount-div');
        setInnerTextById('grand-total', currentPrice);
        // applyDisabledProperty('input-field');
        // applyDisabledProperty('button-field');
        inputElement.value = '';
        hideElementById('incorrect-message');
    }
    else if (couponCode === 'Couple 20') {
        const discount = (20 * currentPrice) / 100;
        setInnerTextById('discounted-price', discount);
        showElementById('discount-div');
        currentPrice -= discount;
        setInnerTextById('grand-total', currentPrice);
        hideElementById('coupon-div');
        // hideElementById('button-field');
        // applyDisabledProperty('input-field');
        // applyDisabledProperty('button-field');
        inputElement.value = '';
        hideElementById('incorrect-message');
    }
    else {
        showElementById('incorrect-message');
        inputElement.value = '';
    }
})

//if "Next" button clicked then another pop up page will show up
let permanentlyBookedSeat = 0;
document.getElementById('next-button').addEventListener('click', function () {
    console.log('atleast  ekhane ashce');
    // permanently disable the seat and change background color
    const allSeats = document.querySelectorAll('.seats');
    for (const seat of allSeats) {
        console.log('ekhane ashce');
        if (seat.classList.contains('selected')) {
            permanentlyBookedSeat++;
            seat.classList.add('bg-[#D7D7D7]');
            // console.log(seat.innerText);
            applyDisabledProperty(seat.innerText);
        }
    }
    // all pages will be  hidden
    hideElementById('header-section');
    hideElementById('main-section');
    hideElementById('footer-section');

    // show pop up page
    showElementById('success-popup');
});

document.getElementById('continue-button').addEventListener('click', function () {

    // reset all seats, discount and grand total
    // delete ticket type(Economy) div's
    while (permanentlyBookedSeat !== 0) {
        removeDiv('adding-div');
        permanentlyBookedSeat--;
    }
    // reset seats to zero
    setInnerTextById('number-of-tickets', 0);
    // reset total price
    setInnerTextById('total-price', 0);
    // reset grand total
    setInnerTextById('grand-total', 0);
    // disable the coupon input field and apply button
    applyDisabledProperty('input-field');
    applyDisabledProperty('button-field');
    // reset the seat selection count 
    seatSelectionCount = 0;
    // disable the next button
    applyDisabledProperty('next-button');
    // reset discounted price
    setInnerTextById('discounted-price');
    // hide discounted price div
    hideElementById('discount-div');
    // clear coupon input
    const inputElement = document.getElementById('input-field');
    inputElement.value = '';
    // clear phone number input field
    const phoneElement = document.getElementById('phone-input-field');
    phoneElement.value = '';

    console.log('before: second time ekhane ashce');
    // hide pop up page
    hideElementById('success-popup');
    console.log('after: second time ekhane ashce');

    // all pages will be  shown
    showElementById('header-section');
    showElementById('main-section');
    showElementById('footer-section');
})