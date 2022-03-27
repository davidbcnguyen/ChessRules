import { isValidPos } from "../Utils/Utils.js";
import Piece from "./Piece.js";

export default class Pawn extends Piece {
    constructor(board, color) {
        let symbol;
        if (color === "white") {
            symbol = "♙";
        } else {
            symbol = "♟";
        }
        super(board, "pawn", symbol, color);
    }

    get moves() {
        let movesToReturn = [];
        let forwardCandidate;
        if (this.color === "white") {
            forwardCandidate = [this.posX, this.posY - 1];
        } else {
            forwardCandidate = [this.posX, this.posY + 1];
        }
        if (isValidPos(forwardCandidate)) {
            let pieceAtForward = this.board.at(forwardCandidate);
            if (!pieceAtForward) {
                movesToReturn.push(forwardCandidate);
            }
        }
        return movesToReturn;
    }

    get attacks() {
        let attacksToReturn = [];
        let leftCandidate;
        let rightCandidate;
        if (this.color === "white") {
            leftCandidate = [this.posX - 1, this.posY - 1];
            rightCandidate = [this.posX + 1, this.posY - 1];
        } else {
            leftCandidate = [this.posX - 1, this.posY + 1];
            rightCandidate = [this.posX + 1, this.posY + 1];
        }
        if (isValidPos(leftCandidate)) {
            let pieceAtLeft = this.board.at(leftCandidate);
            if (pieceAtLeft && pieceAtLeft.color !== this.color) {
                attacksToReturn.push(leftCandidate);
            }
        }
        if (isValidPos(rightCandidate)) {
            let pieceAtRight = this.board.at(rightCandidate);
            if (pieceAtRight && pieceAtRight.color !== this.color) {
                attacksToReturn.push(rightCandidate);
            }
        }
        return attacksToReturn;
    }
}