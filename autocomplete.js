let autoCompleteSearch = document.querySelector('#autocompletesearch')
let movietvsearchdata = document.querySelector('.movietvsearchdata')

async function autoCompleteMovies(){
  let url1 = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=0a5247d162a6d3455cfaff2ae266f450`)
  let url1Res = await url1.json()
  let autoMovies = url1Res.results 
 
for(let i = 0; i < autoMovies.length; i++){
  let itemMovies = autoMovies[i]
  let itemMovieId = itemMovies.id
  let itemTitleMovie = itemMovies.title
  let mvImg = itemMovies.poster_path
  let mvImgUrl = `https://image.tmdb.org/t/p/w500`
  let finalMvImg = mvImgUrl + mvImg
  movietvsearchdata.innerHTML = `<p>${itemTitleMovie}</p>`

 }

}
autoCompleteSearch.addEventListener('input', function(){
    let movieValue = autoCompleteSearch.value

    if(movieValue){
        autoCompleteMovies()

      }
})