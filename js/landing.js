const root = document.querySelector("[data-carousel]");
if (root) {
  const track = root.querySelector("[data-track]");
  const slides = [...root.querySelectorAll("[data-slide]")];
  const dots = root.querySelector("[data-dots]");
  const count = root.querySelector("[data-count]");
  const total = root.querySelector("[data-total]");
  const live = root.querySelector("[data-live]");
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let index = 0;
  let timer = 0;
  let startX = null;
  let dragged = false;

  total.textContent = String(slides.length).padStart(2, "0");
  dots.innerHTML = slides
    .map(
      (_, i) =>
        `<button type="button" data-dot="${i}" aria-label="Vai al capo ${i + 1} di ${slides.length}"></button>`
    )
    .join("");

  function labelOf(slide) {
    return slide.querySelector(".landing-slide-label")?.textContent.replace(/\s+/g, " ").trim() || "";
  }

  function show(next) {
    index = (next + slides.length) % slides.length;
    track.style.transform = `translateX(-${index * 100}%)`;
    slides.forEach((slide, i) => {
      const on = i === index;
      slide.toggleAttribute("inert", !on);
      slide.setAttribute("aria-hidden", on ? "false" : "true");
    });
    dots.querySelectorAll("button").forEach((dot, i) => {
      const on = i === index;
      dot.classList.toggle("is-active", on);
      if (on) dot.setAttribute("aria-current", "true");
      else dot.removeAttribute("aria-current");
    });
    count.textContent = String(index + 1).padStart(2, "0");
    live.textContent = `${labelOf(slides[index])}, ${index + 1} di ${slides.length}`;
  }

  function stop() {
    window.clearInterval(timer);
    timer = 0;
  }

  function start() {
    stop();
    if (reduce || document.hidden) return;
    timer = window.setInterval(() => show(index + 1), 5000);
  }

  root.querySelector("[data-prev]").addEventListener("click", () => {
    show(index - 1);
    start();
  });
  root.querySelector("[data-next]").addEventListener("click", () => {
    show(index + 1);
    start();
  });
  dots.addEventListener("click", (event) => {
    const button = event.target.closest("[data-dot]");
    if (!button) return;
    show(Number(button.dataset.dot));
    start();
  });
  root.addEventListener("keydown", (event) => {
    if (event.key === "ArrowRight") {
      show(index + 1);
      start();
    }
    if (event.key === "ArrowLeft") {
      show(index - 1);
      start();
    }
  });
  root.addEventListener("mouseenter", stop);
  root.addEventListener("mouseleave", start);
  root.addEventListener("focusin", stop);
  root.addEventListener("focusout", (event) => {
    if (!root.contains(event.relatedTarget)) start();
  });
  root.addEventListener("pointerdown", (event) => {
    if (event.target.closest("button")) return;
    startX = event.clientX;
    dragged = false;
  });
  root.addEventListener("pointerup", (event) => {
    if (startX == null || event.target.closest("button")) {
      startX = null;
      return;
    }
    const delta = event.clientX - startX;
    if (Math.abs(delta) > 48) {
      dragged = true;
      show(index + (delta < 0 ? 1 : -1));
      start();
    }
    startX = null;
  });
  root.addEventListener("click", (event) => {
    if (!dragged) return;
    event.preventDefault();
    dragged = false;
  });
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) stop();
    else start();
  });

  show(0);
  start();
}
