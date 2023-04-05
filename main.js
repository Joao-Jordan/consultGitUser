var inputElement = document.querySelector("#app input");
var buttonConfirmElement = document.querySelector("button.Confirmar");
var listElement = document.querySelector("#app ul");

var repoList = [];

repoPromise = function (userName) {
  return new Promise(function (resolve, reject) {
    var xhr = new XMLHttpRequest();
    var api = "https://api.github.com/users/" + userName;
    var endPoint = api + "/repos";
    xhr.open("GET", endPoint);
    xhr.send(null);

    listElement.innerHTML = "";
        console.log("Carregando...");
        var loadingElement = document.createElement("li");
        loadingElement.textContent = "Carregando...";
        listElement.appendChild(loadingElement);

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          var data = JSON.parse(xhr.responseText);
          resolve(data);
        } else {
          reject(xhr.status);
        }
      }
    };
  });
};

function getRepo() {
  var userName = inputElement.value;
  inputElement.value = "";

  repoPromise(userName)
    .then(function (response) {
      repoList = response;
      console.log(response);
      renderRepos(userName);
    })
    .catch(function (error) {
      if(error = 404){
        listElement.innerHTML = "";
        alert("Usuário não existe");
      }
      console.warn(error);
    });
}

function renderRepos(userName) {
  listElement.innerHTML = "";
  var UsernameElement = document.createElement("h3");
  UsernameElement.textContent = "Repositórios do usuário: " + userName;
  listElement.appendChild(UsernameElement);
  for (repo of repoList) {
    var repoElement = document.createElement("li");
    repoElement.textContent = repo.name;

    listElement.appendChild(repoElement);
  }
}

buttonConfirmElement.onclick = getRepo;
