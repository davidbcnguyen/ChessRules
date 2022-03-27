import Board from "./Classes/Board.js";

export default class Game {
    board;
    isOver;

    constructor() {
        this.board = new Board();
        this.isOver = false;
    }

    play() {
        let turn = "white";
        while (!this.isOver) {
            let from, to;
            while (this.board.move(turn, from, to));
            if (turn === "white") {
                turn = "black";
            } else {
                turn = "white";
            }
        }
    }

    print() {
        for (let y = 0; y < 8; y++) {
            let line = `${y + 1} `;
            for (let x = 0; x < 8; x++) {
                let piece = this.board.at([x, y]);
                if (piece) {
                    line += piece.symbol + " ";
                } else {
                    line += "  ";
                }
            }
            console.log(line);
        }
        console.log("  a b c d e f g h");
    }
}