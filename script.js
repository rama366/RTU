// ======= EDIT THESE =======
const RTU_EMAIL = "support@rtu.example";
const WHATSAPP_NUMBER_INTERNATIONAL = "27000000000"; // e.g. South Africa +27... => 27xxxxxxxxx
// ==========================

const menuBtn = document.getElementById("menuBtn");
const menu = document.getElementById("menu");

if (menuBtn && menu) {
  menuBtn.addEventListener("click", () => {
    const isOpen = menu.classList.toggle("show");
    menuBtn.setAttribute("aria-expanded", String(isOpen));
  });

  // Close menu when a link is clicked (mobile)
  menu.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
    menu.classList.remove("show");
    menuBtn.setAttribute("aria-expanded", "false");
  }));
}

// Footer year
document.getElementById("year").textContent = new Date().getFullYear();

// Email links
const emailHref = `mailto:${RTU_EMAIL}?subject=${encodeURIComponent("RTU Support Request")}`;
const emailLink = document.getElementById("emailLink");
const emailText = document.getElementById("emailText");
if (emailLink) emailLink.href = emailHref;
if (emailText) {
  emailText.href = emailHref;
  emailText.textContent = RTU_EMAIL;
}

// WhatsApp links
const waMsg = encodeURIComponent("Hello RTU Support, I need help with...");
const waHref = `https://wa.me/${WHATSAPP_NUMBER_INTERNATIONAL}?text=${waMsg}`;
const waLink = document.getElementById("waLink");
const waText = document.getElementById("waText");
if (waLink) waLink.href = waHref;
if (waText) {
  waText.href = waHref;
  waText.textContent = `+${WHATSAPP_NUMBER_INTERNATIONAL}`;
}

// Simple always-on status indicator (client-side)
const statusDot = document.getElementById("statusDot");
const statusText = document.getElementById("statusText");

async function updateStatus() {
  try {
    // Ping a lightweight request to confirm the site can reach the internet
    await fetch("https://www.cloudflare.com/cdn-cgi/trace", { cache: "no-store" });
    statusDot.style.background = "#34d399"; // green
    statusText.textContent = "Support is online";
  } catch {
    statusDot.style.background = "#f59e0b"; // amber
    statusText.textContent = "You seem offline — you can still submit the form when back online";
  }
}
updateStatus();
setInterval(updateStatus, 60000);
