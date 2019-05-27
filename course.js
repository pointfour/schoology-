function main() {
    customResources()
}
main()

function customResources() {
    let cont = document.getElementById("folder-contents-table").children[0]
    let links = []
    for (let i = 0; i < cont.children.length; i++) {
        let allTheA = cont.children[i].querySelectorAll("a.sExtlink-processed")
        links.push(allTheA[allTheA.length - 1])
    }
    console.log(links)
    let main = document.getElementById("main")
    let newCont = elemMaker("div", {
        classList: "resources-container"
    })
    main.prepend(newCont)
    for (let i = 0; i < links.length; i++) {
        newCont.appendChild(elemMaker("a", {
            classList: "resource",
            href: links[i].href,
            innerText: links[i].innerText
        }))
    }
}

function removeElem(elem) {
    elem.parentNode.removeChild(elem);
}

function elemMaker(elem, config) {
    let element = document.createElement(elem);
    for (key in config) element[key] = config[key];
    return element;
}