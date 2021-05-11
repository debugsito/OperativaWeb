export default (name, data, colors) => ({
    chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: "pie",
        height: "230px",
    },
    colors: colors,//["#CBCAC8", "#A2EE37", "#FCB81A", "#F75470", "#7F85FD", "#373737"],
    title: {
        text: "",
    },
    tooltip: {
        pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>",
    },
    accessibility: {
        point: {
            valueSuffix: "%",
        },
    },
    legend: {
        align: "right",
        layout: "vertical",
        verticalAlign: "middle",
        x: 10,
        y: 0,
        labelFormatter: function () {
            return this.name + " " + Math.round(this.percentage) + "%";
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
});