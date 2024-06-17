document.addEventListener("DOMContentLoaded", () => {
    // Create a title
    const header = document.createElement('div');
    header.className = 'header';
    header.textContent = 'My Test Project_new_version_123';

    // Add the title above game desk
    const gameBoard = document.getElementById('game-board');
    gameBoard.parentNode.insertBefore(header, gameBoard);

    const board = document.getElementById("game-board");
    const tiles = [];

    for (let i = 0; i < 16; i++) {
        const tile = document.createElement("div");
        tile.classList.add("tile");
        tile.dataset.value = 0;
        tiles.push(tile);
        board.appendChild(tile);
    }

    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    function spawnTile() {
        let emptyTiles = tiles.filter(tile => tile.dataset.value == 0);
        if (emptyTiles.length > 0) {
            let randomTile = emptyTiles[getRandomInt(emptyTiles.length)];
            randomTile.dataset.value = Math.random() < 0.9 ? 2 : 4;
            updateTile(randomTile);
        }
    }

    function updateTile(tile) {
        tile.textContent = tile.dataset.value != 0 ? tile.dataset.value : "";
        tile.className = "tile";
        if (tile.dataset.value != 0) {
            tile.classList.add(`tile-${tile.dataset.value}`);
        }
    }

    function moveTile(tile, targetTile) {
        targetTile.dataset.value = parseInt(targetTile.dataset.value) + parseInt(tile.dataset.value);
        tile.dataset.value = 0;
        updateTile(tile);
        updateTile(targetTile);
    }

    function slideTiles(direction) {
        let moved = false;
        let mergeSet = new Set();

        function slideRowOrCol(start, delta) {
            let merged = false;
            for (let i = start; i < tiles.length && i >= 0; i += delta) {
                let currentTile = tiles[i];
                if (currentTile.dataset.value != 0) {
                    let nextIndex = i + delta;
                    while (nextIndex >= 0 && nextIndex < tiles.length && tiles[nextIndex].dataset.value == 0) {
                        nextIndex += delta;
                    }
                    if (nextIndex >= 0 && nextIndex < tiles.length && tiles[nextIndex].dataset.value == currentTile.dataset.value && !merged) {
                        moveTile(currentTile, tiles[nextIndex]);
                        merged = true;
                        mergeSet.add(tiles[nextIndex]);
                        moved = true;
                    } else if (nextIndex - delta != i) {
                        moveTile(currentTile, tiles[nextIndex - delta]);
                        moved = true;
                    }
                }
            }
        }

        if (direction === "up") {
            for (let col = 0; col < 4; col++) {
                slideRowOrCol(col, 4);
            }
        } else if (direction === "down") {
            for (let col = 15; col >= 12; col--) {
                slideRowOrCol(col, -4);
            }
        } else if (direction === "left") {
            for (let row = 0; row < 16; row += 4) {
                slideRowOrCol(row, 1);
            }
        } else if (direction === "right") {
            for (let row = 3; row < 16; row += 4) {
                slideRowOrCol(row, -1);
            }
        }

        if (moved) {
            spawnTile();
        }
    }

    document.addEventListener("keydown", (event) => {
        switch (event.key) {
            case "ArrowUp":
                slideTiles("up");
                break;
            case "ArrowDown":
                slideTiles("down");
                break;
            case "ArrowLeft":
                slideTiles("left");
                break;
            case "ArrowRight":
                slideTiles("right");
                break;
        }
    });

    spawnTile();
    spawnTile();
});
