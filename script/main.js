// Configuración inicial
let currentName = "Nilkaa";
let currentPhoto = "./img/Nilka_3.jpeg";
let currentMessage =
  "Eres un ser mágico, único e increíble. Deseo cumplas muchos años más, feliz cumpleaños mi preciosaa :D";
let currentColor = "#ff6b9d";

// Elementos DOM
const startScreen = document.querySelector(".start-screen");
const mainContent = document.querySelector(".main-content");
const startBtn = document.getElementById("startBtn");
const userNameInput = document.getElementById("userName");
const messageInput = document.getElementById("birthdayMessage");
const photoSelect = document.getElementById("photoSelect");
const themeColor = document.getElementById("themeColor");
const musicToggle = document.getElementById("musicToggle");
const replayBtn = document.getElementById("replayBtn");
const confettiBtn = document.getElementById("confettiBtn");
const nameElement = document.getElementById("name");
const dynamicName = document.getElementById("dynamicName");
const personalMessage = document.getElementById("personalMessage");
const mainPhoto = document.getElementById("mainPhoto");
const giftBoxes = document.querySelectorAll(".gift-box");
const giftModal = document.getElementById("giftModal");
const modalBody = document.getElementById("modal-body");
const closeModal = document.querySelector(".close-modal");
const lastWishBtn = document.getElementById("lastWishBtn");
const captureBtn = document.getElementById("captureBtn");
const replayLink = document.getElementById("replay");
const ageNumber = document.getElementById("ageNumber");

// Inicialización de Partículas
particlesJS("particles-js", {
  particles: {
    number: { value: 80, density: { enable: true, value_area: 800 } },
    color: { value: ["#ff6b9d", "#6a5af9", "#4cc9f0", "#ffd166"] },
    shape: { type: "circle" },
    opacity: { value: 0.5, random: true },
    size: { value: 3, random: true },
    line_linked: {
      enable: true,
      distance: 150,
      color: "#ffffff",
      opacity: 0.2,
      width: 1,
    },
    move: {
      enable: true,
      speed: 2,
      direction: "none",
      random: true,
      straight: false,
      out_mode: "out",
      bounce: false,
    },
  },
  interactivity: {
    detect_on: "canvas",
    events: {
      onhover: { enable: true, mode: "repulse" },
      onclick: { enable: true, mode: "push" },
    },
  },
});

// Inicialización
document.addEventListener("DOMContentLoaded", () => {
  // Configurar eventos
  setupEventListeners();

  // Configurar animaciones GSAP
  setupAnimations();

  // Inicializar globos
  createBalloons();
});

// Configurar Event Listeners
function setupEventListeners() {
  // Botón de inicio
  startBtn.addEventListener("click", startExperience);

  // Controles de música
  const audio = document.querySelector(".song");
  musicToggle.addEventListener("click", () => {
    if (audio.paused) {
      audio.play();
      musicToggle.innerHTML = '<i class="fas fa-volume-up"></i>';
    } else {
      audio.pause();
      musicToggle.innerHTML = '<i class="fas fa-volume-mute"></i>';
    }
  });

  // Botón de repetir
  replayBtn.addEventListener("click", () => {
    location.reload();
  });

  // Botón de confeti
  confettiBtn.addEventListener("click", createConfetti);

  // Regalos interactivos
  giftBoxes.forEach((box) => {
    box.addEventListener("click", () => openGift(box.dataset.gift));
  });

  // Modal
  closeModal.addEventListener("click", () => {
    giftModal.style.display = "none";
  });

  // Botones finales
  lastWishBtn.addEventListener("click", makeAWish);
  captureBtn.addEventListener("click", captureMoment);
  replayLink.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setTimeout(() => location.reload(), 1000);
  });

  // Cambiar tema en tiempo real
  themeColor.addEventListener("input", (e) => {
    currentColor = e.target.value;
    document.documentElement.style.setProperty("--primary-color", currentColor);
  });
}

// Iniciar la experiencia
function startExperience() {
  // Obtener valores personalizados
  currentName = userNameInput.value || "Nilka";
  currentMessage = messageInput.value || currentMessage;
  currentPhoto = `./img/${photoSelect.value}`;

  // Actualizar elementos
  nameElement.textContent = currentName;
  dynamicName.textContent = currentName;
  personalMessage.textContent = currentMessage;
  mainPhoto.src = currentPhoto;

  // Edad fija en 22 años
  ageNumber.textContent = 22;

  // Ocultar pantalla de inicio
  startScreen.style.opacity = "0";
  setTimeout(() => {
    startScreen.style.display = "none";
    mainContent.classList.remove("hidden");

    // Iniciar música y animaciones
    const audio = document.querySelector(".song");
    audio.volume = 0.5;
    audio.play();

    // Iniciar animaciones
    startAnimations();

    // Mostrar alerta de bienvenida
    Swal.fire({
      title: `¡Feliz Cumpleaños ${currentName}!`,
      text: "Prepárate para una experiencia mágica ✨",
      icon: "success",
      confirmButtonText: "¡Empezar la Magia!",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      color: "white",
    });
  }, 800);
}

// Configurar Animaciones GSAP
function setupAnimations() {
  // Registrar plugins
  gsap.registerPlugin(ScrollTrigger, TextPlugin);

  // Animación de texto para el saludo
  gsap.to(".greeting", {
    duration: 2,
    text: `Holaaaa ${currentName}`,
    ease: "none",
  });

  // Animaciones por sección con ScrollTrigger
  const sections = document.querySelectorAll(".section");

  sections.forEach((section, i) => {
    ScrollTrigger.create({
      trigger: section,
      start: "top 80%",
      onEnter: () => {
        gsap.from(section, {
          opacity: 0,
          y: 50,
          duration: 1,
          ease: "power2.out",
        });
      },
    });
  });

  // Animación de corazones flotantes
  gsap.to(".floating-hearts i", {
    y: -100,
    rotation: 360,
    duration: 3,
    repeat: -1,
    ease: "sine.inOut",
    stagger: 0.5,
  });

  // Animación de efectos de foto
  const effects = document.querySelectorAll(".photo-effects i");
  effects.forEach((effect, i) => {
    gsap.to(effect, {
      x: gsap.utils.random(-50, 50),
      y: gsap.utils.random(-50, 50),
      duration: 2,
      repeat: -1,
      yoyo: true,
      delay: i * 0.3,
    });
  });
}

// Iniciar animaciones principales
function startAnimations() {
  const tl = gsap.timeline();

  tl.from(".one", {
    opacity: 0,
    y: 100,
    duration: 1.5,
    ease: "back.out(1.7)",
  })
    .from(
      ".sparkle",
      {
        scale: 0,
        rotation: 360,
        duration: 1,
        ease: "elastic.out(1, 0.5)",
      },
      "-=0.5",
    )
    .from(
      ".highlight",
      {
        scale: 3,
        opacity: 0,
        duration: 1,
        ease: "power2.out",
      },
      "-=0.5",
    )
    .from(".subtitle", {
      opacity: 0,
      y: 20,
      duration: 1,
    });
}

// Crear globos dinámicos
function createBalloons() {
  const container = document.querySelector(".balloons-container");
  const colors = ["#ff6b9d", "#6a5af9", "#4cc9f0", "#ffd166", "#06d6a0"];

  for (let i = 0; i < 30; i++) {
    const balloon = document.createElement("div");
    balloon.className = "balloon";

    // Estilos aleatorios
    const size = Math.random() * 60 + 40;
    const color = colors[Math.floor(Math.random() * colors.length)];
    const left = Math.random() * 100;
    const duration = Math.random() * 20 + 10;

    balloon.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size * 1.2}px;
      background: ${color};
      border-radius: 50%;
      left: ${left}%;
      bottom: -100px;
      box-shadow: inset -10px -10px 0 rgba(0,0,0,0.07);
      animation: float ${duration}s ease-in infinite;
      animation-delay: ${Math.random() * 5}s;
    `;

    // Añadir hilo
    const string = document.createElement("div");
    string.style.cssText = `
      position: absolute;
      background-color: rgba(255,255,255,0.7);
      width: 2px;
      height: ${size * 2}px;
      top: ${size * 1.2}px;
      left: 50%;
      transform: translateX(-50%);
    `;

    balloon.appendChild(string);
    container.appendChild(balloon);

    // Animación GSAP para movimiento lateral
    gsap.to(balloon, {
      x: gsap.utils.random(-50, 50),
      duration: gsap.utils.random(3, 6),
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
  }
}

// Crear confeti
function createConfetti() {
  const confettiCount = 200;
  const container = document.querySelector(".fireworks");

  for (let i = 0; i < confettiCount; i++) {
    const confetti = document.createElement("div");
    confetti.className = "confetti";

    // Propiedades aleatorias
    const colors = ["#ff6b9d", "#6a5af9", "#4cc9f0", "#ffd166", "#06d6a0"];
    const color = colors[Math.floor(Math.random() * colors.length)];
    const size = Math.random() * 10 + 5;
    const left = Math.random() * 100;

    confetti.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      background: ${color};
      top: -20px;
      left: ${left}%;
      border-radius: ${Math.random() > 0.5 ? "50%" : "0"};
    `;

    container.appendChild(confetti);

    // Animación
    gsap.to(confetti, {
      y: window.innerHeight + 100,
      rotation: Math.random() * 720,
      duration: Math.random() * 3 + 2,
      ease: "power2.out",
      onComplete: () => confetti.remove(),
    });
  }
}

// Abrir regalo
function openGift(type) {
  let content = "";

  switch (type) {
    case "wish":
      content = `
        <h3><i class="fas fa-star"></i> Mi Deseo Para Ti</h3>
        <p>Que cada día de tu vida esté lleno de la misma magia que tú traes al mundo. Que tus sueños se hagan realidad y que siempre encuentres razones para sonreír.</p>
        <div class="wish-star">
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
        </div>
      `;
      break;

    case "message":
      content = `
        <h3><i class="fas fa-envelope-open-text"></i> Mensaje Secreto</h3>
        <p>Sabes que eres especial no solo hoy, sino todos los días. Eres esa persona que ilumina los momentos simples y hace que todo valga la pena.</p>
        <p class="secret-note">"La vida es mejor contigo en ella"</p>
      `;
      break;

    case "secret":
      content = `
        <h3><i class="fas fa-key"></i> Sorpresa Especial</h3>
        <p>Has desbloqueado una promesa: La próxima vez que nos veamos, habrá un regalo especial esperándote. ¡Guarda este mensaje!</p>
        <div class="secret-code">
          <p><strong>Código Secreto:</strong> ${currentName.toUpperCase()}-${Date.now().toString(36)}</p>
        </div>
      `;
      break;
  }

  modalBody.innerHTML = content;
  giftModal.style.display = "flex";

  // Animación del modal
  gsap.from(".modal-content", {
    scale: 0,
    rotation: 180,
    duration: 0.8,
    ease: "back.out(1.7)",
  });
}

// Pedir un deseo
function makeAWish() {
  Swal.fire({
    title: "Pide un Deseo",
    input: "textarea",
    inputLabel: "Escribe tu deseo más profundo (se mantendrá en secreto)",
    inputPlaceholder: "Mi deseo es...",
    showCancelButton: true,
    confirmButtonText: "Enviar al Universo",
    cancelButtonText: "Cancelar",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    color: "white",
    customClass: {
      input: "wish-textarea",
    },
  }).then((result) => {
    if (result.isConfirmed && result.value) {
      // Crear efecto visual del deseo
      const wishStar = document.createElement("div");
      wishStar.innerHTML = '<i class="fas fa-star"></i>';
      wishStar.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        font-size: 5rem;
        color: gold;
        z-index: 1000;
        transform: translate(-50%, -50%);
      `;

      document.body.appendChild(wishStar);

      // Animación del deseo
      gsap.to(wishStar, {
        scale: 3,
        opacity: 0,
        duration: 2,
        ease: "power2.out",
        onComplete: () => wishStar.remove(),
      });

      Swal.fire({
        title: "✨ Deseo Enviado ✨",
        text: "Tu deseo ha sido enviado al universo. ¡Que se haga realidad!",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });
    }
  });
}

// Capturar momento
function captureMoment() {
  html2canvas(document.querySelector(".main-content")).then((canvas) => {
    // Crear enlace de descarga
    const link = document.createElement("a");
    link.download = `feliz-cumple-${currentName.toLowerCase()}.png`;
    link.href = canvas.toDataURL();
    link.click();

    // Mostrar confirmación
    Swal.fire({
      title: "¡Momento Capturado!",
      text: "La imagen se ha descargado en tu dispositivo",
      icon: "success",
      timer: 2000,
      showConfirmButton: false,
    });
  });
}

// Añadir estilos adicionales para el textarea del deseo
const style = document.createElement("style");
style.textContent = `
  .wish-textarea {
    background: rgba(255,255,255,0.1) !important;
    color: white !important;
    border: 2px solid rgba(255,255,255,0.3) !important;
    border-radius: 10px !important;
    padding: 1rem !important;
  }
  
  .balloon {
    position: absolute;
  }
  
  @keyframes float {
    0% {
      transform: translateY(0) rotate(0);
    }
    100% {
      transform: translateY(-100vh) rotate(360deg);
    }
  }
  
  .confetti {
    position: absolute;
  }
`;
document.head.appendChild(style);

// Exportar funciones para depuración
window.app = {
  startExperience,
  createConfetti,
  openGift,
  makeAWish,
  captureMoment,
};
