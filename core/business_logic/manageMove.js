import { DIRECTION_CONSTANTS } from '../constants/direction.js'
const { NORTH, SOUTH, EAST, WEST } = DIRECTION_CONSTANTS
class CoordinatesCalculator {
    #x
    #y
    #direction

    constructor({ x, y, direction }) {
        this.#x = x
        this.#y = y
        this.#direction = direction
    }

    get x() {
        return this.#x
    }
    get y() {
        return this.#y
    }
    get direction() {
        return this.#direction
    }

    calculate(move) {
        for (let letter of move) {
            if (letter === 'L') this.#turnLeft()
            else if (letter === 'R') this.#turnRight()
            else if (letter === 'F') this.#moveForward()
            else if (letter === 'B') this.#moveBackward()
        }
    }

    #turnLeft() {
        switch (this.#direction) {
            case NORTH:
                this.#direction = WEST
                break
            case SOUTH:
                this.#direction = EAST
                break
            case EAST:
                this.#direction = NORTH
                break
            case WEST:
                this.#direction = SOUTH
                break
        }
    }

    #turnRight() {
        switch (this.#direction) {
            case NORTH:
                this.#direction = EAST
                break
            case SOUTH:
                this.#direction = WEST
                break
            case EAST:
                this.#direction = SOUTH
                break
            case WEST:
                this.#direction = NORTH
                break
        }
    }

    #moveForward() {
        switch (this.#direction) {
            case NORTH:
                this.#y++
                break
            case SOUTH:
                this.#y--
                break
            case EAST:
                this.#x++
                break
            case WEST:
                this.#x--
                break
        }
    }
    #moveBackward() {
        switch (this.#direction) {
            case NORTH:
                this.#y--
                break
            case SOUTH:
                this.#y++
                break
            case EAST:
                this.#x--
                break
            case WEST:
                this.#x++
                break
        }
    }
}

export default CoordinatesCalculator
