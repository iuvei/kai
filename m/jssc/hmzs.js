function showChartline(title, data, mingzi, ymin, ymax, container,name) {
	
	var categories = [];
	var datas = [];
	var results = [];
	$.each(data, function(i, n) {
		categories[i] = n[0];
		datas[i] = parseInt(n[1]);
		results[n[0]] = n[2];
	});
	var options = {
		chart: {
			type: 'line',
			renderTo: container || 'container',
			defaultSeriesType: 'spline'
		},
		title: {
			text: title
		},
		xAxis: {
			gridLineWidth: 1,
			categories: categories,
			labels: {
                format: '{value}期'
            }
		},
		yAxis: {
			
			allowDecimals:false,
			//minorTickInterval: 1,
            tickPixelInterval: 1,
			title: {
				text: "",
			},
			min: ymin,
			max: ymax,
			labels: {
                format: '{value}号',
            }
		},
	 legend: { enabled: false },//年份隐藏与显示
		tooltip: {
			shared: true,
			style: {
				'fontSize': '14px',
				'fontWeight': 'bold',
				'z-index:': '10000'
			},
			useHTML: true,
			formatter: function() {
				return "<div style='text-align:center;'>" + name + "：" + this.x + "期  开出：" + this.y + "号</div>" + results[this.x]
			}
		},
		plotOptions: {
			line: {
				dataLabels: {
					enabled: true
				},
			}
		},
		series: [{
			data: datas,
		}]
	};
	$(function() {
		var chart = new Highcharts.Chart(options)
	})
}