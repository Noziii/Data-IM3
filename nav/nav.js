var current;
fetch("nav/nav.html")
  .then((res) => res.text())
  .then((text) => {
    let oldelem = document.querySelector("script#navbar");
    let newelem = document.createElement("div");
    newelem.innerHTML = text;
    oldelem.parentNode.replaceChild(newelem, oldelem);

    var currentLocation = location.href;
    var menuItem = document.querySelectorAll("a");
    var menuLength = menuItem.length;
    for (let i = 0; i < menuLength; i++) {
      if (menuItem[i].href === currentLocation) {
        menuItem[i].className = "active";
      }
    }
  });
