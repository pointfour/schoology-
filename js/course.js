function main() {
  customResources();
}
main();

function customResources() {
  Scrape.layerCourseData(UrlExtractor.getCourse(), false, links => {
    let main = document.getElementById("main");
    let newCont = elemMaker("div", {
      classList: "resources-container"
    });
    main.prepend(newCont);
    for (let i = 0; i < links.length; i++) {
      newCont.prepend(createSection(links[i]));
    }
  });
}
//https://pausd.schoology.com/course/1668821352/materials?ajax=1&f=128662894
function createSection(data) {
  let ret = elemMaker("div", {
    classList: "resource"
  });
  let inner = elemMaker("a", {
    href: data.href,
    innerText: data.title
  });
  ret.appendChild(inner);
  if (data.folder) {
    inner.classList = "folder-link";
    ret.prepend(createExpandButton());
  }
  return ret;
}

function createExpandButton() {
  let btn = elemMaker("a", {
    classList: "expand-btn"
  });
  let tringle = elemMaker("a", {
    classList: "triangle-right tringle"
  });
  btn.appendChild(tringle);
  btn.addEventListener("click", e => {
    if (tringle.classList.contains("triangle-right")) {
      tringle.classList.remove("triangle-right");
      tringle.classList.add("triangle-down");
    } else {
      tringle.classList.add("triangle-right");
      tringle.classList.remove("triangle-down");
    }
  });
  return btn;
}

//utils
function removeElem(elem) {
  elem.parentNode.removeChild(elem);
}

function elemMaker(elem, config) {
  let element = document.createElement(elem);
  for (key in config) element[key] = config[key];
  return element;
}
