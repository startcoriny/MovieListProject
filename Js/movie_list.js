import config from "./config.js";
import {makeCard,serchMovies,totmovieCards} from "./makeCardList.js";
import { populerMoviesId, commingMoviesId } from "./alertId.js"
import { commmovieToggle, popmmovieToggle } from "./moviesToggle.js"

/* dotenv프레임워크가 아닌 js파일로 사용한 이유 
    -- dotenv는 Node.js환경에서 사용되는 라이브러리로 브라우저에 직접 사용할수가 없음.
    -- 그래서인지 프레임워크를 설치하고 require('dotenv').config();로 정보를 받아오면 브라우저에서 Uncaught ReferenceError: require is not defined 오류가 뜸
    -- 그래서 js파일을 하나 만들어서 export로 내보내기하고 import로 받아서 script type을 module로 바꿔서 적용시키고 gitignore에 적어주고 사용함.
*/
const { API_KEY } = config;

const popcontainer = document.querySelector("#popcontainer");
const comcontainer = document.querySelector("#comcontainer");
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


/* ------------------------------- 카드 만들기 ---------------------------------*/
const fetchData = async (urls) => {
    const response = await fetch(urls, options);
    const data = await response.json();
    return data;
};

Promise.all(urls.map(url => fetchData(url)))
    .then(dataArray => {
        makeCard(dataArray,popcontainer,comcontainer)
/* ------------------------------- 카드 만들기 끝 ---------------------------------*/



/* ------------------------------- 카드 아이디 띄우기 ---------------------------------*/
        popcontainer.addEventListener("click", e => populerMoviesId(e))
        comcontainer.addEventListener("click", e => commingMoviesId(e))

/* ------------------------------- 카드 아이디 띄우기 끝 ---------------------------------*/


/* ------------------------------- 검색하기 기능 ---------------------------------*/

        // 버튼을 누르면 버튼의 작동을 멈추고 input의 value를 가져온다
        submitbtn.addEventListener("click", (e) => serchMovies(e,totmovieCards))


/* ------------------------------- 검색하기 기능 끝 ---------------------------------*/


/* ----------------------- 버튼 마다 인기 영화 or 개봉예정영화 사라지고 보이기 ---------------------------- */


        const popmoviecards = document.querySelectorAll(".moviecards");
        const commoviecards = document.querySelectorAll(".comcards");

        comming_movies_btn.addEventListener("click", function () {
            commmovieToggle(popmoviecards,commoviecards)
            navName.innerHTML = '개봉예정 영화';
        });

        populer_movies_btn.addEventListener("click", function () {
            popmmovieToggle(popmoviecards,commoviecards)        
            navName.innerHTML = '인기영화';
        })

/* ---------------------- 버튼 누르면 인기 영화 사라지기 끝 -------------------------- */

    })
    .catch(error => {
        console.error('Error during fetch:', error);
    });

