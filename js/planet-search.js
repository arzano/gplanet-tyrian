function getParameter(param) {
    var result = null,
        tmp = [];
    location.search
        .substr(1)
        .split("&")
        .forEach(function (item) {
          tmp = item.split("=");
          if (tmp[0] === param) result = decodeURIComponent(tmp[1]);
        });
    return result;
}


if(getParameter('q') == null){
  document.getElementById("spinner").style.display = "none";
}


var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {

    var data = JSON.parse(this.responseText)

    var idx = lunr(function () {
        this.ref('title')
        this.field('author')
        this.field('nickname')
        this.field('date')
        this.field('scope')
        this.field('content')

        data.forEach(function (doc) {
          this.add(doc)
        }, this)

      })

    var searchterm = getParameter('q');
    if(searchterm == null){
      console.log("No search term given");
    }else{
      idx.search(searchterm).forEach(function (doc) {
        $("#articles").append("<li>" + doc.ref + "</li>");
      }, this)
      document.getElementById("spinner").style.display = "none";
    }

  }
};
xhttp.open("GET", "data.json", true);
xhttp.send();
