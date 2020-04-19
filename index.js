const durationInput = document.querySelector("#duration");
const startButton = document.querySelector("#start");
const pauseButton = document.querySelector("#pause");
const circle = document.querySelector("circle");
const perimeter = circle.getAttribute("r") * 2 * Math.PI;

circle.setAttribute("stroke-dasharray", perimeter);
let running = false;
let duration = durationInput.value;

durationInput.addEventListener("change", () => {
  duration = durationInput.value;
});
const timer = new Timer(durationInput, startButton, pauseButton, {
  onStart(totalDuration) {
    //     duration = totalDuration;
  },
  onTick(timeRemaining) {
    circle.setAttribute(
      "stroke-dashoffset",
      (perimeter * timeRemaining) / duration - perimeter
    );
  },
  onComplete() {
    console.log("Timer is completed");
  },
  onChange() {
    circle.setAttribute("stroke-dashoffset", 0);
  },
});
