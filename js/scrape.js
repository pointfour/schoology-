const Scrape = (() => {
  function toHtml(str) {
    let temp = document.createElement("div");
    temp.innerHTML = str;
    return temp.firstChild;
  }
  function extractData(html) {
    let elems = html.querySelector(".subtree-folder-contents-table > tbody")
      .children;
    let datas = new Array(elems.length);
    for (let i = 0; i < elems.length; i++) {
      datas[i] = extractElemData(elems[i]);
    }
    console.log(datas);
  }
  function extractElemData(elem) {
    console.log(elem);
    let theA = elem.querySelector("a");
    let folder = theA.parentElement.className == "folder-title";
    let description;
    let descElement = elem.querySelector(".folder-description,.item-body p");
    if (descElement && descElement.innerText != theA.innerText)
      description = descElement.innerText;
    return {
      href: theA.href,
      title: theA.innerText,
      description,
      folder
    };
  }
  return class Scrape {
    static layerCourseData(course, f) {
      let ending;
      if (f) ending = `&f=${f}`;
      let data;
      Request.get(`/course/${course}/materials?ajax=1${ending}`, res => {
        console.log(`/course/${course}/materials?ajax=1${ending}`);
        let elems = toHtml(JSON.parse(res));
        data = extractData(elems);
        console.log(data);
      });
    }
  };
})();

const Request = (() => {
  const prefix = "https://pausd.schoology.com";
  return class Request {
    static get(url, func) {
      let http = new XMLHttpRequest();
      http.onreadystatechange = () => {
        if (http.readyState == 4 && http.status == 200) func(http.responseText);
      };
      http.open("GET", prefix + url, true);
      http.send(null);
    }
  };
})();
