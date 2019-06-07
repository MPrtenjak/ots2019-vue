var console = {
  log: function() {
    let message = ''
    for (var i = 0; i < arguments.length; i++) {
      message += arguments[i] + ' ';
    }

    var preNode = document.createElement("pre");
    var textNode = document.createTextNode(message);
    preNode.appendChild(textNode);

    var resultsNode = document.getElementById("results");
    resultsNode.appendChild(preNode);
  }
}