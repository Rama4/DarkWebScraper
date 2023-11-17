const SEARCH_ENDPOINT = "http://127.0.0.1:8000/myapp/search?";
const QUERY_PARAM = "q=";
const FIELD_PARAM = "fl=";

let checkbox1 = document.getElementById("checkbox1");
let checkbox2 = document.getElementById("checkbox2");
let checkbox3 = document.getElementById("checkbox3");
let checkbox4 = document.getElementById("checkbox4");
let checkbox5 = document.getElementById("checkbox5");
let checkbox6 = document.getElementById("checkbox6");
let checkbox7 = document.getElementById("checkbox7");

function handleSearch(event) {
  // Get the value from the search bar
  var searchTerm = document.getElementById("search-bar").value;

  // You can now use the searchTerm variable to perform your search or other actions
  console.log("Search term:", searchTerm);

  let searchFields = getAllSearchFields();
  console.log(searchFields);
  queryBackend(searchFields, searchTerm);
  // Prevent the form from actually submitting
  event.preventDefault();
}

function queryBackend(searchFields, searchTerm) {
  let queryParam = "(";
  for (var i = 0; i < searchFields.length; i++) {
    let searchField = searchFields[i];
    queryParam += searchField + ":" + "*" + searchTerm + "*";
    if (i == searchFields.length - 1) {
      queryParam += ")";
    } else {
      queryParam += " OR ";
    }
  }
  console.log("queryParam", queryParam);
  var searchUrl =
    SEARCH_ENDPOINT +
    QUERY_PARAM +
    queryParam +
    "&" +
    FIELD_PARAM +
    "name,id,quantity,quality,cost_eu,cost_btc";
  console.log("searchUrl", searchUrl);

  fetch(searchUrl, {
    method: "GET",
    headers: new Headers({
      Accept: "application/json",
    }),
  })
    .then((response) => {
      //Check if the request was successful (status code 2xx)
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      // Parse the JSON response
      return response;
    })
    .then((data) => data.json())
    .then((data) => {
      // Process the response data here
      console.log(data); // Example: Logging the data to the console
      displayTable(data, null);
    })
    .catch((error) => {
      // Handle any errors here
      console.error(error); // Example: Logging the error to the console
      displayTable(null, error);
    });
}

function displayTable(jsonData, errmsg) {
  const tableContainer = document.getElementById("resultsTableContainer");
  const tableElement = document.getElementById("resultsTable");
  const messageElement = document.getElementById("resultsMessage");
  if (!jsonData?.length) {
    const newMessageElement = document.createElement("h3");
    newMessageElement.style.textAlign = "center"; // Center the message text
    newMessageElement.style.width = "100%"; // Set the width of the message to 100%
    newMessageElement.innerText = errmsg ?? "No results found!";
    newMessageElement.setAttribute("id", "resultsMessage");

    if (tableElement)
      tableContainer.replaceChild(newMessageElement, tableElement);
    if (messageElement)
      tableContainer.replaceChild(newMessageElement, messageElement);
    else tableContainer.appendChild(newMessageElement);
  } else {
    // Create a newTableElement element
    const newTableElement = document.createElement("table");
    newTableElement.style.textAlign = "center"; // Center the table content
    newTableElement.style.width = "100%"; // Set the width of the table to 100%
    newTableElement.setAttribute("id", "resultsTable");

    // Create a newTableElement header row
    const headerRow = document.createElement("tr");

    // Add column headers from the JSON data
    for (const headerName in jsonData[0]) {
      const headerCell = document.createElement("th");
      headerCell.textContent = headerName;
      headerCell.style.textAlign = "center"; // Center the text in the header cell
      headerRow.appendChild(headerCell);
    }

    newTableElement.appendChild(headerRow);

    // Create newTableElement body rows
    for (const dataRow of jsonData) {
      const row = document.createElement("tr");

      // Add data cells for each column
      for (const headerName in dataRow) {
        const dataCell = document.createElement("td");
        dataCell.textContent = dataRow[headerName];
        dataCell.style.textAlign = "center"; // Center the text in the data cell
        row.appendChild(dataCell);
      }

      newTableElement.appendChild(row);
    }
    if (messageElement)
      tableContainer.replaceChild(newTableElement, messageElement);
    if (tableElement)
      tableContainer.replaceChild(newTableElement, tableElement);
    tableContainer.appendChild(newTableElement);
  }
}

function getAllSearchFields() {
  let searchFields = [];

  if (checkbox2.checked) {
    searchFields.push(checkbox2.value);
  }

  if (checkbox3.checked) {
    searchFields.push(checkbox3.value);
  }

  if (checkbox4.checked) {
    searchFields.push(checkbox4.value);
  }

  if (checkbox5.checked) {
    searchFields.push(checkbox5.value);
  }

  if (checkbox6.checked) {
    searchFields.push(checkbox6.value);
  }

  if (checkbox7.checked) {
    searchFields.push(checkbox7.value);
  }
  return searchFields;
}

function selectAllCheckboxes() {

  checkbox2.checked = true;
  checkbox3.checked = true;
  checkbox4.checked = true;
  checkbox5.checked = true;
  checkbox6.checked = true;
  checkbox7.checked = true;
}

function reevaluateAll(event) {
  if (!event.target.checked) {
      checkbox1.checked = false;
  }
}