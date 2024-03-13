import { Coordinate } from "./restaurant.js";
import { getCookie } from "./util.js";
const MODEL = Symbol("RestaurantModel");
const VIEW = Symbol("RestaurantView");
const AUTH = Symbol("AUTH");
const USER = Symbol("USER");
const DISHES = Symbol('DISHES');

const LOAD_RESTAURANT_OBJECTS = Symbol("Load Restaurant Objects");

class RestaurantController {
  constructor(model, view, auth) {
    this[MODEL] = model;
    this[VIEW] = view;
    this[AUTH] = auth;
    this[USER] = null;
    this[DISHES] = [];

    this.onLoad();
    
  }

  [LOAD_RESTAURANT_OBJECTS](data) {
    const categories = data.categories;
    const allergens = data.allergens;
    const dishes = data.dishes;
    const menus = data.menus;
    const restaurants = data.restaurants;

    for (const category of categories) {
      const cat = this[MODEL].createCategory(category.name, category.description);
      cat.url = category.url;
      this[MODEL].addCategory(cat);
    }

    for (const allergen of allergens) {
      const all = this[MODEL].createAllergen(allergen.name, allergen.description);
      this[MODEL].addAllergen(all);
    }

    for (const dish of dishes) {
      const dishCreated = 
      this[MODEL].createDish(dish.name, dish.description, dish.ingredients, dish.image);
      this[MODEL].addDish(dishCreated);
      const allergens = dish.allergens;

      for (const allName of allergens) {
        const all = this[MODEL].createAllergen(allName);
        this[MODEL].assignAllergenToDish(dishCreated, all);
      }

      const cat = this[MODEL].createCategory(dish.category);
      this[MODEL].assignCategoryToDish(dishCreated, cat);
    }

    for (const menu of menus) {
      const menuCreated = this[MODEL].createMenu(menu.name, menu.description);
      this[MODEL].addMenu(menuCreated);
      const dishes = menu.dishes;
      for (const dishName of dishes) {
        const dish = this[MODEL].createDish(dishName);
        this[MODEL].assignDishToMenu(menuCreated, dish);
      }
    }

    for (const restaurant of restaurants) {
      const loc = new Coordinate(restaurant.location[0], restaurant.location[1]);
      const rest = 
      this[MODEL].createRestaurant(restaurant.name, restaurant.description, loc);
      this[MODEL].addRestaurant(rest);
    }

  }

  onLoad = () => {
    fetch("./data/objects.json", {
      method: "get"
    })
      .then((respose) => respose.json())
      .then((data) => {
        // Llamamos al metodo correspondiente para cargar los datos
        this[LOAD_RESTAURANT_OBJECTS](data);
      })
      .then(() => {
        this.onAddCategory();
        this.onAddAllergen();
        this.onAddMenu();
        this.onAddRestaurant();
        this[VIEW].createWinCloser();

        if (getCookie("accetedCookieMessage") !== "true") {
          this[VIEW].showCookiesMessage();
        }
        const userCookie = getCookie("activeUser");
        if (userCookie) {
          alert("Hola admin");
          const user = this[AUTH].getUser(userCookie);
          if (user) {
            this[USER] = user;
            this.onOpenSession();
          }
        } else {
          this.onCloseSession();
        }

        this.onInit();

        this[VIEW].bindInit(this.handleInit);
      })
      .catch((ex) => {
        console.log(ex);
      });
    
    // No necesitamos carga de objetos para usar el localStorage
    const favDishes = JSON.parse(this[VIEW].getDishes());

    if (favDishes) {
      this[DISHES] = favDishes;
    }
    
  };

  onInit = () => {
    this[VIEW].showCategories(this[MODEL].getterCategories());
    this[VIEW].bindProductsCategoryList(this.handleProductsCategoryList);
    this[VIEW].showDishes(this[MODEL].getterDishes());
    this[VIEW].bindShowRandProduct(this.handleShowProduct);
  };

  handleInit = () => {
    this.onInit();
  };

  onAddCategory = () => {
    this[VIEW].showCategoriesInMenu(this[MODEL].getterCategories());
    this[VIEW].bindProductsCategoryListInMenu(this.handleProductsCategoryList);
  };

  onAddAllergen = () => {
    this[VIEW].showAllergensInMenu(this[MODEL].getterAllergens());
    this[VIEW].bindProductsAllergenListInMenu(this.handleProductsAllergenList);
  };

  onAddMenu = () => {
    this[VIEW].showMenusInMenu(this[MODEL].getterMenus());
    this[VIEW].bindProductsMenuListInMenu(this.handleProductsMenuList);
  };

  onAddRestaurant = () => {
    this[VIEW].showRestaurantsInMenu(this[MODEL].getterRestaurants());
    this[VIEW].bindRestaurantsInMenu(this.handleRestaurant);
  };

  handleProductsCategoryList = (name) => {
    const category = this[MODEL].createCategory(name, "");
    const dishes = this[MODEL].getDishesInCategory(category);
    this[VIEW].listProducts(dishes, category.name);

    this[VIEW].showDishes(this[MODEL].getterDishes());
    this[VIEW].bindShowRandProduct(this.handleShowProduct);

    this[VIEW].bindShowProduct(this.handleShowProduct);
  };

  handleShowProduct = (name) => {
    try {
      const product = this[MODEL].createDish(name, "", "", "");
      this[VIEW].showProduct(product);
      this[VIEW].bindShowProductInNewWindow(this.handleShowProductInNewWindow);
      this[VIEW].closeWindows();
    } catch (error) {
      this[VIEW].showProduct(null, "No existe este producto en la página.");
    }
  };

  handleShowProductInNewWindow = (name) => {
    try {
      const product = this[MODEL].createDish(name, "", "", "");
      this[VIEW].showProductInNewWindow(product);
    } catch (error) {
      this[VIEW].showProductInNewWindow(
        null,
        "No existe este producto en la página."
      );
    }
  };

  handleProductsAllergenList = (name) => {
    const allergen = this[MODEL].createAllergen(name, "");
    this[VIEW].listProducts(
      this[MODEL].getDishesWithAllergen(allergen),
      allergen.name
    );
    this[VIEW].bindShowProduct(this.handleShowProduct);
  };

  handleProductsMenuList = (name) => {
    const menu = this[MODEL].createMenu(name, "");
    this[VIEW].listProductsMenu(
      this[MODEL].getDishesInMenu(menu.name),
      menu.name
    );
    this[VIEW].bindShowProduct(this.handleShowProduct);
  };

  handleRestaurant = (name) => {
    const rest = this[MODEL].createRestaurant(name, "", new Coordinate(1, 1));
    console.log(name);
    console.log(rest);
    this[VIEW].showRestaurant(rest, rest.name);
  };

  handleNewDishForm = () => {
    this[VIEW].showNewDishForm(
      this[MODEL].getterCategories(),
      this[MODEL].getterAllergens()
    );
    this[VIEW].bindNewDishForm(this.handleCreateDish);
  };

  handleRemoveDishForm = () => {
    this[VIEW].showRemoveDishForm(this[MODEL].getterCategories());
    this[VIEW].bindRemoveDishSelects(this.handleRemoveDishListByCategory);
  };

  handleCreateDish = (
    name,
    desc,
    ingredients,
    image,
    categoryName,
    allergens
  ) => {
    const dish = this[MODEL].createDish(name, desc, ingredients, image);
    const category = this[MODEL].createCategory(categoryName, "");

    let done;
    let error;
    try {
      this[MODEL].addDish(dish);
      this[MODEL].assignCategoryToDish(dish, category);

      for (const allergenName of allergens) {
        const allergen = this[MODEL].createAllergen(allergenName, "");
        this[MODEL].assignAllergenToDish(dish, allergen);
      }
      done = true;
    } catch (exception) {
      done = false;
      error = exception;
    }
    this[VIEW].showNewDishModal(done, dish, error);
  };

  handleRemoveDish = (name) => {
    let done;
    let error;
    let product;
    try {
      product = this[MODEL].createDish(name);
      this[MODEL].removeDish(product);
      done = true;
    } catch (exception) {
      done = false;
      error = exception;
    }
    this[VIEW].showRemoveDishModal(done, product, error);
  };

  handleRemoveDishListByCategory = (category) => {
    const cat = this[MODEL].createCategory(category);
    this[VIEW].showRemoveDishList(this[MODEL].getDishesInCategory(cat));
    this[VIEW].bindRemoveDish(this.handleRemoveDish);
    this[VIEW].bindShowProduct(this.handleShowProduct);
  };

  handleAssignsDishesForm = () => {
    this[VIEW].showAssignsDishesForm(this[MODEL].getterMenus());
    this[VIEW].bindAssignationDishes(this.handleAssignsDishes);
    this[VIEW].bindAssignationDishesForm(this.handleAssignAndOrderDishes);
  };

  handleAssignAndOrderDishes = (menu, assDishes, deasDishes, dish1, dish2) => {
    let done;
    let error;
    try {
      const menuObj = this[MODEL].createMenu(menu);
      if (dish1 != dish2) {
        const dishCreated1 = this[MODEL].createDish(dish1);
        const dishCreated2 = this[MODEL].createDish(dish2);
        this[MODEL].changeDishesPositionsInMenu(
          menuObj,
          dishCreated1,
          dishCreated2
        );
      }
      if (assDishes.length >= 1) {
        for (const dish of assDishes) {
          const dishCreated = this[MODEL].createDish(dish);
          this[MODEL].assignDishToMenu(menuObj, dishCreated);
        }
      }
      if (deasDishes.length >= 1) {
        for (const dish of deasDishes) {
          const dishCreated = this[MODEL].createDish(dish);
          this[MODEL].deassignDishToMenu(menuObj, dishCreated);
        }
      }
    } catch (exception) {
      done = false;
      error = exception;
    }

    done = true;

    this[VIEW].showDishesAssignationModal(done, error);
  };

  handleAssignsDishes = (menuName) => {
    const menu = this[MODEL].createMenu(menuName);
    const form = document.getElementsByName("fAssignsDishes")[0];

    for (const input of form.querySelectorAll("div.row")) {
      input.remove();
    }
    for (const space of form.querySelectorAll("div.mb-12")) {
      space.remove();
    }
    for (const button of form.querySelectorAll("button")) {
      button.remove();
    }
    const dishesInMenu = [...this[MODEL].getDishesInMenu(menu.name)];

    const allDishesObj = [...this[MODEL].getterDishes()];
    const allDishes = [];
    for (const dish of allDishesObj) {
      allDishes.push(dish.dish);
    }

    const dishesNotInMenu = allDishes.filter((dish) => {
      return !dishesInMenu.some((menuDish) => menuDish.name === dish.name);
    });
    this[VIEW].showAssignsDishesSelects(dishesInMenu, dishesNotInMenu);
  };

  handleNewCategoryForm = () => {
    this[VIEW].showNewCategoryForm();
    this[VIEW].bindNewCategoryForm(this.handleCreateCategory);
  };

  handleCreateCategory = (name, url, desc) => {
    const cat = this[MODEL].createCategory(name, desc);
    cat.url = url;

    let done;
    let error;
    try {
      this[MODEL].addCategory(cat);
      done = true;
      this.onAddCategory();
    } catch (exception) {
      done = false;
      error = exception;
    }
    this[VIEW].showNewCategoryModal(done, cat, error);
  };

  handleRemoveCategoryForm = () => {
    this[VIEW].showRemoveCategoryForm(this[MODEL].getterCategories());
    this[VIEW].bindRemoveCategoryForm(
      this.handleRemoveCategory,
      this.handleProductsCategoryList
    );
  };

  handleRemoveCategory = (title) => {
    let done;
    let error;
    let cat;
    try {
      cat = this[MODEL].createCategory(title);
      this[MODEL].removeCategory(cat);
      done = true;
      this.onAddCategory();
      this.handleRemoveCategoryForm();
    } catch (exception) {
      done = false;
      error = exception;
    }
    this[VIEW].showRemoveCategoryModal(done, cat, error);
  };

  handleNewRestaurantForm = () => {
    this[VIEW].showNewRestaurantForm();
    this[VIEW].bindNewRestaurantForm(this.handleCreateRestaurant);
  };

  handleCreateRestaurant = (name, desc, lat, long) => {
    const loc = new Coordinate(Number.parseInt(lat), Number.parseInt(long));
    const rest = this[MODEL].createRestaurant(name, desc, loc);

    let done;
    let error;
    try {
      this[MODEL].addRestaurant(rest);
      done = true;
      this.onAddRestaurant();
    } catch (exception) {
      console.log(exception);
      done = false;
      error = exception;
    }
    this[VIEW].showNewRestaurantModal(done, rest, error);
  };

  handleModifyCategoriesForm = () => {
    this[VIEW].showModifyCategoriesForm(this[MODEL].getterDishes());
    this[VIEW].bindModifyCategories(this.handleModifyCategories);
    this[VIEW].bindModifyCategoriesForm(this.handleModificationCategories);
  };

  handleModificationCategories = (dish, assCat, deasCat) => {
    let done;
    let error;
    try {
      const dishObj = this[MODEL].createDish(dish);
      if (assCat.length >= 1) {
        for (const cat of assCat) {
          const catObj = this[MODEL].createCategory(cat);
          this[MODEL].assignCategoryToDish(dishObj, catObj);
        }
      }
      if (deasCat.length >= 1) {
        for (const cat of deasCat) {
          const catObj = this[MODEL].createCategory(cat);
          this[MODEL].deassignCategoryToDish(dishObj, catObj);
        }
      }
    } catch (exception) {
      console.log(exception);

      done = false;
      error = exception;
    }

    done = true;

    this[VIEW].showModifyCategoriesModal(done, error);
  };

  handleModifyCategories = (dishName) => {
    const dish = this[MODEL].createMenu(dishName);
    const form = document.getElementsByName("fModCategories")[0];

    for (const input of form.querySelectorAll("div.row")) {
      input.remove();
    }
    for (const space of form.querySelectorAll("div.mb-12")) {
      space.remove();
    }
    for (const button of form.querySelectorAll("button")) {
      button.remove();
    }
    const categoriesInDish = this[MODEL].getCategoriesOfDish(dish.name);
    console.log(categoriesInDish);

    const allCategories = [...this[MODEL].getterCategories()];

    const categoriesNotInDish = allCategories.filter((cat) => {
      return !categoriesInDish.some((category) => category.name === cat.name);
    });
    this[VIEW].showModifyCategoriesSelects(
      categoriesInDish,
      categoriesNotInDish
    );
  };

  handleLoginForm = () => {
    this[VIEW].showLogin();
    this[VIEW].bindLogin(this.handleLogin);
  };

  handleLogin = (username, password, remember) => {
    if (this[AUTH].validateUser(username, password)) {
      alert("Hola admin");
      this[USER] = this[AUTH].getUser(username);
      this.onOpenSession();
      if (remember) {
        this[VIEW].setUserCookie(this[USER]);
      }
    } else {
      this[VIEW].showInvalidUserMessage();
    }
  };

  onOpenSession() {
    this.onInit();
    this[VIEW].initHistory();
    this[VIEW].showAuthUserProfile(this[USER]);
    this[VIEW].bindCloseSession(this.handleCloseSession);
    this[VIEW].showAdminMenu();
    this[VIEW].bindAdminMenu(
      this.handleNewDishForm,
      this.handleRemoveDishForm,
      this.handleAssignsDishesForm,
      this.handleNewCategoryForm,
      this.handleRemoveCategoryForm,
      this.handleNewRestaurantForm,
      this.handleModifyCategoriesForm,
      this.handleNewBackup
    );
    this[VIEW].showDishesMenu();
    this[VIEW].bindDishesMenu(
      this.handleShowDishes,
      this.handleShowFavDishes,
    );
  }

  handleCloseSession = () => {
    this.onCloseSession();
    this.onInit();
    this[VIEW].initHistory();
  };

  onCloseSession() {
    this[USER] = null;
    this[VIEW].deleteUserCookie();
    this[VIEW].showIdentificationLink();
    this[VIEW].bindIdentificationLink(this.handleLoginForm);
    this[VIEW].removeAdminMenu();
    this[VIEW].removeDishesMenu();
  }

  handleShowDishes = () => {
    const dishes = this[MODEL].getterDishes();
    this[VIEW].showAllDishes(dishes);
    this[VIEW].bindShowAllDishes(this.handleFavDishes);
  }

  handleFavDishes = (dishName) => {
    const index = this[DISHES].findIndex((name) => name === dishName);
    if(index === -1) {
      this[DISHES].push(dishName);
      localStorage.setItem("dishes", JSON.stringify(this[DISHES]));
      this[VIEW].showFavDishModal(true, dishName);
    } else {
      this[VIEW].showFavDishModal(false, dishName);
    }
  }

  handleShowFavDishes = () => {
    const dishes = [];
    for (const dishName of this[DISHES]) {
      const dishCreated = this[MODEL].createDish(dishName);
      dishes.push(dishCreated);
    }
    this[VIEW].showFavDishes(dishes);
  }

  handleNewBackup = () => {
    const objects = {
      categories: [],
      allergens: [],
      dishes: [],
      menus: [],
      restaurants: []
    }
    
    const cats = this[MODEL].getterCategories();
    for (const category of cats) {
      objects.categories.push({
        name: category.name,
        description: category.description,
        url: category.url
      });
    }

    const alls = this[MODEL].getterAllergens();
    for(const allergen of alls){
      objects.allergens.push({
        name: allergen.name,
        description: allergen.description
      })
    }

    const dishes = this[MODEL].getterDishes();
    for (const dishObj of dishes) {
      const cat = dishObj.categories[0].name;
      const dishAlls = dishObj.allergens;
      const allNames = [];
      for (const dishAll of dishAlls) {
        allNames.push(dishAll.name);
      }

      objects.dishes.push({
        name: dishObj.dish.name,
        description: dishObj.dish.description,
        ingredients: dishObj.dish.ingredients,
        image: dishObj.dish.image,
        category: cat,
        allergens: allNames
      });
    }
    
    const menus = this[MODEL].getterMenus();
    for (const menuObj of menus) {
      const menuDishes = menuObj.dishes;
      const dishNames = [];
      for (const dishObj of menuDishes) {
        dishNames.push(dishObj.dish.name);
      }

      objects.menus.push({
        name: menuObj.menu.name,
        description: menuObj.menu.description,
        dishes: dishNames
      });
    }

    const restaurants = this[MODEL].getterRestaurants();
    for (const rest of restaurants) {
      const loc = [];
      loc.push(rest.location.latitude);
      loc.push(rest.location.longitude);

      objects.restaurants.push({
        name: rest.name,
        description: rest.description,
        location: loc
      });
    }

    const fecha = new Date();
    const fileName = `Backup_${fecha}.json`;

    const formData = new FormData();
    formData.append("fileName", fileName);
    formData.append("json", JSON.stringify(objects));
    console.log("sw");
    fetch("./newBackup.php", {
      method: "post",
      body: formData,
    })
      .then((response) => {
        if (response.ok) {
          console.log("Backup fallido");
        } else {
          console.log("Backup correcto");
        }
      })
      .catch((ex) => {
        console.log(ex);
      });

  }
}

export default RestaurantController;
