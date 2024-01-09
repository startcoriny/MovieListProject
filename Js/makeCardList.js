let totmovieCards = [];
function makeCard(dataArray,popcontainer,comcontainer){
    let baseimgurl = 'https://image.tmdb.org/t/p/original'
    let obj = [dataArray[0]['results'], dataArray[1]['results']]
    for (let i = 0; i < obj.length; i++) {
        const className = i === 0 ? 'moviecards' : 'comcards';
        const container = i === 0 ? popcontainer : comcontainer;

        let movieCards = obj[i].map(movie => {
            const div = document.createElement("div");
            div.className = className;
            div.id = movie['id'];
            div.style.width = '250px';
            div.style.padding = '20px';
            div.style.backgroundColor = '#ffff1d6e';
            div.style.display = i === 1 ? 'none' : ''; // 두 번째 객체일 때는 display를 'none'으로 설정
            div.innerHTML = `
                    <img src="${baseimgurl}${movie['poster_path']}" alt="이미지없음"></img>
                    <h4 class="title">${movie['original_title']}</h4>
                    <p>${movie['overview']}</p>
                    <p style="color: deeppink;">영화 평점 :${movie['vote_average']}</p>
                `;
            return div;
        });

        // 저장한 카드 전부 전역에서 사용하기 위한 저장
            totmovieCards.push(...movieCards);

        // 저장한 카드 forEach를 사용하여 div를 container에 내보내기
        movieCards.forEach(div => container.append(div));
    }
}


function serchMovies(e, totmovieCards) {
    e.preventDefault();
    popcontainer.innerHTML = '';
    comcontainer.innerHTML = '';

    let search_value = movie_serch.value.toUpperCase();

    let foundtitle = totmovieCards.filter(movie => {
        const title = movie.querySelector('.title').textContent.toUpperCase();
        return title.includes(search_value);
    });

    foundtitle.forEach(div => popcontainer.append(div));
}


export {makeCard, serchMovies,totmovieCards} ;