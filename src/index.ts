import "./index.scss";

class WeatherSounds {
  currentSound: null | string;
  audio: HTMLAudioElement;
  volumeControl: HTMLInputElement;
  buttons: NodeListOf<HTMLElement>;
  background: HTMLElement;

  constructor() {
    this.currentSound = null;
    this.audio = new Audio();
    this.volumeControl = document.querySelector("#volume");
    this.buttons = document.querySelectorAll(".weather-type");
    this.background = document.querySelector(".background");
  }

  initialize() {
    if (!this.buttons.length || !this.volumeControl || !this.background) {
      console.error("Required DOM elements are missing.");
      return;
    }

    this.buttons.forEach((button) => {
      button.addEventListener("click", () => {
        const soundType = button.dataset.type;

        if (soundType === this.currentSound) {
          this.toggleSound();
        } else {
          this.playSound(soundType);
        }

        this.updateButtonState();
        this.updatebackgroundClass(soundType);
      });
    });

    this.volumeControl.addEventListener("input", (e) => {
      this.updateVolume(+(e.target as HTMLInputElement).value);
    });
  }

  updateButtonState() {
    this.buttons.forEach((btn) => {
      const isCurrentSound = btn.dataset.type === this.currentSound;
      btn.classList.toggle("_active", isCurrentSound && !this.audio.paused);
      btn.classList.toggle("_paused", isCurrentSound && this.audio.paused);
    });
  }

  updatebackgroundClass(newClass: string) {
    this.background.className = this.background.className
      .split(" ")
      .filter((className) => !className.startsWith("sound-"))
      .join(" ");
    this.background.classList.add(`sound-${newClass}`);
  }

  playSound(type: string) {
    this.stopCurrentSound();
    this.currentSound = type;
    this.audio.src = this.getSoundUrl(type);
    this.audio.loop = true;
    this.audio.volume = +this.volumeControl.value;
    this.audio.play();
  }

  toggleSound() {
    if (this.audio.paused) {
      this.audio.play();
    } else {
      this.audio.pause();
    }
  }

  stopCurrentSound() {
    if (this.audio) {
      this.audio.pause();
    }
  }

  updateVolume(volume: number) {
    this.audio.volume = volume;
  }

  getSoundUrl(type: string) {
    return `/assets/sounds/${type}.mp3`;
  }
}

const app = new WeatherSounds();

app.initialize();
