export default class Piece {
    board;
    posX;
    posY;
    symbol;
    color;
    active;
    id;

    constructor(board, id, symbol, color) {
        this.board = board;
        this.symbol = symbol;
        this.color = color;
        this.active = true;
        this.posX = -1;
        this.posY = -1;
        this.id = id;
    }

    get moves() {
        return [];
    }

    get attacks() {
        return [];
    }

    get pos() {
        return [this.posX, this.posY];
    }

    set position(pos) {
        let x, y = pos;
        this.posX = x;
        this.posY = y;
    }
}