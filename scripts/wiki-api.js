/* 
 * wikipediaAPIFetch uses the Wikipedia API to fetch the title and desc
 * of 50 linked Wikipedia pages. 
 *
 * It requires user input of a word or phrase in an input HTML element. It uses
 * this input to fetch for data with results. If the search input doesn't
 * return any useful results (i.e. no results which would make properties on
 * the JSON object undefined), then the user is notified that they entered an 
 * invalid input.
 */


var wikipediaAPIFetch = function() {

  // -------------------------  Important URLs  ------------------------- //

  const searchURL = 'https://en.wikipedia.org/w/api.php?action=opensearch&limit=50&format=json&search=';
  const pageInfoURL = 'https://en.wikipedia.org/w/api.php?action=query&prop=revisions&rvprop=content&format=json&formatversion=2&titles=';

  // -------------------------------------------------------------------- //




  // ----------------------- Start of helper functions ------------------ //

  // Obtains the title, description and link of the Wikipedia article.
  var getTitleDescAndLink = function(data) {
    var randomIndex = Math.floor(data[1].length * Math.random());
    var title = data[1][randomIndex];
    var desc = data[2][randomIndex];
    var href = data[3][randomIndex];
    return [title, desc, href];
  };


  // Avoids displaying results that don't provide useful content to the user.
  var hasCorrectDesc = function(title, desc) {
    return (desc.substring(title.length + 1) !== 'can refer to:') && 
      (desc.substring(title.length + 1) !== 'may refer to:');
  };


  // Fetches a new title using a random word from the description of the 
  // previously fetched Wikipedia article.
  var getNewTitle = function(data) {
    var text;
    var content = data[2][Math.floor(Math.random() * data[2].length)];

    var regex = /\b\w{4,}/g;
    var wordArray = content.match(regex);

    // If wordArray contains nothing (i.e. null), then use the previous word
    // array that was obtained with the previous fetch.
    if (wordArray !== null) {
      prevWordArray = wordArray;

    } else {
      wordArray = prevWordArray;

    }

    text = wordArray[Math.floor(Math.random() * wordArray.length)]
    return text;
  };


  // Appends title and description to the ordered list with the wiki-output ID. 
  //
  // It will only append those titles and descriptions that provide the user a 
  // description of something, and are not just stubs in Wikipedia. Hence,
  // why the hasCorrectDesc helper function is used to filter out those
  // results.
  var appendToDOM = function(data) { 
    var title, desc, href; 
    [title, desc, href] = getTitleDescAndLink(data);

    // If, when startSearch(), user inputs word or phrase that displays 0 
    // results, let user know they have input an invalid title.
    if (counter === 0 && title === undefined) {
      $('p#wiki-invalid-input').prop('hidden', false);
      $('ol#wiki-output').prop('hidden', true);
      return;

    } else {
      $('p#wiki-invalid-input').prop('hidden', true);

    }


    try {
      while (!hasCorrectDesc(title, desc)) {
        [title, desc, href] = getTitleDescAndLink(data);
      }

      // Use templating to insert href, title and description.
      $('ol#wiki-output').append(`<li><a href="${href}" target="_blank">${title}</a>`);
      $('ol#wiki-output').append(`<p class="description">${desc}</p></li>`);
      counter++; 

    } catch (e) {
      // If error occurs where cannot obtain title and description from 
      // fetching, call again the function using another random word from
      // the previous wordArray. 
      text = prevWordArray[Math.floor(Math.random() * prevWordArray.length)];
      fetch(searchURL, text, appendToDOM);
    }

    title = getNewTitle(data);
    // Continue and fetching a total of 50 times.
    if (counter < 50) {
      fetch(pageInfoURL, title, appendToDOM);
    }

  };


  // ----------------------- end of helper functions -------------------- //




  // -------------------------  Fetching function ----------------------- //

  // Fetch performs an asynchronous HTTP Ajax request. The success callback
  // function is passed in and invoked when a response is received.
  var fetch = function(url, text, successCB) {
    $.ajax({
      dataType: "jsonp",
      url: searchURL,
      data: searchURL + text,
      success: successCB
    });
  };

  // -------------------------------------------------------------------- //




  // -------------------------- Start of execution ---------------------- //

  // Get input text.
  var text = $('input#wiki-input').val();


  // Clear input text.
  $('input#wiki-input').val('');
  var counter = 0;
  var prevWordArray = [];
  var extension;


  // Do not hide the <ol> div to be able to display results.
  $('ol#wiki-output').html('');
  $('ol#wiki-output').prop('hidden', false);


  // Start the search
  fetch(searchURL, text, appendToDOM);

  // --------------------------- End of execution ----------------------- //
  
};