export default class Piece {
    board;
    posX;
    posY;
    symbol;
    color;
    active;

    constructor(board, symbol, color) {
        this.board = board;
        this.symbol = symbol;
        this.color = color;
        this.active = true;
        this.posX = -1;
        this.posY = -1;
    }

    get moves() {
        return [];
    }

    get attacks() {
        return [];
    }

    set position(pos) {
        let x, y = pos;
        this.posX = x;
        this.posY = y;
    }
}