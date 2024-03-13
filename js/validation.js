function showFeedBack(input, valid, message) {
  const validClass = valid ? "is-valid" : "is-invalid";
  const messageDiv = valid
    ? input.parentElement.querySelector("div.valid-feedback")
    : input.parentElement.querySelector("div.invalid-feedback");
  for (const div of input.parentElement.getElementsByTagName("div")) {
    div.classList.remove("d-block");
  }
  messageDiv.classList.remove("d-none");
  messageDiv.classList.add("d-block");
  input.classList.remove("is-valid");
  input.classList.remove("is-invalid");
  input.classList.add(validClass);
  if (message) {
    messageDiv.innerHTML = message;
  }
}

function defaultCheckElement(event) {
  this.value = this.value.trim();
  if (!this.checkValidity()) {
    showFeedBack(this, false);
  } else {
    showFeedBack(this, true);
  }
}

function newDishValidation(handler) {
  const form = document.forms.fNewDish;
  form.setAttribute('novalidate', true);
  form.addEventListener('submit', function (event) {
    let isValid = true;
    let firstInvalidElement = null;

    this.ndDescription.value = this.ndDescription.value.trim();
    showFeedBack(this.ndDescription, true);

    if (!this.ndAllergens.checkValidity()) {
      isValid = false;
      showFeedBack(this.ndAllergens, false);
      firstInvalidElement = this.ndAllergens;
    } else {
      showFeedBack(this.ndAllergens, true);
    }

    if (!this.ndCategories.checkValidity()) {
      isValid = false;
      showFeedBack(this.ndCategories, false);
      firstInvalidElement = this.ndCategories;
    } else {
      showFeedBack(this.ndCategories, true);
    }

    if (!this.ndIngredients.checkValidity()) {
      isValid = false;
      showFeedBack(this.ndIngredients, false);
      firstInvalidElement = this.ndIngredients;
    } else {
      showFeedBack(this.ndIngredients, true);
    }

    if (!this.ndUrl.checkValidity()) {
      isValid = false;
      showFeedBack(this.ndUrl, false);
      firstInvalidElement = this.ndUrl;
    } else {
      showFeedBack(this.ndUrl, true);
    }

    if (!this.ndTitle.checkValidity()) {
      isValid = false;
      showFeedBack(this.ndTitle, false);
      firstInvalidElement = this.ndTitle;
    } else {
      showFeedBack(this.ndTitle, true);
    }

    if (!isValid) {
      firstInvalidElement.focus();
    } else {
      const allergens = [...this.ndAllergens.selectedOptions].map((option) => option.value);
      let ingredients = this.ndIngredients.value.split(", ");
      handler(this.ndTitle.value, this.ndDescription.value, ingredients, this.ndUrl.value, this.ndCategories.value, allergens);
    }
    event.preventDefault();
    event.stopPropagation();
  });

  form.addEventListener('reset', (function (event) {
    for (const div of this.querySelectorAll('div.valid-feedback, div.invalid-feedback')) {
      div.classList.remove('d-block');
      div.classList.add('d-none');
    }
    for (const input of this.querySelectorAll('input')) {
      input.classList.remove('is-valid');
      input.classList.remove('is-invalid');
    }
    this.ndTitle.focus();
  }));

  form.ndTitle.addEventListener('change', defaultCheckElement);
  form.ndUrl.addEventListener('change', defaultCheckElement);
  form.ndDescription.addEventListener('change', defaultCheckElement);
  form.ndCategories.addEventListener('change', defaultCheckElement);
  form.ndIngredients.addEventListener('change', defaultCheckElement);
}

function assignationDishesValidation(handler){
  const form = document.forms.fAssignsDishes;
  form.setAttribute('novalidate', true);
  form.addEventListener('submit', function (event) {
    let isValid = true;
    let firstInvalidElement = null;

    if (!this.adMenus.checkValidity()) {
      isValid = false;
      showFeedBack(this.adMenus, false);
      firstInvalidElement = this.adMenus;
    } else {
      showFeedBack(this.adMenus, true);
    }

    if (!isValid) {
      firstInvalidElement.focus();
    } else {

      const assDishes = [...this.adAssDishes.selectedOptions].map((option) => option.value);
      const deasDishes = [...this.adDeasDishes.selectedOptions].map((option) => option.value);
      handler(this.adMenus.value, assDishes, deasDishes, this.adDish1.value, this.adDish2.value);
    }
    event.preventDefault();
    event.stopPropagation();
  });

  form.addEventListener('reset', (function (event) {
    for (const div of this.querySelectorAll('div.valid-feedback, div.invalid-feedback')) {
      div.classList.remove('d-block');
      div.classList.add('d-none');
    }
    for (const input of this.querySelectorAll('input')) {
      input.classList.remove('is-valid');
      input.classList.remove('is-invalid');
    }
    for (const input of this.querySelectorAll('div.row')) {
      input.remove();
    }
    for (const space of this.querySelectorAll('div.mb-12')) {
      space.remove();
    }
    for (const button of this.querySelectorAll('button')) {
      button.remove();
    }
    this.adMenus.focus();
  }));
}

function newCategoryValidation(handler) {
  const form = document.forms.fNewCategory;
  form.setAttribute('novalidate', true);
  form.addEventListener('submit', function (event) {
    let isValid = true;
    let firstInvalidElement = null;

    this.ncDescription.value = this.ncDescription.value.trim();
    showFeedBack(this.ncDescription, true);

    if (!this.ncUrl.checkValidity()) {
      isValid = false;
      showFeedBack(this.ncUrl, false);
      firstInvalidElement = this.ncUrl;
    } else {
      showFeedBack(this.ncUrl, true);
    }

    if (!this.ncTitle.checkValidity()) {
      isValid = false;
      showFeedBack(this.ncTitle, false);
      firstInvalidElement = this.ncTitle;
    } else {
      showFeedBack(this.ncTitle, true);
    }

    if (!isValid) {
      firstInvalidElement.focus();
    } else {
      handler(this.ncTitle.value, this.ncUrl.value, this.ncDescription.value);
    }
    event.preventDefault();
    event.stopPropagation();
  });

  form.addEventListener('reset', (function (event) {
    for (const div of this.querySelectorAll('div.valid-feedback, div.invalid-feedback')) {
      div.classList.remove('d-block');
      div.classList.add('d-none');
    }
    for (const input of this.querySelectorAll('input')) {
      input.classList.remove('is-valid');
      input.classList.remove('is-invalid');
    }
    this.ncTitle.focus();
  }));

  form.ncTitle.addEventListener('change', defaultCheckElement);
  form.ncUrl.addEventListener('change', defaultCheckElement);
}

function newRestaurantValidation(handler) {
  const form = document.forms.fNewRestaurant;
  form.setAttribute('novalidate', true);
  form.addEventListener('submit', function (event) {
    let isValid = true;
    let firstInvalidElement = null;

    this.ncDescription.value = this.ncDescription.value.trim();
    showFeedBack(this.ncDescription, true);

    if (!this.ncLong.checkValidity()) {
      isValid = false;
      showFeedBack(this.ncLong, false);
      firstInvalidElement = this.ncLong;
    } else {
      showFeedBack(this.ncLong, true);
    }

    if (!this.ncLat.checkValidity()) {
      isValid = false;
      showFeedBack(this.ncLat, false);
      firstInvalidElement = this.ncLat;
    } else {
      showFeedBack(this.ncLat, true);
    }

    if (!this.ncTitle.checkValidity()) {
      isValid = false;
      showFeedBack(this.ncTitle, false);
      firstInvalidElement = this.ncTitle;
    } else {
      showFeedBack(this.ncTitle, true);
    }

    if (!isValid) {
      firstInvalidElement.focus();
    } else {
      handler(this.ncTitle.value, this.ncDescription.value, this.ncLat.value, this.ncLong.value);
    }
    event.preventDefault();
    event.stopPropagation();
  });

  form.addEventListener('reset', (function (event) {
    for (const div of this.querySelectorAll('div.valid-feedback, div.invalid-feedback')) {
      div.classList.remove('d-block');
      div.classList.add('d-none');
    }
    for (const input of this.querySelectorAll('input')) {
      input.classList.remove('is-valid');
      input.classList.remove('is-invalid');
    }
    this.ncTitle.focus();
  }));

  form.ncTitle.addEventListener('change', defaultCheckElement);
  form.ncLat.addEventListener('change', defaultCheckElement);
  form.ncLong.addEventListener('change', defaultCheckElement);
}

function modCategoriesValidation(handler){
  const form = document.forms.fModCategories;
  form.setAttribute('novalidate', true);
  form.addEventListener('submit', function (event) {
    let isValid = true;
    let firstInvalidElement = null;

    if (!this.mcDishes.checkValidity()) {
      isValid = false;
      showFeedBack(this.mcDishes, false);
      firstInvalidElement = this.mcDishes;
    } else {
      showFeedBack(this.mcDishes, true);
    }

    if (!isValid) {
      firstInvalidElement.focus();
    } else {

      const assCats = [...this.mcAssCat.selectedOptions].map((option) => option.value);
      const deasCats = [...this.mcDeasCat.selectedOptions].map((option) => option.value);
      alert("ee");
      handler(this.mcDishes.value, assCats, deasCats);
    }
    event.preventDefault();
    event.stopPropagation();
  });

  form.addEventListener('reset', (function (event) {
    for (const div of this.querySelectorAll('div.valid-feedback, div.invalid-feedback')) {
      div.classList.remove('d-block');
      div.classList.add('d-none');
    }
    for (const input of this.querySelectorAll('input')) {
      input.classList.remove('is-valid');
      input.classList.remove('is-invalid');
    }
    for (const input of this.querySelectorAll('div.row')) {
      input.remove();
    }
    for (const space of this.querySelectorAll('div.mb-12')) {
      space.remove();
    }
    for (const button of this.querySelectorAll('button')) {
      button.remove();
    }
    this.mcDishes.focus();
  }));
}

export {newDishValidation, assignationDishesValidation, newCategoryValidation, newRestaurantValidation, modCategoriesValidation};