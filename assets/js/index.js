"use strict";

import { Leon, Lobo, Oso, Serpiente, Aguila } from "./animals.js";
//import * as Animals from "./animal.js"; // Opción de importar todo

//console.log(Leon, Lobo, Oso, Serpiente, Aguila); // Revisando si traemos la información

(async () => {
  const Response = await fetch("animales.json");
  const { animales: Animales } = await Response.json();
  //console.log(Animales);

  /*
   * Buscar elementos al DOM
   */

  const nombreAnimalElement = document.getElementById("animal");
  const edadAnimalElement = document.getElementById("edad");
  const comentariosAnimalElement = document.getElementById("comentarios");
  const previewAnimalElement = document.getElementById("preview");
  const btnRegistrarElement = document.getElementById("btnRegistrar");
  const animalesContainerElement = document.getElementById("Animales");
  const playerElement = document.getElementById("player");

  const AnimalCards = []; // Arreglo según el botón registro

  function render() {
    animalesContainerElement.innerHTML = "";
    AnimalCards.forEach((animal) => {
      const DIVContainer = document.createElement("div");
      const IMGImagen = document.createElement("img");
      const ButtonSonido = document.createElement("button");

      DIVContainer.classList.add("card", "mx-2", "my-2");
      DIVContainer.style.width = "200px";

      IMGImagen.setAttribute("src", `assets/imgs/${animal.Img}`);
      IMGImagen.classList.add("img-fluid", "animal-image");
      IMGImagen.addEventListener("click", () => {
        $("#modal").modal("show");
        console.log(animal);
        const modalBody = document.getElementById("modal-body");
        modalBody.innerHTML = `<img src="./assets/imgs/${animal.Img}" style="width: 500px" class="img-fluid"/>
        <center><b>Animal: </b>${animal.Nombre}</center>
        <center><b>Edad: </b>${animal.Edad}</center>
        <center><b>Comentarios: </b>${animal.Comentarios}</center>`;
      });

      ButtonSonido.classList.add("card-body", "p-0");
      ButtonSonido.innerHTML = `<img src="./assets/imgs/audio.svg" style="width: 30px"/>`;
      ButtonSonido.style.height = "70px";
      ButtonSonido.style.background = "#6c757d";

      ButtonSonido.addEventListener("click", () => {
        if (animal.Nombre === "Leon") {
          animal.Rugir(playerElement);
        } else if (animal.Nombre === "Lobo") {
          animal.Aullar(playerElement);
        } else if (animal.Nombre === "Oso") {
          animal.Gruñir(playerElement);
        } else if (animal.Nombre === "Serpiente") {
          animal.Sisear(playerElement);
        } else if (animal.Nombre === "Aguila") {
          animal.Chillar(playerElement);
        }
      });

      DIVContainer.appendChild(IMGImagen);
      DIVContainer.appendChild(ButtonSonido);

      animalesContainerElement.appendChild(DIVContainer);
    });
  }

  nombreAnimalElement.addEventListener("change", () => {
    const animalElegido = nombreAnimalElement.value;
    const animalEncontrado = Animales.find(
      (animal) => animal.name === animalElegido
    );

    console.log(animalEncontrado);

    previewAnimalElement.setAttribute(
      "src",
      `./assets/imgs/${animalEncontrado.imagen}`
    );
  });

  btnRegistrarElement.addEventListener("click", () => {
    console.log(
      nombreAnimalElement.value,
      edadAnimalElement.value,
      comentariosAnimalElement.value
    );
    let nombreAnimal = nombreAnimalElement.value;
    let edadAnimal = edadAnimalElement.value;
    let comentariosAnimal = comentariosAnimalElement.value;
    console.log(comentariosAnimal);
    console.log(comentariosAnimal.length);

    /*
     * Verificando que se agreguen todos los datos
     */
    ((verificar) => {
      if (
        comentariosAnimal.length === 0 ||
        nombreAnimal == "Seleccione un animal" ||
        edadAnimal == "Seleccione un rango de años"
      ) {
        alert("Debes completar toda la información");
      } else {
        const animalEncontrado = Animales.find(
          (animal) => animal.name === nombreAnimal
        );

        const params = [
          nombreAnimal,
          edadAnimal,
          animalEncontrado.imagen,
          comentariosAnimal,
          animalEncontrado.sonido,
        ];

        switch (nombreAnimal) {
          case "Leon":
            AnimalCards.push(new Leon(...params));
            break;
          case "Lobo":
            AnimalCards.push(new Lobo(...params));
            break;
          case "Oso":
            AnimalCards.push(new Oso(...params));
            break;
          case "Aguila":
            AnimalCards.push(new Aguila(...params));
            break;
          case "Serpiente":
            AnimalCards.push(new Serpiente(...params));
            break;
        }

        ////////////////////////////////////////////////
        /*
         * Devolver el formulario a su estado inicial
         */

        let options = document.querySelectorAll("option");
        options.forEach((option) => (option.selected = option.defaultSelected));

        // for (var i = 0, l = options.length; i < l; i++) {
        //   options[i].selected = options[i].defaultSelected;
        // }

        $("#comentarios").val("");
        previewAnimalElement.removeAttribute("src");

        console.log(AnimalCards);
        render();
      }
    })();
  });
})();
