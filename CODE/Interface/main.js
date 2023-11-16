const SEARCH_ENDPOINT = "https://darkwebscraper.run-us-west2.goorm.site/myapp/search?"
const QUERY_PARAM = "q="
const FIELD_PARAM = "fl="

function handleSearch(event) {
    // Get the value from the search bar
    var searchTerm = document.getElementById('search-bar').value;

    // You can now use the searchTerm variable to perform your search or other actions
    console.log('Search term:', searchTerm);

    queryBackend("name", searchTerm)
    // Prevent the form from actually submitting
    event.preventDefault();
}

function queryBackend(searchField, searchTerm) {
    var searchUrl = SEARCH_ENDPOINT + QUERY_PARAM + searchField + ":*" + "&" + FIELD_PARAM + "name,id"
    console.log("searchUrl", searchUrl)
    //https://darkwebscraper.run-us-west2.goorm.site/myapp/search?q=name:Bubblegum&fl=title,id
    fetch(searchUrl, {
        method: 'GET',
        headers: new Headers({
        'Accept': 'application/json',
        'Content-Type':'application/json',
        'Cache-Control':'max-age=640000'
        })  
    })
    .then(response => {
        //Check if the request was successful (status code 2xx)
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        // Parse the JSON response
        return response;
      })
    .then(data => { 
        // Process the response data here 
        console.log(data); // Example: Logging the data to the console 
    }) 
    .catch(error => { 
        // Handle any errors here 
        console.error(error); // Example: Logging the error to the console 
    });
}