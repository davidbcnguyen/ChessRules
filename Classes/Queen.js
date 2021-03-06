import { isValidPos } from "../Utils/Utils.js";
import Piece from "./Piece.js";

export default class Rook extends Piece {
    constructor(board, color) {
        let symbol;
        if (color === "white") {
            symbol = "♕";
        } else {
            symbol = "♛";
        }
        super(board, "queen", symbol, color);
    }

    get moves() {
        let movesToReturn = [];
        // Check horizontal
        for (let x = 0; x < this.posX; x++) {
            let thisPos = [x, this.posY];
            let pieceAtPos = this.board.at(thisPos);
            if (pieceAtPos) {
                if (pieceAtPos.color !== this.color) {
                    movesToReturn.push(thisPos);
                }
                break;
            }
        }
        for (let x = this.posX + 1; x < 8; x++) {
            let thisPos = [x, this.posY];
            let pieceAtPos = this.board.at(thisPos);
            if (pieceAtPos) {
                if (pieceAtPos.color !== this.color) {
                    movesToReturn.push(thisPos);
                }
                break;
            }
        }

        // Check vertical
        for (let y = 0; y < this.posY; y++) {
            let thisPos = [this.posX, y];
            let pieceAtPos = this.board.at(thisPos);
            if (pieceAtPos) {
                if (pieceAtPos.color !== this.color) {
                    movesToReturn.push(thisPos);
                }
                break;
            }
        }
        for (let y = this.posY + 1; y < 8; y++) {
            let thisPos = [this.posX, y];
            let pieceAtPos = this.board.at(thisPos);
            if (pieceAtPos) {
                if (pieceAtPos.color !== this.color) {
                    movesToReturn.push(thisPos);
                }
                break;
            }
        }

        // Diagonal -> /
        let [x1, y1] = [this.posX, this.posY];
        for (let diff = 1; diff < 8; diff++) {
            let thisPos = [x1 + diff, y1 - diff];
            if (isValidPos(thisPos)) {
                movesToReturn.push(thisPos);
                if (this.board.at(thisPos)) {
                    break;
                }
            }
        }
        for (let diff = 1; diff < 8; diff++) {
            let thisPos = [x1 - diff, y1 + diff];
            if (isValidPos(thisPos)) {
                movesToReturn.push(thisPos);
                if (this.board.at(thisPos)) {
                    break;
                }
            }
        }

        // Diagonal -> \
        let [x2, y2] = [this.posX, this.posY];
        for (let diff = 1; diff < 8; diff++) {
            let thisPos = [x2 + diff, y2 + diff];
            if (isValidPos(thisPos)) {
                movesToReturn.push(thisPos);
                if (this.board.at(thisPos)) {
                    break;
                }
            }
        }
        for (let diff = 1; diff < 8; diff++) {
            let thisPos = [x2 - diff, y2 - diff];
            if (isValidPos(thisPos)) {
                movesToReturn.push(thisPos);
                if (this.board.at(thisPos)) {
                    break;
                }
            }
        }
        return movesToReturn;
    }

    get attacks() {
        return this.moves();
    }
}