
document.addEventListener('DOMContentLoaded', () => {
  const width = 20
  const grid = document.querySelector('.grid')
  const cells = []
  let playerIdx = 201
  let ghostIdx = 88

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

  // function handleClick(e) {
  //   console.log(x, y)
  // }

  // Defining player
  cells[playerIdx].classList.add('player')
  const player = document.querySelector('.grid div.player')

  //Defining ghost
  cells[ghostIdx].classList.add('ghost')
  const ghost = document.querySelector('.grid div.ghost')
  let ghostX = ghostIdx % width
  let ghostY = Math.floor(ghostIdx / width)

  // Player movement
  document.addEventListener('keyup', (e) => {

    cells[playerIdx].classList.remove('player')
    let playerX = playerIdx % width
    let playerY = Math.floor(playerIdx / width)
    console.log(playerX, playerY)

    switch (e.keyCode) {
      case 37: if (path.includes(playerIdx - 1)) {
        playerIdx -= 1
        // playerX  -= 1
      } else if (playerX === 0) {
        playerIdx += width - 1
      }
        break
      case 38: if (path.includes(playerIdx - width)) 
      playerIdx -= width 
      playerY -= 1 
        break
      case 39: if (path.includes(playerIdx + 1)) {
        playerIdx += 1
        playerX += 1
      } else if (
        playerX === width - 1) {
        playerIdx -= width - 1
        playerX -= width - 1
      }
        break
      case 40: if (path.includes(playerIdx + width)) 
      playerIdx += width 
      playerY += 1
        break
    }
    cells[playerIdx].classList.add('player')
  })

  // Ghost movement
  function ghostMovement() {


    // whole logic in between remove-add. 
    // Run the while loop for ghos to go until end of line - DONE

    setInterval(() => {
      cells[ghostIdx].classList.remove('ghost')

      //Ghost brain beta version
      function ghostRight() {
        ghostIdx += 1
        ghostX += 1
      }
      function ghostDown() {
        ghostIdx += width
        ghostY += 1
      }
      function ghostLeft() {
        ghostIdx -= 1
        ghostX -= 1
      }
      function ghostUp() {
        ghostIdx -= width
        ghostY -= 1
      }

      //Ghost brain beta version
      function ghostBrainV1() {
        if (path.includes(ghostIdx + 1) && ghostIdx < playerIdx) {
          ghostRight()
        } else if (path.includes(ghostIdx + width) && ghostIdx < playerIdx) {
          ghostDown()
        }
        else if (path.includes(ghostIdx - 1) && ghostIdx > playerIdx) {
          ghostLeft()
        } else if (path.includes(ghostIdx - width) && ghostIdx > playerIdx) {
          ghostUp()
        }
      }
      // fix x and y in case function
      ghostBrainV1()
      // ghostBrainV2()

      console.log(ghostIdx, ghostX, ghostY)
      cells[ghostIdx].classList.add('ghost')
    }, 1000)
    //only if next cell belong to path, do below:
    function ghostBrainV2() {

      if (path.includes((ghostIdx + 1) || (ghostIdx + width)) && ghostX < playerX && ghostY < playerY) {
        // ghostX += 1 || ghostY += 1
        ghostRight() || ghostDown()
      } else if (path.includes((ghostIdx - 1) || (ghostIdx + width)) && ghostX > playerX && ghostY < playerY) {
        // ghostX -= 1 || ghostY += 1
        ghostLeft() || ghostDown()
      } else if (path.includes((ghostIdx - 1) || (ghostIdx - width)) && ghostX > playerX && ghostY > playerY) {
        // ghostX -= 1 || ghostY -= 1
        ghostLeft() || ghostUp()
      } else if (path.includes((ghostIdx + 1) || (ghostIdx + width)) && ghostX < playerX && ghostY > playerY) {
        // ghostX += 1 || ghostY += 1
        ghostRight() || ghostDown()
      }
    }
  }
  // setTimeout(ghostRight(), 1000)
  // if (path.includes(ghostIdx + 1)) {
  //   ghostIdx += 1
  // } else if (path.includes(ghostIdx - 1)) {
  //   ghostIdx -= 1
  // }

  ghostMovement()
  // setInterval(ghostRight, 1000)

})
