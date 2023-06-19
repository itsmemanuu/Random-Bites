const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const wheel = document.getElementById("wheel");
const spinBtn = document.getElementById("spin-btn");
const finalValue = document.getElementById("final-value");
var rotationValues = [];
var data = [];
var pieColors = [];

function setValues(){
  let sum = 0;
  let list = getList();
  let colors = ["#8b35bc", "#b163da"];
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
  document.getElementById("spinner").style.display = "none";
  
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

function start(){
  document.getElementById("selector").style.display = "none";
  document.getElementById("spinner").style.display = "block";
  setValues();
  console.log(rotationValues);
  console.log(pieColors);
  console.log(data);
  let myChart = new Chart(wheel, {
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
      //Responsive chart
      responsive: true,
      animation: { duration: 0 },
      plugins: {
        //hide tooltip and legend
        tooltip: false,
        legend: {
          display: false,
        },
        //display labels inside pie chart
        datalabels: {
          color: "#ffffff",
          formatter: (_, context) => context.chart.data.labels[context.dataIndex],
          font: { size: 24 },
        },
      },
    },
  });
  //display value based on the randomAngle
  
  //Spinner count
  let count = 0;
  //100 rotations for animation and last rotation for result
  let resultValue = 51;
  //Start spinning
  spinBtn.addEventListener("click", () => {
    spinBtn.disabled = true;
    //Empty final value
    finalValue.innerHTML = `<p>Good Luck!</p>`;
    //Generate random degrees to stop at
    let randomDegree = Math.floor(Math.random() * (355 - 0 + 1) + 0);
    //Interval for rotation animation
    let rotationInterval = window.setInterval(() => {
      //Set rotation for piechart
      /*
      Initially to make the piechart rotate faster we set resultValue to 101 so it rotates 101 degrees at a time and this reduces by 1 with every count. Eventually on last rotation we rotate by 1 degree at a time.
      */
      myChart.options.rotation = myChart.options.rotation + resultValue;
      //Update chart with new value;
      myChart.update();
      //If rotation>360 reset it back to 0
      if (myChart.options.rotation >= 360) {
        count += 1;
        resultValue -= 5;
        myChart.options.rotation = 0;
      } else if (count > 15 && myChart.options.rotation == randomDegree) {
        valueGenerator(randomDegree);
        clearInterval(rotationInterval);
        count = 0;
        resultValue = 101;
      }
    }, 10);
  });
}

function valueGenerator(angleValue){
  console.log(angleValue);
  for (let i of rotationValues) {
    //if the angleValue is between min and max then display it
    if (angleValue >= i.minDegree && angleValue <= i.maxDegree) {
      finalValue.innerHTML = `<p>Value: ${i.value}</p>`;
      spinBtn.disabled = false;
      console.log(i.value);
      break;
    }
  }
};

showTask();

window.onload = loadData();