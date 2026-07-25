if (window.location.hash === "") {
  document
    .querySelectorAll(".sidebar li a")[0]
    .parentNode.classList.add("active");
}
function tabActive(element) {
  document.querySelectorAll(".sidebar li a").forEach((e) => {
    e.parentNode.classList.remove("active");
  });
  window.addEventListener("hashchange", () => {
    var hash = element.getAttribute("href");
    var li = element.parentNode;
    if (window.location.hash === hash) {
      li.classList.add("active");
    } else if (window.location.hash === "") {
      document
        .querySelectorAll(".sidebar li a")[0]
        .parentNode.classList.add("active");
    } else {
      // empty code
    }
  });
}
