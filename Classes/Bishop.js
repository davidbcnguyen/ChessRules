import { isValidPos } from "../Utils/Utils.js";
import Piece from "./Piece.js";

export default class Bishop extends Piece {
    constructor(board, color) {
        let symbol;
        if (color === "white") {
            symbol = "♗";
        } else {
            symbol = "♝";
        }
        super(board, symbol, color);
    }

    get moves() {
        let movesToReturn = [];
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