const grid = document.getElementById('grid');
var a = 25;
var mines = new Set();
var count = 0;
var gameover = false;
var wallettxt=document.querySelector(".amt");
var wallet = 5;
  for (var i = 0; i < a; i++) {
        const tile = document.createElement('div');
        grid.appendChild(tile);
    }

function startGame() {
    grid.innerHTML = '';
    mines.clear();
    count = 0;
    gameover = false;
    var bet = parseFloat(document.getElementById('bet').value);
    var multiplier = parseFloat(document.getElementById('multiplier').value);
    if(bet > wallet) {
        alert("You cant bet more than wallet!");
        wallettxt.textContent=wallet.toFixed(3);
    }
    else wallet = wallet - bet;
    if( wallet < 0) {
        alert("You don't have enough money to play!");
        wallet = 0;
        wallettxt.textContent=wallet.toFixed(3);
    }
    wallettxt.textContent=wallet.toFixed(3);
    for (var i = 0; i < a; i++) {
        const tile = document.createElement('div');
        tile.classList.add('tile');
        grid.appendChild(tile);
    }

    while (mines.size < 7) {
        var mine = Math.floor(Math.random() * a);
        mines.add(mine);
    }

    const tiles = document.querySelectorAll('.tile');
    tiles.forEach((tile, index) => {
        tile.addEventListener("click", () => {
            if (gameover) return;

            if (mines.has(index)) {
                tile.classList.add('mine');
                tile.textContent = '💣';
                tile.style.transform = 'scale(1.1)';
                setTimeout(() => {
                    tile.style.transform = 'scale(1)';
                }, 250);
                gameover = true;
                (bet>0)? wallet-=wallet*0.25:wallet=wallet;
                wallettxt.textContent=wallet.toFixed(3);
                mines.forEach(i => {
                    const t = tiles[i];
                    if (!t.classList.contains('mine')) {
                        t.classList.add('mine');
                        t.textContent = '💣';
                    }
                });
                alert('Game Over! You hit a mine.');
            } else {
                tile.classList.add('clicked');
                tile.textContent = '💎';
                setTimeout(() => {
                    tile.style.transform = 'scale(1)';
                }, 250);
                count++;
                wallet+=bet*multiplier;
                wallettxt.textContent=wallet.toFixed(3);
                if (count == a - mines.size) {
                    gameover = true;
                    alert('Congratulations! You won!');
                }
            }
        });
    });
}

document.getElementById('bet-button').addEventListener('click', () => {
    startGame();
});

