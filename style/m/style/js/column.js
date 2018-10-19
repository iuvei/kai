function showChartline(title, data, name,id) {
	var categories = [];
	var counts = [];
	var results = [];
	$.each(data, function(i, n) {
		categories[i] = n[0];
		counts[i] = parseInt(n[1]);
		results[n[0]] = n[2]
	});
	var options = {
		chart: {
			type: 'column',
			renderTo: id,
		},
		title: {
			text: title
		},
		xAxis: {
			categories: categories,
			labels: {
                format: '{value}号'
            }
		},
		yAxis: {
			min: 1,
			title: {
				text: ''
			}
		},
		legend: {
			enabled: false
		},
		tooltip: {
			shared: true,
			style: {
				'fontSize': '14px',
				'fontWeight': 'bold',
				'z-index:': '10000'
			},
			useHTML: true,
			formatter: function() {
				return "<div style='text-align:center;'>" + name + "：" + this.x + "号  开出：" + this.y + "期</div>" 
			}
		},
		plotOptions: {
			column: {
				pointPadding: 0,
				borderWidth: 0,
				dataLabels: {
					enabled: true,
					style: {
						'fontSize': '14px',
						'fontWeight': 'bold'
					}
				},
				
			}
		},
	
		series: [{
			data: counts,
			colorByPoint:true,
		
		}],
		lang: {
			noData: "无该阶段数据,请扩大数据范围"
		},
		noData: {
			style: {
				fontSize: '12px',
				color: '#999'
			}
		}
	};
	$(function() {
		var chart = new Highcharts.Chart(options);
		$.each(['column', 'bar'], function(i, type) {
			$('.change[index=' + type + ']').click(function() {
				options.chart.type = type;
				chart = new Highcharts.Chart(options)
			})
		})
	})
}