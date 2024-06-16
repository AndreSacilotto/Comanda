export interface DataItem{
	id: number,
	value: number,
}

const data = {
	"drinks": {
		"cafe": { "id": -1, "value": 0 },
		"cafe com leite": { "id": -1, "value": 0 },
		"suco": { "id": -1, "value": 0 },
		"suco grande": { "id": -1, "value": 0 },
		"coca lata": { "id": -1, "value": 0 },
		"coca ls": { "id": -1, "value": 0 }
	},
	"foods": {
		"tortinha": { "id": -1, "value": 0 },
		"pao de queijo": { "id": -1, "value": 0 },
		"esfira": { "id": -1, "value": 0 },
		"pastel pizza": { "id": -1, "value": 0 },
		"pastel carne": { "id": -1, "value": 0 },
		"pastel queijo": { "id": -1, "value": 0 },
	},
	"sandwichs":{
		"items": {
			// bread
			"hamburger": { "id": -1, "value": 0 },
			"frances": { "id": -1, "value": 0 },
			"frances-special": { "id": -1, "value": 0 },
			"mini-frances": { "id": -1, "value": 0 },
			"baguete": { "id": -1, "value": 0 },
			"bisnaguinha": { "id": -1, "value": 0 },
			"lulu": { "id": -1, "value": 0 },
			"lulu-special": { "id": -1, "value": 0 },
			// modifier
			"chapa": { "id": -1, "value": 0 },
			"manteiga": { "id": -1, "value": 0 },
			"maionese": { "id": -1, "value": 0 },
			// add
			"tomate": { "id": -1, "value": 0 },
			"ovo": { "id": -1, "value": 0 },
			"presunto": { "id": -1, "value": 0 },
			"apresuntado": { "id": -1, "value": 0 },
			"mortadela-barata": { "id": -1, "value": 0 },
			"mortadela-ouro": { "id": -1, "value": 0 },
			"mortadela-ceratti": { "id": -1, "value": 0 },
			"queijo-mussarela": { "id": -1, "value": 0 },
			"queijo-prato": { "id": -1, "value": 0 },
			"queijo-parmesao": { "id": -1, "value": 0 }
		},
		"presets": {
			"none": {
				"extra": 0,
				"bread": "",
				"items": [ ]
			},
			"semenetinha": {
				"extra": 0,
				"bread": "",
				"items": [ ]
			}
		},
	}


}

export default data;