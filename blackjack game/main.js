let myCards = []
let dealerCards = []
let drawBtn = document.getElementById("draw-card")
let mySum = 0
let dealerSum = 0
let card = 0
let balance = 500
let text = document.getElementById('text')
drawBtn.addEventListener('click',() =>{
    if(mySum<21){
        pushCard()
    }
    else{
        alert("you cannot draw another card")
    }
})
document.getElementById('reveal-cards').addEventListener('click', ()=>{
    for(let k = 0; k<2; k++){
        dealerCard = Math.ceil(Math.random()*11)
        dealerSum += dealerCard
        dealerCards.push(dealerCard)
        console.log("Dealer's deck:" + dealerSum)
        document.getElementById("dealer-cards").innerHTML += dealerCard + " "
    }
    
    if(dealerSum<15){
        newDealerCard = Math.ceil(Math.random()*11)
        dealerSum += newDealerCard
        dealerCards.push(newDealerCard)
        document.getElementById("dealer-cards").innerHTML += newDealerCard + " "
        document.getElementById('dealer-total').innerHTML = "Total: " + dealerSum
        if(dealerSum>21){
            gameWon()
            gameOver()
        }
        else if(dealerSum==21){
            gameLost()
            gameOver()
        }
    }
    if(mySum>dealerSum){
        gameWon()
        gameOver()
    }
    else if(mySum==dealerSum){
        text.innerHTML = "Draw"
        gameOver()
    }
    else {
        gameLost()
        gameOver()
    }
})

function newGame(){
    if(balance ==0){
        alert('you have 0 balance')
        return
    }
    else{
        for(let j = 0; j<2; j++){
            card = Math.ceil(Math.random()*11)
            mySum += card
            myCards.push(card)
            if(mySum>21){
                gameLost()
                gameOver()
            }
            if(mySum==21){
                gameWon()
                gameOver()
            }
            document.getElementById("my-cards").innerHTML += (card) + " "
        }
        drawBtn.disabled = false
        document.getElementById('reveal-cards').disabled = false
        text.innerHTML = ""
        document.getElementById('my-total').innerHTML = "Total: " + mySum
        document.getElementById('dealer-total').innerHTML = "Total: "
    }
}
function pushCard(){
    let newCard = Math.ceil(Math.random()*11)
    myCards.push(newCard)
    document.getElementById("my-cards").innerHTML += newCard + " "
    mySum+= newCard
    document.getElementById('my-total').innerHTML = "Total: " + mySum
    if(mySum>21){
        gameLost()
        gameOver()
    }
    if(mySum==21){
        gameWon()
        gameOver()
    }
    
}
newGame()

document.getElementById('new-game').addEventListener('click', ()=>{
    mySum = 0
    dealerSum = 0
    for(let a = 0; a<myCards.length; a++){
        myCards.pop(a)
    }
    for(let a = 0; a<dealerCards.length; a++){
        dealerCards.pop(a)
    }
    document.getElementById("my-cards").innerHTML = "Your cards:"
    document.getElementById("dealer-cards").innerHTML = "Dealer's cards: "
    newGame()
})
function gameOver(){
    drawBtn.disabled = true
    document.getElementById('reveal-cards').disabled = true
}
function gameLost(){
    balance -= 100
    text.innerHTML = "You Lost!"
    document.getElementById('balance').innerHTML = "Balance:" + balance
}
function gameWon(){
    balance += 100
    text.innerHTML = "You Won!"
    document.getElementById('balance').innerHTML = "Balance:" + balance
}