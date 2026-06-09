let currentQuestion = 0;
let score = 0;
const questions = [

{
question: "Applikatsiya nima?",
answers: [
"turli shakllarni qirqish va ularni fon tarzida qabul qilingan materiallar hisobiga mustahkamlashga asoslanuvchi turi",
"sa’nat asari yaratishning eng sodda va oson usuli.",
"qog‘oz va kartondan yasaladigan maketlar",
"tabiatdagi mavjud bo‘lgan barcha go‘zallikni, borliqni yasash"
]
},

{
question: "Texnologiya ta’limida nechta ish turi mavjud?",
answers: [
"5 ta ish turi",
"10 ta ish turi",
"7 ta ish turi",
"6 ta ish turi"
]
},

{
question: "Texnologiya darslarida ish joyini to‘g‘ri tashkil qilish bu?",
answers: [
"stol ustiga salfetka yozib, o‘ng tomoniga kerakli asbob uskunalar chap tomoniga kerakli materiallar to‘plami, old tomoniga chiqindilar uchun quticha, yelim va sochiq qo‘yiladi.",
"stol ustiga qog‘oz yozib darsga kerakli bo‘lgan buyumlarni tayyorlab qo‘yish.",
"bolalarni harakatlariga halaqit bermaydigan qilib darsga kerakli ish qurollarini tayyorlab qo‘yish",
"sanitariya-gigiyena, xavfsizlik texnikasi, to‘g‘ri o‘tirish qoidasiga amal qilish."
]
},

{
question: "Turli materiallar bilan ishlash ish turi qaysi qatorda ko‘rsatilgan?",
answers: [
"applikatsiya va mozaika, loy va plastilin, turli tabiiy materiallar bilan ishlash.",
"applikatsiya va mozaika, pape-mashe, qog‘oz va karton bilan ishlash.",
"tabiiy materiallar, loy va plastilin, qog‘oz va karton bilan ishlash.",
"applikatsiya, mozaika va turli materiallar bilan ishlash."
]
},

{
question: "Qog‘ozdan maket yasaganda nimalarga e’tibor berish kerak?",
answers: [
"qog‘ozning rangi va sifatiga, buklash chiziqlariga, qog‘ozning shakliga, to‘g‘ri buklashga.",
"qog‘ozning sifatiga, buklash chiziqlariga, shakliga.",
"qog‘ozning sifatiga, buklash chiziqlariga.",
"qog‘ozning shakliga, buklash chiziqlariga, to‘g‘ri buklash va yelimlashga."
]
}

];

function startTest(){

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

if(selected.value === "0"){
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
