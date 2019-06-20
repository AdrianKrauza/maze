let sizeMaze = 11;
let time, End, s, m, posX, posY
let maze = []
let back = ['']
let backToStart = []
let endline = []
const box = document.getElementsByClassName("box")
document.getElementById('rest').onclick = () => {
    createMaze()
}
const rand = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}



const timer = () => {
    if (!End) {
        const getTimer = document.getElementById('timer')
        if (s < 10 && m < 10) {
            getTimer.innerHTML = `0${m}:0${s}`
        } else if (s > 10 && m < 10) {

            getTimer.innerHTML = `0${m}:${s}`
        } else if (s < 10 && m > 10) {

            getTimer.innerHTML = `${m}:0${s}`
        } else {

            getTimer.innerHTML = `${m}:${s}`
        }
        s++
        if (s >= 60) {
            s -= 60
            m++
        }
        setTimeout(() => {
            timer()
        }, 1000);
    }
}
const wallMaze = () => {
    if (back.length) {
        let pos = []
        if (maze[posY - 2] !== undefined && maze[posY - 2][posX] == 0) {
            pos.push("up")
        }
        if (maze[posY + 2] !== undefined && maze[posY + 2][posX] == 0) {
            pos.push("down")
        }
        if (maze[posY][posX + 2] !== undefined && maze[posY][posX + 2] == 0) {
            pos.push("left")
        }
        if (maze[posY][posX - 2] !== undefined && maze[posY][posX - 2] == 0) {
            pos.push("right")
        }
        if (pos.length) {

            switch (pos[rand(0, pos.length - 1)]) {
                case "up":
                    maze[posY - 2][posX] = 1
                    maze[posY - 1][posX] = 1
                    back.push("up")

                    box[((posY - 2) * sizeMaze) + posX].setAttribute("id", "head")
                    box[((posY - 1) * sizeMaze) + posX].style.backgroundColor = 'rgba(255, 255, 255, 0.0)'
                    posY -= 2
                    break;
                case "down":
                    maze[posY + 2][posX] = 1
                    maze[posY + 1][posX] = 1
                    back.push("down")

                    box[((posY + 2) * sizeMaze) + posX].setAttribute("id", "head")
                    box[((posY + 1) * sizeMaze) + posX].style.backgroundColor = 'rgba(255, 255, 255, 0.0)'
                    posY += 2
                    break;
                case "left":
                    maze[posY][posX + 2] = 1
                    maze[posY][posX + 1] = 1
                    back.push("left")

                    box[((posY) * sizeMaze) + posX + 2].setAttribute("id", "head")
                    box[((posY) * sizeMaze) + posX + 1].style.backgroundColor = 'rgba(255, 255, 255, 0.0)'
                    posX += 2
                    break;
                case "right":
                    maze[posY][posX - 2] = 1
                    maze[posY][posX - 1] = 1
                    back.push("right")

                    box[((posY) * sizeMaze) + posX - 2].setAttribute("id", "head")
                    box[((posY) * sizeMaze) + posX - 1].style.backgroundColor = 'rgba(255, 255, 255, 0.0)'
                    posX -= 2
                    break;
            }
        } else {
            switch (back.pop()) {
                case "up":
                    posY += 2
                    box[((posY) * sizeMaze) + posX].setAttribute("id", "head")
                    break;
                case "down":
                    posY -= 2
                    box[((posY) * sizeMaze) + posX].setAttribute("id", "head")
                    break;
                case "left":
                    posX -= 2
                    box[((posY) * sizeMaze) + posX].setAttribute("id", "head")
                    break;
                case "right":
                    posX += 2
                    box[((posY) * sizeMaze) + posX].setAttribute("id", "head")
                    break;
            }
        }
        if (document.getElementById("head") !== null) {
            document.getElementById("head").style.backgroundColor = 'rgba(255, 255, 255, 0.0)'
            document.getElementById("head").setAttribute("id", "h")
        }
        setTimeout(() => {
            wallMaze()
        }, 10);

    } else {
        box[((posY) * sizeMaze) + posX].setAttribute("id", "head")
        box[(sizeMaze * sizeMaze) - sizeMaze - 2].style.backgroundColor = "#51e663a8"
        if (s == 0) {
            timer()
        }
    }

}
const end = () => {

    if (backToStart.length != 0) {
        switch (backToStart.pop()) {
            case "up":
                if (document.getElementById("head") !== null) {
                    box[((posY) * sizeMaze) + posX].classList.add("body")
                    box[((posY) * sizeMaze) + posX].setAttribute("id", "")
                }
                posY += 1
                document.getElementsByClassName("box")[((posY) * sizeMaze) + posX].setAttribute("id", "head")
                break;
            case "down":
                if (document.getElementById("head") !== null) {
                    box[((posY) * sizeMaze) + posX].classList.add("body")
                    box[((posY) * sizeMaze) + posX].setAttribute("id", "")
                }
                posY -= 1
                document.getElementsByClassName("box")[((posY) * sizeMaze) + posX].setAttribute("id", "head")
                break;
            case "left":
                if (document.getElementById("head") !== null) {
                    box[((posY) * sizeMaze) + posX].classList.add("body")
                    box[((posY) * sizeMaze) + posX].setAttribute("id", "")
                }
                posX += 1
                document.getElementsByClassName("box")[((posY) * sizeMaze) + posX].setAttribute("id", "head")

                break;
            case "right":
                if (document.getElementById("head") !== null) {
                    box[((posY) * sizeMaze) + posX].classList.add("body")
                    box[((posY) * sizeMaze) + posX].setAttribute("id", "")
                }
                posX -= 1
                document.getElementsByClassName("box")[((posY) * sizeMaze) + posX].setAttribute("id", "head")
                break;
        };
        setTimeout(() => {
            end()
        }, time);
    } else {
        if (document.getElementsByClassName("body").length) {
            document.getElementsByClassName("body")[document.getElementsByClassName("body").length - 1].classList.remove("body")
            end()
        } else {
            document.getElementById("head").setAttribute("id", "")
            for (let i = 0; i < document.getElementsByClassName("box").length; i++) {
                setTimeout(() => {
                    box[(document.getElementsByClassName("box").length) - 1 - i].style.backgroundColor = null
                }, ((sizeMaze  * i)/5));
            }
            setTimeout(() => {

                createMaze()
                wallMaze()
            }, (sizeMaze  * (document.getElementsByClassName("box").length - 1)/5));

        }
    }
}
const createMaze = () => {
    document.documentElement.style.setProperty('--sizeMaze',sizeMaze);
    document.getElementById('box').innerHTML = ""
    maze = []
    posX = 1
    posY = 1
    back = ['']
    endline = []
    End = false
    s = 0
    m = 0
    backToStart = []
    for (let i = 0; i !== sizeMaze; i++) {
        maze.push([])
        for (let i = 0; i !== sizeMaze; i++) {
            maze[maze.length - 1].push(0)
            document.getElementById('box').innerHTML += `<div class="box"></div>`
        }
        document.getElementById('box').innerHTML += "</br>"
    }

    wallMaze()
}

document.addEventListener('keydown', function (e) {
    switch (e.key) {
        case "ArrowUp":
            if (posY > 1 && maze[posY - 1][posX] == 1) {
                posY -= 1
                document.getElementById("head").setAttribute("id", "")
                box[((posY) * sizeMaze) + posX].setAttribute("id", "head")
                backToStart.push("up")
            }
            break;
        case "ArrowDown":
            if (posY < sizeMaze && maze[posY + 1][posX] == 1) {
                posY += 1
                document.getElementById("head").setAttribute("id", "")
                box[((posY) * sizeMaze) + posX].setAttribute("id", "head")
                backToStart.push("down")
            }
            break;
        case "ArrowLeft":
            if (posX > 1 && maze[posY][posX - 1] == 1) {
                posX -= 1
                document.getElementById("head").setAttribute("id", "")
                box[((posY) * sizeMaze) + posX].setAttribute("id", "head")
                backToStart.push("left")
            }
            break;
        case "ArrowRight":
            if (posX < sizeMaze && maze[posY][posX + 1] == 1) {
                posX += 1
                document.getElementById("head").setAttribute("id", "")
                box[((posY) * sizeMaze) + posX].setAttribute("id", "head")
                backToStart.push("right")
            }
            break;
    }
    if ((sizeMaze * sizeMaze) - sizeMaze - 2 == (posY * sizeMaze) + posX) {
        time = 5000 / backToStart.length
        End = true
        end()
    }
})

document.getElementsByTagName('select')[0].onchange = function () {
    switch (this.selectedIndex) {
        case 0:
            sizeMaze = 11;
            break;
        case 1:
            sizeMaze = 21;
            break;
        case 2:
            sizeMaze = 26;
            break;
        case 3:
            sizeMaze = 31;
            break;
    }
  
}
createMaze()