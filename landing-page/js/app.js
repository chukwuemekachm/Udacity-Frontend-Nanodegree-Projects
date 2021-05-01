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
const observerOptions = {
  root: null,
  rootMargin: "0px",
  threshold: 0.5,
};

/**
 * End Global Variables
 * Start Helper Functions
 *
 */

function createObserver(sections, handler) {
  const observer = new IntersectionObserver(handler, observerOptions);
  sections.forEach((section) => observer.observe(section));
}

function intersectionObserverHandler(entries) {
  entries.forEach((entry) =>
    updateSectionStyle(entry.target, entry.isIntersecting)
  );
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

/**
 * End Main Functions
 * Begin Events
 *
 */
createObserver(sectionList, intersectionObserverHandler);
