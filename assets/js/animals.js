"use strict";

import { Animal } from "./animal.js";

export class Leon extends Animal {
  Rugir() {
    console.log("Rooooar!");
    player.src = `./assets/sounds/${this.Sonido}`;
    player.load();
    player.play();
  }
}

export class Lobo extends Animal {
  Aullar() {
    console.log("Auuuuu!");
    player.src = `./assets/sounds/${this.Sonido}`;
    player.load();
    player.play();
  }
}

export class Oso extends Animal {
  Gruñir() {
    console.log("Grrrrr!");
    player.src = `./assets/sounds/${this.Sonido}`;
    player.load();
    player.play();
  }
}

export class Serpiente extends Animal {
  Sisear() {
    console.log("zzzzzzzzzz!");
    player.src = `./assets/sounds/${this.Sonido}`;
    player.load();
    player.play();
  }
}

export class Aguila extends Animal {
  Chillar() {
    console.log("tiiiiiii!");
    player.src = `./assets/sounds/${this.Sonido}`;
    player.load();
    player.play();
  }
}
