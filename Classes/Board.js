import { isValidPos } from "../Utils/Utils.js";
import Rook from "./Rook.js";
import Knight from "./Knight.js";
import Bishop from "./Bishop.js";
import Queen from "./Queen.js";
import King from "./King.js";
import Pawn from "./Pawn.js";

export default class Board {
    matrix = [[]];

    constructor() {
        this.matrix = Board.emptyBoard();
        this.addPiece(new Rook(this, "black"), [0, 0]);
        this.addPiece(new Knight(this, "black"), [1, 0]);
        this.addPiece(new Bishop(this, "black"), [2, 0]);
        this.addPiece(new Queen(this, "black"), [3, 0]);
        this.addPiece(new King(this, "black"), [4, 0]);
        this.addPiece(new Bishop(this, "black"), [5, 0]);
        this.addPiece(new Knight(this, "black"), [6, 0]);
        this.addPiece(new Rook(this, "black"), [7, 0]);
        for (let i = 0; i < 8; i++) {
            this.addPiece(new Pawn(this, "black"), [i, 1]);
        }

        this.addPiece(new Rook(this, "white"), [0, 7]);
        this.addPiece(new Knight(this, "white"), [1, 7]);
        this.addPiece(new Bishop(this, "white"), [2, 7]);
        this.addPiece(new Queen(this, "white"), [3, 7]);
        this.addPiece(new King(this, "white"), [4, 7]);
        this.addPiece(new Bishop(this, "white"), [5, 7]);
        this.addPiece(new Knight(this, "white"), [6, 7]);
        this.addPiece(new Rook(this, "white"), [7, 7]);
        for (let i = 0; i < 8; i++) {
            this.addPiece(new Pawn(this, "white"), [i, 6]);
        }
    }

    static emptyBoard() {
        return new Array(new Array(8), new Array(8), new Array(8), new Array(8), new Array(8), new Array(8), new Array(8), new Array(8));
    }

    addPiece(piece, pos) {
        piece.position = pos;
        let [x, y] = pos;
        this.matrix[y][x] = piece;
    }

    at(pos) {
        let [x, y] = pos;
        return this.matrix[y][x];
    }

    move(from, to) {
        // Check if within board
        if (!isValidPos(from) || !isValidPos(to)) {
            return false;
        }
        let fromX, fromY = from;
        let toX, toY = to;
        let fromPiece = this.matrix[fromY][fromX];
        let toPiece = this.matrix[toY][toX];
        if (!fromPiece) {
            return false;
        }
        // Check if valid move that piece can make
        if (toPiece) {
            if (!fromPiece.attacks.includes(to)) {
                return false;
            }
            toPiece.posX = -1;
            toPiece.posY = -1;
            toPiece.active = false;
        } else {
            if (!fromPiece.moves.includes(to)) {
                return false;
            }
        }
        this.matrix[toY][toX] = fromPiece;
        fromPiece.position = to;
        return true;
    }
}