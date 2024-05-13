import { apply } from "json-logic-js";

interface ISchema {
	component?: object;
	children?: ISchema[];
	class?: string;
	type?: string;
	name?: string;
	label?: string;
	validation?: string;
	vif?: object;
	visible?: boolean;
	id?: number;
	parent?: number|null;
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
		vif: { "==": [{ var: "firstname" }, "a"] },
	},
	{
		type: "text",
		name: "middlename",
		label: "Middle name",
		vif: { "==": [{ var: "available" }, true] },
	},
	{
		type: "text",
		name: "lastname",
		label: "Last name Y",
		vif: { "==": [{ var: "firstname" }, "a"] },
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
						vif: { "==": [{ var: "lastname" }, "b"] },
					},
				],
			},
		],
	},
	{
		type: "text",
		name: "star",
		label: "Star me",
		vif: { "==": [{ var: "personalDetails[0].age2" }, "55"] },
	},
	{
		type: "text",
		name: "star2",
		label: "Star me2",
		vif: { "==": [{ var: "personalDetails[0].age2" }, "55"] },
	},
];

const data = {};
let currentId = 0;

// helper functions
const removeChildren = (o: ISchema) => {
	if (o.children?.length) o.children = undefined;
	return o;
};

// main functions
function flattenX(
	data: object,
	schema: ISchema[],
	parentId: number | null = null,
) {
	let result: ISchema[] = [];

	for (const s of schema) {
		const rule = s.vif;
		const logicResult = apply(rule, data);
		s.visible = logicResult;

		result.push({
			...s,
			id: ++currentId,
			parent: parentId,
		});

		if (Array.isArray(s.children)) {
			result = result.concat(flatten(data, s.children, currentId));
		}
	}

	return result;
}

const removeParents = (flatSchema: ISchema[]) => {
	const result = flatSchema.map((value, index, array) => {
		return removeChildren(value);
	});

	return result;
};

const restructure = (flatSchema: ISchema[]) => {
	const result: ISchema[] = [];

	for (const s of flatSchema) {

		if (s.parent) {
			const parent = result.find(f => f.id === s.parent);
			// console.log(parent);
			if (parent && parent.children === undefined) parent.children = [];
			parent?.children?.push(s);
		}
		else {
			result.push(s);
		}
	}

	return result;
}

// logic
const flattened = flatten(data, schema);
const nonParents = removeParents(flattened);
const filtered = nonParents.filter((f) => f.visible !== false);
const restructured = restructure(filtered);

console.log("filtered", filtered);
console.log("restructured", restructured);

// grid rendering
// Grid Options: Contains all of the grid configurations
const gridOptions = {
	rowData: flattened,
	columnDefs: [
		{ field: "id" },
		{ field: "parent" },
		{ field: "type" },
		{ field: "visible" },
		{ field: "name" },
		{ field: "label" },
	],
};

// Your Javascript code to create the grid
const myGridElement = document.querySelector("#myGrid");
agGrid.createGrid(myGridElement, gridOptions);
