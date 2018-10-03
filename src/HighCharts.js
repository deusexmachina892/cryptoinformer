export default function(){
    return {

    title: {
        text: 'Crypto Currency Data'
    },

    subtitle: {
        text: 'Source: cryptocompare.com'
    },

    yAxis: {
        title: {
            text: 'Price'
        }
    },
    xAxis:{
        type:'datetime'
    },
    legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle'
    },
    chart:{
        height: '400px'
    },
    plotOptions: {
        series: {
            label: {
                connectorAllowed: false
            },
            pointStart: 2010
        }
    },

    series: this.state.historical,

    responsive: {
        rules: [{
            condition: {
                maxWidth: 500
            },
            chartOptions: {
                legend: {
                    layout: 'horizontal',
                    align: 'center',
                    verticalAlign: 'bottom'
                }
            }
        }]
    }
};
}