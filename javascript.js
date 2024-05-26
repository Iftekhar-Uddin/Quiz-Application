let questions = [
    {
        number: 2,
        question: 'What does HTML stand for?',
        answer: 'Hyper Text Markup Language',
        option: [
            "Hyper Text Preprocessor",
            "Hyper Text Markup Language",
            "Hyper Text Multiple Language",
            "Hyper Tool Multi Language"
        ]
    },
    {
        number: 3,
        question: 'What does CSS stand for?',
        answer: 'Cascading style sheet',
        option: [
            "Common style Sheet",
            "Colorful stylesheet",
            "Computer style sheet",
            "Cascading style sheet"
        ]
    },
    {
        number: 4,
        question: 'What does PHP stand for?',
        answer: 'Hyper text preprocessor',
        option: [
            "Hyper text preprocessor",
            "Hyper text programming",
            "High performance programming",
            "Hyper text python"
        ]
    }
];

questions.push({"number": 5, "question": "Wht is the full form of HTTP?", "answer": "Hyper Text Transfer Protocol", "option":["Hyper Text Transfer Protocol", "Hypear Target Transport Protection", "High Text Transition Process", "Hyper Thesis Target Procedure"]});
questions.unshift({"number": 1, "question": "Where is my birth place?", "answer": "Noakhali", "option":["Dhaka", "Chittagong", "Noakhali", "Rajshahi"]});


const StartButton = document.querySelector(".MyBtn button");
const RulesPage = document.querySelector(".QuizRules");
const QuestionPage = document.querySelector(".Questions");
const questionOptions = document.querySelector(".QuestionOptions"); 
const ExitButton = document.querySelector(".Buttons .ExitButton");
const ContinueButton = document.querySelector(".Buttons .ContinueButton");
const timeLine = document.querySelector('.QuestionHeader .TimeLines');
const timeCount = document.querySelector(".TimeCount .Seconds");


StartButton.onclick = () => {
    RulesPage.classList.add("activeInfo")
}

ExitButton.onclick =()=>{
    RulesPage.classList.remove("activeInfo")
}

ContinueButton.onclick =()=>{
    RulesPage.classList.remove("activeInfo");
    QuestionPage.classList.add("activeQuiz");
    showQuestion(0);
    startTimer(15);
    startTimerLine(0)
}

const NextQuestion = document.querySelector(".NextQuestion");
const resultBox    = document.querySelector(".resultBox");
const ReExam       = document.querySelector(".LastButtons .RestartExam");
const QuitExam     = document.querySelector(".LastButtons .QuitExam");
let allOptions     = questionOptions.children.length;


ReExam.onclick = () => {
    QuestionPage.classList.add("activeQuiz");
    resultBox.classList.remove("activeResult");
    let totalQuestion = 0;
    let TimeCounter;
    let timeValue = 15;
    let counterLine;
    let widthValue = 0;
    showQuestion(totalQuestion);
    clearInterval(TimeCounter);
    startTimer(timeValue);
    clearInterval(counterLine);
    startTimerLine(widthValue);
    NextQuestion.style.display = "none";
}

QuitExam.onclick = () =>{
    window.location.reload();
}

let totalQuestion = 0;
let TimeCounter;
let timeValue = 15;
let counterLine;
let widthValue = 0;
let userScore = 0;

NextQuestion.onclick=()=>{
    if(totalQuestion < questions.length - 1){
        totalQuestion++;
        showQuestion(totalQuestion);
        clearInterval(TimeCounter);
        startTimer(timeValue);
        clearInterval(counterLine);
        startTimerLine(widthValue);
        NextQuestion.style.display = "none";
    }else{
        showResultPage();
        clearInterval(TimeCounter);
        clearInterval(counterLine);
    }
};

function showQuestion(ind){
    const question = document.querySelector('.QuestionText');
    const questionOptions = document.querySelector(".QuestionOptions");
    let option_tag = '<div class="Options">'+ questions[ind].option[0] +'</div>'
                    +'<div class="Options">'+ questions[ind].option[1] +'</div>'
                    +'<div class="Options">'+ questions[ind].option[2] +'</div>'
                    +'<div class="Options">'+ questions[ind].option[3] +'</div>';
    const tag = "<span>"+ questions[ind].number+ ". " + questions[ind].question +"</span>";
    question.innerHTML = tag;
    questionOptions.innerHTML = option_tag;

    const no_of_question = document.querySelector('.QuestionFooter');
    let no_of_question_tag = '<p>'+questions[ind].number+" of &nbsp;"+questions.length+" Question" +'</p>';
    no_of_question.innerHTML = no_of_question_tag;

    const selectedOption = questionOptions.querySelectorAll('.Options');
    for(let i=0; i<selectedOption.length; i++){
        selectedOption[i].setAttribute("onclick", "optionSelected(this)");
    };
};

let correctIcon = '<div class="check icon"><i class="fas fa-check"></i></div>';
let wrongIcon = '<div class="cross icon"><i class="fas fa-times"></i></div>';

function optionSelected(answer){
    clearInterval(TimeCounter);
    clearInterval(counterLine);
    let selectedAnswer = answer.textContent;
    let correctAnswer = questions[totalQuestion].answer;
    let allOptions = questionOptions.children.length;

    if(selectedAnswer == correctAnswer){
        userScore = userScore + 1;
        answer.classList.add("correct");
        answer.insertAdjacentHTML("beforeEnd", correctIcon);
    }else{
        answer.classList.add("incorrect")
        answer.insertAdjacentHTML("beforeEnd", wrongIcon)
        for(let i = 0; i < allOptions; i++){
            if(questionOptions.children[i].textContent == correctAnswer){
                questionOptions.children[i].setAttribute("class", "Options correct");
                questionOptions.children[i].insertAdjacentHTML("beforeEnd", correctIcon);
            }
        }
    }

    for(let i = 0; i < allOptions; i++){
        questionOptions.children[i].classList.add("disabled");
    }

    NextQuestion.style.display = "block";
}

function showResultPage(){
    RulesPage.classList.remove("activeInfo");
    QuestionPage.classList.remove("activeQuiz");
    resultBox.classList.add("activeResult");
    const ScoreText = document.querySelector(".scoreText");
    if(userScore === 0){
        let ScoreTag = '<span>Sorry you got <p>'+userScore+'</p> out of <P>'+questions.length+'</P></span>';
        ScoreText.innerHTML = ScoreTag;
    }
    if(userScore > 5){
        let ScoreTag = '<span>Congratulation! you got <p>'+userScore+'</p> out of <P>'+questions.length+'</P></span>';
        ScoreText.innerHTML = ScoreTag;
    }
    if(userScore > 2){
        let ScoreTag = '<span>Carry on you got <p>'+userScore+'</p> out of <P>'+questions.length+'</P></span>';
        ScoreText.innerHTML = ScoreTag;
    }
}

function startTimer(time){
    TimeCounter = setInterval(timer, 1000);
    function timer(){
        timeCount.textContent = time;
        time--;
        if(time < 9){
            let runningTime = timeCount.textContent;
            timeCount.textContent = 0 + runningTime;
        }
        if(time < 0){
            clearInterval(TimeCounter);
            timeCount.textContent = "00";
            let correctAnswer = questions[totalQuestion].answer;
            let allOptions = questionOptions.children.length;
            for(let i = 0; i < allOptions; i++){
                if(questionOptions.children[i].textContent == correctAnswer){
                    questionOptions.children[i].setAttribute("class", "Options correct");
                    questionOptions.children[i].insertAdjacentHTML("beforeEnd", correctIcon);
                }
            }
            for(let i = 0; i < allOptions; i++){
                questionOptions.children[i].classList.add("disabled");
            }
        
            NextQuestion.style.display = "block";
        }
    }
}

function startTimerLine(time){
    counterLine = setInterval(timer, 50);
    function timer(){
        time = time + 1;
        timeLine.style.width = time + "px";
        if(time > 319){
            clearInterval(counterLine);
        }
    }
}
