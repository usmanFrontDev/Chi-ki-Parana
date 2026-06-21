const $ = (s) => document.querySelector(s),
  $$ = (s) => document.querySelectorAll(s);

const seenSite = sessionStorage.getItem("ckp-seen");

if (seenSite) {
  document.documentElement.classList.add("skip-preloader");
} else {
  window.addEventListener("load", () => {
    setTimeout(() => {
      $(".preloader")?.classList.add("hide");
      sessionStorage.setItem("ckp-seen", "1");
    }, 450);
  });
}

const nav = $("#nav"),
  navPanel = $(".nav-panel"),
  hamb = $(".hamb");

hamb?.addEventListener("click", () => navPanel?.classList.toggle("open"));

window.addEventListener("scroll", () =>
  nav?.classList.toggle("scrolled", scrollY > 18),
);

function revealNow() {
  $$(".reveal").forEach((el, i) => {
    const r = el.getBoundingClientRect();
    if (r.top < innerHeight - 70)
      setTimeout(() => el.classList.add("show"), Math.min(i * 24, 260));
  });
}
window.addEventListener("scroll", revealNow);
window.addEventListener("resize", revealNow);
revealNow();

$$(".filter-btn").forEach((btn) =>
  btn.addEventListener("click", () => {
    $$(".filter-btn").forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    const f = btn.dataset.filter;
    $$(".article[data-cat]").forEach(
      (a) =>
        (a.style.display =
          f === "all" || a.dataset.cat === f ? "flex" : "none"),
    );
  }),
);

const contactForm = $("#contact-form");
contactForm?.addEventListener("submit", (e) => {
  e.preventDefault();
  alert(
    "Thank you. This form is ready to connect with your hosting/email setup.",
  );
});

const studioForm = $("#studio-rental-form");
studioForm?.addEventListener("submit", (e) => {
  e.preventDefault();
  const first =
    studioForm.querySelector('[name="name"]')?.value?.trim().split(/\s+/)[0] ||
    "there";
  studioForm.hidden = true;
  const thanks = $("#studio-form-thanks");
  if (thanks) {
    thanks.hidden = false;
    thanks.querySelector("h3").textContent = `Thank you, ${first}!`;
    thanks.classList.add("show");
  }
});

$$(".nav-panel a").forEach((a) =>
  a.addEventListener("click", () => navPanel?.classList.remove("open")),
);
