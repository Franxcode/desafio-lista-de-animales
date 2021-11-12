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

const addPet = document.querySelector("#addPet");

addPet.addEventListener("click", (e) => {
	e.preventDefault();
	const propietario = document.querySelector("#propietario").value;
	const telefono = document.querySelector("#telefono").value;
	const direccion = document.querySelector("#direccion").value;
	const nombreMascota = document.querySelector("#nombreMascota").value;
	const tipo = document.querySelector("#tipo").value;
	const enfermedad = document.querySelector("#enfermedad").value;
	const resultado = document.querySelector("#resultado");

	(() => {
		if (propietario != "" && !isNaN(telefono) && direccion != "" && nombreMascota != "" && enfermedad != "") {
			const nuevaMascota = new Mascota(`${propietario}`, `${direccion}`, `${telefono}`, `${tipo}`, `${nombreMascota}`, `${enfermedad}`);
			li = document.createElement("li");
			li.innerHTML = `${nuevaMascota.datosPropietario()} <li> ${nuevaMascota.tipo}. El nombre de la mascota es: ${nuevaMascota._nombreMascota} y la enfermedad es: ${nuevaMascota._enfermedad}</li>`;
			resultado.appendChild(li);
		} else {
			alert("Todos los campos deben tener informacion.");
		}
	})();
});
