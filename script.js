const symbols = [
    "🀄", "🀄",
    "🀅", "🀅",
    "🀆", "🀆",
    "🀇", "🀇",
    "🀈", "🀈",
    "🀉", "🀉",
    "🀊", "🀊",
    "🀋", "🀋",
    "🀌", "🀌",
    "🀍", "🀍",
    "🀎", "🀎",
    "🀏", "🀏"
];

let selectedTile = null;
const board = document.getElementById("board");

// Shuffle tiles
symbols.sort(() => Math.random() - 0.5);

// Create tiles
symbols.forEach(symbol => {
    const tile = document.createElement("div");
    tile.classList.add("tile");
    tile.textContent = symbol;

    tile.addEventListener("click", () => handleTileClick(tile));
    board.appendChild(tile);
});

function handleTileClick(tile) {
    if (tile.classList.contains("removed")) return;

    if (!selectedTile) {
        selectedTile = tile;
        tile.classList.add("selected");
    }
    else if (selectedTile === tile) {
        tile.classList.remove("selected");
        selectedTile = null;
    }
    else {
        if (selectedTile.textContent === tile.textContent) {
            selectedTile.classList.add("removed");
            tile.classList.add("removed");
        }
        selectedTile.classList.remove("selected");
        selectedTile = null;
        checkWin();
    }
}

function checkWin() {
    const remaining = document.querySelectorAll(".tile:not(.removed)");
    if (remaining.length === 0) {
        setTimeout(() => {
            document.getElementById("overlay").classList.remove("hidden");
        }, 400);
    }
}

document.getElementById("replayBtn").addEventListener("click", replayGame);

function replayGame() {
    selectedTile = null;
    board.innerHTML = "";
    document.getElementById("overlay").classList.add("hidden");

    symbols.sort(() => Math.random() - 0.5);

    symbols.forEach(symbol => {
        const tile = document.createElement("div");
        tile.classList.add("tile");
        tile.textContent = symbol;

        tile.addEventListener("click", () => handleTileClick(tile));
        board.appendChild(tile);
    });
}