
$(document).ready(function () {
  var allBooks = [];
  
  updateCartCount();

  loadBooks('./data/books.json')
  .then(function(booksData) {
      processBooks(booksData);
      loadBookGrid();
      loadCarousel();
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
      allBooks = books;
  }

  function loadBookGrid(){
    const size = 8;
    let books = get(allBooks, size);
    let bookList = $('#mainBookGrid');
    // Loop through each book in JSON data and create a card for it
    $.each(books, function (index, book) {
      let bookCard = `
        <div class="col mb-5">
          <div class="card h-100">
          <div class="badge bg-danger text-white position-absolute ${book.is_sale ? "" : "d-none"}" style="top: 0.5rem; right: 0.5rem">Sale</div>
          <img class="card-img-top main-product-div" role="button" src="${book.img_src}" alt="${book.title}" data-id="${book.id}" data-url="product-detail.html?id=${book.id}"/>
          <div class="card-body p-4">
            <div class="text-center">
              <h5 class="fw-bolder">${book.title}</h5>
              <h6 class="small text-muted">by ${book.author}</h6>
              <div class="d-flex justify-content-center small text-warning mb-2">
                ${getRating(book.rating_stars)}
              </div>
              <span class="text-muted text-decoration-line-through ${book.old_price > 0 ? "" : "d-none"}"">$${book.old_price}</span>
              $${book.price}
            </div>
          </div>
          <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
              <div class="text-center"><a class="btn btn-outline-dark mt-auto add-to-cart" data-id="${book.id}" href="javascript:;">Add to cart</a></div>
          </div>
          </div>
        </div>
      `;

      bookList.append(bookCard);
      
    });

    $('.main-product-div').click(function () {
      let bookId = $(this).data('id');
      let selectedBook = allBooks.find((book) => book.id === bookId);
      var redirectUrl = $(this).data('url');
      window.location.href = redirectUrl;
    });

    // Handle 'Add to Cart' button clicks
    $('.add-to-cart').click(function (e) {
      let bookId = $(this).data('id');
      let selectedBook = allBooks.find((book) => book.id === bookId);
      addItemToCart(selectedBook);
    });

    // Handle 'Checkout' button click
    $('#checkout-btn').click(function () {
      alert('Thank you for your purchase!');
      clearCartItems();
    });
  }

  function loadCarousel(){
      const size = 5;
      let books = get(allBooks, size);
      let bookList = $('#mainCarousel .carousel-inner');
      // Loop through each book in JSON data and create a card for it
      $.each(books, function (index, book) {
        let bookCard = `
          <div class="carousel-item ${index === 0 ? "active" : ""}" data-bs-interval="5000">
            <img src="${book.img_src}" class="d-block  mx-auto" alt="${book.title}">
            <div class="carousel-caption d-none d-md-block text-dark">
              <h5>${book.title}</h5>
              <p>${book.category}</p>
            </div>
          </div>
        `;
  
        bookList.prepend(bookCard);
    });
  }
});
  