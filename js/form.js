// Obtener todos los campos del formulario
const camposFormulario = document.querySelectorAll('.form__input');

// Calcular el progreso del formulario
function calcularProgreso() {
    let camposCompletados = 0;
    camposFormulario.forEach((campo) => {
        if (campo.value !== '' && !campo.validity.patternMismatch) {
            camposCompletados++;
        } else {
            campo.classList.add("invalid");
        }
    });
    const progreso = (camposCompletados / camposFormulario.length) * 100;
    return progreso;
}

// Actualizar la barra de progreso
function actualizarBarraProgreso() {
    const barraProgreso = document.getElementById('progress');
    const progreso = calcularProgreso();
    barraProgreso.value = progreso;
}

// Escuchar cambios en los campos del formulario y actualizar la barra de progreso
camposFormulario.forEach((campo) => {
    campo.addEventListener('input', () => {
        actualizarBarraProgreso();
    });
});


document.addEventListener("DOMContentLoaded", function() {
    var form = document.getElementById("reservaForm");
    var fieldsets = form.querySelectorAll("fieldset");
    var nextButtons = form.querySelectorAll(".next");
    var prevButtons = form.querySelectorAll(".previous");

    var currentFieldset = 0;

    fieldsets[0].style.display = "block";
    fieldsets[1].style.display = "none";
    fieldsets[2].style.display = "none";

    function nextStep() {
        if (currentFieldset < fieldsets.length - 1) {
            fieldsets[currentFieldset].style.display = "none";
            currentFieldset++;
            fieldsets[currentFieldset].style.display = "block";
        }
    }

    function prevStep() {
        if (currentFieldset > 0) {
            fieldsets[currentFieldset].style.display = "none";
            currentFieldset--;
            fieldsets[currentFieldset].style.display = "block";
        }
    }

    // Asociamos las funciones a los eventos de clic
    nextButtons.forEach(function(button) {
        button.addEventListener("click", nextStep);
    });

    prevButtons.forEach(function(button) {
        button.addEventListener("click", prevStep);
    })
})

