function commmovieToggle(popmoviecards,commoviecards){
    popmoviecards.forEach(card => {
        card.style.display = 'none';
    });
    commoviecards.forEach(card => {
        card.style.display = 'block';
    });
}
function popmmovieToggle(popmoviecards,commoviecards){
    popmoviecards.forEach(card => {
        card.style.display = 'block';
    });
    commoviecards.forEach(card => {
        card.style.display = 'none';
    });
}

export {commmovieToggle,popmmovieToggle}