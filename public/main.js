let dealerHand = []
let playerHand = []
let deck = []

const playerHandTotal = () => {
  let playerTotal = 0
  playerHand.forEach(card => {
    playerTotal += card.value
  })

  return playerTotal
}

const dealCardToPlayer = () => {
  let card = deck.pop()
  playerHand.push(card)
  let playerHandDiv = document.querySelector('.player-hand')
  let image = document.createElement('img')
  image.src = `/images/${card.face}${card.suit}.jpg`
  playerHandDiv.appendChild(image)

  document.querySelector('.player-hand-total').textContent = playerHandTotal()
}

const dealerHandTotal = () => {
  let dealerTotal = 0
  dealerHand.forEach(card => {
    dealerTotal += card.value
  })

  return dealerTotal
}

const dealCardToDealer = upOrDown => {
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

  if (dealerHandTotal() !== 0 && playerHandTotal() !== 0) {
    if (dealerHandTotal() >= 22) {
      winDeclareStatement.textContent =
        'Dealer Busts with ' + `${dealerHandTotal()}` + '.You Win!'
    }

    if (dealerHandTotal() > playerHandTotal() && dealerHandTotal() <= 21) {
      winDeclareStatement.textContent =
        'Dealer has ' + `${dealerHandTotal()}` + '. You Lose'
    }

    if (dealerHandTotal() < playerHandTotal()) {
      winDeclareStatement.textContent =
        'Dealer has ' + `${dealerHandTotal()}` + '. You Win!'
    }

    if (dealerHandTotal() === playerHandTotal()) {
      winDeclareStatement.textContent =
        'Dealer has ' + `${dealerHandTotal()}` + '. You Lose'
    }
  }
}

playerChoseToHit = () => {
  dealCardToPlayer()
  if (playerHandTotal() >= 22) {
    document.querySelector('.outcome').textContent = 'You Bust. Dealer Wins!'
    document.querySelector('.player-hit').classList.add('hide-button')
    document.querySelector('.player-stay').classList.add('hide-button')
  }
}

let dealerUnderSeventeen = () => {
  if (dealerHandTotal() < 17) {
    dealCardToDealer()
    winnerDeclared()
  }
}

playerChoseToStay = () => {
  document.querySelector('.hide').classList.add('hidden')
  document.querySelector('.player-hit').classList.add('hide-button')
  document.querySelector('.player-stay').classList.add('hide-button')

  dealerUnderSeventeen()
  dealerUnderSeventeen()
  dealerUnderSeventeen()
  dealerUnderSeventeen()

  if (dealerHandTotal() >= 17 && dealerHandTotal() <= 21) {
    winnerDeclared()
  }

  if (dealerHandTotal() >= 22) {
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

  document.querySelector('.play-again').addEventListener('click', () => {
    document.location = '/'
  })
}

document.addEventListener('DOMContentLoaded', main)
