const SEARCH_ENDPOINT = "https://darkwebscraper.run-us-west2.goorm.site/myapp/search?"
const QUERY_PARAM = "q="
const FIELD_PARAM = "fl="

function handleSearch(event) {
    // Get the value from the search bar
    var searchTerm = document.getElementById('search-bar').value;

    // You can now use the searchTerm variable to perform your search or other actions
    console.log('Search term:', searchTerm);

    var searchUrl = SEARCH_ENDPOINT + QUERY_PARAM + "title:*" + "&" + FIELD_PARAM + "title,id"
    
    // Prevent the form from actually submitting
    event.preventDefault();
}
