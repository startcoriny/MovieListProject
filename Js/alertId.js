

function populerMoviesId(e){
    alert('영화 아이디 : ' + e.target.closest('.moviecards').id);
} 
function commingMoviesId(e){
    alert('영화 아이디 : ' + e.target.closest('.comcards').id);
} 



export {populerMoviesId, commingMoviesId};