const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

function getList(){
  let j = document.getElementsByClassName("checked")
  let list = [];
  if (j.length > 0) {
    for (let i = 0; i < j.length; i++) {
      list.push(j[i].textContent);
    }
  }
  return list;
}

function addTask() {
  if (inputBox.value == '') {
    alert("You must write something!");
  }
  else{
    let li = document.createElement("li");
    li.innerHTML = inputBox.value;
    listContainer.appendChild(li);
    let span = document.createElement("span");
    span.innerHTML = "\u00d7";
    li.appendChild(span);
  }
  inputBox.value = "";
  console.log(getList());
}

listContainer.addEventListener("click", function(e) {
  if (e.target.tagName === "LI") {
    e.target.classList.toggle("checked");
  }
  else if (e.target.tagName === "SPAN") {
    e.target.parentElement.remove();
  }
}, false);

function saveData() {
  localStorage.setItem("data", listContainer.innerHTML);
}

function showTask(){
  listContainer.innerHTML = localStorage.getItem("data");
}

function loadData() {
  let data = [
    "One Burrito",
    "Burger and chips",
    "Subway",
    "Randys",
    "La Puerta",
    "Mi Caserito",
    "Kai Sushi",
    "Poke",
    "Hornitos",
    "Gasolinería",
    "La Liebre",
    "Toninos",
    "El toro",
    "1001 Kebabs",
    "Aluna Pizza",
    "Fries",
    "Lucille",
    "Poke (Box)"
  ]
  for (let i = 0; i < data.length; i++) {
    let li = document.createElement("li");
    li.innerHTML = data[i];
    listContainer.appendChild(li);
  }

}

showTask();

window.onload = loadData();