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
  return ret;
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
