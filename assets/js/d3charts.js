// D3 custum pie chart
function pointIsInArc(pt, ptData, d3Arc) {
  // Center of the arc is assumed to be 0,0
  // (pt.x, pt.y) are assumed to be relative to the center
  var r1 = d3Arc.innerRadius()(ptData), // Note: Using the innerRadius
      r2 = d3Arc.outerRadius()(ptData),
      theta1 = d3Arc.startAngle()(ptData),
      theta2 = d3Arc.endAngle()(ptData);

  var dist = pt.x * pt.x + pt.y * pt.y,
      angle = Math.atan2(pt.x, -pt.y); // Note: different coordinate system.

  angle = (angle < 0) ? (angle + Math.PI * 2) : angle;

  return (r1 * r1 <= dist) && (dist <= r2 * r2) &&
         (theta1 <= angle) && (angle <= theta2);
}


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

    html = "";
    for (i = 0; i < labels.length; i++) {
        html += '<i class="fa fa-lg fa-circle" aria-hidden="true" style="color:' + colors[i % colors.length] + ';"></i>';
        html += '<span class="circle">' + labels[i] + '</span>';
    }
    $('#chart-labels').empty();
    $('#chart-labels').append(html);

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
    var arc = d3.svg.arc()
        .outerRadius(r)
        .innerRadius(r - 200);

    // select paths, use arc generator to draw
    var arcs = vis.selectAll("g.slice")
        .data(pie)
        .enter()
        .append("svg:g")
        .attr("class", "slice")
        .attr("id", function(d, i){
            return i;
        });

    arcs.append("svg:path")
        .attr("fill", function(d, i){
            return colors[i % colors.length];
        })
        .attr("d", function (d) {
            return arc(d);
        })
        .attr("class", "pie-slice")
        .style("stroke", "#AAAAAA")

    console.log(data);

    arcs.append("text")
        .attr("transform", function(d) {
            return "translate(" + arc.centroid(d) + ")";
        })
        .attr("id", function(d, i){
            return "text-" + i;
        })
        .text( function(d, i) {
            return (100 * (data[i].value / victims.length)).toFixed(0)  + "%";
        })
        .style('opacity', function (d, i) {
            percentage = (100 * (data[i].value / victims.length)).toFixed(0);
            if (percentage < 2) {
                return 0;
            }
            else {
                return 1;
            }
        })
        .style("font-size", function(d, i) {
            percentage = (100 * (data[i].value / victims.length)).toFixed(0);
            if (percentage >= 30) {
                return "40px";
            }
            if (percentage < 30 && percentage > 10) {
                return "25px";
            }
            else {
                return "5px;"
            }
        })
        .attr("class", "pie-text");
}

createPieChart("Race", null);

// $(".slice").mouseover(function() {
//     var id = $(this).get(0).id;
//     $("#text-" + id).css("opacity", 1)
// });
//
// $(".slice").mouseleave(function() {
//     var id = $(this).get(0).id;
//     $("#text-" + id).css("opacity", 0)
// });
