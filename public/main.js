let dealerHand = []
let playerHand = []
let deck = []
let playerTotal = 0
let dealerTotal = 0

let countPlayerTotal = () => {
  if (playerHand.length === 2) {
    playerTotal = playerHand[0].value + playerHand[1].value
    document.querySelector('.player-hand-total').textContent = playerTotal
  }

  if (playerHand.length === 3) {
    playerTotal = playerHand[0].value + playerHand[1].value + playerHand[2].value
    document.querySelector('.player-hand-total').textContent = playerTotal

  }

  if (playerHand.length === 4) {
    playerTotal = playerHand[0].value + playerHand[1].value + playerHand[2].value + playerHand[3].value
    document.querySelector('.player-hand-total').textContent = playerTotal
  }

  if (playerHand.length === 5) {
    playerTotal = playerHand[0].value + playerHand[1].value + playerHand[2].value + playerHand[3].value + playerHand[4].value
    document.querySelector('.player-hand-total').textContent = playerTotal
  }
}

let countDealerTotal = () => {
  if (dealerHand.length === 2) {
    dealerTotal = dealerHand[0].value + dealerHand[1].value
  }

  if (dealerHand.length === 3) {
    dealerTotal = dealerHand[0].value + dealerHand[1].value + dealerHand[2].value
  }

  if (dealerHand.length === 4) {
    dealerTotal = dealerHand[0].value + dealerHand[1].value + dealerHand[2].value + dealerHand[3].value
  }

  if (dealerHand.length === 5) {
    dealerTotal = dealerHand[0].value + dealerHand[1].value + dealerHand[2].value + dealerHand[3].value + dealerHand[4].value
  }
}

const dealCardToPlayer = () => {
  let card = deck.pop()
  playerHand.push(card)
  let playerHandDiv = document.querySelector('.player-hand')
  let image = document.createElement('img')
  image.src = `/images/${card.face}${card.suit}.jpg`
  playerHandDiv.appendChild(image)
  countPlayerTotal()
}

const dealCardToDealer = (upOrDown) => {
  let card = deck.pop()
  dealerHand.push(card)
  let dealerHandDiv = document.querySelector('.dealer-hand')
  let image = document.createElement('img')
  image.src = `/images/${card.face}${card.suit}.jpg`
  if (upOrDown === 'down') {
    image.src = `/images/purple_back.jpg`
    image.className = 'swing'
  }
  dealerHandDiv.appendChild(image)
}

const winnerDeclared = () => {
  let winDeclareStatement = document.querySelector('.outcome')

  countDealerTotal()
  countPlayerTotal()

  if (dealerTotal !== 0 && playerTotal !== 0) {
    if (dealerTotal >= 22) {
      winDeclareStatement.textContent = 'Dealer Busts with ' + `${dealerTotal}` + '.You Win!'
    }

    if (dealerTotal > playerTotal && dealerTotal <= 21) {
      winDeclareStatement.textContent = 'Dealer has ' + `${dealerTotal}` + '. You Lose'
    }

    if (dealerTotal < playerTotal) {
      winDeclareStatement.textContent = 'Dealer has ' + `${dealerTotal}` + '. You Win!'
    }

    if (dealerTotal === playerTotal) {
      winDeclareStatement.textContent = 'Dealer has ' + `${dealerTotal}` + '. You Lose'
    }
  }
}

playerChoseToHit = () => {
  dealCardToPlayer()
  countPlayerTotal()
  if (playerTotal >= 22) {
    document.querySelector('.outcome').textContent = 'You Bust. Dealer Wins!'
  }
}

let dealerUnderSeventeen = () => {
  if (dealerTotal < 17) {
    dealCardToDealer()
    winnerDeclared()
  }
}

playerChoseToStay = () => {
  document.querySelector('.hide').classList.add('hidden')

  dealerUnderSeventeen()
  dealerUnderSeventeen()
  dealerUnderSeventeen()
  dealerUnderSeventeen()

  if (dealerTotal >= 17 && dealerTotal <= 21) {
    winnerDeclared()
  }

  if (dealerTotal >= 22) {
    winnerDeclared()
  }
}

const main = () => {
  let suits = ['S', 'H', 'C', 'D']
  let cardValues = [
    { value: 2, face: 2 },
    { value: 3, face: 3 },
    { value: 4, face: 4 },
    { value: 5, face: 5 },
    { value: 6, face: 6 },
    { value: 7, face: 7 },
    { value: 8, face: 8 },
    { value: 9, face: 9 },
    { value: 10, face: 10 },
    { value: 10, face: 'J' },
    { value: 10, face: 'Q' },
    { value: 10, face: 'K' },
    { value: 11, face: 'A' }
  ]

  suits.forEach(suit => {
    cardValues.forEach(card => {

      let newCardForTheDeck = {
        suit: suit,
        value: card.value,
        face: card.face
      }
      deck.push(newCardForTheDeck)
    })
  })

  let playerHit = document.querySelector('.player-hit')
  playerHit.addEventListener('click', playerChoseToHit)

  let playerStay = document.querySelector('.player-stay')
  playerStay.addEventListener('click', playerChoseToStay)

  for (let i = 52 - 1; i > 1; i -= 1) {
    let j = Math.floor(Math.random() * i)
    let firstCard = deck[i]
    let secondCard = deck[j]
    deck[i] = secondCard
    deck[j] = firstCard
  }

  dealCardToPlayer()
  dealCardToPlayer()
  dealCardToDealer()
  countPlayerTotal()
  countDealerTotal()

  document.querySelector('.play-again').addEventListener('click', () => {
    document.location = '/'
  })


}

document.addEventListener('DOMContentLoaded', main)

