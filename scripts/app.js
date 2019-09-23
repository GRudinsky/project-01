document.addEventListener('DOMContentLoaded', () => {
  const width = 20
  const grid = document.querySelector('.grid')
  const cells = []

  let playerIdx = 378
  let playerX
  let playerY
  function playerCoordinates() {
    playerX = playerIdx % width
    playerY = Math.floor(playerIdx / width)
  }
  playerCoordinates()

  let ghostIdx = 81
  let ghostPrevStep
  // let ghostStepRight = ghostIdx + 1
  // let ghostStepLeft = ghostIdx - 1
  // let ghostStepUp = ghostIdx - width
  // let ghostStepDown = ghostIdx + width
  let ghostX
  let ghostY
  function ghostCoordinates() {
    ghostX = ghostIdx % width
    ghostY = Math.floor(ghostIdx / width)
  }
  ghostCoordinates()

  // Defining array of cell indexes for the possible moving path
  const path = [21, 22, 23, 24, 25, 26, 27, 28, 31, 32, 33, 34, 35, 36, 36, 37, 38, 41, 48, 51, 61, 81, 101, 121, 68, 71, 58, 78, 98, 88, 91, 82, 83,
    84, 85, 86, 87, 89, 90, 92, 93, 94, 95, 96, 97, 168, 168, 169, 170, 171, 44, 64, 104, 124, 144, 164, 184, 204, 224, 244, 264, 284, 304, 324, 321,
    322, 323, 341, 361, 362, 363, 364, 365, 366, 367, 368, 369, 368, 369, 370, 371, 372, 373, 374, 375, 376, 377, 378, 378, 358, 338, 337, 336, 335,
    315, 295, 275, 255, 235, 215, 195, 175, 155, 135, 115, 136, 137, 138, 118, 200, 201, 202, 203, 205, 206, 207, 214, 213, 212, 216, 217, 218, 219,
    122, 123, 75, 55, 125, 126, 127, 128, 131, 132, 133, 134, 148, 151, 167, 187, 172, 192, 227, 232, 228, 229, 230, 231, 248, 251, 268, 271, 288, 291,
    285, 286, 306, 326, 327, 308, 328, 311, 331, 332, 333, 313, 293, 294, 296, 297, 298, 318, 278, 258, 257, 256, 283, 282, 301, 281, 261, 241, 242, 243, 347, 352, 289, 290]

  // Creating grid board 
  for (let i = 0; i < width ** 2; i++) {
    const cell = document.createElement('DIV')

    // Cell numbering for development purposes only
    cell.innerHTML = i

    // cell.addEventListener('click', handleClick)
    grid.appendChild(cell)
    cells.push(cell)
    console.log(cells.indexOf)

    // Adding path class to grid elements if they are in path array
    if (path.includes(i)) {
      cell.classList.add('path')
    } else {
      cell.classList.add('wall')
    }
  }

  // Defining player
  cells[playerIdx].classList.add('player')
  const player = document.querySelector('.grid div.player')

  //Defining ghost
  cells[ghostIdx].classList.add('ghost')
  const ghost = document.querySelector('.grid div.ghost')

  // Player movement
  function playerMovement() {
    document.addEventListener('keyup', (e) => {
      cells[playerIdx].classList.remove('player')
      switch (e.keyCode) {
        case 37: if (path.includes(playerIdx - 1)) {
          playerIdx -= 1
        } else if (playerX === 0) {
          playerIdx += width - 1
        }
          break
        case 38: if (path.includes(playerIdx - width))
          playerIdx -= width
          break
        case 39: if (path.includes(playerIdx + 1)) {
          playerIdx += 1
        } else if (
          playerX === width - 1) {
          playerIdx -= width - 1
        }
          break
        case 40: if (path.includes(playerIdx + width))
          playerIdx += width
          break
      }
      playerCoordinates()
      cells[playerIdx].classList.add('player')
    })
    
  }

  // Ghost movement
  function ghostMovement() {
    function ghostRight() {
      if (path.includes(ghostIdx + 1) && (ghostPrevStep !== (ghostIdx + 1))) {
        cells[ghostIdx].classList.remove('ghost')
        ghostPrevStep = ghostIdx
        console.log('going right')
        ghostIdx += 1
        cells[ghostIdx].classList.add('ghost')
        ghostCoordinates()
      }
    }
    function ghostDown() {
      if (path.includes(ghostIdx + width) && (ghostPrevStep !== (ghostIdx + width))) {
        cells[ghostIdx].classList.remove('ghost')
        ghostPrevStep = ghostIdx
        console.log('going down')
        ghostIdx += width
        cells[ghostIdx].classList.add('ghost')
        ghostCoordinates()
      }
    }
    function ghostLeft() {
      if (path.includes(ghostIdx - 1) && (ghostPrevStep !== (ghostIdx - 1))) {
        cells[ghostIdx].classList.remove('ghost')
        ghostPrevStep = ghostIdx
        console.log('going left')
        ghostIdx -= 1
        cells[ghostIdx].classList.add('ghost')
        ghostCoordinates()
      }
    }
    function ghostUp() {
      if (path.includes(ghostIdx - width) && (ghostPrevStep !== (ghostIdx - width))) {
        cells[ghostIdx].classList.remove('ghost')
        ghostPrevStep = ghostIdx
        console.log('going up')
        ghostIdx -= width
        cells[ghostIdx].classList.add('ghost')
        ghostCoordinates()
      }
    }
    function ghostBrainV6() {

      //if ghost is HIGH LEFT
      if (ghostX < playerX && ghostY < playerY) {
        console.log('HIGH LEFT')
        if (path.includes(ghostIdx + width) && (ghostPrevStep !== (ghostIdx + width))) {
          console.log('High left DOWN')
          ghostDown()
        } else if (path.includes(ghostIdx + 1) && (ghostPrevStep !== (ghostIdx + 1))) {
          console.log('High left RIGHT')
          ghostRight()
        } else if (path.includes(ghostIdx - 1) && (ghostPrevStep !== (ghostIdx - 1))) {
          console.log('High left LEFT')
          ghostLeft()
        } else if (path.includes(ghostIdx - width) && (ghostPrevStep !== (ghostIdx - width))) {
          console.log('High left UP')
          ghostUp()
        } else {
          console.log('return')
          return
        }

        //if ghost is HIGH RIGHT
      } else if (ghostX > playerX && ghostY < playerY) {
        console.log('HIGHT RIGHT')
        if (path.includes(ghostIdx - 1) && (ghostPrevStep !== (ghostIdx - 1))) {
          ghostLeft()
        } else if (path.includes(ghostIdx + width) && (ghostPrevStep !== (ghostIdx + width))) {
          ghostDown()
        } else if (path.includes(ghostIdx - width) && (ghostPrevStep !== (ghostIdx - width))) {
          ghostUp()
        } else if (path.includes(ghostIdx + 1) && (ghostPrevStep !== (ghostIdx + 1))) {
          ghostRight()
        } else {
          return
        }

        // ghost is BOTTOM RIGHT

      } else if (ghostX > playerX && ghostY > playerY) {
        console.log('BOTTOM RIGHT')
        if (path.includes(ghostIdx - width) && (ghostPrevStep !== (ghostIdx - width))) {
          ghostUp()
        } else if (path.includes(ghostIdx - 1) && (ghostPrevStep !== (ghostIdx - 1))) {
          ghostLeft()
        } else if (path.includes(ghostIdx + width) && (ghostPrevStep !== (ghostIdx + width))) {
          ghostDown()
        } else if (path.includes(ghostIdx + 1) && (ghostPrevStep !== (ghostIdx + 1))) {
          ghostRight()
        } else {
          return
        }
        // ghost is BOTTOM LEFT
      } else if (ghostX < playerX && ghostY > playerY) {
        console.log('BOTTOM LEFT')

        if (path.includes(ghostIdx + 1) && (ghostPrevStep !== (ghostIdx + 1))) {
          ghostRight()
        } else if (path.includes(ghostIdx - width) && (ghostPrevStep !== (ghostIdx - width))) {
          ghostUp()
        } else if (path.includes(ghostIdx + width) && (ghostPrevStep !== (ghostIdx + width))) {
          ghostDown()
        } else if (path.includes(ghostIdx - 1) && (ghostPrevStep !== (ghostIdx - 1))) {
          ghostLeft()
        } else {
          return
        }

        //Ghost higher or lower on same X axis
      } else if (ghostX === playerX) {
        if (path.includes(ghostIdx - width) && (ghostY > playerY)) {
          ghostUp()
        } else if (path.includes(ghostIdx + width) && (ghostY < playerY)) {
          ghostDown()
        } else if (path.includes(ghostIdx - 1)) {
          ghostLeft()
        } else if (path.includes(ghostIdx + 1)) {
          ghostRight()
        }

        //Ghost is left ort right on same Y axis
      } else if (ghostY === playerY) {
        if (path.includes(ghostIdx + 1) && (ghostX < playerX)) {
          ghostRight()
        } else if (path.includes(ghostIdx - 1) && (ghostX > playerX)) {
          ghostLeft()
        } else if (path.includes(ghostIdx + width)) {
          ghostDown()
        } else if (path.includes(ghostIdx - width)) {
          ghostUp()
        }
      }
      console.log(ghostPrevStep)
    }
    setInterval(() => {
      ghostBrainV6()
      // console.log(ghostX, ghostY)
    }, 500)
  }
  playerMovement()
  ghostMovement()
})
