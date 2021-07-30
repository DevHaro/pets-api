const express = require('express');
const Pet = require('../models/pets_model');
const ruta = express.Router();

ruta.get('/',(req, res)=> {
	res.json('Listo el GET de pets.');
});

ruta.post('/', (req, res) => {
	let body = req.body;
	let resultado = crearPet(body);

	resultado.then( mascota => {
		res.json({
			valor: mascota
		})
	}).catch( err => {
		res.status(400).json({
			error: err
		})
	});
});

ruta.delete('/:id', (req, res) => {
	let body = req.body;
	let resultado = eliminarPet(req.params.id, body);

	resultado.then(valor => {
		res.json({
			success: true,
			message: 'pet deleted',
			data: {
				pet: valor
			}
		})	
	}).catch(err => {
		res.status(400).json({
			success: false,
			error: err.message
		})
	});
})

/* ruta.put('/:nombre', (req, res) => {
	let body = req.body;
	let resultado = actualizarPet(req.params.nombre, body);

	resultado.then(valor => {
		res.json({
			valor: valor
		})
	}).catch(err => {
		res.status(400).json({
			error: err
		})
	});
}) */

async function crearPet(body){
	let pet = new Pet({
		nombre	: body.nombre,
		edad 	: body.edad,
		raza 	: body.raza
	});
	return await pet.save();
}

async function eliminarPet(id){
	let pet = await Pet.findByIdAndDelete(id);
	return pet;
}

async function actualizarPet(nombre, body){
	let pet = await Pet.findOneAndUpdate(nombre, {
		$set: {
			nombre: body.nombre,
			edad: body.edad,
			raza: body.raza
		}
	}, {new: true});
	return pet;	
}

module.exports = ruta;