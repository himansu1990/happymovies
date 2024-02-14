const nullImg = `https://image.tmdb.org/t/p/w500null`
const defaultImg = `./default-image-2.jpg`
let discovermore = document.querySelector('.discovermore')
let castMemb = document.querySelector('.castmemb')
let castText = document.querySelector('.cast-text')
// let movietvsearchdata = document.querySelector('.movietvsearchdata')
 moviePage = document.querySelector('.moviepage')
 let upcomingmoviesbtn = document.querySelector('.upcomingmoviesbtn')
 let trendmoviesbtn = document.querySelector('.trendmoviesbtn')
let searchResults = document.querySelector('.search-results')
let searchInput = document.querySelector('.searchtm')
let btnSearch = document.querySelector('.btnsearch')
let inputGroup = document.querySelector('.input-group')
let page = 1
let formsearch = document.querySelector('.formsearch')
let qrysearch 
let headerSearchForm = document.querySelector('.header-search-from')
let searchtmheader = document.querySelector('.searchtmheader')
let btnsearchheader = document.querySelector('.btnsearchheader')

//Header search bar display

let searchicongroup = document.querySelector('.searchicongroup')
let searchicongroupclose = document.querySelector('.searchicongroupclose')
searchicongroup.addEventListener('click', function(){
  headerSearchForm.style.display = 'block'
  headerSearchForm.style.transition = 'height 0.5s ease, padding 0.5s ease, opacity 0.5s ease;' /* Smooth transition */

  searchicongroupclose.style.display = 'block'
  searchicongroup.style.display = 'none'
})

searchicongroupclose.addEventListener('click', function(){
  headerSearchForm.style.display = 'none'
  headerSearchForm.style.transition = 'height 0.5s ease, padding 0.5s ease, opacity 0.5s ease;' /* Smooth transition */

  searchicongroup.style.display = 'block'
  searchicongroupclose.style.display = 'none'

})

//Show upcoming movies
let upcomingmovies = document.querySelector('.upcomingmovies')
let mvResult = ``
let movieShowSearch = ``
let tvShowSearch = ``
async function recentMovies(){
let ltMoviesUrl = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=0a5247d162a6d3455cfaff2ae266f450&original_languag=hi&region=IN&release_date.gte=2024-01-01&release_date.lte=2024-03-31&page=${page}`)
let latestMovieRaw =  await ltMoviesUrl.json()
let finalLatest = latestMovieRaw.results
console.log(finalLatest)  
for(let i = 0; i < finalLatest.length; i++){
    let movieItemLatest = finalLatest [i]
    let mId = movieItemLatest.id
    let latestMoviesTitle = movieItemLatest.title 
    let latestOverviewMovies = movieItemLatest.overview
    let latestImgMovies = movieItemLatest.backdrop_path
    let posterUrl = `https://image.tmdb.org/t/p/w500`
    let latestMoviefinalPoster = posterUrl + latestImgMovies
  
    mvResult = `<div class="col-lg-3 movie_list_ul">
    <div class="movie_list_item">
    <a href="movies.html?id=${mId}">
    <img class="img-fluid movies-poster" src="${latestMoviefinalPoster}" alt="${latestMoviesTitle}"/>
    </a>
    <div class="movie_info">
    <a href="movies.html?id=${mId}"><p>${latestMoviesTitle}</p></a>
    </div>
    </div>
    </div>
    `
    if(latestMoviefinalPoster === nullImg){
        mvResult = `<div class="col-lg-3 movie_list_ul">
        <div class="movie_list_item">
        <a href="movies.html?id=${mId}">
        <img class="img-fluid movies-poster" src="${defaultImg}" alt="${latestMoviesTitle}"/>
        </a>
        <div class="movie_info">
        <a href="movies.html?id=${mId}">
        <p>${latestMoviesTitle}</p>
        </a>
        </div>
        </div>
        </div>`
      }
      upcomingmovies.innerHTML += mvResult
      discovermore.style.display = 'none'
      movietvsearchdata.innerHTML = ``


      
}
}

recentMovies()


upcomingmoviesbtn.addEventListener('click', function(){
  page++
  recentMovies()
})

//End of Show upcoming movies

//For searching movies
async function searchMovie(){
    let searchMv = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=0a5247d162a6d3455cfaff2ae266f450&query=${qrysearch}`)
    let searchMvRaw = await searchMv.json()
    let mvSearchResult = searchMvRaw.results 
    for(let i = 0; i < mvSearchResult.length; i++){
        let mvItem = mvSearchResult[i]
        let mId = mvItem.id
        let titleMv = mvItem.title
        let mvImg = mvItem.backdrop_path
        let mvImgUrl = `https://image.tmdb.org/t/p/w500`
        let finalMvImg = mvImgUrl + mvImg

        document.querySelector('.upcomingmovies').innerHTML = ``
        castMemb.innerHTML = ``
        moviePage.innerHTML = ``
        movieShowSearch = `<div class="col-lg-3 movie_list_ul">
        <div class="movie_list_item">
        <a href="movies.html?id=${mId}">
        <img class="img-fluid movies-poster" src="${finalMvImg}" alt="${titleMv}"/>
        </a>
        <div class="movie_info">
        <a href="movies.html?id=${mId}">
        <p>${titleMv}</p>
        </a>
        </div>
        </div>
        </div>`
        if(finalMvImg === nullImg){
          movieShowSearch = `<div class="col-lg-3 movie_list_ul">
          <div class="movie_list_item">
          <a href="movies.html?id=${mId}">
        <img class="img-fluid movies-poster" src="${defaultImg}" alt="${titleMv}"/>
        </a>
        <div class="movie_info">
        <p>${titleMv}</p>
        </div>
        </div>
        </div>`

        movietvsearchdata.innerHTML = ``
        }
        searchResults.innerHTML += movieShowSearch
        


    }

}


//For searching tv shows

async function searchTvShows() {
let searchTv = await fetch(`https://api.themoviedb.org/3/search/tv?api_key=0a5247d162a6d3455cfaff2ae266f450&query=${qrysearch}`)
let searchTvRaw = await searchTv.json()
let tvResult = searchTvRaw.results
for(let i = 0; i < tvResult.length; i++){
    let tvItem = tvResult[i]
    let tvId = tvItem.id
    let tvTitle = tvItem.name
    let tvImg = tvItem.backdrop_path
    let tvImgUrl = `https://image.tmdb.org/t/p/w500`
    let finalTvImg = tvImgUrl + tvImg
    document.querySelector('.upcomingmovies').innerHTML = ``
    tvShowSearch = `<div class="col-lg-3 movie_list_ul">
    <div class="movie_list_item">
    <a href="tvpage.html?id=${tvId}">
<img class="img-fluid movies-poster" src="${finalTvImg}" alt="${tvTitle}"/>
</a>
<div class="movie_info">
<a href="tvpage.html?id=${tvId}">
<p>${tvTitle}</p>
</a>
</div>
</div>
</div>`
if(finalTvImg == nullImg){
  tvShowSearch = `<div class="col-lg-3 movie_list_ul">
  <div class="movie_list_item">
  <a href="tvpage.html?id=${tvId}">
<img class="img-fluid movies-poster" src="${defaultImg}" alt="${tvTitle}"/>
</a>
<div class="movie_info">
<a href="tvpage.html?id=${tvId}">
<p>${tvTitle}</p>
</a>
</div>
</div>
</div>`
// castMemb.innerHTML = ``
moviePage.innerHTML = ``
movietvsearchdata.innerHTML = ``
}
searchResults.innerHTML += tvShowSearch


}

}


//This async function will be used in load more button for displaying tv shows in the next pages
async function moreTvResults(){
  let nextPage = page + 1
  let searchTv = await fetch(`https://api.themoviedb.org/3/search/tv?api_key=0a5247d162a6d3455cfaff2ae266f450&query=${qrysearch}&page=${nextPage}`)
let searchTvRaw = await searchTv.json()
let tvResult = searchTvRaw.results
   let totalResultForMoreTv = searchTvRaw.total_results

    let initialTvSearchResult 
   
if(initialTvSearchResult  === totalResultForMoreTv.length) {
          discovermore.style.display = 'none'

  // document.querySelector('.end-result').innerHTML = `<p>The results are a mix of tv shows and movies and may change.</b></p>`

}
for(let i = 0; i < tvResult.length; i++){
    let tvItem = tvResult[i]
    let tvId = tvItem.id 
    let tvTitle = tvItem.name
    let tvImg = tvItem.backdrop_path
    let tvImgUrl = `https://image.tmdb.org/t/p/w500`
    let finalTvImg = tvImgUrl + tvImg
    document.querySelector('.upcomingmovies').innerHTML = ``
    tvShowSearch = `<div class="col-lg-3 movie_list_ul">
    <div class="movie_list_item">
    <a href="tvpage.html?id=${tvId}">
<img class="img-fluid movies-poster" src="${finalTvImg}" alt="${tvTitle}"/>
</a>
<div class="movie_info">
<a href="tvpage.html?id=${tvId}">
<p>${tvTitle}</p>
</a>
</div>
</div>
</div>`
if(finalTvImg == nullImg){
  tvShowSearch = `<div class="col-lg-3 movie_list_ul">
  <div class="movie_list_item">
  <a href="tvpage.html?id=${tvId}">
<img class="img-fluid movies-poster" src="${defaultImg}" alt="${tvTitle}"/>
</a>
<div class="movie_info">
<a href="tvpage.html?id=${tvId}">
<p>${tvTitle}</p>
</a>
</div>
</div>
</div>`
}
searchResults.innerHTML += tvShowSearch

}
}

//This async function will be used in load more button for displaying movies in the next pages
async function moreMovieResult(){
    let nextPage = page + 1
let searchMv = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=0a5247d162a6d3455cfaff2ae266f450&query=${qrysearch}&page=${nextPage}`)
    let searchMvRaw = await searchMv.json()
    let mvSearchResult = searchMvRaw.results 
    let totalResultForMoreMovies = searchMvRaw.total_results

    let initialMovieSearchResult 
   
if(initialMovieSearchResult === totalResultForMoreMovies.length) {
          discovermore.style.display = 'none'

  // document.querySelector('.end-result').innerHTML = `<p>The results are a mix of tv shows and movies and may change.</p>`

}

    for(let i = 0; i < mvSearchResult.length; i++){
        let mvItem = mvSearchResult[i]
        let mId = mvItem.id
        let titleMv = mvItem.title
        let mvImg = mvItem.backdrop_path
        let mvImgUrl = `https://image.tmdb.org/t/p/w500`
        let finalMvImg = mvImgUrl + mvImg

        document.querySelector('.upcomingmovies').innerHTML = ``
        movieShowSearch = `<div class="col-lg-3 movie_list_ul">
        <div class="movie_list_item">
        <a href="movies.html?id=${mId}">
        <img class="img-fluid movies-poster" src="${finalMvImg}" alt="${titleMv}"/>
        </a>
        <div class="movie_info">
        <a href="movies.html?id=${mId}">
        <p>${titleMv}</p>
        </a>
        </div>
        </div>
        </div>`
        if(finalMvImg === nullImg){
          movieShowSearch = `<div class="col-lg-3 movie_list_ul">
          <div class="movie_list_item">
          <a href="movies.html?id=${mId}">
        <img class="img-fluid movies-poster" src="${defaultImg}" alt="${titleMv}"/>
        </a>
        <div class="movie_info">
        <a href="movies.html?id=${mId}">
        <p>${titleMv}</p>
        </a>
        </div>
        </div>
        </div>`
        }
        searchResults.innerHTML += movieShowSearch
    }
}


//Total TV Show Results. It will show the total number of tv shows in the search result
async function totalTvResults(){
let url1 = await fetch(`https://api.themoviedb.org/3/search/tv?api_key=0a5247d162a6d3455cfaff2ae266f450&query=${qrysearch}&page=${page}`)
let totalUrl1 = await url1.json()
let totalTvSearch = totalUrl1.total_results
// document.querySelector('.total-tv-results').innerHTML = `<p>Total tv show results: ${totalTvSearch}</p>` 

if(totalTvSearch < 20){
  discovermore.style.display = 'none'

}
else if(totalTvSearch > 20){
  
      discovermore.style.display = 'block'
  discovermore.addEventListener('click', moreTvResults)


}
}

//Total Movie Results. It will show the total number of movies in the search result
async function totalMovieResults(){
  let url2 = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=0a5247d162a6d3455cfaff2ae266f450&query=${qrysearch}&page=${page}`)
  let totalUrl2 = await url2.json()
  let totalMvSearch = totalUrl2.total_results
  // document.querySelector('.total-movie-results').innerHTML = `<p>Total movie results: ${totalMvSearch}</p>`
  if(totalMvSearch < 20){
    discovermore.style.display = 'none'
  }
 else if(totalMvSearch > 20){
      discovermore.style.display = 'block'
  discovermore.addEventListener('click', moreMovieResult)
 } 
  
}

async function allSearchRes(e){
    e.preventDefault()
    qrysearch = document.querySelector('.searchtm').value 
    document.querySelector('.searchheadline').innerHTML = `<h3>Results for ${qrysearch}</h3>`
    document.title = `Results for ` + qrysearch
    upcomingmoviesbtn.style.display = 'none'
    document.querySelector('.homepagetabs').style.display ='none'
    upcomingmovies.innerHTML = ``
    searchResults.innerHTML = ``
    moviePage.innerHTML = ``
    castMemb.innerHTML = ``

totalMovieResults()
totalTvResults()
    searchMovie()
    searchTvShows()
    discovermore.style.display = 'block'
}

btnSearch.addEventListener('click', allSearchRes)

//Enter event
formsearch.addEventListener('keypress', function(event){
  if(event.key === 'Enter'){
    event.preventDefault()
    btnSearch.click()
  }
})
//end search results

//For Header search 
async function headerSearchFunction(e){
  e.preventDefault()
  qrysearch = searchtmheader.value 
  document.querySelector('.searchheadline').innerHTML = `<h3>Results for ${qrysearch}</h3>`
  document.title = `Results for ` + qrysearch
  upcomingmoviesbtn.style.display = 'none'
  document.querySelector('.homepagetabs').style.display ='none'
  upcomingmovies.innerHTML = ``
  searchResults.innerHTML = ``
  moviePage.innerHTML = ``
  castMemb.innerHTML = ``

totalMovieResults()
totalTvResults()
  searchMovie()
  searchTvShows()
  discovermore.style.display = 'block'
}

btnsearchheader.addEventListener('click', headerSearchFunction)
headerSearchForm.addEventListener('keypress', function(e){
  if(e.key === 'Enter'){
    e.preventDefault()
    btnsearchheader.click()
  }
})

//Trending Movies

async function trendingMovies(){
  let trendUrl = await fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=0a5247d162a6d3455cfaff2ae266f450&page=${page}`)
  let detTrend = await trendUrl.json()
  let trendMovieRes = detTrend.results
  let trendMovies = document.querySelector('.trendmovies')
for(let i = 0; i < trendMovieRes.length; i++){
  let trendMovieItem = trendMovieRes[i]
  let trendMovieId =  trendMovieItem.id
  let trendMvTitle =  trendMovieItem.title
  let trendingPoster = `https://image.tmdb.org/t/p/w500`
  let trendMovieImgPath = trendMovieItem.backdrop_path 
  let trendMoviePoster = trendingPoster + trendMovieImgPath
  trendMovies.innerHTML += `<div class="col-lg-3 movie_list_ul">
  <div class="movie_list_item">
  <a href="movies.html?id=${trendMovieId}">
  <img class="img-fluid movies-poster" src="${trendMoviePoster}" alt="${trendMvTitle}"/>
  </a>
  <div class="movie_info">
  <a href="movies.html?id=${trendMovieId}">
  <p>${trendMvTitle}</p>
  </a>
  </div>
  </div>
   </div>`

   if(trendMoviePoster === nullImg){
    trendMovies.innerHTML = `<div class="col-lg-3 movie_list_ul">
    <div class="movie_list_item">
    <a href="movies.html?id=${trendMovieId}">
    <img class="img-fluid movies-poster" src="${defaultImg}" alt="${trendMvTitle}"/>
    </a>
    <div class="movie_info">
    <a href="movies.html?id=${trendMovieId}">
    <p>${trendMvTitle}</p>
    </a>
    </div>
    </div>
     </div>`
   }

}
}

trendingMovies()
trendmoviesbtn.addEventListener('click', function(){
  page++
  trendingMovies()
})


