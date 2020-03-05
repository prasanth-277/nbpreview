(function() {
  var root = this;
  var $holder = document.querySelector("#notebook-holder");
  var $body = document.querySelector("#body");

  var render_notebook = function(ipynb) {
    var notebook = (root.notebook = nb.parse(ipynb));
    while ($holder.hasChildNodes()) {
      $holder.removeChild($holder.lastChild);
    }
    $holder.appendChild(notebook.render());
    Prism.highlightAll();
  };

  var load_file = function() {
    getNoteBookJson();
  };

  var getNoteBookJson = async function() {
    const url =
      "https://raw.githubusercontent.com/binder-examples/requirements/master/index.ipynb";
    var notebook_json;
    await fetch(url)
      .then(r => r.text())
      .then(async text => {
        try {
          notebook_json = JSON.parse(text);
          // console.log("object", notebook_json);
        } catch (error) {
          alert("OOps! Unable to load json");
        }
      });
    render_notebook(notebook_json);
  };

  $body.onload = function(e) {
    load_file();
  };
}.call(this));
