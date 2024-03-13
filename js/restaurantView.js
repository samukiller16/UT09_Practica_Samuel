import { newDishValidation, assignationDishesValidation, newCategoryValidation, newRestaurantValidation, modCategoriesValidation} from './validation.js';
import { setCookie } from './util.js';
const EXCECUTE_HANDLER = Symbol('excecuteHandler');

class RestaurantView {
  constructor() {
    this.main = document.getElementsByTagName("main")[0];
    this.categories = document.getElementById("categories");
    this.menu = document.getElementById("navPrinc");
    this.dishes = document.getElementById("dishes");
    this.productWindows = [];
  }

  [EXCECUTE_HANDLER](
    handler,
    handlerArguments,
    scrollElement,
    data,
    url,
    event
  ) {
    handler(...handlerArguments);
    const scroll = document.querySelector(scrollElement);
    if (scroll) scroll.scrollIntoView();
    history.pushState(data, null, url);
    event.preventDefault();
  }

  bindInit(handler) {
    document.getElementById("init").addEventListener("click", (event) => {
      this[EXCECUTE_HANDLER](
        handler,
        [],
        "body",
        { action: "init" },
        "#",
        event
      );
    });
  }

  showCategories(categories) {
    if (this.categories.children.length >= 1)
      this.categories.children[0].remove();
    const container = document.createElement("div");
    container.id = "category-list";
    container.classList.add("row");
    for (const category of categories) {
      container.insertAdjacentHTML(
        "beforeend",
        `<div class="col-lg-3 col-md-6"><a data-category="${category.name}" href="#product-list">
        <div class="cat-list-image"><img alt="${category.name}" src="${category.url}" />
        </div>
        <div class="cat-list-text">
          <h3>${category.name}</h3>
          <div>${category.description}</div>
        </div>
      </a>
    </div>`
      );
    }
    container.insertAdjacentHTML("afterbegin", `<h1>Categorías</h1><br>`);
    this.categories.append(container);
  }

  showCategoriesInMenu(categories) {
    const navCats = document.getElementById("navCats");
    const container = navCats.nextElementSibling;
    container.replaceChildren();
    for (const category of categories) {
      container.insertAdjacentHTML(
        "beforeend",
        `<li><a data-category="${category.name}" class="dropdown-item" href="#product-list">${category.name}</a></li>`
      );
    }
  }

  showDishes(dishes) {
    if (this.dishes.children.length >= 1) this.dishes.children[0].remove();
    //Cogemos los datos del iterador
    const allDishes = [...dishes];
    const randomDishes = [];
    while (randomDishes.length < 3 && allDishes.length > 0) {
      const randomIndex = Math.floor(Math.random() * (allDishes.length - 1));
      randomDishes.push(allDishes[randomIndex]);
      // Eliminar el plato seleccionado para evitar duplicados
      allDishes.splice(randomIndex, 1);
    }

    this.dishes.replaceChildren();
    if (this.dishes.children.length > 1) this.dishes.children[1].remove();
    const container = document.createElement("div");
    container.id = "rand-list";
    container.classList.add("container");
    container.classList.add("my-3");
    container.insertAdjacentHTML("beforeend", '<div class="row"> </div>');

    for (const product of randomDishes) {
      const div = document.createElement("div");
      div.classList.add("col-md-4");
      div.insertAdjacentHTML(
        "beforeend",
        `<figure class="card card-product-grid card-lg"> <a data-serial="${product.dish.name}" href="#single-product" class="img-wrap"><img class="${product.dish.constructor.name}-style" src="${product.dish.image}"></a>
					<figcaption class="info-wrap">
						<div class="row">
							<div class="col-md-12"> <a data-serial="${product.dish.name}" href="#single-product" class="title">${product.dish.name}</a> </div>
						</div>
					</figcaption>
				</figure>`
      );
      container.children[0].append(div);
    }
    container.insertAdjacentHTML(
      "afterbegin",
      `<h1>Platos aleatorios</h1><br>`
    );
    this.dishes.append(container);
  }

  listProducts(products, title) {
    this.categories.replaceChildren();
    if (this.categories.children.length > 1)
      this.categories.children[1].remove();
    const container = document.createElement("div");
    container.id = "product-list";
    container.classList.add("container");
    container.classList.add("my-3");
    container.insertAdjacentHTML("beforeend", '<div class="row"> </div>');

    for (const product of products) {
      const div = document.createElement("div");
      div.classList.add("col-md-4");
      div.insertAdjacentHTML(
        "beforeend",
        `<figure class="card card-product-grid card-lg"> <a data-serial="${product.dish.name}" href="#single-product" class="img-wrap"><img class="${product.dish.constructor.name}-style" src="${product.dish.image}"></a>
					<figcaption class="info-wrap">
						<div class="row">
							<div class="col-md-12"> <a data-serial="${product.dish.name}" href="#single-product" class="title">${product.dish.name}</a> </div>
							
						</div>
					</figcaption>
				</figure>`
      );
      container.children[0].append(div);
    }
    container.insertAdjacentHTML("afterbegin", `<h1>${title}</h1><br>`);
    this.categories.append(container);
  }

  listProductsMenu(products, title) {
    this.categories.replaceChildren();
    if (this.categories.children.length > 1)
      this.categories.children[1].remove();
    const container = document.createElement("div");
    container.id = "product-list";
    container.classList.add("container");
    container.classList.add("my-3");
    container.insertAdjacentHTML("beforeend", '<div class="row"> </div>');

    for (const product of products) {
      const div = document.createElement("div");
      div.classList.add("col-md-4");
      div.insertAdjacentHTML(
        "beforeend",
        `<figure class="card card-product-grid card-lg"> <a data-serial="${product.name}" href="#single-product" class="img-wrap"><img class="${product.constructor.name}-style" src="${product.image}"></a>
					<figcaption class="info-wrap">
						<div class="row">
							<div class="col-md-8"> <a data-serial="${product.name}" href="#single-product" class="title">${product.name}</a> </div>
							<div class="col-md-4">
								<div class="rating text-right"> <i class="bi bi-star-fill"></i> <i class="bi bi-star-fill"></i> <i class="bi bi-star-fill"></i> </div>
							</div>
						</div>
					</figcaption>
				</figure>`
      );
      container.children[0].append(div);
    }
    container.insertAdjacentHTML("afterbegin", `<h1>${title}</h1><br>`);
    this.categories.append(container);
  }

  bindProductsCategoryList(handler) {
    const categoryList = document.getElementById("category-list");
    const links = categoryList.querySelectorAll("a");
    for (const link of links) {
      link.addEventListener("click", (event) => {
        const { category } = event.currentTarget.dataset;
        this[EXCECUTE_HANDLER](
          handler,
          [category],
          "#product-list",
          { action: "productsCategoryList", category },
          "#category-list",
          event
        );
      });
    }
  }

  bindProductsCategoryListInMenu(handler) {
    const navCats = document.getElementById("navCats");
    const links = navCats.nextElementSibling.querySelectorAll("a");
    for (const link of links) {
      link.addEventListener("click", (event) => {
        const { category } = event.currentTarget.dataset;
        this[EXCECUTE_HANDLER](
          handler,
          [category],
          "#product-list",
          { action: "productsCategoryList", category },
          "#category-list",
          event
        );
      });
    }
  }

  bindProductsAllergenListInMenu(handler) {
    const navAllergens = document.getElementById("navAllergens");
    const links = navAllergens.nextSibling.querySelectorAll("a");
    for (const link of links) {
      link.addEventListener("click", (event) => {
        const { allergen } = event.currentTarget.dataset;
        this[EXCECUTE_HANDLER](
          handler,
          [allergen],
          "#product-list",
          { action: "productsAllergenList", allergen },
          "#category-list",
          event
        );
      });
    }
  }

  bindProductsMenuListInMenu(handler) {
    const navMenus = document.getElementById("navMenus");
    const links = navMenus.nextSibling.querySelectorAll("a");
    for (const link of links) {
      link.addEventListener("click", (event) => {
        const { menu } = event.currentTarget.dataset;
        this[EXCECUTE_HANDLER](
          handler,
          [menu],
          "#product-list",
          { action: "productsMenuList", menu },
          "#category-list",
          event
        );
      });
    }
  }

  bindRestaurantsInMenu(handler) {
    const navRest = document.getElementById("navRestaurants");
    const links = navRest.nextElementSibling.querySelectorAll("a");
    for (const link of links) {
      link.addEventListener("click", (event) => {
        const { restaurant } = event.currentTarget.dataset;
        this[EXCECUTE_HANDLER](
          handler,
          [restaurant],
          "#restaurantes",
          { action: "restaurantsList", restaurant },
          "#restaurantes",
          event
        );
      });
    }
  }

  showProduct(product, message) {
    this.dishes.replaceChildren();
    if (this.dishes.children.length > 1) this.dishes.children[1].remove();
    const container = document.createElement("div");
    container.classList.add("container");
    container.classList.add("mt-5");
    container.classList.add("mb-5");

    if (product) {
      container.id = "single-product";
      container.classList.add(`${product.constructor.name}-style`);
      container.insertAdjacentHTML(
        "beforeend",
        `<div class="row d-flex justify-content-center">
        <div class="col-md-10">
          <div class="card">
            <div class="row align-items-center">
              <div class="col-md-6">
                <div class="images p-3">
                  <div class="text-center p-4"> <img id="main-image" src="${
                    product.image
                  }"/> </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="product p-4">
                  <div class="mt-4 mb-3"> <span class="text-uppercase brand">${
                    product.name
                  }</span>
                    <h5 class="text-uppercase">${product.description}</h5>
                  </div>
                  <div class="sizes mt-5">
                    <h6 class="text-uppercase">Ingredientes</h6>
                  </div>
                  <div class="cart mt-4 align-items-center">${product.stringIngredientes()}</div>
                  <div class="cart mt-4 align-items-center">
										<button id="b-open" data-serial="${
                      product.name
                    }" class="btn btn-primary text-uppercase mr-2 px-4">Abrir en nueva ventana</button>
									</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>`
      );
    } else {
      container.insertAdjacentHTML(
        "beforeend",
        `<div class="row d-flex justify-content-center">
        ${message}
      </div>`
      );
    }
    this.dishes.append(container);
  }

  showProductInNewWindow(product, message) {
    const pos = this.productWindows.length - 1;
    const main = this.productWindows[pos].document.querySelector("main");
    const header =
      this.productWindows[pos].document.querySelector("header nav");
    main.replaceChildren();
    header.replaceChildren();
    let container;
    if (product) {
      this.productWindows[pos].document.title = `${product.name}`;
      header.insertAdjacentHTML(
        "beforeend",
        `<h1 data-serial="${product.name}" class="display-5 mb-5">${product.name}</h1>`
      );
      container = document.createElement("div");
      container.id = "single-product";
      container.classList.add(`${product.constructor.name}-style`);
      container.classList.add("container");
      container.classList.add("mt-5");
      container.classList.add("mb-5");
      container.insertAdjacentHTML(
        "beforeend",
        `<div id="newWinProd" class="row d-flex justify-content-center">
        <div class="col-md-10">
          <div class="card">
            <div class="row align-items-center">
              <div class="col-md-6">
                <div class="images p-3">
                  <div class="text-center p-4"> <img id="main-image" src="${
                    product.image
                  }"/> </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="product p-4">
                  <div class="mt-4 mb-3"> <span class="text-uppercase brand">${
                    product.name
                  }</span>
                    <h5 class="text-uppercase">${product.description}</h5>
                  </div>
                  <div class="sizes mt-5">
                    <h6 class="text-uppercase">Ingredientes</h6>
                  </div>
                  <div class="cart mt-4 align-items-center">${product.stringIngredientes()}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>`
      );
      container.insertAdjacentHTML(
        "beforeend",
        '<button class="btn btn-primary text-uppercase m-2 px-4" onClick="window.close()">Cerrar</button>'
      );
      main.append(container);
    } else {
      container = document.createElement("div");
      container.classList.add("container");
      container.classList.add("mt-5");
      container.classList.add("mb-5");
      container.insertAdjacentHTML(
        "beforeend",
        `<div class="row d-flex justify-content-center">${message}</div>`
      );
    }
    main.append(container);
    this.productWindows[pos].document.body.scrollIntoView();
  }

  bindShowProduct(handler) {
    const productList = document.getElementById("product-list");
    const links = productList.querySelectorAll("a.img-wrap");
    for (const link of links) {
      link.addEventListener("click", (event) => {
        const { serial } = event.currentTarget.dataset;
        this[EXCECUTE_HANDLER](
          handler,
          [serial],
          "#single-product",
          { action: "showProduct", serial },
          "#single-product",
          event
        );
      });
    }
    const images = productList.querySelectorAll("figcaption a");
    for (const image of images) {
      image.addEventListener("click", (event) => {
        const { serial } = event.currentTarget.dataset;
        this[EXCECUTE_HANDLER](
          handler,
          [serial],
          "#single-product",
          { action: "showProduct", serial },
          "#single-product",
          event
        );
      });
    }
  }

  bindShowRandProduct(handler) {
    const productList = document.getElementById("rand-list");
    const links = productList.querySelectorAll("a.img-wrap");
    for (const link of links) {
      link.addEventListener("click", (event) => {
        const { serial } = event.currentTarget.dataset;
        this[EXCECUTE_HANDLER](
          handler,
          [serial],
          "#single-product",
          { action: "showRandProduct", serial },
          "#single-product",
          event
        );
      });
    }
    const images = productList.querySelectorAll("figcaption a");
    for (const image of images) {
      image.addEventListener("click", (event) => {
        const { serial } = event.currentTarget.dataset;
        this[EXCECUTE_HANDLER](
          handler,
          [serial],
          "#single-product",
          { action: "showRandProduct", serial },
          "#single-product",
          event
        );
      });
    }
  }

  bindShowProductInNewWindow(handler) {
    const pos = this.productWindows.length;
    const bOpen = document.getElementById("b-open");
    bOpen.addEventListener("click", (event) => {
      const newWindow = window.open(
        "product.html",
        "ProductWindow" + pos,
        "width=800, height=600, top=250, left=250, titlebar=yes, toolbar=no, menubar=no, location=no"
      );

      this.productWindows.push(newWindow);
      newWindow.addEventListener("DOMContentLoaded", () => {
        handler(event.target.dataset.serial);
      });
    });
  }

  closeWindows() {
    const bClose = document.getElementById("winCloser");
    bClose.addEventListener("click", (event) => {
      for (let i = 0; i < this.productWindows.length; i++) {
        this.productWindows[i].close();
      }
      this.productWindows = [];
    });
  }

  showAllergensInMenu(allergens) {
    const li = document.createElement("li");
    li.classList.add("nav-item");
    li.classList.add("dropdown");
    li.insertAdjacentHTML(
      "beforeend",
      `<a class="nav-link dropdown-toggle" href="#" id="navAllergens" role="button"
			data-bs-toggle="dropdown" aria-expanded="false">Alérgenos</a>`
    );
    const container = document.createElement("ul");
    container.classList.add("dropdown-menu");

    for (const allergen of allergens) {
      container.insertAdjacentHTML(
        "beforeend",
        `<li><a data-allergen="${allergen.name}" class="dropdown-item" href="#product-list">${allergen.name}</a></li>`
      );
    }
    li.append(container);
    this.menu.append(li);
  }

  showMenusInMenu(menus) {
    const li = document.createElement("li");
    li.classList.add("nav-item");
    li.classList.add("dropdown");
    li.insertAdjacentHTML(
      "beforeend",
      `<a class="nav-link dropdown-toggle" href="#" id="navMenus" role="button"
			data-bs-toggle="dropdown" aria-expanded="false">Menús</a>`
    );
    const container = document.createElement("ul");
    container.classList.add("dropdown-menu");
    for (const menu of menus) {
      container.insertAdjacentHTML(
        "beforeend",
        `<li><a data-menu="${menu.menu.name}" class="dropdown-item" href="#product-list">${menu.menu.name}</a></li>`
      );
    }
    li.append(container);
    this.menu.append(li);
  }

  showRestaurantsInMenu(restaurants) {
    const navRestaurants = document.getElementById("navRestaurants");
    const container = navRestaurants.nextElementSibling;
    container.replaceChildren();
    for (const restaurant of restaurants) {
      container.insertAdjacentHTML(
        "beforeend",
        `<li><a data-restaurant="${restaurant.name}" class="dropdown-item" href="#product-list">${restaurant.name}</a></li>`
      );
    }
  }

  createWinCloser() {
    const li = document.createElement("li");
    li.classList.add("nav-item");
    li.classList.add("winCloser");
    li.insertAdjacentHTML(
      "beforeend",
      `<a class="nav-link href="#" id="winCloser">Cerrar Ventanas</a>`
    );
    this.menu.append(li);
  }

  showRestaurant(rest, title) {
    this.categories.replaceChildren();
    if (this.categories.children.length > 1)
      this.categories.children[1].remove();
    const container = document.createElement("div");
    container.id = "restaurantes";
    container.classList.add("container");
    container.classList.add("my-3");
    container.insertAdjacentHTML("beforeend", '<div class="row"> </div>');

    const div = document.createElement("div");
    div.classList.add("col-md-4");
    div.insertAdjacentHTML(
      "beforeend",
      `<div class="col-lg-3 col-md-6"><a data-restaurant="${
        rest.name
      }" href="#product-list">
      
      <div class="cat-list-text rest-info">
        <h3>Nombre - ${rest.name}</h3>
        <div>Descripción - ${rest.description}</div>
        <div>Localización - ${rest.location.toString()}</div>

      </div>
    </a>
  </div>`
    );
    container.children[0].append(div);

    container.insertAdjacentHTML("afterbegin", `<h1>${title}</h1><br>`);
    this.categories.append(container);
  }

  showAdminMenu() {
    const menuOption = document.createElement("li");
    menuOption.classList.add("nav-item");
    menuOption.classList.add("dropdown");
    menuOption.insertAdjacentHTML(
      "afterbegin",
      '<a class="nav-link dropdown-toggle" href="#" id="navServices" role="button" data-bs-toggle="dropdown" aria-expanded="false">	Adminitración</a>'
    );
    const suboptions = document.createElement("ul");
    suboptions.classList.add("dropdown-menu");
    suboptions.insertAdjacentHTML(
      "beforeend",
      '<li><a id="lnewDish" class="dropdown-item" href="#new-dish">Crear Plato</a></li>'
    );
    suboptions.insertAdjacentHTML(
      "beforeend",
      '<li><a id="ldelDish" class="dropdown-item" href="#del-dish">Eliminar Plato</a></li>'
    );
    suboptions.insertAdjacentHTML(
      "beforeend",
      '<li><a id="lassignsDishes" class="dropdown-item" href="#assigns-dishes">Asignar/Desasignar platos</a></li>'
    );
    suboptions.insertAdjacentHTML(
      "beforeend",
      '<li><a id="lnewCategory" class="dropdown-item" href="#new-category">Crear categoría</a></li>'
    );
    suboptions.insertAdjacentHTML(
      "beforeend",
      '<li><a id="ldelCategory" class="dropdown-item" href="#del-category">Eliminar categoría</a></li>'
    );
    suboptions.insertAdjacentHTML(
      "beforeend",
      '<li><a id="lnewRestaurant" class="dropdown-item" href="#new-restaurant">Crear Restaurante</a></li>'
    );
    suboptions.insertAdjacentHTML(
      "beforeend",
      '<li><a id="lmodCategories" class="dropdown-item" href="#mod-categories">Modificar Categorías</a></li>'
    );
    suboptions.insertAdjacentHTML(
      "beforeend",
      '<li><a id="lnewBackup" class="dropdown-item" href="#new-backup">Crear Backup</a></li>'
    );
    menuOption.append(suboptions);
    this.menu.append(menuOption);
  }

  bindAdminMenu(
    hNewDish,
    hRemoveDish,
    hAssignsDishes,
    hNewCategory,
    hRemoveCategory,
    hNewRestaurant,
    hModCategories,
    hNewBackup
  ) {
    const newDishLink = document.getElementById("lnewDish");
    newDishLink.addEventListener("click", (event) => {
      this[EXCECUTE_HANDLER](
        hNewDish,
        [],
        "#new-dish",
        { action: "newDish" },
        "#",
        event
      );
    });
    const delDishLink = document.getElementById("ldelDish");
    delDishLink.addEventListener("click", (event) => {
      this[EXCECUTE_HANDLER](
        hRemoveDish,
        [],
        "#remove-dish",
        { action: "removeDish" },
        "#",
        event
      );
    });

    const assignsDisehsLink = document.getElementById("lassignsDishes");
    assignsDisehsLink.addEventListener("click", (event) => {
      this[EXCECUTE_HANDLER](
        hAssignsDishes,
        [],
        "#assigns-dishes",
        { action: "assignsDishes" },
        "#",
        event
      );
    });

    const newCategoryLink = document.getElementById("lnewCategory");
    newCategoryLink.addEventListener("click", (event) => {
      this[EXCECUTE_HANDLER](
        hNewCategory,
        [],
        "#new-category",
        { action: "newCategory" },
        "#",
        event
      );
    });

    const delCategoryLink = document.getElementById("ldelCategory");
    delCategoryLink.addEventListener("click", (event) => {
      this[EXCECUTE_HANDLER](
        hRemoveCategory,
        [],
        "#remove-category",
        { action: "removeCategory" },
        "#",
        event
      );
    });

    const newRestaurantLink = document.getElementById("lnewRestaurant");
    newRestaurantLink.addEventListener("click", (event) => {
      this[EXCECUTE_HANDLER](
        hNewRestaurant,
        [],
        "#new-restaurant",
        { action: "newRestaurant" },
        "#",
        event
      );
    });

    const modCategories = document.getElementById("lmodCategories");
    modCategories.addEventListener("click", (event) => {
      this[EXCECUTE_HANDLER](
        hModCategories,
        [],
        "#mod-categories",
        { action: "modCategories" },
        "#",
        event
      );
    });

    const newBackupLink = document.getElementById("lnewBackup");
    newBackupLink.addEventListener("click", (event) => {
      this[EXCECUTE_HANDLER](
        hNewBackup,
        [],
        "#new-backup",
        { action: "newBackup" },
        "#",
        event
      );
    });
  }

  bindNewDishForm(handler) {
    newDishValidation(handler);
  }

  showNewDishForm(categories, allergens) {
    this.dishes.replaceChildren();
    if (this.dishes.children.length >= 1) this.dishes.children[0].remove();

    const container = document.createElement("div");
    container.classList.add("container");
    container.classList.add("my-3");
    container.id = "new-dish";

    const form = document.createElement("form");
    form.name = "fNewDish";
    form.setAttribute("role", "form");
    form.setAttribute("novalidate", "");
    form.classList.add("row");
    form.classList.add("g-3");

    container.insertAdjacentHTML(
      "afterbegin",
      '<h1 class="display-5">Nuevo plato</h1>'
    );
    form.insertAdjacentHTML(
      "beforeend",
      `
			<div class="col-md-6 mb-3">
				<label class="form-label" for="ndTitle">Nombre *</label>
				<div class="input-group">
					<span class="input-group-text"><i class="bi bi-type"></i></span>
					<input type="text" class="form-control" id="ndTitle" name="ndTitle"
						placeholder="Nombre del plato " value="" required>
					<div class="invalid-feedback">El nombre es obligatorio.</div>
					<div class="valid-feedback">Correcto.</div>
				</div>
			</div>
			<div class="col-md-6 mb-3">
				<label class="form-label" for="ndUrl">URL de la imagen *</label>
				<div class="input-group">
					<span class="input-group-text"><i class="bi bi-file-image"></i></span>
					<input type="url" class="form-control" id="ndUrl" name="ndUrl" placeholder="URL de la imagen"
						value="" required>
					<div class="invalid-feedback">La URL no es válida.</div>
					<div class="valid-feedback">Correcto.</div>
				</div>
			</div>
      <div class="col-md-6 mb-3">
				<label class="form-label" for="ndIngredients">Ingredientes</label>
				<div class="input-group">
					<span class="input-group-text"><i class="bi bi-body-text"></i></span>
					<input type="text" class="form-control" id="ndIngredients" name="ndIngredients" placeholder="Lechuga, bacon" value="" required>
					<div class="invalid-feedback"></div>
					<div class="valid-feedback">Correcto.</div>
				</div>
			</div>
			<div class="col-md-6 mb-3">
				<label class="form-label" for="ndDescription">Descripción</label>
				<div class="input-group">
					<span class="input-group-text"><i class="bi bi-body-text"></i></span>
					<input type="text" class="form-control" id="ndDescription" name="ndDescription" value="">
					<div class="invalid-feedback"></div>
					<div class="valid-feedback">Correcto.</div>
				</div>
			</div>
      
      <div class="col-md-6 mb-3">
				<label class="form-label" for="ndCategories">Categoría</label>
				<div class="input-group">
					<span class="input-group-text"><i class="bi bi-body-text"></i></span>
					<select class="form-select" name="ndCategories" id="ndCategories" required>
            <option value = "" selected disabled></option>
					</select>
					<div class="invalid-feedback">El producto debe pertenecer al menos a una categoría.</div>
					<div class="valid-feedback">Correcto.</div>
				</div>
			</div>
      `
    );
    const ndCategories = form.querySelector("#ndCategories");
    for (const category of categories) {
      ndCategories.insertAdjacentHTML(
        "beforeend",
        `<option value="${category.name}">${category.name}</option>`
      );
    }
    form.insertAdjacentHTML(
      "beforeend",
      `
      <div class="col-md-6 mb-3">
				<label class="form-label" for="ndAllergens">Alérgenos</label>
			  <div class="input-group">
					<span class="input-group-text"><i class="bi bi-body-text"></i></span>
					<select class="form-select" name="ndAllergens" id="ndAllergens" multiple required>
					</select>
					<div class="invalid-feedback">El producto debe tener algún alérgeno.</div>
					<div class="valid-feedback">Correcto.</div>
				</div>
			</div>
      `
    );
    const ndAllergens = form.querySelector("#ndAllergens");
    for (const allergen of allergens) {
      ndAllergens.insertAdjacentHTML(
        "beforeend",
        `<option value="${allergen.name}">${allergen.name}</option>`
      );
    }
    form.insertAdjacentHTML(
      "beforeend",
      `
			<div class="mb-12">
				<button class="btn btn-primary" type="submit">Enviar</button>
				<button class="btn btn-primary" type="reset">Cancelar</button>
			</div>`
    );
    container.append(form);
    this.dishes.append(container);
  }

  showNewDishModal(done, dish, error) {
    const messageModalContainer = document.getElementById("messageModal");
    const messageModal = new bootstrap.Modal("#messageModal");

    const title = document.getElementById("messageModalTitle");
    title.innerHTML = "Nuevo Plato";
    const body = messageModalContainer.querySelector(".modal-body");
    body.replaceChildren();
    if (done) {
      body.insertAdjacentHTML(
        "afterbegin",
        `<div class="p-3">El plato <strong>${dish.name}</strong> ha sido creado correctamente.</div>`
      );
    } else {
      body.insertAdjacentHTML(
        "afterbegin",
        `<div class="error text-danger p-3"><i class="bi bi-exclamation-triangle"></i> El plato <strong>${dish.name}</strong> ya está creado.</div>`
      );
    }
    messageModal.show();
    const listener = (event) => {
      if (done) {
        document.fNewDish.reset();
      }
      document.fNewDish.ndTitle.focus();
    };
    messageModalContainer.addEventListener("hidden.bs.modal", listener, {
      once: true,
    });
  }

  showRemoveDishForm(categories) {
    this.dishes.replaceChildren();
    if (this.dishes.children.length >= 1) this.dishes.children[0].remove();

    const container = document.createElement("div");
    container.classList.add("container");
    container.classList.add("my-3");
    container.id = "remove-dish";

    container.insertAdjacentHTML(
      "afterbegin",
      '<h1 class="display-5">Eliminar un plato</h1>'
    );

    const form = document.createElement("form");
    form.name = "fRemoveDish";
    form.setAttribute("role", "form");
    form.setAttribute("novalidate", "");
    form.classList.add("row");
    form.classList.add("g-3");

    form.insertAdjacentHTML(
      "beforeend",
      `<div class="col-md-12 mb-3">
				<label class="form-label" for="rdCategories">Categorías de platos</label>
				<div class="input-group">
					<label class="input-group-text" for="rdCategories"><i class="bi bi-card-checklist"></i></label>
					<select class="form-select" name="rdCategories" id="rdCategories">
						<option disabled selected>Selecciona una categoría</option>
					</select>
				</div>
			</div>`
    );
    const rdCategories = form.querySelector("#rdCategories");
    for (const category of categories) {
      rdCategories.insertAdjacentHTML(
        "beforeend",
        `<option value="${category.name}">${category.name}</option>`
      );
    }

    container.append(form);
    container.insertAdjacentHTML(
      "beforeend",
      '<div id="product-list" class="container my-3"><div class="row"></div></div>'
    );

    this.dishes.append(container);
  }

  showRemoveDishModal(done, product, error) {
    const productList = document.getElementById("product-list");
    const messageModalContainer = document.getElementById("messageModal");
    const messageModal = new bootstrap.Modal("#messageModal");

    const title = document.getElementById("messageModalTitle");
    title.innerHTML = "Plato eliminado";
    const body = messageModalContainer.querySelector(".modal-body");
    body.replaceChildren();
    if (done) {
      body.insertAdjacentHTML(
        "afterbegin",
        `<div class="p-3">El producto <strong>${product.name}</strong> ha sido eliminado correctamente.</div>`
      );
    } else {
      body.insertAdjacentHTML(
        "afterbegin",
        '<div class="error text-danger p-3"><i class="bi bi-exclamation-triangle"></i> El producto no existe en el manager.</div>'
      );
    }
    messageModal.show();
    const listener = (event) => {
      if (done) {
        const button = productList.querySelector(
          `a.btn[data-serial="${product.name}"]`
        );
        button.parentElement.parentElement.parentElement.remove();
      }
    };
    messageModalContainer.addEventListener("hidden.bs.modal", listener, {
      once: true,
    });
  }

  bindRemoveDishSelects(hCategories) {
    const rdCategories = document.getElementById("rdCategories");
    rdCategories.addEventListener("change", (event) => {
      this[EXCECUTE_HANDLER](
        hCategories,
        [event.currentTarget.value],
        "#remove-dish",
        { action: "removeDishByCategory", category: event.currentTarget.value },
        "#remove-dish",
        event
      );
    });
  }

  showRemoveDishList(products) {
    const listContainer = document
      .getElementById("product-list")
      .querySelector("div.row");
    listContainer.replaceChildren();

    let exist = false;
    for (const product of products) {
      exist = true;
      listContainer.insertAdjacentHTML(
        "beforeend",
        `<div class="row d-flex justify-content-center">
      <div class="col-md-10">
        <div class="card">
          <div class="row align-items-center">
            <div class="col-md-6">
              <div class="images p-3">
                <div class="text-center p-4"> <img id="main-image" src="${
                  product.dish.image
                }"/> </div>
              </div>
            </div>
            <div class="col-md-6">
              <div class="product p-4">
                <div class="mt-4 mb-3"> <span class="text-uppercase brand">${
                  product.dish.name
                }</span>
                  <h5 class="text-uppercase">${product.dish.description}</h5>
                </div>
                <div class="sizes mt-5">
                  <h6 class="text-uppercase">Ingredientes</h6>
                </div>
                <div class="cart mt-4 align-items-center">${product.dish.stringIngredientes()}</div>
                <div class="cart mt-4 align-items-center">
                  <a href="#" data-serial="${
                    product.dish.name
                  }" class="btn btn-primary float-right"> Eliminar </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>`
      );
    }
    if (!exist) {
      listContainer.insertAdjacentHTML(
        "beforeend",
        '<p class="text-danger"><i class="bi bi-exclamation-triangle"></i> No existen productos para esta categoría.</p>'
      );
    }
  }

  bindRemoveDish(handler) {
    const productList = document.getElementById("product-list");
    const buttons = productList.querySelectorAll("a.btn");
    for (const button of buttons) {
      button.addEventListener("click", function (event) {
        handler(this.dataset.serial);
        event.preventDefault();
      });
    }
  }

  showAssignsDishesForm(menus) {
    this.dishes.replaceChildren();
    if (this.dishes.children.length >= 1) this.dishes.children[0].remove();

    const container = document.createElement("div");
    container.classList.add("container");
    container.classList.add("my-3");
    container.id = "assigns-dishes";

    container.insertAdjacentHTML(
      "afterbegin",
      '<h1 class="display-5">Asignar/Desasignar platos</h1>'
    );

    const form = document.createElement("form");
    form.name = "fAssignsDishes";
    form.setAttribute("role", "form");
    form.setAttribute("novalidate", "");
    form.classList.add("row");
    form.classList.add("g-3");

    form.insertAdjacentHTML(
      "beforeend",
      `
      <div class="col-md-12 mb-3">
				<label class="form-label" for="adMenus">Menús</label>
				<div class="input-group">
					<span class="input-group-text"><i class="bi bi-body-text"></i></span>
					<select class="form-select" name="adMenus" id="adMenus" required>
            <option value = "" selected disabled></option>
					</select>
					<div class="invalid-feedback">Selecciona al menos un menú.</div>
					<div class="valid-feedback">Correcto.</div>
				</div>
			</div>
      `
    );
    const adMenus = form.querySelector("#adMenus");
    for (const menu of menus) {
      adMenus.insertAdjacentHTML(
        "beforeend",
        `<option value="${menu.menu.name}">${menu.menu.name}</option>`
      );
    }

    container.append(form);
    this.dishes.append(container);
  }

  bindAssignationDishes(hAssignsDishes) {
    const adMenus = document.getElementById("adMenus");
    adMenus.addEventListener("change", (event) => {
      this[EXCECUTE_HANDLER](
        hAssignsDishes,
        [event.currentTarget.value],
        "#assigns-dishes",
        { action: "assignationDishes", menu: event.currentTarget.value },
        "#assigns-dishes",
        event
      );
    });
  }

  showAssignsDishesSelects(productsInMenu, productsOutsideMenu) {
    const form = document.getElementsByName("fAssignsDishes")[0];

    form.insertAdjacentHTML(
      "beforeend",
      `<div class="row d-flex justify-content-center">
      <div class="col-md-6 mb-3">
				<label class="form-label" for="adDeasDishes">Platos a desasignar</label>
			  <div class="input-group">
					<span class="input-group-text"><i class="bi bi-body-text"></i></span>
					<select class="form-select" name="adDeasDishes" id="adDeasDishes" multiple>
					</select>
					<div class="invalid-feedback">Elija platos a asignar o desasignar.</div>
					<div class="valid-feedback">Correcto.</div>
				</div>
			</div>
    `
    );
    const adDishes = form.querySelector("#adDeasDishes");
    for (const dish of productsInMenu) {
      adDishes.insertAdjacentHTML(
        "beforeend",
        `<option value="${dish.name}">${dish.name}</option>`
      );
    }

    form.insertAdjacentHTML(
      "beforeend",
      `<div class="row d-flex justify-content-center">
      <div class="col-md-6 mb-3">
				<label class="form-label" for="adAssDishes">Platos a asignar</label>
			  <div class="input-group">
					<span class="input-group-text"><i class="bi bi-body-text"></i></span>
					<select class="form-select" name="adAssDishes" id="adAssDishes" multiple>
					</select>
					<div class="invalid-feedback">Elija platos a asignar o desasignar.</div>
					<div class="valid-feedback">Correcto.</div>
				</div>
			</div>
    `
    );
    const adDeasDishes = form.querySelector("#adAssDishes");
    for (const dish of productsOutsideMenu) {
      adDeasDishes.insertAdjacentHTML(
        "beforeend",
        `<option value="${dish.name}">${dish.name}</option>`
      );
    }

    form.insertAdjacentHTML(
      "beforeend",
      `<div class="row d-flex justify-content-center">
      <div class="col-md-6 mb-3">
				<label class="form-label" for="adDish1">Platos a cambiar de posición</label>
			  <div class="input-group">
					<span class="input-group-text"><i class="bi bi-body-text"></i></span>
					<select class="form-select" name="adDish1" id="adDish1">
					</select>
					<div class="invalid-feedback">Elija platos distintos a cambiar.</div>
					<div class="valid-feedback">Correcto.</div>
				</div>
			</div>
    `
    );
    const adDish1 = form.querySelector("#adDish1");
    for (const dish of productsInMenu) {
      adDish1.insertAdjacentHTML(
        "beforeend",
        `<option value="${dish.name}">${dish.name}</option>`
      );
    }
    form.insertAdjacentHTML(
      "beforeend",
      `<div class="row d-flex justify-content-center">
      <div class="col-md-6 mb-3">
				<label class="form-label" for="adDish2">Platos a cambiar de posición</label>
			  <div class="input-group">
					<span class="input-group-text"><i class="bi bi-body-text"></i></span>
					<select class="form-select" name="adDish2" id="adDish2">
					</select>
					<div class="invalid-feedback">Elija platos distintos a cambiar.</div>
					<div class="valid-feedback">Correcto.</div>
				</div>
			</div>
    `
    );
    const adDish2 = form.querySelector("#adDish2");
    for (const dish of productsInMenu) {
      adDish2.insertAdjacentHTML(
        "beforeend",
        `<option value="${dish.name}">${dish.name}</option>`
      );
    }
    form.insertAdjacentHTML(
      "beforeend",
      `
    <div class="mb-12">
      <button class="btn btn-primary" type="submit">Enviar</button>
      <button class="btn btn-primary" type="reset">Cancelar</button>
    </div>`
    );
  }

  bindAssignationDishesForm(handler) {
    assignationDishesValidation(handler);
  }

  showDishesAssignationModal(done, error) {
    const messageModalContainer = document.getElementById("messageModal");
    const messageModal = new bootstrap.Modal("#messageModal");

    const title = document.getElementById("messageModalTitle");
    title.innerHTML = "Asignación y orden de platos completada";
    const body = messageModalContainer.querySelector(".modal-body");
    body.replaceChildren();
    if (done) {
      body.insertAdjacentHTML(
        "afterbegin",
        `<div class="p-3">Asignación y orden de platos ha sido  completada</div>`
      );
    } else {
      body.insertAdjacentHTML(
        "afterbegin",
        `<div class="error text-danger p-3"><i class="bi bi-exclamation-triangle"></i>Ha habido un fallo en la asignación/orden de productos</div>`
      );
    }
    messageModal.show();
    const listener = (event) => {
      if (done) {
        document.fAssignsDishes.reset();
      }
      document.fAssignsDishes.adMenus.focus();
    };
    messageModalContainer.addEventListener("hidden.bs.modal", listener, {
      once: true,
    });
  }

  showNewCategoryForm() {
    this.dishes.replaceChildren();
    if (this.dishes.children.length >= 1) this.categories.children[0].remove();

    const container = document.createElement("div");
    container.classList.add("container");
    container.classList.add("my-3");
    container.id = "new-category";

    container.insertAdjacentHTML(
      "afterbegin",
      '<h1 class="display-5">Nueva categoría</h1>'
    );
    container.insertAdjacentHTML(
      "beforeend",
      `<form name="fNewCategory" role="form" class="row g-3" novalidate>
			<div class="col-md-6 mb-3">
				<label class="form-label" for="ncTitle">Nombre *</label>
				<div class="input-group">
					<span class="input-group-text"><i class="bi bi-type"></i></span>
					<input type="text" class="form-control" id="ncTitle" name="ncTitle"
						placeholder="Título de categoría" value="" required>
					<div class="invalid-feedback">El título es obligatorio.</div>
					<div class="valid-feedback">Correcto.</div>
				</div>
			</div>
			<div class="col-md-6 mb-3">
				<label class="form-label" for="ncUrl">URL de la imagen *</label>
				<div class="input-group">
					<span class="input-group-text"><i class="bi bi-file-image"></i></span>
					<input type="url" class="form-control" id="ncUrl" name="ncUrl" placeholder="URL de la imagen"
						value="" required>
					<div class="invalid-feedback">La URL no es válida.</div>
					<div class="valid-feedback">Correcto.</div>
				</div>
			</div>
			<div class="col-md-12 mb-3">
				<label class="form-label" for="ncDescription">Descripción</label>
				<div class="input-group">
					<span class="input-group-text"><i class="bi bi-body-text"></i></span>
					<input type="text" class="form-control" id="ncDescription" name="ncDescription" value="">
					<div class="invalid-feedback"></div>
					<div class="valid-feedback">Correcto.</div>
				</div>
			</div>
			<div class="mb-12">
				<button class="btn btn-primary" type="submit">Enviar</button>
				<button class="btn btn-primary" type="reset">Cancelar</button>
			</div>
		</form>`
    );
    this.dishes.append(container);
  }

  bindNewCategoryForm(handler) {
    newCategoryValidation(handler);
  }

  showNewCategoryModal(done, cat, error) {
    const messageModalContainer = document.getElementById("messageModal");
    const messageModal = new bootstrap.Modal("#messageModal");

    const title = document.getElementById("messageModalTitle");
    title.innerHTML = "Nueva Categoría";
    const body = messageModalContainer.querySelector(".modal-body");
    body.replaceChildren();
    if (done) {
      body.insertAdjacentHTML(
        "afterbegin",
        `<div class="p-3">La categoría <strong>${cat.name}</strong> ha sido creada correctamente.</div>`
      );
    } else {
      body.insertAdjacentHTML(
        "afterbegin",
        `<div class="error text-danger p-3"><i class="bi bi-exclamation-triangle"></i> La categoría <strong>${cat.name}</strong> ya está creada.</div>`
      );
    }
    messageModal.show();
    const listener = (event) => {
      if (done) {
        document.fNewCategory.reset();
      }
      document.fNewCategory.ncTitle.focus();
    };
    messageModalContainer.addEventListener("hidden.bs.modal", listener, {
      once: true,
    });
  }

  showRemoveCategoryForm(categories) {
    this.dishes.replaceChildren();
    if (this.dishes.children.length >= 1) this.dishes.children[0].remove();

    const container = document.createElement("div");
    container.classList.add("container");
    container.classList.add("my-3");
    container.id = "remove-category";
    container.insertAdjacentHTML(
      "afterbegin",
      '<h1 class="display-5">Eliminar una categoría</h1><br>'
    );

    const row = document.createElement("div");
    row.classList.add("row");

    for (const category of categories) {
      row.insertAdjacentHTML(
        "beforeend",
        `<div class="col-lg-3 col-md-6"><a data-category="${category.name}" href="#product-list">
        <div class="cat-list-image"><img alt="${category.name}" src="${category.url}" />
        </div>
        <div class="cat-list-text">
          <h3>${category.name}</h3>
					<div>${category.description}</div>
        </div>
				<div><button class="btn btn-primary" data-category="${category.name}" type='button'>Eliminar</button></div>
      </a>
    </div>`
      );
    }
    container.append(row);
    this.dishes.append(container);
  }

  showRemoveCategoryModal(done, cat, error) {
    const messageModalContainer = document.getElementById("messageModal");
    const messageModal = new bootstrap.Modal("#messageModal");

    const title = document.getElementById("messageModalTitle");
    title.innerHTML = "Borrado de categoría";
    const body = messageModalContainer.querySelector(".modal-body");
    body.replaceChildren();
    if (done) {
      body.insertAdjacentHTML(
        "afterbegin",
        `<div class="p-3">La categoría <strong>${cat.name}</strong> ha sido eliminada correctamente.</div>`
      );
    } else {
      body.insertAdjacentHTML(
        "afterbegin",
        `<div class="error text-danger p-3"><i class="bi bi-exclamation-triangle"></i> La categoría <strong>${cat.name}</strong> no se ha podido borrar.</div>`
      );
    }
    messageModal.show();
  }

  bindRemoveCategoryForm(handler) {
    const removeContainer = document.getElementById("remove-category");
    const buttons = removeContainer.getElementsByTagName("button");
    for (const button of buttons) {
      button.addEventListener("click", function (event) {
        handler(this.dataset.category);
      });
    }
  }

  showNewRestaurantForm() {
    this.dishes.replaceChildren();
    if (this.dishes.children.length >= 1) this.categories.children[0].remove();

    const container = document.createElement("div");
    container.classList.add("container");
    container.classList.add("my-3");
    container.id = "new-restaurant";

    container.insertAdjacentHTML(
      "afterbegin",
      '<h1 class="display-5">Nuevo restaurante</h1>'
    );
    container.insertAdjacentHTML(
      "beforeend",
      `<form name="fNewRestaurant" role="form" class="row g-3" novalidate>
			<div class="col-md-6 mb-3">
				<label class="form-label" for="ncTitle">Nombre *</label>
				<div class="input-group">
					<span class="input-group-text"><i class="bi bi-type"></i></span>
					<input type="text" class="form-control" id="ncTitle" name="ncTitle"
						placeholder="Nombre del restaurante" value="" required>
					<div class="invalid-feedback">El título es obligatorio.</div>
					<div class="valid-feedback">Correcto.</div>
				</div>
			</div>
			<div class="col-md-3 mb-3">
				<label class="form-label" for="ncLat">Latitud *</label>
				<div class="input-group">
					<span class="input-group-text"><i class="bi bi-file-image"></i></span>
					<input type="number" class="form-control" id="ncLat" name="ncLat" placeholder="Latitud"
						value="" required>
					<div class="invalid-feedback">La latitud no es válida.</div>
					<div class="valid-feedback">Correcto.</div>
				</div>
			</div>
      <div class="col-md-3 mb-3">
				<label class="form-label" for="ncLong">Longitud *</label>
				<div class="input-group">
					<span class="input-group-text"><i class="bi bi-file-image"></i></span>
					<input type="number" class="form-control" id="ncLong" name="ncLong" placeholder="Longitud"
						value="" required>
					<div class="invalid-feedback">La longitud no es válida.</div>
					<div class="valid-feedback">Correcto.</div>
				</div>
			</div>
			<div class="col-md-12 mb-3">
				<label class="form-label" for="ncDescription">Descripción</label>
				<div class="input-group">
					<span class="input-group-text"><i class="bi bi-body-text"></i></span>
					<input type="text" class="form-control" id="ncDescription" name="ncDescription" value="">
					<div class="invalid-feedback"></div>
					<div class="valid-feedback">Correcto.</div>
				</div>
			</div>
			<div class="mb-12">
				<button class="btn btn-primary" type="submit">Enviar</button>
				<button class="btn btn-primary" type="reset">Cancelar</button>
			</div>
		</form>`
    );
    this.dishes.append(container);
  }

  bindNewRestaurantForm(handler) {
    newRestaurantValidation(handler);
  }

  showNewRestaurantModal(done, rest, error) {
    const messageModalContainer = document.getElementById("messageModal");
    const messageModal = new bootstrap.Modal("#messageModal");

    const title = document.getElementById("messageModalTitle");
    title.innerHTML = "Nuevo Restaurante";
    const body = messageModalContainer.querySelector(".modal-body");
    body.replaceChildren();
    if (done) {
      body.insertAdjacentHTML(
        "afterbegin",
        `<div class="p-3">El restaurante <strong>${rest.name}</strong> ha sido creado correctamente.</div>`
      );
    } else {
      body.insertAdjacentHTML(
        "afterbegin",
        `<div class="error text-danger p-3"><i class="bi bi-exclamation-triangle"></i> El restaurante <strong>${rest.name}</strong> ya está creado.</div>`
      );
    }
    messageModal.show();
    const listener = (event) => {
      if (done) {
        document.fNewRestaurant.reset();
      }
      document.fNewRestaurant.ncTitle.focus();
    };
    messageModalContainer.addEventListener("hidden.bs.modal", listener, {
      once: true,
    });
  }

  showModifyCategoriesForm(dishes) {
    this.dishes.replaceChildren();
    if (this.dishes.children.length >= 1) this.dishes.children[0].remove();

    const container = document.createElement("div");
    container.classList.add("container");
    container.classList.add("my-3");
    container.id = "mod-categories";

    container.insertAdjacentHTML(
      "afterbegin",
      '<h1 class="display-5">Modificar categorías</h1>'
    );

    const form = document.createElement("form");
    form.name = "fModCategories";
    form.setAttribute("role", "form");
    form.setAttribute("novalidate", "");
    form.classList.add("row");
    form.classList.add("g-3");

    form.insertAdjacentHTML(
      "beforeend",
      `
      <div class="col-md-12 mb-3">
				<label class="form-label" for="mcDishes">Platos</label>
				<div class="input-group">
					<span class="input-group-text"><i class="bi bi-body-text"></i></span>
					<select class="form-select" name="mcDishes" id="mcDishes" required>
            <option value = "" selected disabled></option>
					</select>
					<div class="invalid-feedback">Selecciona al menos un plato.</div>
					<div class="valid-feedback">Correcto.</div>
				</div>
			</div>
      `
    );
    const mcDishes = form.querySelector("#mcDishes");
    for (const dish of dishes) {
      mcDishes.insertAdjacentHTML(
        "beforeend",
        `<option value="${dish.dish.name}">${dish.dish.name}</option>`
      );
    }

    container.append(form);
    this.dishes.append(container);
  }

  bindModifyCategories(hModifyCategories) {
    const mcDishes = document.getElementById("mcDishes");
    mcDishes.addEventListener("change", (event) => {
      this[EXCECUTE_HANDLER](
        hModifyCategories,
        [event.currentTarget.value],
        "#mod-categories",
        { action: "categoriesModification", dish: event.currentTarget.value },
        "#mod-categories",
        event
      );
    });
  }

  showModifyCategoriesSelects(categoriesInDish, categoriesOutsideDish) {
    const form = document.getElementsByName("fModCategories")[0];

    form.insertAdjacentHTML(
      "beforeend",
      `<div class="row d-flex justify-content-center">
      <div class="col-md-6 mb-3">
				<label class="form-label" for="mcDeasCat">Categorías a desasignar</label>
			  <div class="input-group">
					<span class="input-group-text"><i class="bi bi-body-text"></i></span>
					<select class="form-select" name="mcDeasCat" id="mcDeasCat" multiple>
					</select>
					<div class="invalid-feedback">Elija categorías a asignar o desasignar.</div>
					<div class="valid-feedback">Correcto.</div>
				</div>
			</div>
    `
    );
    const mcDeasCat = form.querySelector("#mcDeasCat");
    for (const cat of categoriesInDish) {
      mcDeasCat.insertAdjacentHTML(
        "beforeend",
        `<option value="${cat.name}">${cat.name}</option>`
      );
    }

    form.insertAdjacentHTML(
      "beforeend",
      `<div class="row d-flex justify-content-center">
      <div class="col-md-6 mb-3">
				<label class="form-label" for="mcAssCat">Categorías a asignar</label>
			  <div class="input-group">
					<span class="input-group-text"><i class="bi bi-body-text"></i></span>
					<select class="form-select" name="mcAssCat" id="mcAssCat" multiple>
					</select>
					<div class="invalid-feedback">Elija categorías a asignar o desasignar.</div>
					<div class="valid-feedback">Correcto.</div>
				</div>
			</div>
    `
    );
    const mcAssCat = form.querySelector("#mcAssCat");
    for (const cat of categoriesOutsideDish) {
      mcAssCat.insertAdjacentHTML(
        "beforeend",
        `<option value="${cat.name}">${cat.name}</option>`
      );
    }

    form.insertAdjacentHTML(
      "beforeend",
      `
    <div class="mb-12">
      <button class="btn btn-primary" type="submit">Enviar</button>
      <button class="btn btn-primary" type="reset">Cancelar</button>
    </div>`
    );
  }

  bindModifyCategoriesForm(handler) {
    modCategoriesValidation(handler);
  }

  showModifyCategoriesModal(done, error) {
    const messageModalContainer = document.getElementById("messageModal");
    const messageModal = new bootstrap.Modal("#messageModal");

    const title = document.getElementById("messageModalTitle");
    title.innerHTML = "Modificación de categorías";
    const body = messageModalContainer.querySelector(".modal-body");
    body.replaceChildren();
    if (done) {
      body.insertAdjacentHTML(
        "afterbegin",
        `<div class="p-3">Modificación de categorías completada</div>`
      );
    } else {
      body.insertAdjacentHTML(
        "afterbegin",
        `<div class="error text-danger p-3"><i class="bi bi-exclamation-triangle"></i>Ha habido un fallo en la modificación de categorías</div>`
      );
    }
    messageModal.show();
    const listener = (event) => {
      if (done) {
        document.fModCategories.reset();
      }
      document.fModCategories.mcDishes.focus();
    };
    messageModalContainer.addEventListener("hidden.bs.modal", listener, {
      once: true,
    });
  }

  showCookiesMessage() {
    const toast = `<div class="fixed-top p-5 mt-5">
			<div id="cookies-message" class="toast fade show bg-dark text-white w-100 mw-100" role="alert" aria-live="assertive" aria-atomic="true">
				<div class="toast-header">
					<h4 class="me-auto">Aviso de uso de cookies</h4>
					<button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close" id="btnDismissCookie"></button>
				</div>
				<div class="toast-body p-4 d-flex flex-column">
					<p>
						Este sitio web almacenda datos en cookies para activar su funcionalidad, entre las que se encuentra
						datos analíticos y personalización. Para poder utilizar este sitio, estás automáticamente aceptando
						que
						utilizamos cookies.
					</p>
					<div class="ml-auto">
						<button type="button" class="btn btn-outline-light mr-3 deny" id="btnDenyCookie" data-bs-dismiss="toast">
							Denegar
						</button>
						<button type="button" class="btn btn-primary" id="btnAcceptCookie" data-bs-dismiss="toast">
							Aceptar
						</button>
					</div>
				</div>
			</div>
		</div>`;
    document.body.insertAdjacentHTML("afterbegin", toast);

    const cookiesMessage = document.getElementById("cookies-message");
    cookiesMessage.addEventListener("hidden.bs.toast", (event) => {
      event.currentTarget.parentElement.remove();
    });

    const btnAcceptCookie = document.getElementById("btnAcceptCookie");
    btnAcceptCookie.addEventListener("click", (event) => {
      setCookie("accetedCookieMessage", "true", 1);
    });

    const denyCookieFunction = (event) => {
      this.main.replaceChildren();
      this.main.insertAdjacentHTML(
        "afterbegin",
        `<div class="container my-3"><div class="alert alert-warning" role="alert">
					<strong>Para utilizar esta web es necesario aceptar el uso de cookies. Debe recargar la página y aceptar las condicones para seguir navegando. Gracias.</strong>
				</div></div>`
      );
      this.categories.remove();
      this.menu.remove();
    };
    const btnDenyCookie = document.getElementById("btnDenyCookie");
    btnDenyCookie.addEventListener("click", denyCookieFunction);
    const btnDismissCookie = document.getElementById("btnDismissCookie");
    btnDismissCookie.addEventListener("click", denyCookieFunction);
  }

  showIdentificationLink() {
    const userArea = document.getElementById("userArea");
    userArea.replaceChildren();
    userArea.insertAdjacentHTML(
      "afterbegin",
      `<div class="account d-flex flex-column">
			<a id="login" href="#"> Identificate</a>
		</div>`
    );
  }

  bindIdentificationLink(handler) {
    const login = document.getElementById("login");
    login.addEventListener("click", (event) => {
      this[EXCECUTE_HANDLER](
        handler,
        [],
        "main",
        { action: "login" },
        "#",
        event
      );
    });
  }

  showLogin() {
    this.dishes.replaceChildren();
    const login = `<div class="container h-100">
			<div class="d-flex justify-content-center h-100">
				<div class="user_card">
					<div class="d-flex justify-content-center form_container">
					<form name="fLogin" role="form" novalidate>
							<div class="input-group mb-3">
								<div class="input-group-append">
									<span class="input-group-text"><i class="bi bi-person-circle"></i></span>
								</div>
								<input type="text" name="username" class="form-control input_user" value="" placeholder="usuario">
							</div>
							<div class="input-group mb-2">
								<div class="input-group-append">
									<span class="input-group-text"><i class="bi bi-key-fill"></i></span>
								</div>
								<input type="password" name="password" class="form-control input_pass" value="" placeholder="contraseña">
							</div>
							<div class="form-group">
								<div class="custom-control custom-checkbox">
									<input name="remember" type="checkbox" class="custom-control-input" id="customControlInline">
									<label class="custom-control-label" for="customControlInline">Recuerdame</label>
								</div>
							</div>
								<div class="d-flex justify-content-center mt-3 login_container">
									<button class="btn login_btn" type="submit">Acceder</button>
						</div>
						</form>
					</div>
				</div>
			</div>
		</div>`;
    this.dishes.insertAdjacentHTML("afterbegin", login);
  }

  bindLogin(handler) {
    const form = document.forms.fLogin;
    form.addEventListener("submit", (event) => {
      handler(form.username.value, form.password.value, form.remember.checked);
      event.preventDefault();
    });
  }

  showInvalidUserMessage() {
    this.dishes.insertAdjacentHTML(
      "beforeend",
      `<div class="container my-3"><div class="alert alert-warning" role="alert">
		<strong>El usuario y la contraseña no son válidos. Inténtelo nuevamente.</strong>
	</div></div>`
    );
    document.forms.fLogin.reset();
    document.forms.fLogin.username.focus();
  }

  initHistory() {
    history.replaceState({ action: "init" }, null);
  }

  showAuthUserProfile(user) {
    const userArea = document.getElementById("userArea");
    userArea.replaceChildren();
    userArea.insertAdjacentHTML(
      "afterbegin",
      `<div class="account d-flex mx-2 flex-column">
				${user.username} <a id="aCloseSession" href="#">Cerrar sesión</a>
			</div>
			<div class="image">
				<img alt="${user.username}" src="./img/user.png" />
			</div>`
    );
  }

  setUserCookie(user) {
    setCookie("activeUser", user.username, 1);
  }

  deleteUserCookie() {
    setCookie("activeUser", "", 0);
  }

  removeAdminMenu() {
    const adminMenu = document.getElementById("navServices");
    if (adminMenu) adminMenu.parentElement.remove();
  }

  removeDishesMenu() {
    const dishMenu = document.getElementById("favDishes");
    if (dishMenu) dishMenu.parentElement.remove();
  }

  bindCloseSession(handler) {
    document
      .getElementById("aCloseSession")
      .addEventListener("click", (event) => {
        handler();
        event.preventDefault();
      });
  }

  showDishesMenu() {
    const menuOption = document.createElement("li");
    menuOption.classList.add("nav-item");
    menuOption.classList.add("dropdown");
    menuOption.insertAdjacentHTML(
      "afterbegin",
      '<a class="nav-link dropdown-toggle" href="#" id="favDishes" role="button" data-bs-toggle="dropdown" aria-expanded="false">Platos favoritos</a>'
    );
    const suboptions = document.createElement("ul");
    suboptions.classList.add("dropdown-menu");
    suboptions.insertAdjacentHTML(
      "beforeend",
      '<li><a id="lshowDishes" class="dropdown-item" href="#show-dishes">Mostrar Platos</a></li>'
    );
    suboptions.insertAdjacentHTML(
      "beforeend",
      '<li><a id="lfavDishes" class="dropdown-item" href="#fav-dishes">Mostrar platos favoritos</a></li>'
    );
    menuOption.append(suboptions);
    this.menu.append(menuOption);
  }

  bindDishesMenu(hShowDishes, hFavDishes) {
    const showDish = document.getElementById("lshowDishes");
    showDish.addEventListener("click", (event) => {
      this[EXCECUTE_HANDLER](
        hShowDishes,
        [],
        "#show-dishes",
        { action: "showDishes" },
        "#",
        event
      );
    });
    const favDishesLink = document.getElementById("lfavDishes");
    favDishesLink.addEventListener("click", (event) => {
      this[EXCECUTE_HANDLER](
        hFavDishes,
        [],
        "#fav-dishes",
        { action: "favDishes" },
        "#",
        event
      );
    });
  }

  showAllDishes(dishes) {
    //Cogemos los datos del iterador
    const allDishes = [...dishes];

    this.dishes.replaceChildren();
    if (this.dishes.children.length > 1) this.dishes.children[1].remove();
    const container = document.createElement("div");
    container.id = "rand-list";
    container.classList.add("container");
    container.classList.add("my-3");
    container.insertAdjacentHTML("beforeend", '<div class="row"> </div>');

    for (const product of allDishes) {
      const div = document.createElement("div");
      div.classList.add("col-md-4");
      div.insertAdjacentHTML(
        "beforeend",
        `<figure class="card card-product-grid card-lg"> <a data-serial="${product.dish.name}" href="#single-product" class="img-wrap"><img class="${product.dish.constructor.name}-style" src="${product.dish.image}"></a>
					<figcaption class="info-wrap">
						<div class="row">
							<div class="col-md-12"> <a data-serial="${product.dish.name}" href="#single-product" class="title">${product.dish.name}</a> </div>
						</div>
            <div class="cart mt-4 align-items-center">
										<button id="b-fav" data-serial="${product.dish.name}" class="btn btn-primary text-uppercase mr-2 px-4">Añadir a favoritos</button>
						</div>
					</figcaption>
				</figure>`
      );
      container.children[0].append(div);
    }
    container.insertAdjacentHTML("afterbegin", `<h1>Todos los platos</h1><br>`);
    this.dishes.append(container);
  }

  bindShowAllDishes(handler) {
    const btns = document.querySelectorAll('[id="b-fav"]');
    btns.forEach((btn) => {
      btn.addEventListener("click", (event) => {
        const {serial} = event.currentTarget.dataset;
        handler(serial);
      });
    });
  }

  showFavDishModal(done, dishName, error) {
    console.log(dishName);
    const messageModalContainer = document.getElementById("messageModal");
    const messageModal = new bootstrap.Modal("#messageModal");

    const title = document.getElementById("messageModalTitle");
    title.innerHTML = "Plato Favorito";
    const body = messageModalContainer.querySelector(".modal-body");
    body.replaceChildren();
    if (done) {
      body.insertAdjacentHTML(
        "afterbegin",
        `<div class="p-3">El plato <strong>${dishName}</strong> ha sido creado correctamente.</div>`
      );
    } else {
      body.insertAdjacentHTML(
        "afterbegin",
        `<div class="error text-danger p-3"><i class="bi bi-exclamation-triangle"></i> El plato <strong>${dishName}</strong> ya está añadido.</div>`
      );
    }
    messageModal.show();
    messageModalContainer.addEventListener("hidden.bs.modal", {
      once: true,
    });
  }

  showAllDishes(dishes) {
    //Cogemos los datos del iterador
    const allDishes = [...dishes];

    this.dishes.replaceChildren();
    if (this.dishes.children.length > 1) this.dishes.children[1].remove();
    const container = document.createElement("div");
    container.id = "rand-list";
    container.classList.add("container");
    container.classList.add("my-3");
    container.insertAdjacentHTML("beforeend", '<div class="row"> </div>');

    for (const product of allDishes) {
      const div = document.createElement("div");
      div.classList.add("col-md-4");
      div.insertAdjacentHTML(
        "beforeend",
        `<figure class="card card-product-grid card-lg"> <a data-serial="${product.dish.name}" href="#single-product" class="img-wrap"><img class="${product.dish.constructor.name}-style" src="${product.dish.image}"></a>
					<figcaption class="info-wrap">
						<div class="row">
							<div class="col-md-12"> <a data-serial="${product.dish.name}" href="#single-product" class="title">${product.dish.name}</a> </div>
						</div>
            <div class="cart mt-4 align-items-center">
										<button id="b-fav" data-serial="${product.dish.name}" class="btn btn-primary text-uppercase mr-2 px-4">Añadir a favoritos</button>
						</div>
					</figcaption>
				</figure>`
      );
      container.children[0].append(div);
    }
    container.insertAdjacentHTML("afterbegin", `<h1>Todos los platos</h1><br>`);
    this.dishes.append(container);
  }

  showFavDishes(dishes) {
    //Cogemos los datos del iterador
    const allDishes = dishes;

    this.dishes.replaceChildren();
    if (this.dishes.children.length > 1) this.dishes.children[1].remove();
    const container = document.createElement("div");
    container.id = "rand-list";
    container.classList.add("container");
    container.classList.add("my-3");
    container.insertAdjacentHTML("beforeend", '<div class="row"> </div>');

    for (const product of allDishes) {
      const div = document.createElement("div");
      div.classList.add("col-md-4");
      div.insertAdjacentHTML(
        "beforeend",
        `<figure class="card card-product-grid card-lg"> <a data-serial="${product.name}" href="#single-product" class="img-wrap"><img class="${product.constructor.name}-style" src="${product.image}"></a>
					<figcaption class="info-wrap">
						<div class="row">
							<div class="col-md-12"> <a data-serial="${product.name}" href="#single-product" class="title">${product.name}</a> </div>
						</div>
					</figcaption>
				</figure>`
      );
      container.children[0].append(div);
    }
    container.insertAdjacentHTML("afterbegin", `<h1>Todos los platos</h1><br>`);
    this.dishes.append(container);
  }

  getDishes() {
    return localStorage.getItem("dishes");
  }
}

export default RestaurantView;