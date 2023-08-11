
$(document).ready(function () {
  loadItems();

  function loadItems(){
    const cartItems = getCart();
    let lineItems = $('#lineItems');
    let summary = `
      <div class="card mb-3 w-100">
        <div class="row g-0">
          <div class="col-md-12">
            <div class="card-body">
              <h2 class="card-title">Your Shopping Cart</h2>
              <p class="card-text"></p>
              <table class="table">
                <thead>
                  <tr>
                    <th scope="col">Item No.</th>
                    <th scope="col">Image</th>
                    <th scope="col">ISBN</th>
                    <th scope="col">Title</th>
                    <th scope="col">Author</th>
                    <th scope="col">Publisher</th>
                    <th scope="col">Price</th>
                  </tr>
                </thead>
                <tbody class="table-group-divider">
      `;
    let $tr = '';
    let totalPrice = 0;
    $.each(cartItems, function (index, book) {
      $tr += `
          <tr>
            <th scope="row">${index+1}</th>
            <td><img src="${book.img_src}" class="w-50"/></td>
            <td>${book.isbn}</td>
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.publisher}</td>
            <td>$${book.price}</td>
          </tr>
      `;
      totalPrice += book.price;
    });
    let tfoot =`<tfoot>
                  <tr>
                    <th colspan="6" class="text-xl-end">Estimated Total</th>
                    <td>$${totalPrice}</td>
                  </tr>
                  <tr>
                    <th colspan="7" class="text-xl-end">
                    <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                        <div class="text-right">
                          <a class="btn btn-outline-primary mt-auto checkout ${cartItems.length == 0 ? "d-none" : ""}" href="javascript:;" id="btnCheckout">Proceed To Checkout</a>
                        </div>
                    </div>
                    </th>
                  </tr>
                </tfoot>`;
    summary += $tr + '</tbody>';
    summary += tfoot;
    summary += `</table>
            </div>
          </div>
        </div>
      </div>
      `;

      lineItems.prepend(summary);

      // Handle 'Checkout' button click
    $('#btnCheckout').click(function () {
      const confirmDialog = new bootstrap.Modal('#confirmModal', {});
      confirmDialog.show();
    });

    $('#confirmBtn').click(function () {
      clearCartItems();
      alert('Thank you for your purchase!');
      window.location.href="index.html";
    });

    
  }
});
  