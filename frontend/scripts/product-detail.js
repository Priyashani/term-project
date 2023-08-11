
$(document).ready(function () {
  var allBooks = [];
    
  loadBooks('./data/books.json')
  .then(function(booksData) {
      processBooks(booksData);
      loadProductDetail();
  })
  .catch(function(error) {
      console.error("Error loading books:", error);
  });

  function loadBooks(url) {
    return $.ajax({
        url: url,
        dataType: 'json'
    });
  }

  function processBooks(books) {
      console.log("Books loaded in memory:", books);
      allBooks = books;
  }

  function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
  }

  function loadProductDetail(){
    const bookId = getParameterByName('id');
    let selectedBook = allBooks.find((book) => book.id == bookId);
    console.log(selectedBook);

    let productDetail = $('#productDetail');
    let product = `
      <div class="card mb-3 w-100">
        <div class="row g-0">
          <div class="col-md-4">
            <img src="${selectedBook.img_src}" class="img-fluid rounded-start" alt="${selectedBook.title}">
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h2 class="card-title">${selectedBook.title} 
              <div class="badge bg-danger text-white position-absolute ${selectedBook.is_sale ? "" : "d-none"}" style="font-size: .83rem;top: 0.5rem; left: 0.5rem">Sale</div>
              </h2>
              <p class="card-text">${selectedBook.description}</p>
              <p class="card-text"><small class="text-muted">Author: ${selectedBook.author}</small></p>
              <p class="card-text"><small class="text-muted">ISBN: ${selectedBook.isbn}</small></p>
              <p class="card-text"><small class="text-muted">Published: ${selectedBook.date_published}</small></p>
              <p class="card-text"><small class="text-muted">Publisher: ${selectedBook.publisher}</small></p>
              <p class="card-text"><small class="text-muted">Number of pages: ${selectedBook.page_count}</small></p>
              <p class="card-text"><small class="text-muted">Rating: ${selectedBook.rating_stars}</small></p>
              <p class="card-text"><small class="text-muted">Format: ${selectedBook.format}</small></p>
              <p class="card-text"><small class="text-muted">Size: ${selectedBook.size}</small></p>
              <p class="card-text"><small class="text-muted">Categories: ${selectedBook.category}</small></p>
            </div>
          </div>
        </div>
      </div>
      `;

      productDetail.prepend(product);
  }
});
  