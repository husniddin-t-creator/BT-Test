const CSV_URL =
"https://docs.google.com/spreadsheets/d/1ny8Q9YqCXcHrz8SnSsC6LZTYTF64BVlWhx7VmJhGplk/export?format=csv&gid=0";

let questions = [];
let currentQuestion = 0;
let score = 0;

function startTest(){

if(questions.length === 0){
  alert("Savollar hali yuklanmadi. Bir necha soniya kuting.");
  return;
}

let fullname =
document.getElementById("fullname").value;

let group =
document.getElementById("group").value;

if(fullname === "" || group === ""){
alert("Ism familiya va guruhni kiriting!");
return;
}

if(questions.length === 0){
alert("Savollar yuklanmadi!");
return;
}

currentQuestion = 0;
score = 0;

showQuestion();
}
function showQuestion(){

const q = questions[currentQuestion];

document.querySelector(".container").innerHTML = `
<h2>${currentQuestion+1}-savol</h2>

<p><b>${q.question}</b></p>

<label>
<input type="radio" name="ans" value="0">
A) ${q.answers[0]}
</label><br><br>

<label>
<input type="radio" name="ans" value="1">
B) ${q.answers[1]}
</label><br><br>

<label>
<input type="radio" name="ans" value="2">
C) ${q.answers[2]}
</label><br><br>

<label>
<input type="radio" name="ans" value="3">
D) ${q.answers[3]}
</label><br><br>

<button onclick="nextQuestion()">
Keyingi
</button>
`;

}

function nextQuestion(){

const selected =
document.querySelector('input[name="ans"]:checked');

if(!selected){
alert("Javobni tanlang!");
return;
}

if(Number(selected.value) === questions[currentQuestion].correct){
score++;
}
currentQuestion++;

if(currentQuestion < questions.length){

showQuestion();

}else{

let percent =
Math.round(score / questions.length * 100);

document.querySelector(".container").innerHTML = `
<h2>Test tugadi</h2>

<p>To'g'ri javoblar: ${score}</p>

<p>Jami savollar: ${questions.length}</p>

<p>Natija: ${percent}%</p>
`;

}

}
async function testGoogleSheets() {

  const url =
  "https://docs.google.com/spreadsheets/d/1ny8Q9YqCXcHrz8SnSsC6LZTYTF64BVlWhx7VmJhGplk/export?format=csv&gid=0";

  const response = await fetch(url);

  const text = await response.text();

  console.log(text.substring(0,500));

}

testGoogleSheets();
async function loadQuestions() {

  const response = await fetch(CSV_URL);
  const csvText = await response.text();

  const rows = csvText.trim().split("\n");

  questions = [];

  for(let i = 1; i < rows.length; i++){

    const cols = rows[i].split(",");

    if(cols.length >= 6){

      questions.push({
        question: cols[1],
        answers: [
          cols[2],
          cols[3],
          cols[4],
          cols[5]
        ],
        correct: 0
      });

    }
  }

  questions.sort(() => Math.random() - 0.5);

  questions = questions.slice(0,50);

  console.log("Tanlangan savollar:", questions.length);
}

loadQuestions();
