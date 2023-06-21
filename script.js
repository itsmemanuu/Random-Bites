const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const wheel = document.getElementById("wheel");
const spinBtn = document.getElementById("spin-btn");
const finalValue = document.getElementById("final-value");
var rotationValues = [];
var data = [];
var pieColors = [];
var myChart;

function setValues(){
  let sum = 0;
  let list = getList();
  console.log(list);
  let colors = ['#fedf30', '#fdb441', '#fd6930', '#eb5454', '#bf9dd3', '#29b8cd', "#00f2a6", "#f67"];
  degree = 360 / list.length;
  for (let i = 0; i < list.length; i++) {
    let value = list[i];
    rotationValues.push({ minDegree: sum, maxDegree: sum + degree, value: value });
    sum += degree;
    pieColors.push(colors[i % colors.length]);
    data.push(16);
  }
}

function getList(){
  let j = document.getElementsByClassName("checked")
  let list = [];
  if (j.length > 0) {
    for (let i = 0; i < j.length; i++) {
      list.push(j[i].textContent.substring(0, j[i].textContent.length - 1));
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
    li.classList.toggle("checked");
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
  document.getElementById("spinner").style.display = "none";
  
  let data = [
    "One Burrito ",
    "Burger and chips ",
    "Subway ",
    "Randys ",
    "La Puerta ",
    "Mi Caserito ",
    "Kai Sushi ",
    "Poke ",
    "Hornitos ",
    "Gasolinería ",
    "La Liebre ",
    "Toninos ",
    "El toro ",
    "1001 Kebabs ",
    "Aluna Pizza ",
    "Fries ",
    "Lucille ",
    "Poke (Box) "
  ]
  for (let i = 0; i < data.length; i++) {
    let li = document.createElement("li");
    li.innerHTML = data[i];
    listContainer.appendChild(li);
  }

}

function start(){
  document.getElementById("selector").style.display = "none";
  document.getElementById("spinner").style.display = "block";
  setValues();
  console.log(rotationValues);
  console.log(pieColors);
  console.log(data);
  myChart = new Chart(wheel, {
    //Plugin for displaying text on pie chart
    plugins: [ChartDataLabels],
    //Chart Type Pie
    type: "pie",
    data: {
      //Labels(values which are to be displayed on chart)
      labels: getList(),
      //Settings for dataset/pie
      datasets: [
        {
          backgroundColor: pieColors,
          data: data,
        },
      ],
    },
    options: {
      responsive: true,
      animation: { duration: 0 },
      plugins: {
        tooltip: false,
        legend: {
          display: false,
        },
        datalabels: {
          color: "#ffffff",
          formatter: (_, context) => context.chart.data.labels[context.dataIndex],
          font: { size: 24 },
        },
      },
    },
  });
  
  let count = 0;
  let resultValue = 101;
  spinBtn.addEventListener("click", () => {
    spinBtn.disabled = true;
    let randomDegree = Math.floor(Math.random() * (355 - 0 + 1) + 0);
    let rotationInterval = window.setInterval(() => {

      myChart.options.rotation = myChart.options.rotation + resultValue;
      myChart.update();
      if (myChart.options.rotation >= 360) {
        count += 1;
        resultValue -= 5;
        myChart.options.rotation = 0;
      } else if ( count > 15 && myChart.options.rotation == randomDegree) {
        valueGenerator(randomDegree);
        clearInterval(rotationInterval);
        count = 0;
        resultValue = 101;
      }
    }, 10);
  });
}

function valueGenerator(angleValue){
  for (let i of rotationValues) {
    //if the angleValue is between min and max then display it
    if (angleValue >= i.minDegree && angleValue <= i.maxDegree) {
      spinBtn.disabled = false;
      console.log(i.value);
      break;
    }
  }
};

function back(){
  document.getElementById("selector").style.display = "block";
  document.getElementById("spinner").style.display = "none";
  rotationValues = [];
  data = [];
  pieColors = [];
  myChart.destroy()

}

showTask();

window.onload = loadData();