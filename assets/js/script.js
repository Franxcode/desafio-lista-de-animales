// Clases
class Propietario {
	constructor(nombre, direccion, telefono) {
		this._nombre = nombre;
		this._direccion = direccion;
		this._telefono = telefono;
	}
	datosPropietario() {
		return `El nombre del dueño es: ${this._nombre}, su domicilio está ubicado en: ${this._direccion}, y su número telefónico de contacto es: ${this._telefono}`;
	}
}

class Animal extends Propietario {
	constructor(nombre, direccion, telefono, tipo) {
		super(nombre, direccion, telefono);
		this._tipo = tipo;
	}
	get tipo() {
		return `El tipo de animal es un: ${this._tipo}`;
	}
}
class Mascota extends Animal {
	constructor(nombre, direccion, telefono, tipo, nombreMascota, enfermedad) {
		super(nombre, direccion, telefono, tipo);
		this._nombreMascota = nombreMascota;
		this._enfermedad = enfermedad;
	}
	get nombreMascota() {
		return this._nombreMascota;
	}
	set nombreMascota(nombreMascota) {
		this._nombreMascota = nombreMascota;
	}
	get enfermedad() {
		return this._enfermedad;
	}
	set enfermedad(enfermedad) {
		this._enfermedad = enfermedad;
	}
}

// Validaciones

const expresiones = {
	propietario: /^[a-zA-ZÀ-ÿ\s]{1,40}$/,
	telefono: /^\d{11}$/,
	direccion: /^[a-zA-Z0-9\-]{1,40}/,
	nombreMascota: /^[a-zA-ZÀ-ÿ\s]{1,40}$/,
	motivoConsulta: /^[a-zA-ZÀ-ÿ\s]{1,40}$/,
};
const campos = {
	propietario: false,
	telefono: false,
	direccion: false,
	nombreMascota: false,
	motivoConsulta: false,
};
const formulario = document.getElementById("formulario");
const inputs = document.querySelectorAll("#formulario input");

const validarFormulario = (e) => {
	switch (e.target.name) {
		case "propietario":
			validarCampo(expresiones.propietario, e.target, e.target.name);
			break;
		case "telefono":
			validarCampo(expresiones.telefono, e.target, e.target.name);
			break;
		case "direccion":
			validarCampo(expresiones.direccion, e.target, e.target.name);
			break;
		case "nombreMascota":
			validarCampo(expresiones.nombreMascota, e.target, e.target.name);
			break;
		case "motivoConsulta":
			validarCampo(expresiones.motivoConsulta, e.target, e.target.name);
			break;
	}
};

const validarCampo = (expresion, input, campo) => {
	if (expresion.test(input.value)) {
		document.getElementById(`grupo__${campo}`).classList.remove("formulario__grupo-incorrecto");
		document.getElementById(`grupo__${campo}`).classList.add("formulario__grupo-correcto");
		document.querySelector(`#grupo__${campo} i`).classList.add("fa-check-circle");
		document.querySelector(`#grupo__${campo} i`).classList.remove("fa-times-circle");
		document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.remove("formulario__input-error-activo");
		campos[campo] = true;
	} else {
		document.getElementById(`grupo__${campo}`).classList.add("formulario__grupo-incorrecto");
		document.getElementById(`grupo__${campo}`).classList.remove("formulario__grupo-correcto");
		document.querySelector(`#grupo__${campo} i`).classList.add("fa-times-circle");
		document.querySelector(`#grupo__${campo} i`).classList.remove("fa-check-circle");
		document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.add("formulario__input-error-activo");
		campos[campo] = false;
	}
};
inputs.forEach((input) => {
	input.addEventListener("keyup", validarFormulario);
	input.addEventListener("blur", validarFormulario);
});

// Mostrar Informacion

formulario.addEventListener("submit", (e) => {
	e.preventDefault();

	const propietario = document.getElementById("propietario").value;
	const telefono = document.getElementById("telefono").value;
	const direccion = document.getElementById("direccion").value;
	const nombreMascota = document.getElementById("nombreMascota").value;
	const tipo = document.getElementById("tipo").value;
	const motivoConsulta = document.getElementById("motivoConsulta").value;

	if (campos.propietario && campos.telefono && campos.direccion && campos.nombreMascota && campos.motivoConsulta) {
		formulario.reset();
		document.getElementById("formulario__mensaje-exito").classList.add("formulario__mensaje-exito-activo");
		document.getElementById("formulario__mensaje").classList.remove("formulario__mensaje-activo");

		setTimeout(() => {
			document.getElementById("formulario__mensaje-exito").classList.remove("formulario__mensaje-exito-activo");
		}, 5000);
		document.querySelectorAll(".formulario__grupo-correcto").forEach((icono) => {
			icono.classList.remove("formulario__grupo-correcto");
		});
		const fragment = document.createDocumentFragment();
		const nuevaMascota = new Mascota(`${propietario}`, `${direccion}`, `${telefono}`, `${tipo}`, `${nombreMascota}`, `${motivoConsulta}`);
		const li = document.createElement("li");
		li.innerHTML = `<p>${nuevaMascota.datosPropietario()} ${nuevaMascota.tipo}.</p><p><li>El nombre de la mascota es: ${nuevaMascota._nombreMascota} y el motivo de la consulta es: ${
			nuevaMascota._enfermedad
		}</li></p>`;
		const resultado = document.querySelector("#resultado ul");
		resultado.appendChild(li);
	} else {
		document.getElementById("formulario__mensaje").classList.add("formulario__mensaje-activo");
	}
});
