//For Header

class headerEl extends HTMLElement {
    constructor(){
        super()
    }
    connectedCallback(){
        this.innerHTML = `
        <style>
        @import url(./style.css);
        </style>
        <header>
        <a href="index.html"> <p class="logo">Happy Movies!</p></a>
        <input type="checkbox" id="click">
        <label for="click" class="menu-btn">
            <i class="fas fa-bars"></i>
        </label>
    
        <ul class="nav__links">
            <li><a class="active" href="index.html">Home</a></li>
            <li><a href="#">About</a></li>
            <li><a href="#">FAQs</a></li>
            <li><a href="#">License</a></li>
            <li><a href="#">Contact</a></li>
        </ul>
        <header-search-form-one></header-search-form-one>

        <button type="submit" class="btn btn-secondary searchicongroup"><span class="bi-search"></span></button>
        <button type="submit" class="btn btn-secondary searchicongroupclose" ><i class="bi-x"  style="font-size: 30px;"></i></button>
    </header>
        `
    }
    disconnectedCallback(){

    }
}

//header search
class headerSearchFormOne extends HTMLElement {
  constructor(){
    super()
  }
connectedCallback() {
  this.innerHTML = `
  <div class="header-search-from">
  <div class="input-group">
  <input type="text" class="form-control searchtmheader" placeholder="Search Movie or TV Show">
  <div class="input-group-append">
  <button class="btn btn-secondary btnsearchheader" type="button">
  <i class="fa fa-search"></i>
  </button>
  </div>
  </div>
  </div>`
}

disconnectedCallback(){

}

}



//For Footer 

class footerEl extends HTMLElement {
    constructor(){
        super()
    }
    connectedCallback(){
        this.innerHTML = `<div class="footer">
        <footer class="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
          <p class="col-md-4 mb-0 text-body-secondary">&copy; <span id="year"></span> Happy Movies, Inc</p>
      
          <a href="/" class="col-md-4 d-flex align-items-center justify-content-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none">
            <svg class="bi me-2" width="40" height="32"><use xlink:href="#bootstrap"/></svg>
          </a>
      
          <ul class="nav col-md-4 justify-content-end">
            <li class="nav-item"><a href="index.html" class="nav-link px-2 text-body-secondary">Home</a></li>
            <li class="nav-item"><a href="about.html" class="nav-link px-2 text-body-secondary">About</a></li>
            <li class="nav-item"><a href="#" class="nav-link px-2 text-body-secondary">FAQ</a></li>
            <li class="nav-item"><a href="#" class="nav-link px-2 text-body-secondary">License</a></li>
          </ul>
        </footer>
      </div>`
    }
    
    disconnectedCallback(){

    }
}

//Search form
class SearchEl extends HTMLElement{
    constructor(){
        super()
    }
    connectedCallback(){
        this.innerHTML = `<div class="formsearch">
        <div class="input-group">
        <input type="text" class="form-control searchtm" id="autocompletesearch" placeholder="Search Movie or TV Show " oninput="searchCall()">
        <div class="input-group-append">
        <button class="btn btn-secondary btnsearch" type="button">
        <i class="fa fa-search"></i>
        </button>
        </div>
        </div>
        </div>
        <div class="movietvsearchdata"></div>
        `
    }
    disconnectedCallback(){

    }
}

window.customElements.define('header-el', headerEl)
window.customElements.define('footer-el', footerEl)
window.customElements.define('search-el', SearchEl)
window.customElements.define('header-search-form-one', headerSearchFormOne)
document.getElementById("year").innerHTML =  new Date().getFullYear()


//Auto complete search
let movietvsearchdata = document.querySelector('.movietvsearchdata')
const nullImgSearch = `https://image.tmdb.org/t/p/w500null`
const defaultImgSearch = `./default-image.jpg`
let serachPosterUrl = `https://image.tmdb.org/t/p/w500`
function myQuery(querySearch){
  let urlOne = fetch(`https://api.themoviedb.org/3/search/movie?api_key=0a5247d162a6d3455cfaff2ae266f450&query=${querySearch}`)
  .then(res => res.json())
  
  let urlTwo = fetch(`https://api.themoviedb.org/3/search/tv?api_key=0a5247d162a6d3455cfaff2ae266f450&query=${querySearch}`)
  
  let searchFunction = async function(){
   let comboUrl =  await Promise.all([urlOne, urlTwo])
   let movieUrl = comboUrl[0]
   let tvShowUrl = comboUrl[1]
   if(movieUrl.results && movieUrl.results.length > 0){
    let moviedata 
    let movieId =  movieUrl.results[0].id 
   let movieTitle = movieUrl.results[0].original_title
   let movieImg = movieUrl.results[0].poster_path
   let searchMovieImg = serachPosterUrl +  movieImg
   movietvsearchdata.innerHTML += `<a href="movies.html?id=${movieId}">
   <div class="searchsuggest">
   <div class="col-lg-4 mvimgtxt">
   <img class="img-responsive" src="${searchMovieImg}" width="auto" height="auto"/>
   <p>${movieTitle}</p>
   </div>
   </div>
   </a>` 

   if(searchMovieImg === nullImgSearch){
    movietvsearchdata.innerHTML += `<a href="movies.html?id=${movieId}">
   <div class="searchsuggest">
   <div class="col-lg-4">
   <img class="img-responsive" src="${defaultImgSearch}" width="auto" height="auto"/>
   </div>
   <div class="col-lg-2">
   <p>${movieTitle}</p>
   </div>
   </div>
   </a>`
   }

   }

  

   if(tvShowUrl.results && tvShowUrl.length > 0 ){
    let tvShowId = tvShowUrl.results[1].id
    let tvshowName = tvShowUrl.results[1].original_name
    let tvShowImg = tvShowUrl.results[1].poster_path
    let searchTvImg = serachPosterUrl + tvShowImg
    movietvsearchdata.innerHTML += `<a href="movies.html?id=${tvShowId}">
    <div class="searchsuggest">
    <div class="col-lg-4 mvimgtxt">
    <img class="img-responsive" src="${searchTvImg}" width="auto" height="auto"/>
    
    <p>${tvshowName}</p>
    </div>
    </div>
    </a>
    ` 
    if(searchTvImg === nullImgSearch){
      movietvsearchdata.innerHTML += `<a href="movies.html?id=${tvShowId}">
     <div class="searchsuggest">
     <div class="col-lg-4 mvimgtxt">
     <img class="img-responsive" src="${defaultImgSearch}" width="auto" height="auto"/>
     <p>${tvshowName}</p>
     </div>
     </div>
     </a>`
     }

   }
   
  }()
}




 function searchCall(){
    let autoComplete = document.querySelector('#autocompletesearch')
    // let movietvsearchdata = document.querySelector('.movietvsearchdata')
      let searchData = autoComplete.value.trim()
    
      if(searchData.length >= 0){
        movietvsearchdata.innerHTML = ``
        movietvsearchdata.style.display = 'block'

        // movietvsearchdata.style.backgroundColor = '#dddddd'
        myQuery(searchData)
        
      }
      else if (searchData.length === 0){
        movietvsearchdata.innerHTML = ``
        movietvsearchdata.remove()
        movietvsearchdata.style.display = 'none'

        recentMovies()
      }
    
    }

    let body = document.querySelector('body')
    body.addEventListener('click', function searchCall(){
      movietvsearchdata.innerHTML = ``
      movietvsearchdata.style.display = 'none'

    })