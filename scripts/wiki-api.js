$(document).keypress(function(e) {
  if(e.which == 13) {
    wikipediaAPICall();
  }
});

function wikipediaAPICall() {
  var searchURL = 'https://en.wikipedia.org/w/api.php?action=opensearch&limit=50&format=json&search=';
  var pageInfoURL = 'https://en.wikipedia.org/w/api.php?action=query&prop=revisions&rvprop=content&format=json&formatversion=2&titles=';
  var text = $('input#wiki-input').val();
  var extensions = [];
  var titles = [];
  var counter = 0;

  $('ol#wiki-output').prop('hidden', false);

  startSearch();

  function startSearch() {
    counter = 0;
    ajax(searchURL, text, appendTitleAndDescription);
  }

  function ajax(url, text, function_name) {
    $.ajax({
      dataType: "jsonp",
      url: url,
      data: url + text,
      success: function_name
    });
  }

  function appendTitleAndDescription(data) {  
    var index = Math.floor(data[1].length * Math.random());
    var title = data[1][index];
    var description = data[2][index];

    if (counter === 0 && title === undefined) {
      $('p#invalid-input').prop('hidden', false);
      return;
    } else {
      $('p#invalid-input').prop('hidden', true);
    }

    try {
      while (!hasCorrectDescription(title, description)) {
        var index = Math.floor(data[1].length * Math.random());
        var title = data[1][index];
        var description = data[2][index];
      }

      var extension = createWikiURLExtension(title);
      extensions.push(extension);

      $('ol#wiki-output').append('<li><a href="https://en.wikipedia.org/wiki/' + extension + '" target="_blank">' + title + '</a>');
      $('ol#wiki-output').append('<p class="description">' + description + '</p></li>');
      counter++; 

      if (counter < 50) {
        ajax(pageInfoURL, title, getNewTitle);
      }
    } catch (err) {
      ajax(searchURL, text, appendTitleAndDescription);
    }
  }

  function hasCorrectDescription(title, description) {
    return (description.substring(title.length + 1) !== 'can refer to:') && 
      (description.substring(title.length + 1) !== 'may refer to:');
  }

  function createWikiURLExtension(text) {
    var text = text.replace(/\s{1}/g, '_');
    var text = text.replace(/'/g, '%27');
    var text = text.replace(/\?/g, '%3F');
    return text;
  }

  function getNewTitle(data) {
    try {
      var content = data.query.pages[0].revisions[0].content;
    } catch(err) {
      ajax(searchURL, text, appendTitleAndDescription);
    }

    var regex = /\b\w{4,}/g;
    var newTextArr = content.match(regex);
    var text = newTextArr[Math.floor(Math.random() * newTextArr.length)];

    ajax(searchURL, text, appendTitleAndDescription);
  }
}


