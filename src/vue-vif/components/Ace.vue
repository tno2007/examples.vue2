<script setup lang="ts">

import { computed, reactive, ref, watch } from "vue"
import { flatten, restructure } from "../composables/useVeeIfHelper";
import type { ISchema } from "../typings";
import { getByPath, setByPath } from 'dot-path-value';
import { apply } from "json-logic-js";

const data = ref<any>({});
const schema = ref<ISchema[]>([
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
				type: "text",
				name: "age2",
				label: "How old are you 2?",
				vif: { "==": [{ "var": "lastname" }, "b"] },
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
]);

const flattened = computed(() => {
	return flatten(data.value, schema.value)
});

const restructured = computed(() => {
	return restructure(flattened.value.filter(f => f.visible !== false))
});


const dotpath = (path: string, expectedvalue: any): boolean => {

	//const rule = `{ "${condition}": [{ "var": "${path}" }, "${expectedvalue}"] }`;

	//const r = JSON.parse(rule);

	//const value = apply(r, data);

	const value = getByPath(data.value, path);

	// console.log("a", typeof value);

	return value === expectedvalue;
}

const jsonLogic = (rule: object): boolean => {

	const value = apply(rule, data.value);

	if ("boolean" === typeof value) return value;

	return false;
}

</script>

<template>
	<div>

		<FormulateForm v-model="data" v-auto-animate>

			<FormulateInput type="text" name="firstname" label="First name X" />
			<FormulateInput type="checkbox" name="available" label="Are you available?" v-if="data.firstname === 'a'" />
			<FormulateInput type="text" name="middlename" label="Middle name" v-if="data.available === true" />
			<FormulateInput type="text" name="lastname" label="Last name" v-if="data.firstname === 'a'" />

			<FormulateInput type="group" name="personalDetails">
				<FormulateInput type="group" name="extraDetails">
					<FormulateInput type="text" name="age2" label="Age 2" v-if="data.lastname === 'b'" />
				</FormulateInput>
			</FormulateInput>


			<FormulateInput type="text" name="star1" label="Star 1"
				v-if="dotpath('personalDetails.0.extraDetails.0.age2', '55')" />
			<FormulateInput type="text" name="star2" label="Star 2" v-if="jsonLogic({ '==': [{ 'var': 'personalDetails.0.extraDetails.0.age2' }, '55'] })" />


		</FormulateForm>

		<pre>{{ data }}</pre>

	</div>
</template>


<style>
.double-row {
	background-color: lightgrey;
}
</style>