// Regex
const regexName = /^[A-Z][A-Za-z\é\è\ê\ô\-]+$/;
const regexPassword =
  /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/;

// Récupération des différents éléments
let lastName = document.querySelector("#name");
let password = document.querySelector("#password");
const submitBtn = document.querySelector("#login__btn");
const userInput = document.querySelector("#captcha__form");
const refreshBtn = document.querySelector(".captcha__btn__refresh");
const preview = document.querySelector(".preview");

// Création de la variable text
let text = "";

// Fonction lastNameValidation ayant pour paramètre le nom saisi par l'utilisateur
const lastNameValidation = (lastName) => {
  // Ecoute de l'événement "change" sur l'input firstName
  lastName.addEventListener("change", (e) => {
    e.preventDefault();
    if (regexName.test(lastName.value) === false) {
      document.querySelector("#lastNameErrorMsg").textContent =
        "Veuillez saisir un nom valide, ex : Dupont";
      return false;
    } else {
      document.querySelector("#lastNameErrorMsg").textContent = " ";
      return true;
    }
  });
};
// Appel de la fonction lastNameValidation
lastNameValidation(lastName);

// Fonction passwordValidation ayant pour paramètre le mot de passe saisi par l'internaute
const passwordValidation = (password) => {
  // Ecoute de l'événement "change" sur l'input password
  password.addEventListener("change", (e) => {
    e.preventDefault();
    if (regexPassword.test(password.value) === false) {
      document.querySelector("#passwordErrorMsg").textContent =
        "Votre mot de passe doit contenir entre 8 et 16 caractères dont une majuscule, une minuscule, un chiffre et un caractère spécial.";
      return false;
    } else {
      document.querySelector("#passwordErrorMsg").textContent = " ";
      return true;
    }
  });
};

// Appel de la fonction passwordValidation
passwordValidation(password);

// Fonction Generate text
const textGenerator = () => {
  let generatedText = "";
  /*String.fromCharCode gives ASCII value from a given number*/
  // Total de 9 lettres en faisant des boucle de 3
  for (let i = 0; i < 3; i++) {
    // 65-90 nombres compris entre 65 et 90 sont des lettres majuscules
    generatedText += String.fromCharCode(randomNumber(65, 90));
    // 97-122 nombres compris entre 97 et 122 sont des lettres minuscules
    generatedText += String.fromCharCode(randomNumber(97, 122));
    // 48-57 nombres compris entre 48 et 57 représentent des nombres entre 0 et 9
    generatedText += String.fromCharCode(randomNumber(48, 57));
  }
  return generatedText;
};

// Fonction randomNumber pour générer un nombre aléatoire
const randomNumber = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);

// Fonction triggerFunction
const triggerFunction = () => {
  // clear input
  userInput.value = "";
  text = textGenerator();
  console.log(text);
  // randomisez le texte de sorte qu'à chaque fois la position des chiffres et des lettres minuscules soit aléatoire
  text = [...text].sort(() => Math.random() - 0.5).join("");
  console.log(text);
  preview.textContent = text;
};

// Ecoute du  click sur le bouton refresh pour faire apparaître un captcha
refreshBtn.addEventListener("click", triggerFunction);

// Ecoute de l'événement click sur le bouton s'inscrire
submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (
    regexName.test(lastName.value) === false ||
    regexPassword.test(password.value) == false ||
    userInput.value !== text
  ) {
    alert("Veuillez remplir correctement les différents champs !!!");
  } else {
    alert("Inscription réussie !");
  }
});
