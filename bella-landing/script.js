const menuToggle = document.querySelector(".menu-toggle");
const navPanel = document.querySelector(".nav-panel");
const leadForm = document.querySelector("#leadForm");
const tipoJoya = document.querySelector("#tipoJoya");
const formStatus = document.querySelector("#formStatus");

// Reemplaza este número por el WhatsApp real de la marca, con código de país y sin signos.
const WHATSAPP_NUMBER = "51999999999";

menuToggle.addEventListener("click", () => {
  const isOpen = navPanel.classList.toggle("is-open");
  document.body.classList.toggle("menu-open", isOpen);
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.innerHTML = isOpen
    ? '<svg><use href="#icon-close"></use></svg>'
    : '<svg><use href="#icon-menu"></use></svg>';
});

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", () => {
    if (navPanel.classList.contains("is-open")) {
      navPanel.classList.remove("is-open");
      document.body.classList.remove("menu-open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.innerHTML = '<svg><use href="#icon-menu"></use></svg>';
    }

    const choice = link.dataset.choice;
    if (choice && tipoJoya) {
      tipoJoya.value = choice;
    }
  });
});

leadForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const data = new FormData(leadForm);
  const nombre = data.get("nombre").trim();
  const whatsapp = data.get("whatsapp").trim();
  const correo = data.get("correo").trim();
  const tipo = data.get("tipo").trim();
  const mensaje = data.get("mensaje").trim();

  if (!nombre || !whatsapp || !tipo) {
    formStatus.textContent = "Completa nombre, WhatsApp y tipo de joya para continuar.";
    return;
  }

  const text = [
    "Hola Bella, quiero recibir asesoría.",
    `Nombre: ${nombre}`,
    `WhatsApp: ${whatsapp}`,
    correo ? `Correo: ${correo}` : "",
    `Interes: ${tipo}`,
    mensaje ? `Mensaje: ${mensaje}` : ""
  ].filter(Boolean).join("\n");

  formStatus.textContent = "Perfecto, abriremos WhatsApp con tu solicitud.";
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, "_blank");
});
