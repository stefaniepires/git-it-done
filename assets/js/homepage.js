var getUserRepos = function(user) {
  // format the github api url
  var apiUrl = "https://api.github.com/users/" + user + "/repos";

  // make a request to the url
  fetch(apiUrl).then(function(response) {
    response.json().then(function(data) {
      console.log(data);
    });
  });
};


//variables created to store a reference to the <form> element and to the <input> element
var userFormEl = document.querySelector("#user-form");
var nameInputEl = document.querySelector("#username");

//to be executed upon a form submission browser event 
var formSubmitHandler = function(event) {
  event.preventDefault();
  //get value from input element
  var username = nameInputEl.value.trim();
  
  if(username) {
    getUserRepos(username);
    nameInputEl.value = "";
  } else {
    alert("Please enter a GitHub username!");
  }
};

//event listener to userFormEl
userFormEl.addEventListener("submit", formSubmitHandler);