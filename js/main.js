Vue.component('product-details', {
    props: {
        details: {
            type: Array,
            required: true
        }
    },
    template: `
    <ul>
    <li v-for="detail in details">{{ detail }}</li>
    </ul>
`,
})
Vue.component('product', {
    props: {
        premium: {
            type: Boolean,
            required: true
        }
    },
    template: `
   <div class="product">
	        <div class="product-image">
               <img v-bind:src="image" v-bind:alt="altText" />
            </div>
                <div class="product-info">
                   <h1>{{ title }}</h1>
                   <p>{{ sale }}</p>
                   <p v-if="inStock">In stock</p>
                   <p v-else>Out of Stock</p>
                   <ul>
                        <li v-for="detail in details">{{ detail }}</li>
                   </ul>
                   <p>Shipping : {{ shipping }}</p>
                   <div class="cart">
                      <p>Cart({{ cart }})</p>
                   </div>
                      <div
                              class="color-box"
                              v-for="(variant, index) in variants"
                              :key="variant.variantId"
                              :style="{ backgroundColor:variant.variantColor }"
                              @mouseover="updateProduct(index)"
    
                      ></div>
               <button
                       v-on:click="addToCart"
                       :disabled="!inStock"
                       :class="{ disabledButton: !inStock }">Add to cart
               </button>
            </div>
   </div>
 `,
    data() {
        return {
            brand: 'Vue Mastery',
            product: "Socks",
            description: "A pair of warm, fuzzy socks.",
            altText: "A pair of socks",
            link:"https://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3Daps&field-keywords=socks",
            details: ['80% cotton', '20% polyester', 'Gender-neutral'],
            selectedVariant: 0,
            onSale: true,
            variants: [
                {
                    variantId: 2234,
                    variantColor: 'green',
                    variantImage: "./assets/vmSocks-green-onWhite.jpg",
                    variantQuantity: 10
                },
                {
                    variantId: 2235,
                    variantColor: 'blue',
                    variantImage: "./assets/vmSocks-blue-onWhite.jpg",
                    variantQuantity: 0
                }
            ],

            cart: 0,
        }
    },
    methods: {
        addToCart() {
            this.cart += 1
        },
        updateProduct(index) {
            this.selectedVariant = index;
        }
    },
    computed: {
        title() {
            return this.brand + ' ' + this.product;
        },
        image() {
            return this.variants[this.selectedVariant].variantImage;
        },
        inStock(){
            return this.variants[this.selectedVariant].variantQuantity;
        },
        sale() {
            if (this.onSale === true) {
                return this.brand + ' ' + this.product + ' on sale ';
            }
        },
        shipping() {
            if (this.premium) {
                return "Free";
            } else {
                return 2.99
            }
        }

    }
})


let app = new Vue({
    el: '#app',
    data: {
        premium: true
    }
})

