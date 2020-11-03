function convertToPixels(n) {
    if (n > 79) {
        n = 79
    }
    if (n < 0) {
        n = 0
    }
    return n * 8

}
function draw() {
    updateLocation()
    drawSnake()
    setTimeout(() => {
        window.requestAnimationFrame(draw)
    }, gameSpeed);

}
function drawSnake() {
    context.clearRect(0, 0, canvas.width, canvas.height)
    context.strokeStyle = 'white'
    context.lineWidth = 2

    snakeCoordinates.forEach(c => {
        context.fillRect(convertToPixels(c[0]), convertToPixels(c[1]), 8, 8)
        context.strokeRect(convertToPixels(c[0]), convertToPixels(c[1]), 8, 8)
    })
}
function updateLocation() {
    let newX, newY
    switch (direction) {
        case 'up':
            newX = snakeCoordinates[0][0]
            newY = snakeCoordinates[0][1] - 1
            break
        case 'down':
            newX = snakeCoordinates[0][0]
            newY = snakeCoordinates[0][1] + 1
        case 'left':
            newX = snakeCoordinates[0][0] - 1
            newY = snakeCoordinates[0][1]
            break
        case 'right':
            newX = snakeCoordinates[0][0] + 1
            newY = snakeCoordinates[0][1]
            break
    }

    snakeCoordinates.unshift([newX, newY])
    snakeCoordinates.pop()
}
function updateFoodLocation() {
    let x, y
    do {
        x = Math.floor(Math.random() * 80)
        y = Math.floor(Math.random() * 80)
    } while (snakeCoordinates.includes([x, y]))
    return [x, y]
}

let snakeCoordinates = [
    [40, 40],
    [40, 41],
    [39, 41],
    [38, 41]
]
let foodCoordinates = updateFoodLocation()

const canvas = document.getElementById('gameBoardCanvas')
const context = canvas.getContext('2d')
let direction = 'up'
let gameSpeed = 300

document.addEventListener('keydown', e => {
    switch (e.key) {
        case 'ArrowUp':
            if (direction == 'left' || direction == 'right') {
                direction = 'up'
            } else if (direction == 'down') {
                isGameover = true
            }
            break
        case 'ArrowDown':
            if (direction == 'left' || direction == 'right') {
                direction = 'down'
            } else if (direction == 'down') {
                isGameover = true
            }
            break
        case 'ArrowLeft':
            direction = 'left'
            break
        case 'ArrowRight':
            direction = 'right'
            break
    }
})
draw()
