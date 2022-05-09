class Product {
  // title = 'DEFAULT';
  // imageUrl;
  // description;
  // price;

  constructor(title, image, desc, price) {
    console.log('20');
    this.title = title;
    this.imageUrl = image;
    this.description = desc;
    this.price = price;
    
  }
}

class ElementAttribute {
  constructor(attrName, attrValue) {
    console.log('19');
    this.name = attrName;
    this.value = attrValue;
    
  }
}

class Component {
  constructor(renderHookId, shouldRender = true) {
    console.log('18');
    this.hookId = renderHookId;
    if (shouldRender) {
      this.render();
    }
  }

  render() {}

  createRootElement(tag, cssClasses, attributes) {
    console.log('17');
    const rootElement = document.createElement(tag);
    if (cssClasses) {
      rootElement.className = cssClasses;
    }
    if (attributes && attributes.length > 0) {
      for (const attr of attributes) {
        rootElement.setAttribute(attr.name, attr.value);
      }
    }
    document.getElementById(this.hookId).append(rootElement);
    return rootElement;
    
  }
  
}

class ShoppingCart extends Component {
  items = [];

  set cartItems(value) {
    console.log('16');
    this.items = value;
    this.totalOutput.innerHTML = `<h2>Total: \$${this.totalAmount.toFixed(
      2
    )}</h2>`;
  }

  get totalAmount() {
    console.log('15');
    const sum = this.items.reduce(
      (prevValue, curItem) => prevValue + curItem.price,
      0
    );
    return sum;
    
  }

  constructor(renderHookId) {
    console.log('14');
    super(renderHookId, false);
    this.orderProducts = () => {
      console.log('Ordering...');
      console.log(this.items);
    };
    this.render();
  }

  addProduct(product) {
    console.log('13');
    const updatedItems = [...this.items];
    updatedItems.push(product);
    this.cartItems = updatedItems;
  }

  render() {
    console.log('12');
    const cartEl = this.createRootElement('section', 'cart');
    cartEl.innerHTML = `
      <h2>Total: \$${0}</h2>
      <button>Order Now!</button>
    `;
    const orderButton = cartEl.querySelector('button');
    orderButton.addEventListener('click', this.orderProducts);
    this.totalOutput = cartEl.querySelector('h2');
    
  }
}

class ProductItem extends Component {
  constructor(product, renderHookId) {
    console.log('11');
    super(renderHookId, false);
    this.product = product;
    this.render();
  }

  addToCart() {
    console.log('10');
    App.addProductToCart(this.product);
    
  }

  render() {
    console.log('9');
    const prodEl = this.createRootElement('li', 'product-item');
    prodEl.innerHTML = `
        <div>
          <img src="${this.product.imageUrl}" alt="${this.product.title}" >
          <div class="product-item__content">
            <h2>${this.product.title}</h2>
            <h3>\$${this.product.price}</h3>
            <p>${this.product.description}</p>
            <button>Add to Cart</button>
          </div>
        </div>
      `;
    const addCartButton = prodEl.querySelector('button');
    addCartButton.addEventListener('click', this.addToCart.bind(this));
  }
}

class ProductList extends Component {
  #products = [];

  constructor(renderHookId) {
    console.log('8');
    super(renderHookId, false);
    this.render();
    this.fetchProducts();
  }

  fetchProducts() {
    console.log('7');
    this.#products = [
      new Product(
        'A Pillow',
        'https://cdn.pixabay.com/photo/2017/08/01/16/50/pillow-2566613__480.jpg',
        'A soft pillow!',
        19.99
      ),
      new Product(
        'A Carpet',
        'https://cdn.pixabay.com/photo/2014/04/05/11/40/rhodes-316645__480.jpg',
        'A carpet which you might like - or not.',
        89.99
      ),
      new Product(
        'A Sofa',
        'https://cdn.pixabay.com/photo/2018/01/23/16/22/indoors-3101776__480.jpg',
        'A soft and comfortable Sofa!',
        299.99
      )
    ];
    this.renderProducts();
  }

  renderProducts() {
    console.log('6');
    for (const prod of this.#products) {
      new ProductItem(prod, 'prod-list');
    }
  }

  render() {
    console.log('5');
    this.createRootElement('ul', 'product-list', [
      new ElementAttribute('id', 'prod-list')
    ]);
    if (this.#products && this.#products.length > 0) {
      this.renderProducts();
    }
  }
}

class Shop {
  constructor() {
    console.log('4');
    this.render();
  }

  render() {
    console.log('3');
    this.cart = new ShoppingCart('app');
    const productList = new ProductList('app');
  }
}

class App {
  static cart;

  static init() {
    console.log('1');
    const shop = new Shop();
    this.cart = shop.cart;
    
  }

  static addProductToCart(product) {
    console.log('2');
    this.cart.addProduct(product);
    
  }
}
if (true) {
  console.log('#');
  App.init();
  
}

