async function loadHTML(id, file) {
  const el = document.getElementById(id);
  const res = await fetch(file);
  if (res.ok) {
    el.innerHTML = await res.text();
    if (id === "top-bar-thing") {
      highlightActiveLink(); // after header loads
      initScrollHeader(); // Initialize scroll effect after header loads
    }
  }
}

// Highlight the current nav link
function highlightActiveLink() {
  const currentPage = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll("#top-bar-thing .nav-link").forEach(link => {
    if (link.getAttribute("data-page") === currentPage) {
      link.classList.add("active");
    }
  });
}

// Hides header on scroll down, shows on scroll up
function initScrollHeader() {
  let lastScrollTop = 0;
  const header = document.getElementById('mainHeader');
  if (!header) return; // Exit if header not found

  window.addEventListener('scroll', function() {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollTop > lastScrollTop && scrollTop > header.offsetHeight) {
      // Scrolling down
      header.style.top = `-${header.offsetHeight}px`;
    } else {
      // Scrolling up
      header.style.top = '0';
    }
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
  });
}

loadHTML("top-bar-thing", "elements/header.html");
loadHTML("bottom-bar-thing", "elements/footer.html");