//Flot Moving Line Chart

$(function() {

    var container = $("#flot-line-chart-moving");

    // Determine how many data points to keep based on the placeholder's initial size;
    // this gives us a nice high-res plot while avoiding more than one point per pixel.

    var maximum = container.outerWidth() / 2 || 300;

    //

    var data = [];
    var data2 = [];

    function getRandomData() {

        if (data.length) {
            data = data.slice(1);
        }

        while (data.length < maximum) {
            var previous = data.length ? data[data.length - 1] : 50;
            var y = previous + Math.random() * 100 - 50;
            data.push(y < 0 ? 0 : y > 2000 ? 2000 : y);
        }

        // zip the generated y values with the x values

        var res = [];
        for (var i = 0; i < data.length; ++i) {
            res.push([i, data[i]])
        }

        return res;
    }

    function getRandomData2() {

        if (data2.length) {
            data2 = data2.slice(1);
        }

        while (data2.length < maximum) {
            var previous = data2.length ? data2[data2.length - 1] : 50;
            var y = previous + Math.random() * 100 - 50;
            data2.push(y < 0 ? 0 : y > 2000 ? 2000 : y);
        }

        // zip the generated y values with the x values

        var res = [];
        for (var i = 0; i < data2.length; ++i) {
            res.push([i, data2[i]])
        }

        return res;
    }

    //

    series = [{
        data: getRandomData(),
        label: "Local data",
        lines: {
            fill: true
        }
    }, {
        data: getRandomData2(),
        label: "Drone data",
        lines: {
            fill: false
        }
    }];

    var plot = $.plot(container, series, {
        grid: {
            borderWidth: 1,
            minBorderMargin: 20,
            labelMargin: 10,
            backgroundColor: {
                colors: ["#fff", "#e4f4f4"]
            },
            margin: {
                top: 8,
                bottom: 20,
                left: 20
            },
            markings: function(axes) {
                var markings = [];
                var xaxis = axes.xaxis;
                for (var x = Math.floor(xaxis.min); x < xaxis.max; x += xaxis.tickSize * 2) {
                    markings.push({
                        xaxis: {
                            from: x,
                            to: x + xaxis.tickSize
                        },
                        color: "rgba(232, 232, 255, 0.2)"
                    });
                }
                return markings;
            }
        },
        xaxis: {
            tickFormatter: function() {
                return "";
            }
        },
        yaxis: {
            min: 0,
            max: 2200
        },
        legend: {
            show: true
        }
    });

    // Update the random dataset at 25FPS for a smoothly-animating chart

    setInterval(function updateRandom() {
        series[0].data = getRandomData();
        series[1].data = getRandomData2();
        plot.setData(series);
        plot.draw();
    }, 40);

});
