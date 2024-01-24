document.addEventListener('DOMContentLoaded', function () {
    let productToAdd = document.getElementById('agregarProducto')
  
        productToAdd.addEventListener('click', function () {
        const cartId = "65ad98aa813faafe418d2fde"
        const productId = this._id
        const quantity = 1
  
        fetch(`/api/carts/${cartId}`, {
            method: 'PUT',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({ quantity }),
        })
            .then(function (response) {
            return response.json();
            })
            .then(function (carritoActualizado) {
            console.log(carritoActualizado);
            })
            .catch(function (error) {
            console.error('Error en la solicitud fetch:', error);
            });
    })
}) 

function addToCart(productId) {
    const quantity = 1; 

    fetch(`/api/carts/65ad98aa813faafe418d2fde`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ productId, quantity }),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Carrito actualizado:', data);
    })
    .catch(error => {
      console.error('Error al agregar al carrito:', error);
    });
  }