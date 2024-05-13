export interface ISchema {
	type?: string;
	name?: string;
	label?: string;

	component?: object;
	children?: ISchema[];
	class?: string;

	validation?: string;
	vif?: object;
	visible?: boolean;
	id?: number;
	parent?: number | null;
}