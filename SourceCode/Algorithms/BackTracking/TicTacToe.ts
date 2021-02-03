/** @format */

interface Move {
    position: number
    value: number
}

export default class TicTacToe {
    private board: string[]
    private readonly BORAD_SHAPE = 3
    private readonly EMPTY_CHAR = '0'
    private readonly COMPUTER_CHAR = 'C'
    private readonly HUMAN_CHAR = 'H'
    private readonly GAME_DRAW = 0
    private readonly GAME_LOSS = -1
    private readonly GAME_WIN = 1
    private prevHumanPosition: number
    private prevComputerPosition: number
    private isEnd = false
    constructor() {
        this.board = new Array(this.BOARD_SIZE).fill(this.EMPTY_CHAR)
    }
    public play(coordinate: [number, number]): void {
        if (this.isEnd) {
            throw Error('Game is end')
        }
        const [row, column] = coordinate
        if (!this.isValidPosition(row) || !this.isValidPosition(column)) {
            throw Error('Position is invalid')
        }
        if (this.isBoardFull()) {
            throw Error('Position is invalid')
        }
        const position = (row - 1) * this.BORAD_SHAPE + column - 1
        if(!this.isBoradEmpty(position)){
            throw Error('Position is invalid')
        }
        this.humanTurn(position)
    }  
    public visualize(title: string): void {
        const {board, BOARD_SIZE, BORAD_SHAPE} = this
        const border = '-'.repeat(10)
        let output = `${border} ${title} ${border}\n`
        for (let i = 0; i < BOARD_SIZE; i++) {
            output += ` ${board[i]} `
            if (i % BORAD_SHAPE === 2) {
                output += '\n'
            }
        }
        console.log(output)
    }
    private humanTurn(position: number): void {
        this.place(position, this.HUMAN_CHAR)
        this.visualize('human move')
        const move = this.computerTurn()
        let isEnd = false
        if (this.isWin(position, this.HUMAN_CHAR)) {
            isEnd = true
        } else if (this.isWin(move.position, this.COMPUTER_CHAR)) {
            isEnd = true
        } else if (this.isBoardFull()) {
            isEnd = true
        }
        if (isEnd) {
            console.log('Game Over')
            this.isEnd = isEnd
        }
    }
    private computerTurn(): Move {
        const computerMove: Move = {position: 0, value: this.GAME_LOSS}
        this.findComputerNextMove(computerMove)
        this.place(computerMove.position, this.COMPUTER_CHAR)
        this.visualize('computer move')
        return computerMove
    }
    private get BOARD_SIZE() {
        return this.BORAD_SHAPE ** 2
    }
    private isValidPosition(position: number): boolean {
        return position >= 0 && position <= this.BORAD_SHAPE
    }
    private findComputerNextMove(computerMove: Move): void {
        const humanMove: Move = {
            position: this.prevHumanPosition,
            value: this.GAME_LOSS,
        }
        if (this.isBoardFull()) {
            computerMove.value = this.GAME_DRAW
            return
        }
        if (this.isWin(computerMove.position, this.COMPUTER_CHAR)) {
            computerMove.value = this.GAME_WIN
            return
        }
        computerMove.value = this.GAME_LOSS
        for (let i = 0; i < this.BOARD_SIZE; i++) {
            if (this.isBoradEmpty(i)) {
                this.place(i, this.COMPUTER_CHAR)
                this.findHumanNextMove(humanMove)
                this.unplace(i)
                if (humanMove.value > computerMove.value) {
                    computerMove.position = i
                    computerMove.value = humanMove.value
                }
            }
        }
    }

    private findHumanNextMove(humanMove: Move): void {
        const computerMove: Move = {
            position: this.prevComputerPosition,
            value: this.GAME_LOSS,
        }
        if (this.isBoardFull()) {
            humanMove.value = this.GAME_DRAW
            return
        }
        if (this.isWin(humanMove.position, this.HUMAN_CHAR)) {
            humanMove.value = this.GAME_LOSS
            return
        }
        humanMove.value = this.GAME_WIN
        for (let i = 0; i < this.BOARD_SIZE; i++) {
            if (this.isBoradEmpty(i)) {
                this.place(i, this.HUMAN_CHAR)
                this.findComputerNextMove(computerMove)
                this.unplace(i)
                if (computerMove.value < humanMove.value) {
                    humanMove.position = i
                    humanMove.value = computerMove.value
                }
            }
        }
    }
    private isBoardFull(): boolean {
        let count = 0
        for (let i = 0; i < this.BOARD_SIZE; i++) {
            if (this.board[i] !== this.EMPTY_CHAR) {
                count += 1
            }
        }
        return count === this.BOARD_SIZE
    }
    private isWin(position: number, char: string): boolean {
        const column = position % this.BORAD_SHAPE
        const row = Math.floor(position / this.BORAD_SHAPE)
        let rowCount = 0
        let columnCount = 0
        let result = true
        for (let i = 0; i < this.BORAD_SHAPE; i++) {
            if (this.board[i * this.BORAD_SHAPE + column] === char) {
                columnCount += 1
            } else {
                break
            }
        }
        for (let i = 0; i < this.BORAD_SHAPE; i++) {
            if (this.board[row * this.BORAD_SHAPE + i] === char) {
                rowCount += 1
            } else {
                break
            }
        }
        result = rowCount === this.BORAD_SHAPE || columnCount === this.BORAD_SHAPE
        if (!result) {
            result = true
            if (row !== column) {
                result = false
            } else {
                let diagcCount = 0
                let reversedDiagcCount = 0
                for (let i = 0; i < this.BORAD_SHAPE; i++) {
                    if (this.board[i * this.BORAD_SHAPE + i] === char) {
                        diagcCount += 1
                    } else {
                        break
                    }
                }
                for (let i = 0; i < this.BORAD_SHAPE; i++) {
                    if (this.board[(i + 1) * this.BORAD_SHAPE - i - 1] === char) {
                        reversedDiagcCount += 1
                    } else {
                        break
                    }
                }
                result = diagcCount === this.BORAD_SHAPE || reversedDiagcCount === this.BORAD_SHAPE
            }
        }
        return result
    }
    private isBoradEmpty(position: number): boolean {
        return this.board[position] === this.EMPTY_CHAR
    }
    private place(position: number, char: string): void {
        if (char === this.COMPUTER_CHAR) {
            this.prevComputerPosition = position
        } else if (char === this.HUMAN_CHAR) {
            this.prevHumanPosition = position
        }
        this.board[position] = char
    }
    private unplace(position: number): void {
        this.board[position] = this.EMPTY_CHAR
    }
}
