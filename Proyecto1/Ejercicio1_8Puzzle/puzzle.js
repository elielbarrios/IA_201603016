// MIT License
// Copyright (c) 2021 Luis Espino



function heuristic(start, end, h) {
	console.log(start, end, h);
	if (h == 1) {
		var tiles_out = 0;
		for (var i = 0; i < start.length; i++) {
			if (start[i] != end[i] && start[i] !== "0") tiles_out++;
		}
		return tiles_out;
	} else if (h == 2) {
		// Manhattan
		var manh = 0;
		for (var i = 0; i < start.length; i++) {
			if (start.substring(i, i + 1) !== "0")
				manh += Math.abs(i - end.indexOf(start.substring(i, i + 1)));
		}
		return manh;
	}
}

function moveMatrix(matrix, zero, index) {
	const matrix_ = matrix.split("");
	const num = matrix[index];
	matrix_[zero] = num;
	matrix_[index] = "0";
	return matrix_.join("");
}


function successors(n, e, h) {
	let suc = [];
	const matrix = n[0];
	const zero = matrix.indexOf("0");
	let arr = [];

	switch (zero) {
		case 0: 
			arr.push(moveMatrix(matrix, zero, 1));
			arr.push(moveMatrix(matrix, zero, 3));
			break;
		case 1: 
			arr.push(moveMatrix(matrix, zero, 0));
			arr.push(moveMatrix(matrix, zero, 2));
			arr.push(moveMatrix(matrix, zero, 4));
			break;
		case 2: 
			arr.push(moveMatrix(matrix, zero, 1));
			arr.push(moveMatrix(matrix, zero, 5));
			break;
		case 3:
			arr.push(moveMatrix(matrix, zero, 0));
			arr.push(moveMatrix(matrix, zero, 4));
			arr.push(moveMatrix(matrix, zero, 6));
			break;
		case 4: 
			arr.push(moveMatrix(matrix, zero, 1));
			arr.push(moveMatrix(matrix, zero, 5));
			arr.push(moveMatrix(matrix, zero, 3));
			arr.push(moveMatrix(matrix, zero, 7));
			break;
		case 5:
			arr.push(moveMatrix(matrix, zero, 2));
			arr.push(moveMatrix(matrix, zero, 4));
			arr.push(moveMatrix(matrix, zero, 8));
			break;
		case 6:
			arr.push(moveMatrix(matrix, zero, 3));
			arr.push(moveMatrix(matrix, zero, 7));
			break;
		case 7: 
			arr.push(moveMatrix(matrix, zero, 4));
			arr.push(moveMatrix(matrix, zero, 6));
			arr.push(moveMatrix(matrix, zero, 8));
			break;
		case 8: 
			arr.push(moveMatrix(matrix, zero, 5));
			arr.push(moveMatrix(matrix, zero, 7));
			break;
	}
	arr.forEach((ar) => {
		suc.push([ar, heuristic(ar, e, h), inc()]);
	});
	suc = suc.sort((a, b) => a[1] - b[1]);
	suc = suc.slice(0, 2);
	return suc;
}


function bestfirst(start, end, h) {
	var cont = 0;
	var dot = "{";
	var list = [[start, heuristic(start, end, h), inc()]];
	dot += list[0][2] + ' [label="' + list[0][0] + '"];';
	while (list.length > 0) {
		var current = list.shift();
		if (current[0] == end) {
			dot += "}";
			return dot;
		}
		var temp = successors(current, end, h);
		temp.forEach(
			(val) =>
				(dot +=
					val[2] +
					' [label="' +
					val[0] +
					'"];' +
					current[2] +
					"--" +
					val[2] +
					' [label="' +
					val[1] +
					'"] ;')
		);
		list = list.concat(temp);
		list = list.sort(function (a, b) {
			return a[1] - b[1];
		});
		cont++;
		if (cont > 100) {
			alert("The search is looped!");
			dot += "}";
			return dot;
		}
	}
	dot += "}";
	return dot;
}

var id = 1;
function inc() {
	return id++;
}

function puzzle() {
	var nodes = prompt(
		"Ingrese la matriz inicial y heurstica (1 o 2) separados por un espacio, por ejemplo: 123460758 2"
	);
	if (nodes == null || nodes == "") nodes = "120463758 2";
	nodes = nodes.split(" ");
	return bestfirst(nodes[0], "123456780", nodes[1]);
}