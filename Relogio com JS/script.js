const hoursHand     = document.querySelector(".hand.hours");
const minutesHand   = document.querySelector(".hand.minutes");
const secondHand    = document.querySelector(".hand.seconds");

const setClock = () => {
    const currentDate = new Date();

    const secondsPercentage = currentDate.getSeconds() / 60;
    const minutesPercentage = (secondsPercentage + currentDate.getMinutes()) / 60;
    const hoursPercentage   = (minutesPercentage + currentDate.getHours()) / 12;

    setRotation(secondsPercentage, secondHand);
    setRotation(minutesPercentage, minutesHand);
    setRotation(hoursPercentage, hoursHand);
}

const setRotation = (rotationPercentage, element) => {
    element.style.setProperty("--rotation", rotationPercentage * 360);
}

setClock();

setInterval(setClock, 1000);