import { isValidPos } from "../Utils/Utils.js";
import Piece from "./Piece.js";

export default class Knight extends Piece {
    constructor(board, color) {
        let symbol;
        if (color === "white") {
            symbol = "♘";
        } else {
            symbol = "♞";
        }
        super(board, symbol, color);
    }

    get moves() {
        let movesToReturn = [];
        let coefficients = [[-2, -1], [-2, 1], [-1, -2], [1, -2], [2, -1], [2, 1], [-1, 2], [1, 2]];
        for (let coefficient of coefficients) {
            let [cx, cy] = coefficient;
            let thisPos = [this.posX + cx, this.posY + cy];
            if (isValidPos(thisPos)) {
                movesToReturn.push(thisPos);
            }
        }
        return movesToReturn;
    }

    get attacks() {
        return this.moves();
    }
}