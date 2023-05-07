let questionPlace = document.querySelector(`.quiz-area h2`) ;
let ansPlaces = document.querySelectorAll(`.answers-area label`);
let submitButton = document.querySelector(".submit-button") ;
let currindex = 0 ;
let dataindexs ;
let data ;
let rightAnsCount = 0 ;
let duration  = 150 ;
let countDown = document.querySelector(".countdown") ;
fetch("test.json").then((res) => {return res.json()}).then((d) =>{
    data = Array.from(d);
    console.log(data); 
    if(currindex == 0){
        dataindexs = genrateRandomInts(5,data.length-1) ;
        dataindexs = Array.from(dataindexs) ;
    }
        
    let i = dataindexs[currindex] ;// i is the index of the cuurent question in the API 
    
    displayData(i) ;

    submitButton.onclick = ()=>{
        changeQuestion(i) ;
    }

    setInterval(()=>{
        if(duration <= 0){
            changeQuestion(i) ;
        }
        duration-- ;
        let minuts = parseInt(duration/60) ;
        let seconds = duration%60 ;
        minuts = minuts < 10 ? `0${minuts}` : minuts ;
        seconds = seconds < 10 ? `0${seconds}`:seconds ;
        countDown.innerHTML = `${minuts}:${seconds}` ;
    } , 1000)

}) ;

function changeQuestion(i){
    if(checkAnswer(i)) {
        rightAnsCount++ ;
    }
    currindex++ ;
    if(currindex >= 5)done() ;
    else displayData(dataindexs[currindex]) ;
}

function displayData(i){
    questionPlace.textContent = data[i].title ;
    duration = 150 ;
    countDown.innerHTML = `02:30` ;

    for(let j = 1 ; j<= 4 ; j++){
        ansPlaces[j-1].textContent = data[i][`answer_${j}`] ;
        document.querySelectorAll("input[type='radio']")[j-1].checked = false  ;
    }
    for(let j = 0 ;j < 5 ; j++){
        if(j == currindex){
            document.querySelectorAll(".bullets span")[j].classList.add("on");
        }
        else document.querySelectorAll(".bullets span")[j].classList.remove("on"); 
    }
}
function genrateRandomInts(count , max){
    let set = new Set();
    if(count > max)return false ;
    while(set.size < count){
        set.add(Math.floor(Math.random()*max)+1) ;
    }
    return set ;
}
//continu from here
function checkAnswer(i){
    let rAns = data[i].right_answer ;
    let radioinput = document.querySelectorAll(".answer input") ;
    let label = document.querySelectorAll(".answer label") ;
    
    for(let j = 0 ; j < 4 ;j++){
        if(radioinput[j].checked === true && label[j].textContent === rAns){
            return true; 
        }
    }
    return false ;
}

function done(){
    document.querySelector(".quiz-area").remove() ;
    document.querySelector(".answers-area").remove();
    document.querySelector(".submit-button").remove() ;
    document.querySelector(".bullets").remove() ;

    let massege  ;
    if(rightAnsCount === 5){
        massege = `<span class="perfect">Perfect answer</span>` ;
    }else if(rightAnsCount > 2){
        massege = `<span class="good">Not bad</span> ${rightAnsCount}/${5}` ;
    }else massege = `<span class="bad">Bad</span>` ;
    document.querySelector(".results").innerHTML =massege ;
    document.querySelector(".results").style.padding = "10px" ;
}

