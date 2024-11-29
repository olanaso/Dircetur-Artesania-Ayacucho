import { loadPartials } from '../utils/viewpartials';
import { hideLoading, checkSession, llenarinformacionIESTPProg, marcarSubMenuSeleccionado } from '../utils/init'
import { } from '../utils/config'
import { getreportegeneral, obtenerEstadisticas } from './api'


hideLoading();
// Uso de la función
(async function () {
	let partials = [
		{ path: 'partials/shared/header.html', container: 'app-header' },
		{ path: 'partials/shared/menu.html', container: 'app-side' },


	];
	try {
		await loadPartials(partials);
		import('../utils/common')


		// Aquí coloca el código que deseas ejecutar después de que todas las vistas parciales se hayan cargado.
		console.log('Las vistas parciales se han cargado correctamente!');
		// Por ejemplo, podrías iniciar tu aplicación aquí.

		startApp();
	} catch (e) {
		console.error(e);
	}
})();

function startApp () {
	validarSession();
	llenarinformacionIESTPProg();
	// marcarSubMenuSeleccionado();

	generarEstadisticas();
}
var editreporte = null;
let usuario = null;
async function validarSession () {
	let result = await checkSession()
	console.log(result)
	if (result.isvalid) {
		usuario = result.usuarios;
		visualizarreporteGeneral();

	} else {
		location.href = "sinacceso.html"
	}
}


function llenarinformacion (datos) {
	let usuario = getDataFromLocalStorage('session').usuarios;

}



async function visualizarreporteGeneral () {
	editreporte = await getreportegeneral();
	const idtotal = document.getElementById("id_total");
	idtotal.innerText = editreporte[0].producto;

	const identregado = document.getElementById("id_entregado");
	identregado.innerText = editreporte[0].usuario;

	const idpendiente = document.getElementById("id_pendiente");
	idpendiente.innerText = editreporte[0].artesano;

	const idproceso = document.getElementById("id_proceso");
	idproceso.innerText = editreporte[0].categoria;


}


$(function () {

	var d1, data, chartOptions;

	var d1 = [[1262304000000, 11], [1264982400000, 76], [1267401600000, 1092], [1270080000000, 2234], [1272672000000, 7765], [1275350400000, 1763]];

	data = [{
		label: "Vistas",
		data: d1
	}];

	chartOptions = {
		xaxis: {
			min: (new Date(2009, 11)).getTime(),
			max: (new Date(2010, 11)).getTime(),
			mode: "time",
			tickSize: [1, "month"],
			monthNames: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
			tickLength: 0
		},
		yaxis: {

		},
		series: {
			lines: {
				show: true,
				fill: false,
				lineWidth: 2,
			},
			points: {
				show: true,
				radius: 4,
				fill: true,
				fillColor: "#ffffff",
				lineWidth: 2
			}
		},
		grid: {
			hoverable: true,
			clickable: true,
			borderWidth: 1,
			tickColor: '#f5f6fa',
			borderColor: '#f5f6fa',
		},
		shadowSize: 0,
		legend: {
			show: true,
			position: 'nw'
		},
		tooltip: true,
		tooltipOpts: {
			content: '%s: %y'
		},
		colors: ['#007ae1', '#e5e8f2', '#ff5661'],
	};

	var holder = $('#line-chart');

	if (holder.length) {
		$.plot(holder, data, chartOptions);
	}
});

$(function () {

	var d1, data, chartOptions;

	d1 = [
		[1325376000000, 1200], [1328054400000, 700], [1330560000000, 1000], [1333238400000, 600],
		[1335830400000, 350]
	];

	data = [{
		label: 'Clicks',
		data: d1
	}];

	chartOptions = {
		xaxis: {
			min: (new Date(2011, 11, 15)).getTime(),
			max: (new Date(2012, 6, 18)).getTime(),
			mode: "time",
			tickSize: [2, "month"],
			monthNames: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
		},
		grid: {
			hoverable: true,
			clickable: false,
			borderWidth: 1,
			tickColor: '#f5f6fa',
			borderColor: '#f5f6fa',
		},
		bars: {
			show: true,
			barWidth: 48 * 24 * 60 * 60 * 300,
			fill: true,
			lineWidth: 1,
			order: true,

			fillColor: { colors: [{ opacity: 1 }, { opacity: 1 }] }
		},
		shadowSize: 0,
		tooltip: true,
		tooltipOpts: {
			content: '%s: %y'
		},
		colors: ['#007ae1', '#e5e8f2', '#ff5661'],
	}
	var holder = $('#vertical-chart');
	if (holder.length) {
		$.plot(holder, data, chartOptions);
	}
});

$(function () {
	var data24Hours = [
		[0, 10], [1, 120], [2, 200], [3, 300], [4, 157], [5, 78], [6, 58], [7, 428], [8, 194], [9, 38], [10, -188], [11, -214], [12, -364],
		[13, 49], [14, 8], [15, 82]
	];


	var ticks = [
		[0, "22h"], [1, ""], [2, "00h"], [3, ""], [4, "02h"], [5, ""], [6, "04h"], [7, ""], [8, "06h"], [9, ""], [10, "08h"],
		[11, ""], [12, "10h"], [13, ""], [14, "12h"], [15, ""]
	];

	var data = [{
		label: "Last 24 Hours",
		data: data24Hours,
		lines: {
			show: true, lineWidth: 2
		},
		points: {
			show: true,
			radius: 4,
			fill: true,
			fillColor: "#ffffff",
			lineWidth: 3
		}
	}];

	var options = {
		series: {
			shadowSize: 0,
			bars: {
				lineWidth: 2,
			}
		},
		xaxis: {
			ticks: ticks
		},
		grid: {
			hoverable: true,
			clickable: false,
			borderWidth: 1,
			tickColor: '#f5f6fa',
			borderColor: '#f5f6fa',
		},
		legend: {
			show: true,
			position: 'se',
			noColumns: 0, //In single row
			// labelBoxBorderColor: "#000000",
			// container: $("#legendcontainer"),
		},
		tooltip: true,
		tooltipOpts: {
			content: '%x: %y'
		},
		colors: ['#e5e8f2', '#ff5661', '#007ae1'],
	};
	// var plot = $.plot($("#combineChartCompare"),
	// 	data
	// 	, options);
});


async function generarEstadisticas () {
	const jsonData = await obtenerEstadisticas();

	// Total Visitas Chart
	$('#total-visitas').text(jsonData.totalVisitas[0].total_visitas)

	// Usuarios Nuevos Chart
	const ctxUsuariosNuevos = document.getElementById('usuariosNuevosChart').getContext('2d');
	new Chart(ctxUsuariosNuevos, {
		type: 'bar',
		data: {
			labels: jsonData.usuariosNuevos.map(item => item.denominacion),
			datasets: [{
				label: 'Usuarios Nuevos',
				data: jsonData.usuariosNuevos.map(item => item.usuarios_nuevos),
				backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(153, 102, 255, 0.6)']
			}]
		},
		options: {
			responsive: true,
			plugins: {
				legend: {
					position: 'top',
					labels: {
						font: {
							size: 16 
						}
					}
				},
				title: {
					display: true,
					text: 'Ultimos usuarios agregados en el último mes',
					font: {
						size: 16
					}
				}
			},
			scales: {
				x: {
					ticks: {
						font: {
							size: 14 
						}
					}
				},
				y: {
					ticks: {
						font: {
							size: 14
						}
					}
				}
			}
		}
	});

	// Accesos por Hora Chart
	const ctxAccesosPorHora = document.getElementById('accesosPorHoraChart').getContext('2d');
	new Chart(ctxAccesosPorHora, {
		type: 'line',
		data: {
			labels: jsonData.accesosPorHora.map(item => item.horaacceso + 'h'),
			datasets: [{
				label: 'Total Accesos',
				data: jsonData.accesosPorHora.map(item => item.total_accesos),
				fill: false,
				borderColor: 'rgba(255, 99, 132, 0.6)',
				tension: 0.1
			}]
		},
		options: {
			responsive: true,
			plugins: {
				legend: {
					position: 'top',
					labels: {
						font: {
							size: 16 
						}
					}
				},
				title: {
					display: true,
					text: 'Horarios más visitados',
					font: {
						size: 16
					}
				}
			},
			scales: {
				x: {
					ticks: {
						font: {
							size: 14 
						}
					}
				},
				y: {
					ticks: {
						font: {
							size: 14
						}
					}
				}
			}
		}
	});

	// Demandas por Categoria Chart
	const demandasPorCategoriaData = jsonData.demandasPorCategoria.reduce((acc, curr) => {
		acc[curr.denominacion] = (acc[curr.denominacion] || 0) + curr.total_demandas;
		return acc;
	}, {});

	const ctxDemandasPorCategoria = document.getElementById('demandasPorCategoriaChart').getContext('2d');
	new Chart(ctxDemandasPorCategoria, {
		type: 'pie',
		data: {
			labels: Object.keys(demandasPorCategoriaData),
			datasets: [{
				data: Object.values(demandasPorCategoriaData),
				backgroundColor: ['rgba(255, 206, 86, 0.6)', 'rgba(75, 192, 192, 0.6)']
			}]
		},
		options: {
			responsive: false,
			plugins: {
				legend: {
					position: 'top',
					labels: {
						font: {
							size: 16 
						}
					}
				},
				title: {
					display: true,
					text: 'Categorías más demandadas',
					font: {
						size: 16
					}
				},
				
			},
		}
	});

	// Solicitudes por Artesano Chart
	const ctxSolicitudesPorArtesano = document.getElementById('solicitudesPorArtesanoChart').getContext('2d');
	new Chart(ctxSolicitudesPorArtesano, {
		type: 'bar',
		data: {
			labels: jsonData.solicitudesPorArtesano.map(item => item.artesano),
			datasets: [{
				label: 'Total Solicitudes',
				data: jsonData.solicitudesPorArtesano.map(item => item.total_solicitudes),
				backgroundColor: ['rgba(153, 102, 255, 0.6)']
			}]
		},
		options: {
			responsive: true,
			plugins: {
				legend: {
					position: 'top',
					labels: {
						font: {
							size: 16 
						}
					}
				},
				title: {
					display: true,
					text: 'Artesanos más demandados',
					font: {
						size: 16
					}
				}
			},
			scales: {
				x: {
					ticks: {
						font: {
							size: 14 
						}
					}
				},
				y: {
					ticks: {
						font: {
							size: 14
						}
					}
				}
			}
		}
	});

	generarTablaPalabrasClave(jsonData.palabrasClaveFrecuencia);

}


// Función para generar la tabla de Palabras Clave y Frecuencia
function generarTablaPalabrasClave (data) {
	let tableHTML = '<table class="table table-bordered">';
	tableHTML += '<thead class="thead-dark"><tr><th>Palabras Clave</th><th>Frecuencia</th></tr></thead>';
	tableHTML += '<tbody>';
	data.forEach(item => {
		tableHTML += `<tr><td>${item.palabrasclave}</td><td>${item.frecuencia}</td></tr>`;
	});
	tableHTML += '</tbody></table>';
	document.getElementById('tablaPalabrasClave').innerHTML = tableHTML;
}

// Generar la tabla con los datos de palabrasClaveFrecuencia
