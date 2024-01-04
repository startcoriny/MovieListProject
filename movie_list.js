let container = document.querySelector("#container");
let moviecards = document.querySelector(".moviecards");
let searchContainer = document.querySelector("#searchContainer");
let movie_serch = document.querySelector("#movie_serch");
let submitbtn = document.querySelector("#submitbtn");

const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNTEwZDdmNWYzMmRlMGQ1ZGJmYmZhYTQzYzU1MTlmMyIsInN1YiI6IjY1OTYzYTkxMGU2NGFmNDAxMThjMTkxYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.QB8-UFSN1x6St9D-218WxnUeZVQFaw9-h8zZXbF1pcM'
    }
};

fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options)
    .then(response => response.json())
    .then(response => {
        let movieInfo = response['results'];
        let baseimgurl = 'https://image.tmdb.org/t/p/original'


        /* for문으로 html에 띄우기 */

        // for(let i = 0; i < movieInfo.length; i++){
        //     let div = document.createElement("div");
        //     container.append(div);
        //     div.className = 'moviecards'
        //     div.id = movieInfo[i]['id'];
        //     div.style.width = 250+'px';
        //     div.style.padding = 20+'px';
        //     div.style.backgroundColor = 'yellow';
        //     div.style.border = '1px solid black';
        //     div.innerHTML=`
        //     <img src="${baseimgurl}${movieInfo[i]['poster_path']}" alt="이미지없음"></img>
        //     <h4 class="title">${movieInfo[i]['original_title']}</h4>
        //     <p>${movieInfo[i]['overview']}</p>
        //     <p style="color: deeppink;">영화 평점 :${movieInfo[i]['vote_average']}</p>
        //     `
        // }



        /* ------------------------------- 카드 만들기 ---------------------------------*/

        // map함수를 이용하여 정보 하나씩 가져와 div를 만들어준뒤 movieCards에 카드 저장
        const movieCards = movieInfo.map(movie => {
            const div = document.createElement("div");
            div.className = 'moviecards';
            div.id = movie['id'];
            div.style.width = '250px';
            div.style.padding = '20px';
            div.style.backgroundColor = '#ffff1d6e';
            div.innerHTML = `
                <img src="${baseimgurl}${movie['poster_path']}" alt="이미지없음"></img>
                <h4 class="title">${movie['original_title']}</h4>
                <p>${movie['overview']}</p>
                <p style="color: deeppink;">영화 평점 :${movie['vote_average']}</p>
            `;
            return div;
        });
        // 저장한 카드 forEach를 사용하여 div를 container에 내보내기
        movieCards.forEach(div => container.append(div));

        /* ------------------------------- 카드 만들기 끝 ---------------------------------*/




        /* ------------------------------- 카드 아이디 띄우기 ---------------------------------*/

        // container.addEventListener("click", function (e) {
        //     let moviecard = e.target.closest('.moviecards');
        //     alert('영화 아이디 : ' + moviecard.id);
        // })

        container.addEventListener("click", e => alert('영화 아이디 : ' + e.target.closest('.moviecards').id));

        /* ------------------------------- 카드 아이디 띄우기 끝 ---------------------------------*/




        /* ------------------------------- 검색하기 기능 ---------------------------------*/

        // 버튼을 누르면 버튼의 작동을 멈추고 input의 value를 가져온다
        submitbtn.addEventListener("click", (e) => {
            e.preventDefault();
            container.innerHTML='';

            // input의 value를 가져온뒤 value에 있는 문자들을 전체 카드의 제목과 비교한다.
            // 하나라도 같은 글자가 있으면 화면에 띄우고 나머지 카드들은 없앤다. 
            let search_value = movie_serch.value.toUpperCase();
            let foundtitle = movieCards.map(function (movie) {
                return movie.querySelector('.title').textContent.toUpperCase().split(search_value).length > 1 ?  movie : ""
            });

            console.log("검색함수를 지나서 넘어온 문자들 : " + foundtitle[0])
            foundtitle.forEach(div => container.append(div));
        })

        /* ------------------------------- 검색하기 기능 끝 ---------------------------------*/


    })
    .catch(err => console.error(err));

