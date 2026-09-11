/* ===================== JobNoar - פונקציות משותפות ===================== */

function qs(name) {
  return new URLSearchParams(window.location.search).get(name);
}

function badgeClass(type) {
  return (
    {
      green: "badge-green",
      pink: "badge-pink",
      blue: "badge-blue",
      amber: "badge-amber"
    }[type] || "badge-green"
  );
}

function renderBadges(badges) {
  if (!badges || !badges.length) return "";
  return (
    '<div class="job-badges">' +
    badges
      .map(
        (b) =>
          `<span class="badge ${badgeClass(b.type)}">${b.icon || ""} ${b.text}</span>`
      )
      .join("") +
    "</div>"
  );
}

function waLink(number, text) {
  const clean = (number || "").replace(/\D/g, "");
  return `https://wa.me/${clean}?text=${encodeURIComponent(text)}`;
}

document.addEventListener("DOMContentLoaded", () => {
  // מובייל: פתיחת/סגירת תפריט ניווט
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".main-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", () => nav.classList.toggle("open"));
    nav.querySelectorAll("a").forEach((a) =>
      a.addEventListener("click", () => nav.classList.remove("open"))
    );
  }

  // כפתור וואטסאפ צף כללי + כל קישורי "צ'אט בוואטסאפ" בתפריט/פוטר
  if (typeof SITE_WHATSAPP !== "undefined") {
    const greeting = "שלום! יש לי שאלה לגבי ג'ובנוער 🙂";

    document.querySelectorAll(".wa-general-link").forEach((a) => {
      a.href = waLink(SITE_WHATSAPP, greeting);
    });

    if (!document.querySelector(".wa-float")) {
      const a = document.createElement("a");
      a.className = "wa-float";
      a.href = waLink(SITE_WHATSAPP, greeting);
      a.target = "_blank";
      a.rel = "noopener";
      a.title = "צ'אט בוואטסאפ";
      a.innerHTML = "💬";
      document.body.appendChild(a);
    }
  }
});
