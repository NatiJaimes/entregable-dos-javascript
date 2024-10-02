// genero array de nombres de filamentos para utilizar en input
const filamentos = [
    {nombre: " "},
    {nombre: "PLA"},
    {nombre: "ABS"},
    {nombre: "PETG"},
    {nombre: "Flex"},
    {nombre: "Otro"},
]

//busco el select en el html y genero elemntos option
const listaFilamentos = document.getElementById("tipoFilamento");
filamentos.forEach(filamento => {
    const nuevaOpcion = document.createElement('option');
    nuevaOpcion.textContent = filamento.nombre;
    nuevaOpcion.value = filamento.nombre;
    listaFilamentos.appendChild(nuevaOpcion);
    }
)

//la carga de datos de gasto electrico y de mano de obra son opcionales
//con el siguiente codigo al hacer click en el button se habilita o no esa sección
const opcionalElec = document.getElementById("opcionalElec");
const contenedorElec = document.getElementById("contenedorElec");

opcionalElec.addEventListener('click', (e) => {
    e.preventDefault();
    contenedorElec.classList.toggle('oculto');
});

const opcionalManOb = document.getElementById("opcionalManOb");
const contenedorManOb = document.getElementById("contenedorManOb");

opcionalManOb.addEventListener('click', (e) => {
    e.preventDefault()
    contenedorManOb.classList.toggle('oculto');
});


class CalculadoraCostos3D {
    constructor() {
        this.inputs = {
            peso: document.getElementById('peso'),
            bobinaPrecio: document.getElementById('bobinaPrecio'),
            bobinaPeso: document.getElementById('bobinaPeso'),
            tiempo: document.getElementById('tiempo'),
            consumo: document.getElementById('consumo'),
            precioKW: document.getElementById('precioKW'),
            tiempoManoObra: document.getElementById('tiempoManoObra'),
            costeManoObra: document.getElementById('costeManoObra'),
            tiempoPost: document.getElementById('tiempoPost'),
            costePost: document.getElementById('costePost')
        };
        this.nombreTrabajo = document.getElementById('nombreTrabajo'),
        this.tipoFilamento = document.getElementById('tipoFilamento'),
        this.totalBaseOutput = null;
        this.totalElectricoOutput = null;
        this.totalManoObraOutput = null;
        this.totalesOutput = document.getElementById('totales');
        this.resetButton = document.getElementById('reset');

        this.crearCostosTotales();
        this.addEventListeners();
        this.cargarDatos();
    }

    crearCostosTotales() {
        this.totalBaseOutput = document.createElement('p');
        this.totalBaseOutput.id = 'totalBase';
        this.totalBaseOutput.className = 'costoBase';
        this.totalBaseOutput.style.display = 'none';
        document.querySelector('.datosBase').appendChild(this.totalBaseOutput);

        this.totalElectricoOutput = document.createElement('p');
        this.totalElectricoOutput.id = 'totalElectrico';
        this.totalElectricoOutput.className = 'costoElectrico';
        this.totalElectricoOutput.style.display = 'none';
        document.getElementById('contenedorElec').appendChild(this.totalElectricoOutput);

        this.totalManoObraOutput = document.createElement('p');
        this.totalManoObraOutput.id = 'totalManoObra';
        this.totalManoObraOutput.className = 'costoManoObra';
        this.totalManoObraOutput.style.display = 'none';
        document.getElementById('contenedorManOb').appendChild(this.totalManoObraOutput);
    }

    addEventListeners() {
        this.nombreTrabajo.addEventListener('input', () => {
            this.guardarDatos();
        });
        this.tipoFilamento.addEventListener('input', () => {
            this.guardarDatos();
        });
        for (const key in this.inputs) {
            if (this.inputs.hasOwnProperty(key)) {
                this.inputs[key].addEventListener('input', () => {
                    this.calcularTotal();
                    this.guardarDatos();
                });
            }
        }
        this.resetButton.addEventListener('click', () => {
            this.reiniciarFormulario();
        });
    }

    calcularTotal() {
        const peso = parseFloat(this.inputs.peso.value);
        const bobinaPrecio = parseFloat(this.inputs.bobinaPrecio.value);
        const bobinaPeso = parseFloat(this.inputs.bobinaPeso.value);
        const tiempo = parseFloat(this.inputs.tiempo.value) || 0;
        const consumo = parseFloat(this.inputs.consumo.value) || 0;
        const precioKW = parseFloat(this.inputs.precioKW.value) || 0;
        const tiempoManoObra = parseFloat(this.inputs.tiempoManoObra.value) || 0;
        const costeManoObra = parseFloat(this.inputs.costeManoObra.value) || 0;
        const tiempoPost = parseFloat(this.inputs.tiempoPost.value) || 0;
        const costePost = parseFloat(this.inputs.costePost.value) || 0;

        // Calcular el costo base
        const costoBase = (peso * bobinaPrecio) / bobinaPeso;

        // Calcular el costo eléctrico
        const costoElectrico = ((consumo * precioKW) / 1000) * tiempo;

        // Calcular el costo de mano de obra
        const costoManoObra = ((tiempoManoObra * costeManoObra) / 60) + ((tiempoPost * costePost) / 60);

        // Calcular el total
        const total = costoBase + costoElectrico + costoManoObra;

        // Mostrar/ocultar los totales
        if (costoBase > 0 && !isNaN(costoBase)) {
            this.totalBaseOutput.style.display = 'block';
            this.totalBaseOutput.textContent = `Costo Base: $${costoBase.toFixed(2)}`;
        } else {
            this.totalBaseOutput.style.display = 'none';
        }

        if (costoElectrico > 0 && !isNaN(costoElectrico)) {
            this.totalElectricoOutput.style.display = 'block';
            this.totalElectricoOutput.textContent = `Costo Eléctrico: $${costoElectrico.toFixed(2)}`;
        } else {
            this.totalElectricoOutput.style.display = 'none';
        }

        if (costoManoObra > 0 && !isNaN(costoManoObra)) {
            this.totalManoObraOutput.style.display = 'block';
            this.totalManoObraOutput.textContent = `Costo Mano de Obra: $${costoManoObra.toFixed(2)}`;
        } else {
            this.totalManoObraOutput.style.display = 'none';
        }

        if (total > 0 && !isNaN(total)) {
            this.totalesOutput.style.display = 'block';
            this.totalesOutput.textContent = `Costo Total: $${total.toFixed(2)}`;
        } else {
            this.totalesOutput.style.display = 'none';
        }
    }

    guardarDatos() {
        const datos = {};
        for (const key in this.inputs) {
            if (this.inputs.hasOwnProperty(key)) {
                datos[key] = this.inputs[key].value;
            }
        }
        sessionStorage.setItem('nombreTrabajo', this.nombreTrabajo.value);
        sessionStorage.setItem('tipoFilamento', this.tipoFilamento.value);
        sessionStorage.setItem('datosFormulario', JSON.stringify(datos));
    }

    cargarDatos() {
        const nombreTrabajo = sessionStorage.getItem('nombreTrabajo');
        const tipoFilamento = sessionStorage.getItem('tipoFilamento');
        if (nombreTrabajo) {
            this.nombreTrabajo.value = nombreTrabajo;
        }
        if (tipoFilamento) {
            this.tipoFilamento.value = tipoFilamento;
        }
        const datos = JSON.parse(sessionStorage.getItem('datosFormulario'));
        if (datos) {
            for (const key in datos) {
                if (datos.hasOwnProperty(key) && this.inputs[key]) {
                    this.inputs[key].value = datos[key];
                }
            }
        }

        this.calcularTotal();
    }

    reiniciarFormulario() {
        // Limpiar los campos de entrada
        for (const key in this.inputs) {
            if (this.inputs.hasOwnProperty(key)) {
                this.inputs[key].value = '';
            }
        }
        this.nombreTrabajo.value = '';
        this.tipoFilamento.value = '';

        // Limpiar los elementos de salida
        this.totalBaseOutput.style.display = 'none';
        this.totalElectricoOutput.style.display = 'none';
        this.totalManoObraOutput.style.display = 'none';
        this.totalesOutput.style.display = 'none';

        // Limpiar el almacenamiento de sesión
        sessionStorage.removeItem('datosFormulario');
        sessionStorage.removeItem('nombreTrabajo');
        sessionStorage.removeItem('tipoFilamento');
    }
}

// Inicializar la calculadora
document.addEventListener('DOMContentLoaded', () => {
    new CalculadoraCostos3D();
});