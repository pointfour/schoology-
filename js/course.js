function main() {
  customResources();
  Scrape.layerCourseData("1668824218", false);
  Scrape.layerCourseData("1668824218", 127656078);
}
main();

function customResources() {
  let cont = document.getElementById("folder-contents-table").children[0];
  let links = [];
  for (let i = 0; i < cont.children.length; i++) {
    let allTheA = cont.children[i].querySelectorAll("a.sExtlink-processed");
    let theA = allTheA[allTheA.length - 1];
    let isFolder = theA.parentElement.className == "folder-title";
    let description;
    let descElement = cont.children[i].querySelector(
      ".folder-description,.item-body p"
    );
    if (descElement && descElement.innerText != theA.innerText)
      description = descElement.innerText;
    links.push({
      href: theA.href,
      text: theA.innerText,
      description,
      folder: isFolder
    });
  }
  console.log(links);
  let main = document.getElementById("main");
  let newCont = elemMaker("div", {
    classList: "resources-container"
  });
  main.prepend(newCont);
  for (let i = 0; i < links.length; i++) {
    newCont.prepend(createSection(links[i]));
  }
}
//https://pausd.schoology.com/course/1668821352/materials?ajax=1&f=128662894
function createSection(data) {
  let ret = elemMaker("div", {
    classList: "resource"
  });
  let inner = elemMaker("a", {
    href: data.href,
    innerText: data.text
  });
  if (!data.folder) inner.setAttribute("target", "_blank");
  ret.appendChild(inner);
  if (data.description) {
    ret.appendChild(
      elemMaker("span", {
        classList: "description-plus",
        innerText: `(${data.description})`
      })
    );
  }
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
