class Timer {
  constructor(durationInput, startButton, pauseButton, callbacks) {
    this.durationInput = durationInput;
    this.startButton = startButton;
    this.pauseButton = pauseButton;
    if (callbacks) {
      this.onStart = callbacks.onStart;
      this.onTick = callbacks.onTick;
      this.onComplete = callbacks.onComplete;
      this.onInputChange = callbacks.onChange;
    }

    this.startButton.addEventListener("click", this.start);
    this.pauseButton.addEventListener("click", this.pause);
    this.durationInput.addEventListener("input", this.durationInputChanged);
  }

  start = () => {
    if (this.onStart) {
      this.onStart(this.timeRemaining);
    }
    if (!running) {
      this.tick();
      this.interval = setInterval(this.tick, 50);
      running = true;
      this.startButton.disabled = true;
    }
  };

  pause = () => {
    clearInterval(this.interval);
    running = false;
    this.startButton.disabled = false;
  };
  durationInputChanged = () => {
    this.pause();
    if (this.onInputChange) {
      this.onInputChange();
    }
  };

  tick = () => {
    if (this.timeRemaining <= 0) {
      this.pause();
      if (this.onComplete) {
        this.onComplete();
      }
    } else {
      this.timeRemaining = this.timeRemaining - 0.05;
      if (this.onTick) {
        this.onTick(this.timeRemaining);
      }
    }
  };

  get timeRemaining() {
    return parseFloat(this.durationInput.value);
  }

  set timeRemaining(time) {
    this.durationInput.value = time.toFixed(2);
  }
}
