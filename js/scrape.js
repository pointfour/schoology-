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
    return datas;
  }
  function extractElemData(elem) {
    // console.log(elem);
    let theA = elem.querySelector("a");
    return {
      id: elem.id.slice(2),
      href: theA.href,
      title: theA.innerText,
      folder: theA.parentElement.className == "folder-title"
    };
  }
  return class Scrape {
    static layerCourseData(course, f, func) {
      let ending;
      if (f) ending = `&f=${f}`;
      let data;
      Request.get(`/course/${course}/materials?ajax=1${ending}`, res => {
        let elems = toHtml(JSON.parse(res));
        data = extractData(elems);
        func(data);
      });
    }
  };
})();

const UrlExtractor = (() => {
  return class UrlExtractor {
    static getCourse() {
      return window.location.pathname.split("/")[2];
    }
  };
})();

const Request = (() => {
  setInterval(() => {
    if (queue.length) {
      let x = queue.shift();
      actuallyGet(x.url, x.func);
    }
  }, 500);
  let queue = [];
  const prefix = "https://pausd.schoology.com";
  function actuallyGet(url, func) {
    let http = new XMLHttpRequest();
    http.onreadystatechange = () => {
      if (http.readyState == 4 && http.status == 200) func(http.responseText);
    };
    http.open("GET", prefix + url, true);
    http.send(null);
  }
  return class Request {
    static get(url, func) {
      queue.push({
        url,
        func
      });
    }
  };
})();
