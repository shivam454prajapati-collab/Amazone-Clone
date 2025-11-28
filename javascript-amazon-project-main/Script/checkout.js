import {cart, removeFromCart} from '../data/cart.js';
import { products } from '../data/products.js';
import { formatCurrency } from './utils/money.js';  //named import we have to use curly braces
import { hello} from 'https://unpkg.com/supersimpledev@1.0.1/hello.esm.js';  // this is esm module import from direct internet link we dont need write this in script tag in html file we will use it directly here
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';  // this is esm module import from direct internet link & this is also deafault export we can use it when we only want to export 1 thing.
import { deliveryOptions } from '../data/deliveryOption.js';


hello();
const today=(dayjs());
const deliveryDate= today.add(7,'day');
console.log(deliveryDate.format('dddd,MMMM D'));

let cartSummaryHTML='';

cart.forEach((cartItem) => {

    const productId=cartItem.productId;
    let matchingProducts;
    products.forEach((product) => {
        if(product.id===productId){
            matchingProducts=product;
        }
        
    });

    cartSummaryHTML+= `<div class="cart-item-container js-item-container-${matchingProducts.id}">
            <div class="delivery-date">
              Delivery date: Tuesday, June 21
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${matchingProducts.image}">

              <div class="cart-item-details">
                <div class="product-name">
                 ${matchingProducts.name}
                </div>
                <div class="product-price">
                  $${formatCurrency(matchingProducts.priceCents)}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary">
                    Update
                  </span>
                  <span class="delete-quantity-link link-primary js-remove-link"
                  data-product-id="${matchingProducts.id}">
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
               ${deliveryOptionHTML(matchingProducts,cartItem)}
              </div>
            </div>
          </div> `;

          });

          function deliveryOptionHTML(matchingProducts ,cartItem){

            let html='';

            deliveryOptions.forEach((deliveryOption)=>{

              const today=dayjs();
              const deliveryDate=today.add(deliveryOption.deliveryDays,'day');
              const dateString=deliveryDate.format('dddd, MMMM D');
              const priceString=deliveryDate.priceCents===0 ? 'FREE Shipping' : `$${formatCurrency(deliveryOption.priceCents) } - Shipping`;

              const isChecked= deliveryOption.id===cart.deliveryOptionsId
            html +=   ` <div class="delivery-option">
                  <input type="radio"
                  ${isChecked ? 'checked' : ''}
                    class="delivery-option-input"
                    name="delivery-option-${matchingProducts.id}">
                  <div>
                    <div class="delivery-option-date">
                      ${dateString}
                    </div>
                    <div class="delivery-option-price">
                     ${priceString}
                    </div>
                  </div>
                </div> `
          });
        
        
        return html;
      
      }

          document.querySelector('.js-order-summary').innerHTML=cartSummaryHTML;
document.querySelectorAll('.js-remove-link').forEach((link)=>{
  link.addEventListener( 'click',()=>{

 const productId=link.dataset.productId;
 removeFromCart(productId);

  const container=document.querySelector(`.js-item-container-${productId}`);
  container.remove();
  });


 
});