
const grid=document.getElementById('grid');
var a=25;
for(var i=0;i<a;i++)
{
    const tile=document.createElement('div');
    tile.classList.add('tile');
    grid.appendChild(tile);
}
 
const tiles=document.querySelectorAll('.tile');
tiles.forEach((tile,index)=>
{
    tile.addEventListener("click",()=>
    {
       tile.classList.add('clicked');
       tile.textContent='💎';
        setTimeout(() => {
            tile.style.transform='scale(1)';
        }, 250);
    }
    )
});

