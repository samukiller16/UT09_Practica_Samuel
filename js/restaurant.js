import {
  BaseException,
  InvalidValueException,
  InvalidAccessConstructorException,
  InvalidCategoryException,
  ExistingCategoryException,
  UnregisteredCategoryException,
  InvalidMenuException,
  ExistingMenuException,
  UnregisteredMenuException,
  InvalidAllergenException,
  ExistingAllergenException,
  UnregisteredAllergenException,
  InvalidDishException,
  ExistingDishException,
  UnregisteredDishException,
  InvalidRestaurantException,
  ExistingRestaurantException,
  UnregisteredRestaurantException,
} from "./exceptions.js";

// Objeto Coordinate
class Coordinate {
  #latitude;
  #longitude;

  constructor(latitude, longitude) {
    if (
      !latitude ||
      !longitude ||
      typeof latitude !== "number" ||
      typeof longitude !== "number"
    ) {
      throw new InvalidValueException();
    }
    this.#latitude = latitude;
    this.#longitude = longitude;
  }

  get latitude() {
    return this.#latitude;
  }

  set latitude(newLatitude) {
    this.#latitude = newLatitude;
  }

  get longitude() {
    return this.#longitude;
  }

  set longitude(newLongitude) {
    this.#longitude = newLongitude;
  }

  toString() {
    return `Latitud: ${this.#latitude} | Longitud: ${this.#longitude}`;
  }
}
// RestaurantsManager como singleton, solo se podrá instanciar una vez, si se trata de instanciar más se devolverá la misma instancia
const RestaurantsManager = (function () {
  // Objeto Dish
  class Dish {
    #name = "";
    #description = "";
    #ingredients = [];
    #image = "";

    constructor(name, description, ingredients, image) {
      if (!name || name == "") {
        throw new InvalidValueException();
      }
      this.#name = name;
      this.#description = description;
      this.#ingredients = ingredients;
      this.#image = image;
    }

    get name() {
      return this.#name;
    }

    set name(newName) {
      this.#name = newName;
    }

    get description() {
      return this.#description;
    }

    set description(newDescription) {
      this.#description = newDescription;
    }

    get ingredients() {
      return this.#ingredients;
    }

    set ingredients(newIngredients) {
      this.#ingredients = newIngredients;
    }

    get image() {
      return this.#image;
    }

    set image(newImage) {
      this.#image = newImage;
    }
    //Método para pasar los ingredientes a un string
    stringIngredientes() {
      return this.#ingredients.join(", ");
    }

    toString() {
      return `Nombre: ${this.#name} | Descripción: ${
        this.#description
      } | Ingredientes: ${this.stringIngredientes()} | Imagen: ${this.#image}`;
    }
  }

  // Objeto Category
  class Category {
    #name = "";
    #description = "";

    constructor(name, description) {
      if (!name || name == "") {
        throw new InvalidValueException();
      }
      this.#name = name;
      this.#description = description;
    }

    get name() {
      return this.#name;
    }

    set name(newName) {
      this.#name = newName;
    }

    get description() {
      return this.#description;
    }

    set description(newDescription) {
      this.#description = newDescription;
    }

    toString() {
      return `Nombre de la categoría: ${this.#name} | Descripción: ${
        this.#description
      }`;
    }
  }

  // Objeto Allergen
  class Allergen {
    #name = "";
    #description = "";

    constructor(name, description) {
      if (!name || name == "") {
        throw new InvalidValueException();
      }
      this.#name = name;
      this.#description = description;
    }

    get name() {
      return this.#name;
    }

    set name(newName) {
      this.#name = newName;
    }

    get description() {
      return this.#description;
    }

    set description(newDescription) {
      this.#description = newDescription;
    }

    toString() {
      return `Nombre del alérgeno: ${this.#name} | Descripción: ${
        this.#description
      }`;
    }
  }

  // Objeto Menu
  class Menu {
    #name = "";
    #description = "";

    constructor(name, description) {
      if (!name || name == "") {
        throw new InvalidValueException();
      }
      this.#name = name;
      this.#description = description;
    }

    get name() {
      return this.#name;
    }

    set name(newName) {
      this.#name = newName;
    }

    get description() {
      return this.#description;
    }

    set description(newDescription) {
      this.#description = newDescription;
    }

    toString() {
      return `Nombre del menú: ${this.#name} | Descripción: ${
        this.#description
      }`;
    }
  }

  // Objeto Restaurant
  class Restaurant {
    #name = "";
    #description = "";
    #location = null;

    constructor(name, description, location) {
      this.#name = name;
      this.#description = description;
      this.#location = location;
    }

    get name() {
      return this.#name;
    }

    set name(newName) {
      this.#name = newName;
    }

    get description() {
      return this.#description;
    }

    set description(newDescription) {
      this.#description = newDescription;
    }

    get location() {
      return this.#location;
    }

    set location(newLocation) {
      this.#location = newLocation;
    }

    toString() {
      return `Nombre del restaurante: ${this.#name} | Descripción: ${
        this.#description
      } | Ubicación: ${this.#location.toString()}`;
    }
  }

  let instantiated;
  function init() {
    //Inicialización del Singleton
    class RestaurantsManagerObj {
      #name = "";
      #categories = [];
      #allergens = [];
      #dishes = [];
      #menus = [];
      #restaurants = [];
      // Flyweight, lo usaremos para crear dichos objetos
      #productConstructors = {
        Category,
        Allergen,
        Menu,
      };

      constructor(
        name = "RestManager",
        categories = [],
        allergens = [],
        dishes = [],
        menus = [],
        restaurants = []
      ) {
        //La función se invoca con el operador new
        if (!new.target) throw new InvalidAccessConstructorException();

        this.#name = name;
        this.#categories = categories;
        this.#allergens = allergens;
        this.#dishes = dishes;
        this.#menus = menus;
        this.#restaurants = restaurants;
      }
      //Devuelve un iterador de categorías
      *getterCategories() {
        for (let i = 0; i < this.#categories.length; i++) {
          yield this.#categories[i];
        }
      }
      //Devuelve un iterador de menús
      *getterMenus() {
        for (let i = 0; i < this.#menus.length; i++) {
          yield this.#menus[i];
        }
      }
      //Devuelve un iterador de alérgenos
      *getterAllergens() {
        for (let i = 0; i < this.#allergens.length; i++) {
          yield this.#allergens[i];
        }
      }
      //Devuelve un iterador de restaurantes
      *getterRestaurants() {
        for (let i = 0; i < this.#restaurants.length; i++) {
          yield this.#restaurants[i];
        }
      }
      //Devuelve un iterador de platos, añadido para ver los platos al testear
      *getterDishes() {
        for (let i = 0; i < this.#dishes.length; i++) {
          yield this.#dishes[i];
        }
      }
      //Habrá métodos similares para obtener posición de los objetos
      getPositionCategory(category) {
        return this.#categories.findIndex(
          (existingCategory) => existingCategory.name === category.name
        );
      }

      //Añadimos una categoría al array categories
      addCategory(...categories) {
        for (const category of categories) {
          // Si no es una categoría o es nula, la categoría es inválida
          if (!(category instanceof Category) || category == null) {
            throw new InvalidCategoryException();
          } else if (
            // Si ya existe, lanzamos otra excepción
            this.getPositionCategory(category) != -1
          ) {
            throw new ExistingCategoryException();
          } else {
            this.#categories.push(category);
          }
        }
        return this;
      }
      // Borrar Category
      removeCategory(...categories) {
        for (const category of categories) {
          const index = this.getPositionCategory(category);

          if (index === -1) {
            // La categoría no existe, lanzar una excepción
            throw new UnregisteredCategoryException();
          }

          const dishesToRemove = this.findDishes((dish) =>
            dish.categories.includes(category)
          );

          // Desasignar la categoría a cada plato encontrado
          for (const dishObj of dishesToRemove) {
            this.deassignCategoryToDish(dishObj.dish, category);
          }

          // Eliminar la categoría del array
          this.#categories.splice(index, 1);
        }
        return this;
      }

      // Método para obtener posición
      getPositionMenu(menu) {
        return this.#menus.findIndex(
          (menuObj) => menuObj.menu.name === menu.name
        );
      }

      // Añadimos objeto literal con Menu y array de objetos literales de Dish
      addMenu(...menus) {
        for (const menu of menus) {
          // Si no es un menu o es nulo, el menú es inválido
          if (!(menu instanceof Menu) || menu == null) {
            throw new InvalidMenuException();
          } else if (
            // Si ya existe, lanzamos otra excepción
            this.getPositionMenu(menu) != -1
          ) {
            throw new ExistingMenuException();
          } else {
            this.#menus.push({
              menu,
              dishes: [],
            });
          }
        }
        return this;
      }

      // Borrar objeto literal de Menu
      removeMenu(...menus) {
        for (const menu of menus) {
          const index = this.getPositionMenu(menu);

          if (index === -1) {
            // El menú no existe, lanzar una excepción
            throw new UnregisteredMenuException();
          }

          // Eliminar menú del array
          this.#menus.splice(index, 1);
        }
        return this;
      }

      // Método para obtener posición
      getPositionAllergen(allergen) {
        return this.#allergens.findIndex(
          (existingAllergen) => existingAllergen.name === allergen.name
        );
      }

      // Añadir allergen (objeto sin añadidos)
      addAllergen(...allergens) {
        for (const allergen of allergens) {
          // Si no es un allergen o es nulo, el allergen es inválido
          if (!(allergen instanceof Allergen) || allergen == null) {
            throw new InvalidAllergenException();
          } else if (
            // Si ya existe, lanzamos otra excepción
            this.getPositionAllergen(allergen) != -1
          ) {
            throw new ExistingAllergenException();
          } else {
            this.#allergens.push(allergen);
          }
        }
        return this;
      }

      //Borrar allergen
      removeAllergen(...allergens) {
        for (const allergen of allergens) {
          const index = this.getPositionAllergen(allergen);

          if (index === -1) {
            // El menú no existe, lanzar una excepción
            throw new UnregisteredAllergenException();
          }

          // Desasignar el alérgeno de todos los platos
          const dishesToRemove = this.findDishes((dishObj) =>
            dishObj.allergens.includes(allergen)
          );

          for (const dishObj of dishesToRemove) {
            this.deassignAllergenToDish(dishObj.dish, allergen);
          }

          // Eliminar menú del array
          this.#allergens.splice(index, 1);
        }
        return this;
      }

      // Método para obtener posición
      getPositionDish(dish) {
        return this.#dishes.findIndex(
          (dishObj) => dishObj.dish.name === dish.name
        );
      }

      //Añadimo objeto literal con Dish array de objetos Category y array de Allergen
      addDish(...dishes) {
        for (const dish of dishes) {
          // Si no es un dish o es nulo, el dish es inválido
          if (!(dish instanceof Dish) || dish == null) {
            throw new InvalidDishException();
          } else if (
            // Si ya existe, lanzamos otra excepción
            this.getPositionDish(dish) != -1
          ) {
            throw new ExistingDishException();
          } else {
            this.#dishes.push({ dish, categories: [], allergens: [] });
          }
        }
        return this;
      }

      //Borramos el objeto literal
      removeDish(...dishes) {
        for (const dish of dishes) {
          const index = this.getPositionDish(dish);

          if (index === -1) {
            // El menú no existe, lanzar una excepción
            throw new UnregisteredDishException();
          }

          // Desasignar plato de los menús en los que se encuentre
          for (const menuObj of this.#menus) {
            const indexDish = menuObj.dishes.findIndex(
              (dishObj) => dishObj.dish.name === dish.name
            );

            if (indexDish !== -1) {
              menuObj.dishes.splice(indexDish, 1);
            }
          }

          // Eliminar menú del array
          this.#dishes.splice(index, 1);
        }
        return this;
      }

      //Método para obtener posición
      getPositionRestaurant(restaurant) {
        return this.#restaurants.findIndex(
          (existingRestaurant) => existingRestaurant.name === restaurant.name
        );
      }

      // Añadimos objeto Restaurant
      addRestaurant(...restaurants) {
        for (const rest of restaurants) {
          // Si no es un allergen o es nulo, el allergen es inválido
          if (!(rest instanceof Restaurant) || rest == null) {
            throw new InvalidRestaurantException();
          } else if (
            // Si ya existe, lanzamos otra excepción
            this.getPositionRestaurant(rest) != -1
          ) {
            throw new ExistingRestaurantException();
          } else {
            this.#restaurants.push(rest);
          }
        }
        return this;
      }

      // Borramos objeto Restaurant
      removeRestaurant(...restaurants) {
        for (const rest of restaurants) {
          const index = this.getPositionRestaurant(rest);

          if (index === -1) {
            // El menú no existe, lanzar una excepción
            throw new UnregisteredRestaurantException();
          }

          // Eliminar menú del array
          this.#restaurants.splice(index, 1);
        }
        return this;
      }

      // Asignamos categorías a un plato determinado
      assignCategoryToDish(dish, ...categoriesAdd) {
        if (!(dish instanceof Dish) || dish == null) {
          throw new InvalidDishException();
        }
        let indexDish = this.getPositionDish(dish);

        if (indexDish === -1) {
          // El plato no existe, lo añadimos
          this.addDish(dish);
          indexDish = this.getPositionDish(dish);
        }
        for (const category of categoriesAdd) {
          if (!(category instanceof Category) || category == null) {
            throw new InvalidCategoryException();
          }
          let indexCat = this.getPositionCategory(category);

          if (indexCat === -1) {
            // La categoría no existe, la añadimos
            this.addCategory(category);
          }

          this.#dishes[indexDish].categories.push(category);
        }
        return this;
      }

      // Desasignamos categorías a un plato
      deassignCategoryToDish(dish, ...categoriesAdd) {
        if (!(dish instanceof Dish) || dish == null) {
          throw new InvalidDishException();
        }
        let indexDish = this.getPositionDish(dish);

        if (indexDish === -1) {
          // El plato no existe, excepción
          throw new UnregisteredDishException();
        }
        for (const category of categoriesAdd) {
          if (!(category instanceof Category) || category == null) {
            throw new InvalidCategoryException();
          }
          let indexCat = this.getPositionCategory(category);

          if (indexCat === -1) {
            // La categoría no existe, excepción
            throw new UnregisteredCategoryException();
          }

          indexCat = this.#dishes[indexDish].categories.findIndex(
            (cat) => cat.name === category.name
          );

          this.#dishes[indexDish].categories.splice(indexCat, 1);
        }
        return this;
      }

      // Asignamos alérgenos a un plato
      assignAllergenToDish(dish, ...allergensAdd) {
        if (!(dish instanceof Dish) || dish == null) {
          throw new InvalidDishException();
        }
        let indexDish = this.getPositionDish(dish);

        if (indexDish === -1) {
          // El plato no existe, lo añadimos
          this.addDish(dish);
          indexDish = this.getPositionDish(dish);
        }
        for (const allergen of allergensAdd) {
          if (!(allergen instanceof Allergen) || allergen == null) {
            throw new InvalidAllergenException();
          }
          let indexAllergen = this.getPositionAllergen(allergen);

          if (indexAllergen === -1) {
            // El alérgeno no existe, la añadimos
            this.addAllergen(allergen);
          }

          this.#dishes[indexDish].allergens.push(allergen);
        }
        return this;
      }

      // Desasignamos alérgenos a un plato
      deassignAllergenToDish(dish, ...allergensAdd) {
        if (!(dish instanceof Dish) || dish == null) {
          throw new InvalidDishException();
        }
        let indexDish = this.getPositionDish(dish);

        if (indexDish === -1) {
          // El plato no existe, excepción
          throw new UnregisteredDishException();
        }
        for (const allergen of allergensAdd) {
          if (!(allergen instanceof Allergen) || allergen == null) {
            throw new InvalidAllergenException();
          }
          let indexAllergen = this.getPositionAllergen(allergen);

          if (indexAllergen === -1) {
            // El alérgeno no existe, excepción
            throw new UnregisteredAllergenException();
          }

          indexAllergen = this.#dishes[indexDish].allergens.findIndex(
            (all) => all.name === allergen.name
          );

          this.#dishes[indexDish].allergens.splice(indexAllergen, 1);
        }
        return this;
      }

      // Asignamos plato a menú
      assignDishToMenu(menu, ...dishesAdd) {
        if (!(menu instanceof Menu) || menu == null) {
          throw new InvalidMenuException();
        }
        let indexMenu = this.getPositionMenu(menu);

        if (indexMenu === -1) {
          // El menú no existe, lo añadimos
          this.addMenu(menu);
          indexMenu = this.getPositionMenu(menu);
        }
        for (const dish of dishesAdd) {
          if (!(dish instanceof Dish) || dish == null) {
            throw new InvalidDishException();
          }
          let indexDish = this.getPositionDish(dish);

          if (indexDish === -1) {
            // El plato no existe, lo añadimos
            this.addDish(dish);
            indexDish = this.getPositionDish(dish);
          }

          this.#menus[indexMenu].dishes.push(this.#dishes[indexDish]);
        }
        return this;
      }

      // Desasignamos platos a un menú
      deassignDishToMenu(menu, ...dishesAdd) {
        if (!(menu instanceof Menu) || menu == null) {
          throw new InvalidMenuException();
        }
        let indexMenu = this.getPositionMenu(menu);

        if (indexMenu === -1) {
          // El menú no existe, excepción
          throw new UnregisteredMenuException();
        }
        for (const dish of dishesAdd) {
          if (!(dish instanceof Dish) || dish == null) {
            throw new InvalidDishException();
          }
          let indexDish = this.getPositionDish(dish);

          if (indexDish === -1) {
            // El plato no existe, excepción
            throw new UnregisteredDishException();
          }

          indexDish = this.#menus[indexMenu].dishes.findIndex(
            (dishObj) => dishObj.dish.name === dish.name
          );
          //Borramos de nuestro array de menús
          //Dentro del objeto literal con el menú indicado
          //El objeto literal con el plato
          this.#menus[indexMenu].dishes.splice(indexDish, 1);
        }
        return this;
      }

      // Cambiamos la posición de dos platos del menú
      changeDishesPositionsInMenu(menu, dish1, dish2) {
        if (!(menu instanceof Menu) || menu == null) {
          throw new InvalidMenuException();
        }
        let indexMenu = this.getPositionMenu(menu);

        if (indexMenu === -1) {
          // El menú no existe, excepción
          throw new UnregisteredMenuException();
        }

        if (
          !(dish1 instanceof Dish) ||
          dish1 == null ||
          !(dish2 instanceof Dish) ||
          dish2 == null
        ) {
          throw new InvalidDishException();
        }
        let indexDish1 = this.getPositionDish(dish1);
        let indexDish2 = this.getPositionDish(dish2);

        if (indexDish1 === -1 || indexDish2 === -1) {
          // El plato no existe, excepción
          throw new UnregisteredDishException();
        }

        indexDish1 = this.#menus[indexMenu].dishes.findIndex(
          (dishObj) => dishObj.dish.name === dish1.name
        );

        indexDish2 = this.#menus[indexMenu].dishes.findIndex(
          (dishObj) => dishObj.dish.name === dish2.name
        );

        // Intercambiar las posiciones de los platos en el menú
        const tempDish = this.#menus[indexMenu].dishes[indexDish1];
        this.#menus[indexMenu].dishes[indexDish1] =
          this.#menus[indexMenu].dishes[indexDish2];
        this.#menus[indexMenu].dishes[indexDish2] = tempDish;

        return this;
      }

      // Función para filtrar platos por categoría
      *getDishesInCategory(category, orden) {
        if (!(category instanceof Category) || category == null) {
          throw new InvalidCategoryException();
        }

        const indexCategory = this.getPositionCategory(category);

        if (indexCategory === -1) {
          // La categoría no existe, lanzar una excepción
          throw new UnregisteredCategoryException();
        }

        // Nuevo array usando filter para obtener un array nuevo
        // Con some comprobamos si el objeto tiene alguna categoría
        // Cuyo nombre sea igual a la categoría pasada a la función
        const dishesInCategory = this.#dishes.filter((dishObj) => {
          return dishObj.categories.some((cat) => cat.name === category.name);
        });

        // Ordenar el array de platos si nos han pasado orden
        if (orden && typeof orden === "function") {
          dishesInCategory.sort(orden);
        }

        // Devolvemos cada plato de la categoría
        for (const dish of dishesInCategory) {
          yield dish;
        }
      }

      // Método para obtener las categorías de un plato específico
      getCategoriesOfDish(dishName) {
        // Buscar el índice del plato en la lista de platos
        const dishIndex = this.#dishes.findIndex(
          (dishObj) => dishObj.dish.name === dishName
        );

        // Verificar si el plato existe
        if (dishIndex === -1) {
          throw new UnregisteredDishException();
        }

        // Obtener las categorías asociadas al plato
        const categoriesOfDish = this.#dishes[dishIndex].categories.map(
          (category) => category
        );
        return categoriesOfDish;
      }

      // Nueva función para obtener platos con alérgeno
      *getDishesWithAllergen(allergen, orden) {
        if (!(allergen instanceof Allergen) || allergen == null) {
          throw new InvalidAllergenException();
        }

        const indexAllergen = this.getPositionAllergen(allergen);

        if (indexAllergen === -1) {
          // El alérgeno no existe, lanzar una excepción
          throw new UnregisteredAllergenException();
        }

        // Nuevo array usando filter para obtener un array nuevo
        // Con some comprobamos si el objeto tiene algún alérgeno
        // Cuyo nombre sea igual al alérgeno pasado a la función
        const dishesWithAllergen = this.#dishes.filter((dishObj) => {
          return dishObj.allergens.some((alg) => alg.name === allergen.name);
        });

        // Ordenar el array de platos si nos han pasado orden
        if (orden && typeof orden === "function") {
          dishesWithAllergen.sort(orden);
        }

        // Devolvemos cada plato con el alérgeno
        for (const dish of dishesWithAllergen) {
          yield dish;
        }
      }

      // En el pdf pone que pasemos un Dish, pero parece ser una confusión
      // Pues queremos ver los platos que cumplan cierto criterio,
      // Por lo que no tiene sentido pasarle el Dish
      *findDishes(callback, orden) {
        if (typeof callback !== "function") {
          throw new Error("Callback no es una función.");
        }

        // Nuevo array usando filter para obtener un array nuevo
        // Con some comprobamos si el objeto cumple el criterio definido por el callback
        const foundDishes = this.#dishes.filter((dishObj) => callback(dishObj));

        // Ordenar el array de platos si nos han pasado orden
        if (orden && typeof orden === "function") {
          foundDishes.sort(orden);
        }

        // Devolvemos un iterador para los platos que cumplen el criterio
        for (const dish of foundDishes) {
          yield dish;
        }
      }

      *getDishesInMenu(menuName) {
        // Buscar el índice del menú en la lista de menús
        const menuIndex = this.#menus.findIndex(
          (menuObj) => menuObj.menu.name === menuName
        );

        // Verificar si el menú existe
        if (menuIndex === -1) {
          throw new Error(`Menu "${menuName}" not found.`);
        }
        console.log(this.#menus[menuIndex]);
        // Obtener los platos asociados al menú
        const dishesInMenu = this.#menus[menuIndex].dishes.map(
          (dishObj) => dishObj.dish
        );

        // Devolver un iterador para los platos del menú
        for (const dish of dishesInMenu) {
          yield dish;
        }
      }

      //Funciones para creaciones de Objetos:

      createDish(name, description, ingredients, image) {
        // Buscar si ya existe un plato con el mismo nombre
        const existingDishObj = this.#dishes.find(
          (dishObj) => dishObj.dish.name === name
        );
        // Ternaria, si existingDish tiene valor, cogemos el objeto plato, si no, null
        const existingDish = existingDishObj ? existingDishObj.dish : null;
        if (existingDish != null) {
          // Si ya existe, devolver el objeto Dish existente
          return existingDish;
        } else {
          // Si no existe, crear un nuevo objeto Dish
          const newDish = new Dish(name, description, ingredients, image);
          return newDish;
        }
      }

      createMenu(name, description) {
        const existingMenuObj = this.#menus.find(
          (menuObj) => menuObj.menu.name === name
        );
        const existingMenu = existingMenuObj ? existingMenuObj.menu : null;

        if (existingMenu !== null) {
          return existingMenu;
        } else {
          const newMenu = new this.#productConstructors.Menu(name, description);
          return newMenu;
        }
      }

      createAllergen(name, description) {
        const existingAllergen = this.#allergens.find(
          (allergen) => allergen.name === name
        );

        if (existingAllergen !== undefined) {
          return existingAllergen;
        } else {
          const newAllergen = new this.#productConstructors.Allergen(
            name,
            description
          );
          return newAllergen;
        }
      }

      createCategory(name, description) {
        const existingCategory = this.#categories.find(
          (category) => category.name === name
        );

        if (existingCategory !== undefined) {
          return existingCategory;
        } else {
          const newCategory = new this.#productConstructors.Category(
            name,
            description
          );
          return newCategory;
        }
      }

      createRestaurant(name, description, location) {
        const existingRestaurant = this.#restaurants.find(
          (restaurant) => restaurant.name === name
        );

        if (existingRestaurant !== undefined) {
          return existingRestaurant;
        } else {
          const newRestaurant = new Restaurant(name, description, location);
          return newRestaurant;
        }
      }
    }
    // Creamos nuevo RestaurantsManager
    let restMan = new RestaurantsManagerObj();
    // Lo congelamos para que no se modifique
    Object.freeze(restMan);
    // Lo devolvemos
    return restMan;
  }
  return {
    // Devuelve un objeto con el método getInstance
    getInstance: function () {
      if (!instantiated) {
        //Si la variable instantiated es undefined, primera ejecución, ejecuta init.
        instantiated = init(); //instantiated contiene el objeto único
      }
      return instantiated; //Si ya está asignado devuelve la asignación.
    },
    Category: Category.name,
    Allergen: Allergen.name,
    Menu: Menu.name,
  };
})();

export default RestaurantsManager;
export {Coordinate};