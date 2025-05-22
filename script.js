const grid = document.getElementById('grid');
var wallettxt = document.querySelector(".amt");
var nmines = parseFloat(document.getElementById("nmines").value);
var cashout = document.getElementById('cashout');
const profitAmt = document.getElementById('profitamt');
const betButton = document.getElementById('bet-button');
var a = 25;
var mines = new Set();
var count = 0;
var gameover = false;
let bet = 0;
let multiplier = 1;
var wallet = parseFloat(localStorage.getItem("wallet")) || 100;
wallettxt.textContent = wallet.toFixed(3);

for (var i = 0; i < a; i++) {
    const tile = document.createElement('div');
    tile.classList.add('tile');
    grid.appendChild(tile);
}
cashout.addEventListener("click", () => {
    if (!gameover && bet > 0) {
        let profit = bet * multiplier * count;
        profitAmt.textContent = profit.toFixed(3);
        wallet += profit;
        localStorage.setItem("wallet", wallet);
        wallettxt.textContent = wallet.toFixed(3);
        gameover = true;
        cashout.style.opacity = 0.5;
        cashout.style.cursor = "default";
        alert("You cashed out! "+profit);
         profitAmt.textContent = "0.000";
         reset();
         setButtonState(cashout, false);
        setButtonState(betButton, true);
         
    }
});

function startGame() {
    document.getElementById('cashout').style.opacity = 0.5;
    var nmines = parseFloat(document.getElementById("nmines").value);
    bet = parseFloat(document.getElementById('bet').value);
    multiplier = parseFloat(document.getElementById('multiplier').value);
    grid.innerHTML = '';
    mines.clear();
    count = 0;
    gameover = false;
    let validBet = true;
    setButtonState(cashout, false);
    setButtonState(betButton, false);
    for (var i = 0; i < a; i++) {
        const tile = document.createElement('div');
        tile.classList.add('tile');
        grid.appendChild(tile);
    }
    while (mines.size < nmines) {
        var mine = Math.floor(Math.random() * a);
        mines.add(mine);
    }
    if (bet > wallet || bet < 0) {
        alert("Invalid bet amount!");
        bet = 0;
        validBet = false;
        setButtonState(betButton, true);

    }
    if (wallet < 0) {
        
        wallet = 0;
        localStorage.setItem("wallet", wallet);
        wallettxt.textContent = wallet.toFixed(3);
    }
    wallet = wallet - bet;
    localStorage.setItem("wallet", wallet);
    wallettxt.textContent = wallet.toFixed(3);
    if(validBet){
    

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
                let loss=0;
                if(wallet==0) loss=bet;
                else (bet > 0) ? loss=(wallet*0.3)/nmines: loss = 0;
                 wallet -=  loss;
                 if(wallet<0) wallet=0;
                 localStorage.setItem("wallet", wallet);
                wallettxt.textContent = wallet.toFixed(3);
                
                mines.forEach(i => {
                    const t = tiles[i];
                    if (!t.classList.contains('mine')) {
                        t.classList.add('mine');
                        t.textContent = '💣';
                    }
                });
                alert('Game Over! You hit a mine and lost. '+loss);
                profitAmt.textContent = "0.000";
                setButtonState(betButton, true);
                setButtonState(cashout, false);
                
            } else {
                tile.classList.add('clicked');
                tile.textContent = '💎';
                setTimeout(() => {
                    tile.style.transform = 'scale(1)';
                }, 250);
                count++;
                if(bet>0)
                {
                    
                    setButtonState(cashout, true);
                }

               

                let profit = bet * multiplier * count;
                profitAmt.textContent = profit.toFixed(3);

                if (count == a - mines.size) {
                    gameover = true;
                    alert('Congratulations! You won!');
                }

            }
        });
    });
}
}
document.getElementById('bet-button').addEventListener('click', () => {
    startGame();
});


function setButtonState(button, isEnabled) {
    button.disabled = !isEnabled;
    button.style.opacity = isEnabled ? 1 : 0.5;
    button.style.cursor = isEnabled ? 'pointer' : 'default';
}
function reset()
{
    gameover= false;
     const tiles = document.querySelectorAll('.tile');
        tiles.forEach(tile => {
            tile.classList.remove('mine', 'clicked');
            tile.textContent = '';
            tile.style.transform = '';
        });

        mines.clear();
        count = 0;
}
