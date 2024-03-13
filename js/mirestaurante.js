import RestaurantApp from "./restaurantApp.js";

const historyActions = {
  init: () => {
    RestaurantApp.handleInit();
  },
  productsCategoryList: (event) => RestaurantApp.handleProductsCategoryList(event.state.category),
  showRandProduct: (event) => RestaurantApp.handleShowProduct(event.state.serial),
  productsAllergenList: (event) => RestaurantApp.handleProductsAllergenList(event.state.allergen),
  productsMenuList: (event) => RestaurantApp.handleProductsMenuList(event.state.menu),
  restaurantsList: (event) => RestaurantApp.handleRestaurant(event.state.restaurant),
  showProduct: (event) => RestaurantApp.handleShowProduct(event.state.serial),
  newDish: () =>	RestaurantApp.handleNewDishForm(),
  removeDish: () => RestaurantApp.handleRemoveDishForm(),
  removeDishByCategory: (event) => {
		RestaurantApp.handleRemoveDishForm();
		RestaurantApp.handleRemoveDishListByCategory(event.state.category);
	},
  assignsDishes: () => RestaurantApp.handleAssignsDishesForm(),
  assignationDishes: (event) => {
    RestaurantApp.handleAssignsDishes(event.state.menu);
  },
  newCategory: () =>	RestaurantApp.handleNewCategoryForm(),
  removeCategory: () =>	RestaurantApp.handleRemoveCategoryForm(),
  newRestaurant: () =>	RestaurantApp.handleNewRestaurantForm(),
  modCategories: () => RestaurantApp.handleModifyCategoriesForm(),
  categoriesModification: (event) => {
    RestaurantApp.handleModifyCategories(event.state.dish);
  },
  login: () => RestaurantApp.handleLoginForm(),
  showDishes: () =>	RestaurantApp.handleShowDishes(),
  favDishes: () =>	RestaurantApp.handleShowFavDishes(),
};

window.addEventListener("popstate", (event) => {
  if (event.state) {
    historyActions[event.state.action](event);
  }
});

history.replaceState({ action: "init" }, null);
