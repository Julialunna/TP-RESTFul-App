function criaCardLivros(book){
    var parentElement = document.getElementsByClassName('results_books')
    var minhaDiv = $('<div class="book_info"></div>');
    minhaDiv.append(`<h3>${book.name}<h3>`);
    minhaDiv.append(`<p>Author: ${book.authors[0]}</p>`)
    minhaDiv.append(`<p class="info_hidden info">Number of pages: ${book.numberOfPages}</p>`)
    minhaDiv.append(`<p class="info_hidden info">Publisher: ${book.publisher}</p>`)
    minhaDiv.append('<button class="read_more">Read More</button>');
    $(parentElement).append(minhaDiv);
    minhaDiv.find('.read_more').click(function() {
      
      var infos = minhaDiv.find('.info')
      for (i=0; i<infos.length; i++){
        if (infos[i].classList.contains('info_hidden')){
          infos[i].classList.remove('info_hidden');
        }else{
          infos[i].classList.add('info_hidden');
        }
      }
    });
  }
  
  function consultarAPI() {
    
      var apiUrl = 'https://www.anapioficeandfire.com/api/books';
  

      $.ajax({
        url: apiUrl,
        method: 'GET',
        dataType: 'json',
        success: function(data) {
          data.forEach(book => {
            criaCardLivros(book)
          });
        },
        error: function(error) {
          console.error('Erro na consulta à API:', error);
        }
      });
      
    }
    consultarAPI()
  
    function adicionaComportamento(){
      
      var searchInput = document.getElementById('search');
      var searchButton = document.getElementById('button');
      var parentElement = document.getElementsByClassName('results_books')

      searchButton.addEventListener("click",()=>{
        var characters = document.querySelectorAll(".book_info")
        characters.forEach(element => {
          element.remove()
        });
        var apiUrl = `https://www.anapioficeandfire.com/api/books?name=${encodeURIComponent(searchInput.value)}`;
        $.ajax({
          url: apiUrl,
          method: 'GET',
          dataType: 'json',
          success: function(data) {
            if(data[0]==null){
              var minhaDiv = $('<div class="book_info"></div>');
              minhaDiv.append("<p>book not found</p>")
              $(parentElement).append(minhaDiv);
            }else{
              criaCardLivros(data[0]);
            }
          },
          error: function(error) {

            console.error('Erro na consulta à API:', error);
          }
        });
        searchInput.value = ""
      })
    }
    
  $(document).ready(function() {
      adicionaComportamento()
    });