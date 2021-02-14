const KeyDown = "ArrowDown";
const KeyUp = "ArrowUp";
const KeyLeft = "ArrowLeft";
const KeyRight = "ArrowRight";

const ResultMoved = "Moved";
const ResultMerged = "Merged";
const ResultNo = "No";

class Game {
    constructor() {
        //this.state = [
        //    [2, 4, 8, 16],
        //    [32, 64, 128, 256],
        //    [512, 1024, 2048, 4096],
        //    [0, 0, 0, 0],
        //];
        this.state = [
            [0, 0, 2, 0],
            [0, 2, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
        ];

        this.render();
        document.onkeydown = ((e) => this.onKeyPress(e));
    }


    render() {
        let cells = document.querySelectorAll('.cell');
        for (let i = 0; i < 16; i++) {
            const digit = this.state[Math.floor(i / 4)][i % 4];

            cells[i].innerHTML = digit || "&nbsp;";

            let cellClassName = "cell-" + digit;
            if (digit > 2048) {
                cellClassName = "cell-big-number";
            }

            cells[i].className = "cell cell-merged " + cellClassName;
        }
    }

    onKeyPress(e) {
        let mutations = 0;

        if (e.key == KeyLeft) {
            do {
                mutations = 0;

                for (let x = 0; x < 4; x++) {
                    for (let y = 0; y < 4; y++) {
                        mutations += Number(this.doMove(x, y, 0, -1));
                    }
                }
            } while (mutations > 0);
        } else if (e.key == KeyRight) {
            do {
                mutations = 0;

                for (let x = 0; x < 4; x++) {
                    for (let y = 3; y >= 0; y--) {
                        mutations += Number(this.doMove(x, y, 0, +1));
                    }
                }
            } while (mutations > 0);
        } else if (e.key == KeyDown) {
            do {
                mutations = 0;

                for (let y = 3; y >= 0; y--) {
                    for (let x = 0; x < 4; x++) {
                        mutations += Number(this.doMove(x, y, +1, 0));
                    }
                }
            } while (mutations > 0);
        } else if (e.key == KeyUp) {
            do {
                mutations = 0;

                for (let y = 0; y < 4; y++) {
                    for (let x = 3; x >= 0; x--) {
                        mutations += Number(this.doMove(x, y, -1, 0));
                    }
                }
            } while (mutations > 0);
        } else {
            return;
        }

        const randomAdded = this.addRandomDigit();
        if (!randomAdded) {
            alert('LOOSER');
            return;
        }

        this.render();
    }

    doMove(x, y, offsetX, offsetY) {
        let digit = this.state[x][y];
        if (!digit) {
            // Nothing to move
            return false;
        }

        if (x + offsetX < 0 || x + offsetX >= 4) {
            // No cell
            return false;
        }

        if (y + offsetY < 0 || y + offsetY >= 4) {
            // No cell
            return false;
        }

        let newDigit = this.state[x + offsetX][y + offsetY];
        if (!newDigit) {
            // Empty cell, simply move
            this.state[x][y] = 0;
            this.state[x + offsetX][y + offsetY] = digit;

            return true;
        }

        if (newDigit == digit) {
            this.state[x][y] = 0;
            this.state[x + offsetX][y + offsetY] = digit * 2;

            // Move successful, merged together
            return true;
        } else {
            // another digit, cannot move
            return false;
        }
    }

    addRandomDigit() {
        let freeCells = [];

        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                const digit = this.state[i][j];
                if (!digit) {
                    freeCells.push([i, j]);
                }
            }
        }

        if (freeCells.length == 0) {
            return false;
        }

        const item = freeCells[Math.floor(Math.random() * freeCells.length)];
        this.state[item[0]][item[1]] = 2;

        return true;
    }
}

window.Game = new Game();
