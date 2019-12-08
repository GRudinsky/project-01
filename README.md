![ga_logo](https://user-images.githubusercontent.com/38439393/70393846-99b26800-19e6-11ea-82a0-35c1b5738321.png)
# Project 1: Pacman

## Overview 

Pacman is a browser-based JavaScript game that I developed over a period of one week as my first project at General Assembly. 

### Game Play

By controlling the Pac-Man, player has to collect all yellow dots in the maze while avoiding four colored ghosts. Eating four red pill-shaped items causes the ghosts to turn blue for a limited time period, allowing Pac-Man to eat them and gain bonus points. Player has three attempts to clear the board from all yellow dots. The remaining attempts are shown on the top-right side of the board next to a heart-shaped emoji.


The biggest challenge in development of this game for me was the logic which moves the ghosts. After spending couple of three days on trial and error I was pretty satisfied with algorithm that makes them move. In normal game-play mode they always would move towards and not away from Pac-Man. 

## Technologies Used

* HTML5
* CSS3
* JavaScript
* Git/GitHub

## Deployment

Game is deployed and can be played on [GitHub Pages](https://grudinsky.github.io/project-pacman/)

## Approch Taken

Below I defined three steps I took to construct the main architecture of the game.

### Step1 - Defining the board

For this game I chose 20x20 grid board where I needed to define two types o blocks in two different arrays - I called them path and walls in my scripts.js file. In order to simplify the path path population on the board I displayed the index of each block element when populating the grid. I found that this approach came handy in the game development later in debugging. Below are two screenshots of the board in progress: first one with walls and path only and second one with yellow dots and pill images. All visuals on the board are diffrenet CSS3 classes.
![board with path and walls](/images/readme_screenshots/scr_0.png)
![board with dots and pills added](/images/readme_screenshots/scr_1.png)

### Step2 - Defining the controls of Pac-Man
Pac-Man is being conrolled by repetative corresponding keyboard key-presses. It can only move in the black path area of the board. After the player presses the key, the agorithm checks if the next grid block belongs to the "path" array and depending on this Pac-Man gets assigned new block index and new X and Y coordinates. 

### Step3 - Defining the logic behind the moving of the ghosts
The challenge in this game development was defining the algorithm that allows the ghosts to constantly move towards Pac-Man. They move with a setInterval function that has a below logic:
check ghost coordinates against player coordinates
check possible path directions towards towards the Pac-Man coordinates. As per below snippet if ghost is on below and right section of the grid compared to pacman coordinates, it will be moving Up or Left if path to take the next step towards this direction exists. If not, it will be going right or down until the posibility to turn Up or Left occurs. In order for all the ghosts to not to take the same route I introduced the local "randomRoute" variable in the move function that only produces 0 or 1 as a value. If value is 0, the ghost will move Up if the path exists, else it will go Left, right or up.
```
 // ghost is BOTTOM RIGHT
     if (this.x > playerX && this.y > playerY) {
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
```

## Screenshots

Below are the screenshots of the game:

### Normal Game Play

![normal gameplay](/images/readme_screenshots/scr_2.png)

### Pill Mode

![on pill gameplay](/images/readme_screenshots/scr_3.png)

### Game Over Screen

![game over screen](/images/readme_screenshots/scr_4.png)


## Known Bugs

Some bugs to be fixed in the near future to improve the player experience:

* Not in all occassions Pac-Man and ghost get registered on the same cell, meaning that if moving fast enough player sometimes get away without losing a life.

## Future Improvements

There are some improvements I would like to implement to improve this game in the future:
* Additional levels as currently game has one level. This can be achieved by:
Increasing the speed of ghosts by reducng the interval in setInterval function;
Adding additonal maze configurations.
* Setting interval for Pac-Man control so that player would not need to press the key for every step pacman needs to take.
* Implementing high score board in localStorage.





