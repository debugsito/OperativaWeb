export default (name, data) => {
    console.log("data", data)
    return ({
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: "pie",
            height: "250px",//230px
        },
        colors: ["#A2EE37", "#FCB81A", "#F75470", "#7F85FD", "#373737", "#27EAF6", "#0F8DC3", "#C1953C", "#CBCAC8", "#9400D3"],
        title: {
            text: "<b>Total de postulantes registrados</b>",
            margin: 0,
            align: "left",
            style: {
                "color": "#222121",
                "fontFamily": "var(--fontFamily)"
            },
            x: 60
        },
        tooltip: {
            pointFormat: "{series.name}: <b>{point.y} personas</b>",
        },
        accessibility: {
            point: {
                valueSuffix: "%",
            },
        },
        legend: {

            title: {
                text: `${data && data.length > 0 ? "<b>Rubro de interés<b/>" : ""}`,
                style: {
                    "fontFamily": "var(--fontFamily)"
                },
            },
            align: "right",
            layout: "vertical",
            verticalAlign: "middle",
            x: 0,
            y: 0,
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
                data
                // data: [{
                //     name: 'Chrome',
                //     y: 61,
                //     // sliced: true,
                //     // selected: true
                // }, {
                //     name: 'Internet Explorer',
                //     y: 12
                // }, {
                //     name: 'Firefox',
                //     y: 11
                // }, {
                //     name: 'Edge',
                //     y: 5
                // }, {
                //     name: 'Safari',
                //     y: 5
                // }, {
                //     name: 'Other',
                //     y: 8
                // }],
            },
        ],
    })
};