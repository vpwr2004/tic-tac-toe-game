const boxes=document.querySelectorAll(".box");
const gameInfo=document.querySelector(".game-info");
const newGamebtn=document.querySelector(".btn");

let currentPlayer;
let gameGrid;
initGame();
const winningPostions=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

// function to initialize the game 
function initGame(){
    currentPlayer="X";
    gameGrid=["","","","","","","","",""];
    boxes.forEach((box,index) =>{
        box.innerText="";
        box.style.pointerEvents="all";
        box.classList.remove("win");
    });
    if(newGamebtn.classList.contains("active"))
        newGamebtn.classList.remove("active");
    gameInfo.innerText=`Current Player - ${currentPlayer}`;
}

boxes.forEach((box,index) => {
    box.addEventListener("click",()=>{
        handleClick(index);
    })
});

function handleClick(index){
    if(gameGrid[index]==""){
        boxes[index].innerText=currentPlayer;
        gameGrid[index]=currentPlayer;
        boxes[index].style.pointerEvents="none";
        swapTurn();
        checkGameOver();
    }
}

function swapTurn() {
    if(currentPlayer=="X"){
        currentPlayer="O";
    }
    else{
        currentPlayer="X"
    }
    gameInfo.innerText=`Current Player - ${currentPlayer}`;
}

function checkGameOver(){
    let answer="";
    winningPostions.forEach((position)=>{
        if((gameGrid[position[0]]!=="" ||  gameGrid[position[1]]!="" || gameGrid[position[2]])  &&
        (gameGrid[position[0]]===gameGrid[position[1]] && gameGrid[position[1]]===gameGrid[position[2]])){
            if(gameGrid[position[0]]==="X")
                answer="X";
            else
                answer="O";
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");

            boxes.forEach((box)=>{
                box.style.pointerEvents="none";
            })
        }

    })
    if(answer!==""){
        gameInfo.innerText=`Winner Player - ${answer}`;
        newGamebtn.classList.add("active");
        return;
    }
    let fillCnt=0;
    gameGrid.forEach((box)=>{
        if(box!=="")
            fillCnt++;
    })

    if(fillCnt===9){
        gameInfo.innerText="Game Tied!";
        newGamebtn.classList.add("active");
    }

}



newGamebtn.addEventListener("click",initGame);