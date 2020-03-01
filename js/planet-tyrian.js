function updateView(){
  if(document.getElementById("article-view").checked){
    document.querySelectorAll(".article-view").forEach(element => {
      if( (document.getElementById("planet-scope").checked && element.getAttribute("data-location") == "planet") || document.getElementById("universe-scope").checked ){
        element.classList.remove("d-none");
      } else {
        element.classList.add("d-none");
      }
    });

    document.querySelectorAll(".short-view").forEach(element => {
      element.classList.add("d-none");
    });
  } else {
    document.querySelectorAll(".article-view").forEach(element => {
      element.classList.add("d-none");
    });

    document.querySelectorAll(".short-view").forEach(element => {
      if( (document.getElementById("planet-scope").checked && element.getAttribute("data-location") == "planet") || document.getElementById("universe-scope").checked ){
        element.classList.remove("d-none");
      } else {
        element.classList.add("d-none");
      }
    });
	}
}


function updateArticles() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {

     parser = new DOMParser();
     doc = parser.parseFromString(this.responseText, "text/html")
     var nodes = doc.querySelectorAll('[data-date]');

     document.getElementById("content").innerHTML = "";

     for (i = 0; i < nodes.length; ++i) {
        if(new Date(nodes[i].getAttribute("data-date")) > new Date($("#start").val()) && new Date(nodes[i].getAttribute("data-date")) < new Date($("#end").val())){
            document.getElementById("content").append(nodes[i]);
        }
     }

     updateView();
    }
  };
  xhttp.open("GET", "data.html", true);
  xhttp.send();
}


function initialize(){
  $('#datepicker').datepicker({
     format: "yyyy-mm-dd",
     orientation: "bottom auto"
  });

  document.getElementById("start").value = "2020-01-01";
  document.getElementById("end").value = (new Date()).toISOString().slice(0,10);

  updateArticles();
}


initialize();
