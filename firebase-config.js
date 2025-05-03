// firebase-config.js (com compat)
const firebaseConfig = {
  apiKey: "AIzaSyCC0sAA9Ys6jFReOpe6E9gUr7TaWEnLRWg",
  authDomain: "elvono-aa6f3.firebaseapp.com",
  projectId: "elvono-aa6f3",
  storageBucket: "elvono-aa6f3.appspot.com",
  messagingSenderId: "818254575701",
  appId: "1:818254575701:web:d9fb1fa61fc592d48ffcdc",
  measurementId: "G-7M2FX78GNV"
};

// Inicializa Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Validação simples de email
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email.toLowerCase());
}

// Lida com o formulário
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("subscribe-form");
  const emailInput = document.getElementById("emailInput");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = emailInput.value.trim().toLowerCase();
    const currentLang = document.documentElement.lang || "en";
    const submitButton = form.querySelector("button");

    if (!validateEmail(email)) {
      alert(getMessage("invalid", currentLang));
      return;
    }

    submitButton.disabled = true;
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';

    try {
      const snapshot = await db.collection("emails").where("email", "==", email).get();
      if (!snapshot.empty) {
        alert(getMessage("exists", currentLang));
        return;
      }

      await db.collection("emails").add({
        email: email,
        criado_em: new Date(),
        idioma: currentLang
      });

      showFeedback("success", getMessage("success", currentLang));
      emailInput.value = "";
    } catch (error) {
      console.error("Erro ao salvar:", error);
      showFeedback("error", getMessage("error", currentLang));
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = getMessage("button", currentLang);
    }
  });
});

// Traduções
function getMessage(type, lang) {
  const messages = {
    success: {
      en: "Thank you for subscribing!",
      pt: "Obrigado por se inscrever!",
      es: "¡Gracias por suscribirte!",
      fr: "Merci de vous être inscrit!"
    },
    error: {
      en: "An error occurred. Please try again.",
      pt: "Ocorreu um erro. Por favor, tente novamente.",
      es: "Ocurrió un error. Inténtalo de nuevo.",
      fr: "Une erreur s'est produite. Veuillez réessayer."
    },
    exists: {
      en: "This email is already registered.",
      pt: "Este email já está registrado.",
      es: "Este correo ya está registrado.",
      fr: "Cet email est déjà enregistré."
    },
    invalid: {
      en: "Please enter a valid email address.",
      pt: "Por favor, insira um email válido.",
      es: "Introduce una dirección de correo válida.",
      fr: "Veuillez entrer une adresse e-mail valide."
    },
    button: {
      en: "Notify Me",
      pt: "Notificar-me",
      es: "Notificarme",
      fr: "Me notifier"
    }
  };

  return messages[type]?.[lang] || messages[type]?.en;
}

// Mensagem temporária
function showFeedback(type, text) {
  const div = document.createElement("div");
  div.className = type === "success" ? "success-message" : "error-message";
  div.textContent = text;
  const parent = document.querySelector(".newsletter");
  parent.appendChild(div);

  setTimeout(() => {
    div.style.opacity = "0";
    setTimeout(() => div.remove(), 300);
  }, 3000);
}
