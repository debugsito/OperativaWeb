export default (name, data) => ({
    chart: {
        type: 'bar'
    },
    title: {
        text: ''
    },
    xAxis: {
        categories: ['Muni Lima', 'Muni Callao', 'Muni SJL', 'Muni Yaullos', 'Muni', 'Muni', "Muni", "Muni", "Muni B", "Muni C"],
        title: {
            text: null
        }
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Registrados',
            align: 'high'
        },
        labels: {
            overflow: 'justify'
        }
    },
    // tooltip: {
    //     valueSuffix: ' millions'
    // },
    plotOptions: {
        bar: {
            dataLabels: {
                enabled: true
            }
        }
    },
    // legend: {
    //     layout: 'vertical',
    //     align: 'right',
    //     verticalAlign: 'top',
    //     x: -40,
    //     y: 80,
    //     floating: true,
    //     borderWidth: 1,
    //     backgroundColor:
    //         Highcharts.defaultOptions.legend.backgroundColor || '#FFFFFF',
    //     shadow: true
    // },
    credits: {
        enabled: false
    },
    series: [{
        name: 'TOP 10',
        data,
    }
    ]
})