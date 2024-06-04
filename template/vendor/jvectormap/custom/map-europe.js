// Europe
$(function(){
	$('#mapEurope').vectorMap({
		map: 'europe_mill',
		zoomOnScroll: false,
		series: {
			regions: [{
				values: gdpData,
				scale: ['#da1113', '#e5e8f2'],
				normalizeFunction: 'polynomial'
			}]
		},
		backgroundColor: '#ffffff',
	});
});