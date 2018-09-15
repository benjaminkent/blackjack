let dealerHand = []

playerChoseToHit = () => {
  console.log('You Hit')
}

playerChoseToStay = () => {
  console.log('You Stayed')
}

const main = () => {
  let suits = ['spades', 'hearts', 'clubs', 'diamonds']
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
    { value: 10, face: 'jack' },
    { value: 10, face: 'queen' },
    { value: 10, face: 'king' },
    { value: 11, face: 'ace' }
  ]

  let deck = []

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
}

document.addEventListener('DOMContentLoaded', main)

