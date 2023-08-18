
$(document).ready(function () {
  var allBooks = [];
  var unfilterdBooks = [];
  var allCategories = [];
  var productFilter = {
    pageSize: 8,
    total: 0,
    totalPageCount: 0,
    page: 1
  };

  loadBooks('./data/books.json')
  .then(function(booksData) {
      unfilterdBooks = booksData;
      processBooks(booksData);
      loadCategories(booksData);
      loadBookGrid();
      renderPagination();
      renderCategories();
  })
  .catch(function(error) {
      console.error("Error loading books:", error);
  });

  function loadCategories(books){
    let categories = [];
    books.forEach(book => {
      categories = categories.concat(book.category);
    });
    //console.log(categories);
    allCategories = [...new Set(categories)];
    //console.log(allCategories);
  }

  function loadBooks(url) {
    return $.ajax({
        url: url,
        dataType: 'json'
    });
  }

  function processBooks(books) {
      allBooks = books;
      productFilter.total = allBooks.length;
      productFilter.totalPageCount = Math.ceil(allBooks.length / productFilter.pageSize);
  }

  function loadBookGrid(){
    let books = get(allBooks, allBooks.length);
    var startIndex = (productFilter.page - 1) * productFilter.pageSize;
    var endIndex = startIndex + productFilter.pageSize;
    
    var pagedBooks = books.slice(startIndex, endIndex);
    let bookList = $('#productsGrid');
    bookList.html('');
    // Loop through each book in JSON data and create a card for it
    $.each(pagedBooks, function (index, book) {
      let bookCard = `
        <div class="col">
        <div class="card h-75">
        <div class="badge bg-danger text-white position-absolute ${book.is_sale ? "" : "d-none"}" style="top: 0.5rem; right: 0.5rem">Sale</div>
        <img class="card-img-top product-div" role="button" src="${book.img_src}" alt="${book.title}" data-id="${book.id}" data-url="product-detail.html?id=${book.id}"/>
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

    $('.product-div').click(function () {
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

    
  }

    function renderCategories(){
      let categoryList= $('#categoryList');
      //categoryList.html('');
      console.log(allCategories);
      $.each(allCategories, function(index, category){
        let item = `<a href="#" class="dropdown-item filter-category" name="${index}">${category}</a>`;
        categoryList.append(item);
      });
      $('#categoryList').on('click', '.filter-category', function(){
        let index = $(this).attr('name');
        console.log(index);
        allBooks = unfilterdBooks;
        let filteredBooks = allBooks.filter(book => book.category.includes(allCategories[index]));
        processBooks(filteredBooks);
        loadBookGrid();
        renderPagination();
      });
    }

    function renderPagination() {
      var paginationHTML = `<li class="page-item ${productFilter.page == 1 ? "disabled" : ""}">
                              <a class="page-link back" href="javascript:;" aria-label="Previous">
                                <span aria-hidden="true">Previous</span>
                              </a>
                            </li>`;
      // const max = 3;
      // for (var i = 1; i <= productFilter.totalPageCount; i++) {
      //     if(i > max)break;
      //     paginationHTML += `<li class="page-item"><a class="page-link" href="javascript:;" data-page="${i}">${i}</a></li>`;
      // }

      paginationHTML += `<li class="page-item ${productFilter.page >= productFilter.totalPageCount ? "disabled" : ""}">
                              <a class="page-link next" href="javascript:;" aria-label="Next">
                              <span aria-hidden="true">Next</span>
                              </a>
                            </li>`;
      let pagination = $('#productPagination');
      pagination.html('');
      pagination.append(paginationHTML);

      

      $('.next').click(function () {
        if(productFilter.page < productFilter.totalPageCount){
          productFilter.page++;
          loadPagedBooks()
        }
      });

      $('.back').click(function () {
        if(productFilter.page > 1){
          productFilter.page--;
          loadPagedBooks()
        }
      });
    }

    function loadPagedBooks(){
      loadBookGrid();
      renderPagination();
    }

    $('.sort-item').click(function(){
      let sortWith = $(this).attr('name');
      switch(sortWith){
        case 'name':
          allBooks = allBooks.sort((a, b) => {
            if (a.title < b.title) {
              return -1;
            }
          });
          break;
        case 'author':
          allBooks = allBooks.sort((a, b) => {
            if (a.author < b.author) {
              return -1;
            }
          });
          break;
        case 'ltoh':
          allBooks = allBooks.sort((a, b) => {
            if (a.price < b.price) {
              return -1;
            }
          });
          break;
        case 'htol':
          allBooks = allBooks.sort((a, b) => {
            if (a.price > b.price) {
              return -1;
            }
          });
          break;
        default:
          console.log("");
      }
      processBooks(allBooks);
      loadBookGrid();
      renderPagination();
    });

    $('#remove_filter').click(function(){
      processBooks(unfilterdBooks);
      loadBookGrid();
      renderPagination();
    })

  });
  