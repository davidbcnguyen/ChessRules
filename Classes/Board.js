import { isValidPos } from "../Utils/Utils.js";
import Rook from "./Rook.js";
import Knight from "./Knight.js";
import Bishop from "./Bishop.js";
import Queen from "./Queen.js";
import King from "./King.js";
import Pawn from "./Pawn.js";

export default class Board {
    matrix = [[]];
    whitePieces = [];
    whiteKing;
    blackPieces = [];
    blackKing;
    checkMate;

    constructor() {
        this.matrix = Board.emptyBoard();
        this.blackPieces.push(new Rook(this, "black"));
        this.blackPieces.push(new Knight(this, "black"));
        this.blackPieces.push(new Bishop(this, "black"));
        this.blackPieces.push(new Queen(this, "black"));
        this.blackKing = new King(this, "black");
        this.blackPieces.push(this.blackKing);
        this.blackPieces.push(new Bishop(this, "black"));
        this.blackPieces.push(new Knight(this, "black"));
        this.blackPieces.push(new Rook(this, "black"));
        for (let i = 0; i < 8; i++) {
            this.blackPieces.push(new Pawn(this, "black"));
        }
        let [x, y] = [0, 0];
        for (let piece of this.blackPieces) {
            this.addPiece(piece, [x, y]);
            x++;
            if (x == 8) {
                x = 0;
                y++;
            }
        }

        this.whitePieces.push(new Rook(this, "white"));
        this.whitePieces.push(new Knight(this, "white"));
        this.whitePieces.push(new Bishop(this, "white"));
        this.whitePieces.push(new Queen(this, "white"));
        this.whiteKing = new King(this, "white");
        this.whitePieces.push(this.whiteKing);
        this.whitePieces.push(new Bishop(this, "white"));
        this.whitePieces.push(new Knight(this, "white"));
        this.whitePieces.push(new Rook(this, "white"));
        for (let i = 0; i < 8; i++) {
            this.whitePieces.push(new Pawn(this, "white"));
        }
        [x, y] = [0, 7];
        for (let piece of this.whitePieces) {
            this.addPiece(piece, [x, y]);
            x++;
            if (x == 8) {
                x = 0;
                y--;
            }
        }

        this.checkMate = false;
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

    move(side, from, to) {
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
        if (fromPiece.color !== side) {
            return false;
        }
        // Check if valid move that piece can make
        if (toPiece) {
            if (!fromPiece.attacks.includes(to)) {
                return false;
            }
            toPiece.position = [-1, -1];
            toPiece.active = false;
        } else {
            if (!fromPiece.moves.includes(to)) {
                return false;
            }
        }
        this.matrix[toY][toX] = fromPiece;
        fromPiece.position = to;

        if (this.isInCheck(side)) {
            if (toPiece) {
                toPiece.position = to;
                toPiece.active = true;
                this.matrix[toY][toX] = toPiece;
            }
            this.matrix[fromX][fromY] = fromPiece;
            fromPiece.position = from;
        }

        this.handlePossiblePromotion(fromPiece, toX, toY);
        
        return true;
    }

    isInCheck(side) {
        if (side == "white") {
            let attacked = new Set();
            for (let piece of this.blackPieces) {
                attacked.add(piece.attacks);
            }
            if (attacked.has(this.whiteKing.pos)) {
                return true;
            }
        } else {
            let attacked = new Set();
            for (let piece of this.whitePieces) {
                attacked.add(piece.attacks);
            }
            if (attacked.has(this.blackKing.pos)) {
                return true;
            }
        }
        return false;
    }

    handlePossiblePromotion(fromPiece, toX, toY) {
        if (fromPiece.id === "pawn") {
            if (fromPiece.color === "white" && fromPiece.posY === 0) {
                this.matrix[toY][toX] = new Queen(this, "white");
            } else if (fromPiece.color === "black" && fromPiece.posY === 7) {
                this.matrix[toY][toX] = new Queen(this, "black");
            }
        }
    }
}