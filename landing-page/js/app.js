/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
 */

/**
 * Define Global Variables
 *
 */

const navEl = document.getElementById("navbar__list");
const sectionList = document.querySelectorAll("section");

/**
 * End Global Variables
 * Start Helper Functions
 *
 */

function isElementInViewport(el) {
  const rect = el.getBoundingClientRect();

  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

function createVisibilityChange(el, callback) {
  let previousVisibility;
  return function handler() {
    const visible = isElementInViewport(el);
    if (visible != previousVisibility) {
      previousVisibility = visible;
      if (typeof callback === "function") {
        callback(el, previousVisibility);
      }
    }
  };
}

function updateSectionStyle(el, visibility) {
  if (visibility) {
    el.classList.add("active__section");
    updateNavLinkStyle(el.id);
  } else {
    el.classList.remove("active__section");
  }
}

function updateNavLinkStyle(elementId) {
  navEl.childNodes.forEach((node) => {
    if (
      node.firstElementChild["attributes"]["data-id"]["value"] === elementId
    ) {
      node.classList.add("active");
    } else {
      node.classList.remove("active");
    }
  });
}

function scrollElementIntoView(el) {
  el.scrollIntoView();
}

function setHandlers(handler) {
  window.addEventListener("DOMContentLoaded", handler, false);
  window.addEventListener("load", handler, false);
  window.addEventListener("scroll", handler, false);
  window.addEventListener("resize", handler, false);
}

/**
 * End Helper Functions
 * Begin Main Functions
 *
 */

// build the nav
const fragment = document.createDocumentFragment();

sectionList.forEach((section) => {
  const listItem = document.createElement("li");
  listItem.innerHTML = `
    <a href="#${section["id"]}" class="menu__link" data-id="${section["id"]}">
      ${section["attributes"]["data-nav"]["value"]}
    </a>
  `;
  fragment.appendChild(listItem);
});

navEl.appendChild(fragment);

// Add class 'active' to section when near top of viewport

// Scroll to anchor ID using scrollTO event

/**
 * End Main Functions
 * Begin Events
 *
 */

sectionList.forEach((el) => {
  setHandlers(createVisibilityChange(el, updateSectionStyle));
});

// Build menu

// Scroll to section on link click

// Set sections as active
