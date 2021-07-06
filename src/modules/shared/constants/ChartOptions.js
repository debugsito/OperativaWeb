export default (name, data, colors) => ({
    chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: "pie",
        height: "240rem",//230px
    },
    colors: colors,//["#CBCAC8", "#A2EE37", "#FCB81A", "#F75470", "#7F85FD", "#373737"],
    title: {

    },
    tooltip: {
        pointFormat: "{series.name}: <b>{point.y} personas</b> ",
    },
    accessibility: {
        point: {
            valueSuffix: "%",
        },
    },
    legend: {
        title: {
            text: "<b>Rubro de interés<b/>"
        },
        align: "right",
        layout: "vertical",
        verticalAlign: "middle",
        width: '40%',
        labelFormatter: function () {
            return `${Math.round(this.percentage)}% - ${this.name}`
        }
    },
    plotOptions: {
        pie: {
            size: "100%",
            allowPointSelect: true,
            cursor: "pointer",
            dataLabels: {
                enabled: false,
            },
            showInLegend: true,
        },
    },
    series: [
        {
            name,
            colorByPoint: true,
            data,
        },
    ],

    // responsive: {
    //     rules: [{
    //         condition: {
    //             maxWidth: 600,
    //             // maxHeight: 500,
    //         },
    //         chartOptions: {
    //             legend: {
    //                 width: '100%',
    //                 align: 'center',
    //                 verticalAlign: 'bottom',
    //                 layout: 'horizontal',
    //             },
    //             subtitle: {
    //                 text: null
    //             },
    //             credits: {
    //                 enabled: false
    //             }
    //         }
    //     }]
    // }

});