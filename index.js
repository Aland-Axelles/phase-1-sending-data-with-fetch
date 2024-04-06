const fetch = require('node-fetch');

function submitData(name, email) {
  const formData = {
    name: name,
    email: email
  };

  const configurationObject = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(formData)
  };

  return fetch("http://localhost:3000/users", configurationObject)
    .then(response => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then(data => {
      appendIdToDOM(data.id);
      return data;
    })
    .catch(error => {
      appendErrorToDOM(error.message);
      return error.message;
    });
}

function appendIdToDOM(id) {
  const idElement = document.createElement('p');
  idElement.textContent = `New user ID: ${id}`;
  document.body.appendChild(idElement);
}

function appendErrorToDOM(errorMessage) {
  const errorElement = document.createElement('p');
  errorElement.textContent = `Error: ${errorMessage}`;
  document.body.appendChild(errorElement);
}

module.exports = submitData;
