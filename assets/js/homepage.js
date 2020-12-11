var getUserRepos = function(user) {
  // format the github api url
  var apiUrl = "https://api.github.com/users/" + user + "/repos";

  // make a request to the url
  fetch(apiUrl).then(function(response) {
    //ok property allows us to check if request was successful
    //when the code is in the 200s then the ok property is true
    if (response.ok) {
      response.json().then(function(data) {
        displayRepos(data, user);
      });
    } else {
      alert("Error: " + response.statusText); //we check the statusText when the ok property is false
    }
  })
.catch(function(error) {
  // `.catch()` is getting chained to end of `.then()` method
alert("Unable to connect to GitHub");
});
};

/* notes for the above:
the request may find its destination URL and attempt 
to get the data in question, which would get returned 
into the .then() method; or if the request fails, 
that error will be sent to the .catch() method. */

//variables created to store a reference to the <form> element and to the <input> element
var userFormEl = document.querySelector("#user-form");
var nameInputEl = document.querySelector("#username");
var repoContainerEl = document.querySelector("#repos-container");
var repoSearchTerm = document.querySelector("#repo-search-term");

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

var displayRepos = function (repos, searchTerm) {
//check if api returned any repos
//this if statement will let the user know that the github they searched doesnt have any repos
if (repos.length === 0) {
  repoContainerEl.textContent = "No repositories found.";
  return;
}

 // clear old content
repoContainerEl.textContent = "";
repoSearchTerm.textContent = searchTerm;

// loop over repos
for (var i = 0; i < repos.length; i++) {
  // format repo name
  var repoName = repos[i].owner.login + "/" + repos[i].name;

  // create a container for each repo
  var repoEl = document.createElement("a");
  repoEl.classList = "list-item flex-row justify-space-between align-center";
  repoEl.setAttribute("href", "./single-repo.html?repo=" + repoName);

  // create a span element to hold repository name
  var titleEl = document.createElement("span");
  titleEl.textContent = repoName;

  // append to container
  repoEl.appendChild(titleEl);

// create a status element
var statusEl = document.createElement("span");
statusEl.classList = "flex-row align-center";

// check if current repo has issues or not
if (repos[i].open_issues_count > 0) {
  statusEl.innerHTML =
    "<i class='fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + " issue(s)";
} else {
  statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
}

// append to container
repoEl.appendChild(statusEl);

  // append container to the dom
  repoContainerEl.appendChild(repoEl);
}
};





//event listener to userFormEl
userFormEl.addEventListener("submit", formSubmitHandler);