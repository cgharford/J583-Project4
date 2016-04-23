// D3 custum pie chart
function createPieChart(type, element) {
    if (element == null) {
        $('#race').addClass("category-button-active");
    }
    else {
        $('.category-button').removeClass("category-button-active");
        $(element).addClass("category-button-active");
    }

    var w = window.innerWidth * .45;
    var h = w;
    var r = h/2;
    var colors = [
        "#8A0917",
        "#ACCFCC",
        "#FFFFFF",
        "#595241",
        "#C7B791",
        "#B00B1D",
        "#94B2B0",
        "#D1D1D1",
        "#8C8166",
        "#5E0610",
        "#5D706F",
        "#949494"
    ];

    var labels = [];
    var counts = [];
    var data = [];

    for (i = 0; i < victims.length; i++) {
        if (!labels.includes(victims[i][type])) {
            labels.push(victims[i][type]);
            counts[labels.indexOf(victims[i][type])] = 1;
        }
        else {
            counts[labels.indexOf(victims[i][type])] += 1;
        }
    }

    for (i = 0; i < labels.length; i++) {
        data.push({"label": labels[i], "value": counts[labels.indexOf(labels[i])]});
    }

    $('#chart').empty();

    var vis = d3.select('#chart')
        .append("svg:svg")
        .data([data])
        .attr("width", w)
        .attr("height", h)
        .append("svg:g")
        .attr("transform", "translate(" + r + "," + r + ")");


    var pie = d3.layout.pie()
        .value(function(d) {
            return d.value;}
        );

    // declare an arc generator function
    var arc = d3.svg.arc().outerRadius(r);

    // select paths, use arc generator to draw
    var arcs = vis.selectAll("g.slice")
        .data(pie).enter()
        .append("svg:g")
        .attr("class", "slice");

    arcs.append("svg:path")
        .attr("fill", function(d, i){
            return colors[i % colors.length];
        })
        .attr("d", function (d) {
            return arc(d);
        })
        .attr("class", "pie-slice");

    // add the text
    arcs.append("svg:text")
        .attr("transform", function(d) {
            d.innerRadius = 0;
            d.outerRadius = r;
            return "translate(" + arc.centroid(d) + ")";
        })
        .attr("text-anchor", "middle").text( function(d, i) {
            return data[i].label;
        }
        // .attr("class", "invisible")
    );
}

createPieChart("Race", null)
