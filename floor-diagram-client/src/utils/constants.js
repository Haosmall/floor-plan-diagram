const SHAPE_TYPE = {
	circle: "circle",
	rect: "rect",
	image: "image",
	ellipse: "ellipse",
};

const INITIAL_SHAPE = [
	{
		type: SHAPE_TYPE.circle,
		draggable: true,
		x: 100,
		y: 100,
		width: 50,
		height: 50,
		text: null,
		radius: null,
		fill: null,
	},
	{
		type: SHAPE_TYPE.rect,
		draggable: true,
		x: 900,
		y: 200,
		width: 50,
		height: 50,
		text: null,
		radius: null,
		fill: null,
	},
	{
		type: SHAPE_TYPE.rect,
		draggable: true,
		x: 700,
		y: 200,
		width: 100,
		height: 50,
		text: null,
		radius: null,
		fill: null,
	},
	{
		type: SHAPE_TYPE.rect,
		x: 0,
		y: 0,
	},

	{
		type: SHAPE_TYPE.rect,

		height: 135.69640080296824,
		rotation: 66.22288904139714,
		shapeId: 0,
		width: 203.5446012044521,
		x: 383.18603402024314,
		y: 33.716194252057434,
	},
];

const INITIAL_BUILDING = {
	name: "New building",
	admin: "",
};

const INITIAL_FLOOR = {
	name: "New floor",
	admin: "",
	users: [],
};

const INITIAL_GROUP = {
	title: "New group",
};

const INITIAL_PROJECT = {
	title: "New project",
	groupId: "",
};

const ROLE = ["member", "admin"];

const DEFAULT_SHAPE = {
	type: SHAPE_TYPE.rect,
	width: 150,
	height: 100,
	draggable: true,
	fill: null,
	rotation: 0,
	x: 100,
	y: 200,
	radius: 50,
	src: "",
	items: [],
	staff: null,
	floorId: null,
	projectId: null,
};

const ACTION_TYPE = {
	floor: "floor",
	group: "group",
	project: "project",
};

export {
	SHAPE_TYPE,
	INITIAL_SHAPE,
	INITIAL_BUILDING,
	DEFAULT_SHAPE,
	ROLE,
	INITIAL_FLOOR,
	INITIAL_GROUP,
	INITIAL_PROJECT,
	ACTION_TYPE,
};
