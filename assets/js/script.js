'use strict';

/**
 * element toggle function
 */

const elemToggleFunc = function (elem) { elem.classList.toggle("active"); }



/**
 * navbar toggle
 */

const navbar = document.querySelector("[data-navbar]");
const overlay = document.querySelector("[data-overlay]");
const navCloseBtn = document.querySelector("[data-nav-close-btn]");
const navOpenBtn = document.querySelector("[data-nav-open-btn]");
const navbarLinks = document.querySelectorAll("[data-nav-link]");

const navElemArr = [overlay, navCloseBtn, navOpenBtn];

/**
 * close navbar when click on any navbar link
 */

for (let i = 0; i < navbarLinks.length; i++) { navElemArr.push(navbarLinks[i]); }

/**
 * addd event on all elements for toggling navbar
 */

for (let i = 0; i < navElemArr.length; i++) {
  navElemArr[i].addEventListener("click", function () {
    elemToggleFunc(navbar);
    elemToggleFunc(overlay);
  });
}



/**
 * header active state
 */

const header = document.querySelector("[data-header]");

window.addEventListener("scroll", function () {
  window.scrollY >= 400 ? header.classList.add("active")
    : header.classList.remove("active");
});


/**
 * horizontal scroll helpers
 */

const scrollWrappers = document.querySelectorAll("[data-scroll-container]");

scrollWrappers.forEach((wrapper) => {
  const scroller = wrapper.querySelector("[data-scroll-target]");
  const prevButton = wrapper.querySelector('[data-scroll-button="left"]');
  const nextButton = wrapper.querySelector('[data-scroll-button="right"]');

  if (!scroller || !prevButton || !nextButton) return;

  let hintTimeout = null;
  let hasShownHint = false;

  const updateState = () => {
    const maxScroll = Math.max(scroller.scrollWidth - scroller.clientWidth, 0);
    const tolerance = 2;
    const scrollable = maxScroll > tolerance;
    const atStart = scroller.scrollLeft <= tolerance;
    const atEnd = scroller.scrollLeft >= maxScroll - tolerance;

    wrapper.classList.toggle("is-scrollable", scrollable);
    wrapper.classList.toggle("is-start", atStart || !scrollable);
    wrapper.classList.toggle("is-end", atEnd || !scrollable);

    prevButton.disabled = !scrollable || atStart;
    nextButton.disabled = !scrollable || atEnd;

    if (!scrollable) {
      wrapper.classList.remove("show-hint");
    }
  };

  const cancelHint = () => {
    if (!wrapper.classList.contains("has-interacted")) {
      wrapper.classList.add("has-interacted");
    }

    hasShownHint = true;
    wrapper.classList.remove("show-hint");
    window.clearTimeout(hintTimeout);
  };

  const maybeShowHint = () => {
    if (
      wrapper.classList.contains("is-scrollable") &&
      !wrapper.classList.contains("has-interacted") &&
      !hasShownHint
    ) {
      wrapper.classList.add("show-hint");
      hasShownHint = true;

      window.clearTimeout(hintTimeout);
      hintTimeout = window.setTimeout(() => {
        wrapper.classList.remove("show-hint");
      }, 2400);
    }
  };

  const scrollByAmount = (direction) => {
    const scrollAmount = scroller.clientWidth * 0.9;
    scroller.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth"
    });
  };

  prevButton.addEventListener("click", () => {
    cancelHint();
    scrollByAmount("left");
  });

  nextButton.addEventListener("click", () => {
    cancelHint();
    scrollByAmount("right");
  });

  const handleScroll = () => {
    updateState();
    cancelHint();
  };

  scroller.addEventListener("scroll", handleScroll, { passive: true });

  [prevButton, nextButton, scroller].forEach((element) => {
    element.addEventListener("pointerdown", cancelHint, { once: true });
  });

  const initialize = () => {
    updateState();

    if (!wrapper.classList.contains("has-interacted")) {
      requestAnimationFrame(maybeShowHint);
    }
  };

  initialize();

  window.addEventListener("resize", () => {
    updateState();

    if (!wrapper.classList.contains("has-interacted")) {
      maybeShowHint();
    }
  });
});