<template>
	<div></div>
</template>

<script>
import Highcharts from 'highcharts';
import highchartsMore from 'highcharts/highcharts-more.js';
import highchartsNoData from 'highcharts-no-data-to-display';

highchartsMore(Highcharts);
highchartsNoData(Highcharts);

export default {
	name: 'highCharts',
	data() {
		return {
			chart: {}
		};
	},
	props: {
		options: {
			type: Object
		}
	},
	watch: {
		options: function(val) {
			this.render();
		}
	},
	mounted: function() {
		this.render();
	},
	methods: {
		render() {
			if (this.options && this.options.show) {
        this.options.credits = {
          enabled: false
        };
				this.addNoData();
				this.chart = new Highcharts.Chart(this.$el, this.options);
			}
		},
		addNoData() {
			this.options.lang = this.options.lang || {
				noData: '暂无有数据'
			};
			this.options.noData = this.options.noData || {
				style: {
					fontWeight: 'bold',
					fontSize: '24px'
				}
			};
		}
	}
};
</script>
