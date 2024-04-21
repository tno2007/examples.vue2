<script setup lang="ts">

import { computed, reactive, ref } from "vue"
import { apply } from "json-logic-js"
// import { flatten } from 'flatten-anything'

const data = ref({});

interface ISchema {
	component?: any;
	children?: ISchema[];
	class?: string;
	type?: string,
	name?: string,
	label?: string,
	validation?: string;
	vif?: any;
	visible?: boolean;
}


const schema: ISchema[] = [
	{
		type: "text",
		name: "firstname",
		label: "First name X",
	},
	{
		type: "checkbox",
		name: "available",
		label: "Are you available?",
		vif: { "==": [{ "var": "firstname" }, "a"] },
	},
	{
		type: "text",
		name: "middlename",
		label: "Middle name",
		vif: { "==": [{ "var": "available" }, true] },
	},
	{
		type: "text",
		name: "lastname",
		label: "Last name Y",
		vif: { "==": [{ "var": "firstname" }, "a"] },
	},
	{
		type: "group",
		name: "personalDetails",
		children: [
			{
				type: "group",
				name: "extraDetails",
				children: [
					{
						type: "text",
						name: "age2",
						label: "How old are you 2?",
						vif: { "==": [{ "var": "lastname" }, "b"] },
					},
				]
			},
		]
	},
	{
		type: "text",
		name: "star",
		label: "Star me",
		vif: { "==": [{ "var": "personalDetails[0].age2" }, "55"] },
	},
	{
		type: "text",
		name: "star2",
		label: "Star me2",
		vif: { "==": [{ "var": "personalDetails[0].age2" }, "55"] },
	},
];


/*
schema.forEach(object => {


	if (object.vif) {
		const rule = object.vif;
		const result = apply(
			rule,
			data.value
		);
		object.visible = result;
	}

	object.children?.forEach(item => {
		if (item.vif) {
			const rule = item.vif;
			const result = apply(
				rule,
				data.value
			);
			item.visible = result;
		};

	})
})
*/


const veeIf = ((item: any) => {


	if (item.vif) {
		const rule = item.vif;
		const result = apply(
			rule,
			data.value
		);
		item.visible = result;
	}

	// if (item.children) return item.children.map(m => veeIf(m));

	// if (item.children) return item.children.forEach(m => veeIf(m));

	// if(!item.vif) item.visible = false;

	return item;

});


let currentId = 0;

function flat(array: any[], parentId: number | null = null) {
	var result: any[] = [];
	array.forEach(function (a) {
		// result.push(a);


		const rule = a.vif;
		const jsonLogicResult = apply(
			rule,
			data.value
		);
		a.visible = jsonLogicResult;

		result.push({
			...a,
			id: ++currentId,
			parent: parentId
		});

		if (Array.isArray(a.children)) {
			result = result.concat(flat(a.children, currentId));
		}
	});
	return result;
}

const out2 = flat(schema);
console.log(out2);

// **********************************************************
// for loop
// **********************************************************

/*
let result: any[] = [];

var _flatten = flatten(schema, ['children']);
console.log(_flatten);

const loeya = (arr: any[], level: number = 0, parent: null | number = null) => {

	// let currentLevel = level || 0;

	for (let i = 0; i < arr.length; i++) {
		const item = arr[i];

		const id = result.length;

		// create a disconnected object
		const obj = {
			...item,
			id: id,
			parent: parent,
			level: level
		};

		// delete the children key, so its not address back in the temp object array
		delete obj["children"];

		// add object to our store array (without the children)
		result.push(obj);

		// check for children
		if (item.children && item.children.length) {
			++level;
			loeya(item.children, level, id);
		}

		// result.push(obj);
	}

	// remove all children keys
	// delete obj["children"];	
	// result.forEach((r) => delete r["children"]);

	return result;
}

let listing = loeya(schema);

const g = groupBy(listing, (c) => c.level);

console.log(g);
*/

// *****************************************************************
// *****************************************************************

/*
// store the keys
let keys: string[] = [];

Object.keys(listing[0]).forEach((j) => {
	keys.push(j);
});
*/


// **********************************************************


/*const computedSchema = computed(() => {


	const parsed = schema.flatMap((s) => {
		return veeIf(s);
	});


	return parsed.filter(f => {
		return f.visible !== false
	});

	// return parsed;

	// veeIf(schema);



	// return schema.filter(f => f.visible === true);

});*/

/*


function veeIf(item: any): any {

	if (item.children && Array.isArray(item.children)) {
		return item.children.map((m: any) => { return veeIf(m) });
	}

	if (item.vif) {
		const rule = item.vif;
		const result = apply(
			rule,
			data.value
		);
		item.visible = result;
	}

	return item;
}

const parsedSchema = computed(() => {
	return schema.map((value: any) => {
		return veeIf(value);
		//return value;
	});
});

const computedSchema = computed(() => {
	return parsedSchema.value.filter((f) => f.visible !== false);
});


const d = reactive({
	list: [1, 2, 3],
})

*/

const computedSchema = computed(() => {

	/*const filtered = filterNested({
	  array: schema,
	  search: null,
	  searchAttribute: 'visible',
	  childrenPath: 'children',
	})*/


	// return listing;
	//return listing.filter((f) => f.visible !== false);\\

	return [];

});

const reconstructedSchema = computed(() => {
	return [];
});

function groupBy(xs, f) {
	return xs.reduce((r, v, i, a, k = f(v)) => ((r[k] || (r[k] = [])).push(v), r), {});
}


</script>

<template>
	<div>



		<hr />
		<hr />

		<FormulateForm v-model="data" :schema="computedSchema" v-auto-animate />



		<pre class="double-row">{{ data }}</pre>

		<pre>{{ computedSchema }}</pre>


		<vue2-simple-datatable :data="out2" :columns="['name', 'label', 'visible', 'id', 'level', 'parent']" />

		<pre>{{ reconstructedSchema }}</pre>


	</div>
</template>


<style>
.double-row {
	background-color: lightgrey;
}
</style>