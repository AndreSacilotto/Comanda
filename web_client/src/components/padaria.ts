export interface DataItem {
	id: number,
	value: number,
}

export interface PresetItem {
	extra: number,
	items: string[],
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
		"salgado assado": { "id": -1, "value": 0 },
		"salgado frito": { "id": -1, "value": 0 },
		"pao de queijo": { "id": -1, "value": 0 },
		"bolo cenoura": { "id": -1, "value": 0 },
		"bolo fuba": { "id": -1, "value": 0 },
	},
	"sandwichs":{
		"items": {
			// bread
			"hamburger": { "id": -1, "value": 0 },
			"frances": { "id": -1, "value": 0 },
			"frances-special": { "id": -1, "value": 0 },
			"mini-frances": { "id": -1, "value": 0 },
			"baguete": { "id": -1, "value": 0 },
			// "bisnaguinha": { "id": -1, "value": 0 },
			"lulu": { "id": -1, "value": 0 },
			"lulu-special": { "id": -1, "value": 0 },
			"omelete": { "id": -1, "value": 0 },
			// modifier
			"chapa": { "id": -1, "value": 0 },
			"manteiga": { "id": -1, "value": 0 },
			"maionese": { "id": -1, "value": 0 },
			// add
			"requeijao": { "id": -1, "value": 0 },
			"frango": { "id": -1, "value": 0 },
			"bacon": { "id": -1, "value": 0 },
			"tomate": { "id": -1, "value": 0 },
			"ovo": { "id": -1, "value": 0 },
			"presunto": { "id": -1, "value": 0 },
			"apresuntado": { "id": -1, "value": 0 },
			"mortadela-marba": { "id": -1, "value": 0 },
			"mortadela-ouro": { "id": -1, "value": 0 },
			"mortadela-ceratti": { "id": -1, "value": 0 },
			"queijo-mussarela": { "id": -1, "value": 0 },
			"queijo-prato": { "id": -1, "value": 0 },
			"queijo-parmesao": { "id": -1, "value": 0 }
		},
		"presets": {
			"none": {
				"extra": 0,
				"items": []
			} as PresetItem,
			"semenetinha": {
				"extra": 0,
				"items": [ "pao", "pao2" ]
			} as PresetItem,
		},
	}


}

export default data;