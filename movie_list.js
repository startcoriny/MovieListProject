import config from "./config.js";

/* dotenv프레임워크가 아닌 js파일로 사용한 이유 
    -- dotenv는 Node.js환경에서 사용되는 라이브러리로 브라우저에 직접 사용할수가 없음.
    -- 그래서인지 프레임워크를 설치하고 require('dotenv').config();로 정보를 받아오면 브라우저에서 Uncaught ReferenceError: require is not defined 오류가 뜸
    -- 그래서 js파일을 하나 만들어서 export로 내보내기하고 import로 받아서 script type을 module로 바꿔서 적용시키고 gitignore에 적어주고 사용함.
*/ 
const { API_KEY } = config;

const popcontainer = document.querySelector("#popcontainer");
const comcontainer = document.querySelector("#comcontainer");
const movie_serch = document.querySelector("#movie_serch");
const submitbtn = document.querySelector("#submitbtn");
const populer_movies_btn = document.querySelector("#populer_movies_btn");
const comming_movies_btn = document.querySelector("#comming_movies_btn");
const navName = document.querySelector("#navName");

const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: API_KEY
    }
};

const urls = [
    'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=ko-KR&page=1&sort_by=popularity.desc',
    ' https://api.themoviedb.org/3/movie/upcoming?language=ko-KR&page=1'
];


//         /* ------------------------------- 카드 만들기 ---------------------------------*/
const fetchData = async (urls) => {
    const response = await fetch(urls, options);
    const data = await response.json();
    return data;
};

Promise.all(urls.map(url => fetchData(url)))
    .then(dataArray => {
        let baseimgurl = 'https://image.tmdb.org/t/p/original'
        let obj = [dataArray[0]['results'], dataArray[1]['results']]
        let totmovieCards = []
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
//         /* ------------------------------- 카드 만들기 ---------------------------------*/




//         /* ------------------------------- 카드 아이디 띄우기 ---------------------------------*/

        popcontainer.addEventListener("click", e => alert('영화 아이디 : ' + e.target.closest('.moviecards').id));
        comcontainer.addEventListener("click", e => alert('영화 아이디 : ' + e.target.closest('.comcards').id));

//         /* ------------------------------- 카드 아이디 띄우기 끝 ---------------------------------*/




//       /* ------------------------------- 검색하기 기능 ---------------------------------*/

        // 버튼을 누르면 버튼의 작동을 멈추고 input의 value를 가져온다
        submitbtn.addEventListener("click", (e) => {
            e.preventDefault();
            popcontainer.innerHTML = '';
            comcontainer.innerHTML = '';
            console.log(totmovieCards[0][1]);
            // input의 value를 가져온뒤 value에 있는 문자들을 전체 카드의 제목과 비교한다.
            // 하나라도 같은 글자가 있으면 화면에 띄우고 나머지 카드들은 없앤다. 
            let search_value = movie_serch.value.toUpperCase();
            console.log(search_value);

            let foundtitle = totmovieCards.map(function (movie) {
                return movie.querySelector('.title').textContent.toUpperCase().split(search_value).length > 1 ? movie : "";
            })

            console.log("검색함수를 지나서 넘어온 문자들 : " + foundtitle)
            foundtitle.forEach(div => popcontainer.append(div));
        })


//         /* ------------------------------- 검색하기 기능 끝 ---------------------------------*/



//         /* ----------------------- 버튼 마다 인기 영화 or 개봉예정영화 사라지고 보이기 ---------------------------- */


        const popmoviecards = document.querySelectorAll(".moviecards");
        const commoviecards = document.querySelectorAll(".comcards");

        comming_movies_btn.addEventListener("click", function () {

            popmoviecards.forEach(card => {
                card.style.display = 'none';
            });
            commoviecards.forEach(card => {
                card.style.display = 'block';
            });

            navName.innerHTML = '개봉예정 영화';

        });

        populer_movies_btn.addEventListener("click", function (e) {
            popmoviecards.forEach(card => {
                card.style.display = 'block';
            });
            commoviecards.forEach(card => {
                card.style.display = 'none';
            });
            navName.innerHTML = '인기영화';
        })


//         /* ---------------------- 버튼 누르면 인기 영화 사라지기 끝 -------------------------- */

    })
    .catch(error => {
        console.error('Error during fetch:', error);
    });


















// fetch(urls, options)
//     .then(response => response.json())
//     .then(response => {
//         let movieInfo = response['results'];
//         let baseimgurl = 'https://image.tmdb.org/t/p/original'

//         /* ------------------------------- 카드 만들기 ---------------------------------*/

//         // map함수를 이용하여 정보 하나씩 가져와 div를 만들어준뒤 movieCards에 카드 저장
//         const movieCards = movieInfo.map(movie => {
//             const div = document.createElement("div");
//             div.className = 'moviecards';
//             div.id = movie['id'];
//             div.style.width = '250px';
//             div.style.padding = '20px';
//             div.style.backgroundColor = '#ffff1d6e';
//             div.innerHTML = `
//                 <img src="${baseimgurl}${movie['poster_path']}" alt="이미지없음"></img>
//                 <h4 class="title">${movie['original_title']}</h4>
//                 <p>${movie['overview']}</p>
//                 <p style="color: deeppink;">영화 평점 :${movie['vote_average']}</p>
//             `;
//             return div;
//         });
//         // 저장한 카드 forEach를 사용하여 div를 container에 내보내기
//         movieCards.forEach(div => popcontainer.append(div));

//         /* ------------------------------- 카드 만들기 끝 ---------------------------------*/




//         /* ------------------------------- 카드 아이디 띄우기 ---------------------------------*/

//         // container.addEventListener("click", function (e) {
//         //     let moviecard = e.target.closest('.moviecards');
//         //     alert('영화 아이디 : ' + moviecard.id);
//         // })

//         popcontainer.addEventListener("click", e => alert('영화 아이디 : ' + e.target.closest('.moviecards').id));

//         /* ------------------------------- 카드 아이디 띄우기 끝 ---------------------------------*/




//         /* ------------------------------- 검색하기 기능 ---------------------------------*/

//         // 버튼을 누르면 버튼의 작동을 멈추고 input의 value를 가져온다
//         submitbtn.addEventListener("click", (e) => {
//             e.preventDefault();
//             popcontainer.innerHTML = '';

//             // input의 value를 가져온뒤 value에 있는 문자들을 전체 카드의 제목과 비교한다.
//             // 하나라도 같은 글자가 있으면 화면에 띄우고 나머지 카드들은 없앤다.
//             let search_value = movie_serch.value.toUpperCase();
//             let foundtitle = movieCards.map(function (movie) {
//                 return movie.querySelector('.title').textContent.toUpperCase().split(search_value).length > 1 ? movie : ""
//             });

//             console.log("검색함수를 지나서 넘어온 문자들 : " + foundtitle[0])
//             foundtitle.forEach(div => popcontainer.append(div));
//         })

//         /* ------------------------------- 검색하기 기능 끝 ---------------------------------*/



//         /* ----------------------- 버튼 누르면 인기 영화 사라지기 ---------------------------- */

//         const popmoviecards = document.querySelectorAll(".moviecards");
//         const commoviecards = document.querySelectorAll(".comcards");

//         comming_movies_btn.addEventListener("click", function () {

//             popmoviecards.forEach(card => {
//                 card.style.display = 'none';
//             });
//             commoviecards.forEach(card => {
//                 card.style.display = 'block';
//             });
//         });

//         populer_movies_btn.addEventListener("click", function (e) {
//             popmoviecards.forEach(card => {
//                 card.style.display = 'block'; // 또는 'flex' 등, 해당 카드의 원래 디스플레이 속성으로 변경
//             });
//             commoviecards.forEach(card => {
//                 card.style.display = 'none';
//             });
//         })





//         /* ---------------------- 버튼 누르면 인기 영화 사라지기 끝 -------------------------- */


//     })
//     .catch(err => console.error(err));