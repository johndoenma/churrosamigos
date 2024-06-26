// PARALLAX
function parallax({ el, ease = "linear" }) {
  let ticking = false;
  

  function runParallax() {
    const pageTop = window.pageYOffset;
    const pageMid = pageTop + window.innerHeight / 2;

    // Run this if it already has a data attribute set
    const topSection = el.offsetTop;
    const midSection = topSection + el.offsetHeight / 2;

    const viewDistanceLeft = pageMid - midSection;
    const parallaxSpeed = parseFloat(el.getAttribute("data-parallax-speed"));

    // Sets the parallax direction
    let direction = "";

    if (el.hasAttribute("data-parallax-direction")) {
      // Direction to value of the attribute
      direction = el.getAttribute("data-parallax-direction");
    } else {
      // Set default direction to vertical
      direction = "vertical";
    }

    // Handle transform based on direction
    if (direction.toLowerCase() === "vertical") {
      el.style.transform = `translate3d(0, ${
        (viewDistanceLeft * parallaxSpeed) / 3
      }px, 0)`;
    } else if (direction.toLowerCase() === "horizontal") {
      el.style.transform = `translate3d( ${
        (viewDistanceLeft * parallaxSpeed) / 3
      }px, 0, 0)`;
    }

    el.style.transition = `transform ${ease}`;
  }

  window.addEventListener("scroll", () => {
    
    if (!ticking) {
      window.requestAnimationFrame(() => {
        runParallax();
        ticking = false;
      });
    }
    ticking = true;
  });
}

// Parallax
const parallaxElements = document.querySelectorAll(".parallax-layer");
parallaxElements.forEach((el) => parallax({ el }));
