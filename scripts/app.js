document.addEventListener('DOMContentLoaded', () => {

  // Defining array of cell indexes for the possible moving path
  const width = 20
  const grid = document.querySelector('.grid')
  const cells = []

  const path = [21, 22, 23, 24, 25, 26, 27, 28, 31, 32, 33, 34, 35, 36, 36, 37, 38, 41, 48, 51, 61, 81, 101, 121, 68, 71, 58, 78, 98, 88, 91, 82, 83,
    84, 85, 86, 87, 89, 90, 92, 93, 94, 95, 96, 97, 168, 168, 169, 170, 171, 44, 64, 104, 124, 144, 164, 184, 204, 224, 244, 264, 284, 304, 324, 321,
    322, 323, 341, 361, 362, 363, 364, 365, 366, 367, 368, 369, 368, 369, 370, 371, 372, 373, 374, 375, 376, 377, 378, 358, 338, 337, 336, 335,
    315, 295, 275, 255, 235, 215, 195, 175, 155, 135, 115, 136, 137, 138, 118, 200, 201, 202, 203, 205, 206, 207, 214, 213, 212, 216, 217, 218, 219,
    122, 123, 75, 55, 125, 126, 127, 128, 131, 132, 133, 134, 148, 151, 167, 187, 172, 192, 227, 232, 228, 229, 230, 231, 248, 251, 268, 271, 288, 291,
    285, 286, 306, 326, 327, 308, 328, 311, 331, 332, 333, 313, 293, 294, 296, 297, 298, 318, 278, 258, 257, 256, 283, 282, 301, 281, 261, 241, 242, 243, 347, 352, 289, 290]
  const food = [22, 23, 24, 25, 26, 27, 28, 31, 32, 33, 34, 35, 36, 36, 37, 41, 48, 51, 61, 81, 101, 121, 68, 71, 58, 78, 98, 88, 91, 82, 83,
    84, 85, 86, 87, 89, 90, 92, 93, 94, 95, 96, 97, 168, 168, 169, 170, 171, 44, 64, 104, 124, 144, 164, 184, 204, 224, 244, 264, 284, 304, 324, 321,
    322, 323, 341, 362, 363, 364, 365, 366, 367, 368, 369, 368, 369, 370, 371, 372, 373, 374, 375, 376, 377, 358, 338, 337, 336, 335,
    315, 295, 275, 255, 235, 215, 195, 175, 155, 135, 115, 136, 137, 138, 118, 205, 206, 207, 214, 213, 212,
    122, 123, 75, 55, 125, 126, 127, 128, 131, 132, 133, 134, 148, 151, 167, 187, 172, 192, 227, 232, 228, 229, 230, 231, 248, 251, 268, 271, 288, 291,
    285, 286, 306, 326, 327, 308, 328, 311, 331, 332, 333, 313, 293, 294, 296, 297, 298, 318, 278, 258, 257, 256, 283, 282, 301, 281, 261, 241, 242, 243, 347, 352, 289, 290]
  const pills = [21, 38, 361, 378]

  // Creating grid board 
  function createBoard() {
    for (let i = 0; i < width ** 2; i++) {
      const cell = document.createElement('DIV')

      // Cell numbering for development purposes only
      // cell.innerHTML = i

      grid.appendChild(cell)
      cells.push(cell)

      // Adding path class to grid elements if they are in path array
      if (path.includes(i)) {
        cell.classList.add('path')
      } else {
        cell.classList.add('wall')
      }
      if (food.includes(i)) {
        cell.classList.add('food')
      }
      if (pills.includes(i)) {
        cell.classList.add('pill')
      }
    }
  }


  // Defining player - related variables
  let playerDead = false
  let playerOnPill = false
  let playerIdx = 89
  let playerLives = 3
  let playerPoints = 0
  let pointsPerGhostOnPill = 200
  let playerX
  let playerY
  const livesLeft = document.querySelector('#lives-left')
  livesLeft.innerHTML = playerLives
  function playerCoordinates() {
    playerX = playerIdx % width
    playerY = Math.floor(playerIdx / width)
    const highScore = document.querySelector('#high-score')
    highScore.innerHTML = playerPoints
  }

  // Player move logic

  function playerMove() {
    document.addEventListener('keyup', (e) => {

      if (playerLives === 0) return
      cells[playerIdx].classList.remove('player')
      switch (e.keyCode) {
        case 37:
          if (path.includes(playerIdx - 1)) {
            playerIdx -= 1
            // playerPoints
          } else if (playerX === 0) {
            playerIdx += width - 1
          }
          break
        case 38:
          if (path.includes(playerIdx - width))
            playerIdx -= width
          break
        case 39:
          if (path.includes(playerIdx + 1)) {
            playerIdx += 1
          } else if (
            playerX === width - 1) {
            playerIdx -= width - 1
          }
          break
        case 40:
          if (path.includes(playerIdx + width))
            playerIdx += width
          break
      }
      if (cells[playerIdx].classList.contains('food')) {
        cells[playerIdx].classList.remove('food')
        playerPoints += 10
      } else if (cells[playerIdx].classList.contains('pill')) {
        cells[playerIdx].classList.remove('pill')
        playerPoints += 10
        playerOnPillMode()
      }
      playerCoordinates()
      cells[playerIdx].classList.add('player')
    })
  }


  class Ghost {
    constructor(name, initialIdx) {
      this.name = name
      this.initialIdx = initialIdx
      this.idx = this.initialIdx
      this.foodClassRemoved = null
      this.prevStep = this.idx
      this.x = this.idx % width
      this.y = Math.floor(this.idx / width)
      this.timer = 250

    }
    ghostCoords() {
      this.x = this.idx % width
      this.y = Math.floor(this.idx / width)
    }
    goRight() {
      this.prevStep = this.idx
      // cells[this.idx].id = 'transition-right'
      this.idx += 1
      this.ghostCoords()
    }
    goDown() {
      this.prevStep = this.idx
      // cells[this.idx].id = 'transition-down'
      this.idx += width
      this.ghostCoords()
    }
    goLeft() {
      this.prevStep = this.idx
      // cells[this.idx].id = 'transition-left'
      this.idx -= 1
      this.ghostCoords()
    }
    goUp() {
      this.prevStep = this.idx
      // cells[this.idx].id = 'transition-up'
      this.idx -= width
      this.ghostCoords()
    }
    brain() {
      // console.log(this.name, playerDead, playerLives)
      if (this.foodClassRemoved) {
        cells[this.idx].classList.add('food')
      }
      cells[this.idx].classList.remove('ghost')
      // ghostPrevStep = ghostIdx
      const randomRoute = Math.floor(Math.random() * 2)
      // console.log(randomRoute, this.name)

      if (this.x === 0) {
        console.log(this.x)
        this.prevStep = this.idx
        this.idx += width - 2
        this.ghostCoords()

        //if ghost is on Last column on the right
      } else if (this.x === width - 1) {
        this.prevStep = this.idx
        this.idx -= width - 2
        this.ghostCoords()
        //if ghost is HIGH LEFT
      } else if (this.x < playerX && this.y < playerY) {
        // console.log('HIGH LEFT')
        if (randomRoute === 0 && path.includes(this.idx + width) && (this.prevStep !== (this.idx + width))) {
          this.goDown()
        } else if (path.includes(this.idx + 1) && (this.prevStep !== (this.idx + 1))) {
          this.goRight()
        } else if (path.includes(this.idx - 1) && (this.prevStep !== (this.idx - 1))) {
          this.goLeft()
        } else if (path.includes(this.idx - width) && (this.prevStep !== (this.idx - width))) {
          this.goUp()
        } else if (path.includes(this.idx + width) && (this.prevStep !== (this.idx + width))) {
          this.goDown()
        }
        //if ghost is HIGH RIGHT
      } else if (this.x > playerX && this.y < playerY) {
        if (randomRoute === 0 && path.includes(this.idx - 1) && (this.prevStep !== (this.idx - 1))) {
          this.goLeft()
        } else if (path.includes(this.idx + width) && (this.prevStep !== (this.idx + width))) {
          this.goDown()
        } else if (path.includes(this.idx - width) && (this.prevStep !== (this.idx - width))) {
          this.goUp()
        } else if (path.includes(this.idx + 1) && (this.prevStep !== (this.idx + 1))) {
          this.goRight()
        } else if (path.includes(this.idx - 1) && (this.prevStep !== (this.idx - 1))) {
          this.goLeft()
        }
        // ghost is BOTTOM RIGHT
      } else if (this.x > playerX && this.y > playerY) {
        // console.log('BOTTOM RIGHT')
        if (randomRoute === 0 && path.includes(this.idx - width) && (this.prevStep !== (this.idx - width))) {
          this.goUp()
        } else if (path.includes(this.idx - 1) && (this.prevStep !== (this.idx - 1))) {
          this.goLeft()
        } else if (path.includes(this.idx + width) && (this.prevStep !== (this.idx + width))) {
          this.goDown()
        } else if (path.includes(this.idx + 1) && (this.prevStep !== (this.idx + 1))) {
          this.goRight()
        } else if (path.includes(this.idx - width) && (this.prevStep !== (this.idx - width))) {
          this.goUp()
        }
        // ghost is BOTTOM LEFT
      } else if (this.x < playerX && this.y > playerY) {
        if (randomRoute === 0 && path.includes(this.idx + 1) && (this.prevStep !== (this.idx + 1))) {
          this.goRight()
        } else if (path.includes(this.idx - width) && (this.prevStep !== (this.idx - width))) {
          this.goUp()
        } else if (path.includes(this.idx + width) && (this.prevStep !== (this.idx + width))) {
          this.goDown()
        } else if (path.includes(this.idx - 1) && (this.prevStep !== (this.idx - 1))) {
          this.goLeft()
        } else if (path.includes(this.idx + 1) && (this.prevStep !== (this.idx + 1))) {
          this.goRight()
        }
        //Ghost higher or lower on same X axis
      } else if (this.x === playerX && this.y !== playerY) {
        if (path.includes(this.idx - width) && (this.y > playerY)) {
          this.goUp()
        } else if (path.includes(this.idx + width) && (this.y < playerY)) {
          this.goDown()
        } else if (randomRoute === 0 && path.includes(this.idx - 1)) {
          this.goLeft()
        } else if (path.includes(this.idx + 1)) {
          this.goRight()
        }
        //Ghost is left or right on same Y axis
      } else if (this.y === playerY && this.x !== playerX) {
        if (path.includes(this.idx + 1) && (this.x < playerX)) {
          this.goRight()
        } else if (path.includes(this.idx - 1) && (this.x > playerX)) {
          this.goLeft()
        } else if (randomRoute === 0 && path.includes(this.idx + width)) {
          this.goDown()
        } else if (path.includes(this.idx - width)) {
          this.goUp()
        }
      } else if (this.idx === playerIdx && !playerOnPill) {
        playerLives -= 1
        livesLeft.innerHTML = playerLives
        playerDead = true
      }

      if (cells[this.idx].classList.contains('food')) {
        cells[this.idx].classList.remove('food')
        this.foodClassRemoved = true
      } else {
        this.foodClassRemoved = false
      }
      cells[this.idx].classList.add('ghost')
    }
    // Ghost move function

    move() {
      cells[this.idx].classList.remove('ghost-on-pill')
      // cells[this.idx].classList.add('ghost')
      if (playerLives > 0) {
        this.id = setInterval(() => {
          this.brain()
          if (playerDead === true) {
            clearInterval(this.id)
            cells[this.idx].classList.remove('ghost')
            playerDead = false
            this.idx = this.initialIdx
            this.move()
          }
        }, this.timer)
      } else {
        gameOver()
      }
    }
    // function for ghost logic when player eats pill

    ghostOnPill() {
      cells[this.idx].classList.remove('ghost')
      const ghostOnPillId = setInterval(() => {
        if (playerOnPill) {
          if (this.foodClassRemoved) {
            cells[this.idx].classList.add('food')
          }
          cells[this.idx].classList.remove('ghost-on-pill')
          if (path.includes(this.idx + 1) && (this.prevStep !== (this.idx + 1))) {
            this.goRight()
          } else if (path.includes(this.idx - width) && (this.prevStep !== (this.idx - width))) {
            this.goUp()
          } else if (path.includes(this.idx + width) && (this.prevStep !== (this.idx + width))) {
            this.goDown()
          } else if (path.includes(this.idx - 1) && (this.prevStep !== (this.idx - 1))) {
            this.goLeft()
          }
          if (this.idx === playerIdx && playerOnPill) {
            console.log(pointsPerGhostOnPill)
            pointsPerGhostOnPill += 200
            playerPoints += pointsPerGhostOnPill
            cells[this.idx].classList.remove('ghost-on-pill')
            this.idx = this.initialIdx
            this.ghostCoords()
          }
          if (cells[this.idx].classList.contains('food')) {
            cells[this.idx].classList.remove('food')
            this.foodClassRemoved = true
          } else {
            this.foodClassRemoved = false
          }
          cells[this.idx].classList.add('ghost-on-pill')
        } else {
          console.log(`${this.name} removing pill`)
          cells[this.idx].classList.remove('ghost-on-pill')
          cells[this.idx].classList.add('ghost')
          // this.ghostCoords()
          clearInterval(ghostOnPillId)
        }
      }, 500)
    }

  }
  //GHOST object class ended
  // Creating ghosts - to be put in the array in the future for easier handling
  const firstGhost = new Ghost('pinky', 227)
  const secondGhost = new Ghost('winky', 232)
  const thirdGhost = new Ghost('stinky', 167)
  const fourthGhost = new Ghost('blinky', 172)

  // deployGhosts is used to get all created ghosts moving
  function deployGhosts() {
    firstGhost.move()
    secondGhost.move()
    thirdGhost.move()
    fourthGhost.move()
  }
  // clearIntervalAll to clear the intervals of all class "ghost" "move" functions
  function clearIntervalAll() {
    clearInterval(firstGhost.id)
    clearInterval(secondGhost.id)
    clearInterval(thirdGhost.id)
    clearInterval(fourthGhost.id)
  }

  //Game over function gets ran when player is out of lives
  function gameOver() {
    clearIntervalAll()
    const gameOverScreen = document.createElement('DIV')
    gameOverScreen.textContent = 'GAME OVER!'
    gameOverScreen.classList.add('game-over')
    document.body.appendChild(gameOverScreen)
  }
  //playerOnPillMode function gets run when player ats the pill
  function playerOnPillMode() {
    // duration of pill mode set as a value of pillModeTimer variable
    clearIntervalAll()
    playerOnPill = true
    firstGhost.ghostOnPill()
    secondGhost.ghostOnPill()
    thirdGhost.ghostOnPill()
    fourthGhost.ghostOnPill()
    let pillModeTimer = 6
    const pillTimerId = setInterval(() => {
      pillModeTimer -= 1
      console.log(pillModeTimer)
      if (pillModeTimer === 0) {
        playerOnPill = false
        pointsPerGhostOnPill = 200
        clearInterval(pillTimerId)
        deployGhosts()
      }
    }, 1000)
  }
  // Gameplay functions below
  createBoard()
  playerMove()
  deployGhosts()
})