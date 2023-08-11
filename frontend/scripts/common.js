
// Cart functionality
let cartItems = [];
// shared.js
function getCart() {
  const cartJSON = localStorage.getItem('cart');
  return cartJSON ? JSON.parse(cartJSON) : [];
}

function addToCart(item) {
  const cart = getCart();
  cart.push(item);
  localStorage.setItem('cart', JSON.stringify(cart));
}

function clearCart() {
  localStorage.removeItem('cart');
}

function getCartItemCount() {
  const cartJSON = localStorage.getItem('cart');
  let items = cartJSON ? JSON.parse(cartJSON) : [];
  return items ? items.length : 0;
}

//TOAST
 
function showToast(message){
  let toastContainer = $('#toastMessage'),
      toastBody = $('#toastMessage .toast-body');
  toastBody.html(message);

  const toast = new bootstrap.Toast(toastContainer)

  toast.show()
}

function updateCartCount(){
  //load cart
  let cartBadge = $('#cartBadge');
  cartBadge.html(getCartItemCount());
}

function addItemToCart(book) {
  addToCart(book);
  renderCartItems();
  showToast('Book has been added to your cart.');
}

function clearCartItems() {
  clearCart();
  renderCartItems();
}

function renderCartItems() {
  updateCartCount();
}

// getters for data


function get(allBooks, size){
  let books = [];
  for(var i=0;i<size;i++){
    books.push(allBooks[i]);
  }

  return books;
}

function getRating(stars){
  let div = '';
  if(stars)
    return div;

  for(var i=0; i< stars;i++){
    div +='<div class="bi-star-fill"></div>';
  }

  return div;
}