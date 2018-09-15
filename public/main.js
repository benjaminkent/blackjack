let dealerHand = []
let playerHand = []
let deck = []

const dealCardToPlayer = () => {
  let card = deck.pop()
  playerHand.push(card)
  let playerHandDiv = document.querySelector('.player-hand')
  let image = document.createElement('img')
  image.src = `/images/${card.face}${card.suit}.jpg`
  playerHandDiv.appendChild(image)
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

playerChoseToHit = () => {
  dealCardToPlayer()
}

playerChoseToStay = () => {
  console.log('You Stayed')
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
  dealCardToDealer('up')
  dealCardToDealer('down')

  document.querySelector('.play-again').addEventListener('click', () => {
    document.location = '/'
  })


}

document.addEventListener('DOMContentLoaded', main)

