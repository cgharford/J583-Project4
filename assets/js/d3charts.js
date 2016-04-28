function getLabels(type) {
    var labels = [];

    for (i = 0; i < victims.length; i++) {
        if (!labels.includes(victims[i][type])) {
            labels.push(victims[i][type]);
        }
    }

    return labels;
}

function sortDataByType(type, ageRange) {
    var labels = [];
    var counts = [];
    var data = [];

    for (i = 0; i < victims.length; i++) {
        if (!labels.includes(victims[i][type])) {
            if (ageRange != null) {
                age = victims[i]["Age"]
                if (age >= ageRange[0] && age <= ageRange[1]) {
                    labels.push(victims[i][type]);
                    counts[labels.indexOf(victims[i][type])] = 1;
                }
            }
            else {
                labels.push(victims[i][type]);
                counts[labels.indexOf(victims[i][type])] = 1;
            }
        }
        else {
            if (ageRange != null) {
                age = victims[i]["Age"]
                if (age >= ageRange[0] && age <= ageRange[1]) {
                    counts[labels.indexOf(victims[i][type])] += 1;
                }
            }
            else {
                counts[labels.indexOf(victims[i][type])] += 1;
            }
        }
    }

    for (i = 0; i < labels.length; i++) {
        data.push({"label": labels[i], "value": counts[labels.indexOf(labels[i])]});
    }

    return data;
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

    var labels = getLabels(type);
    var data = sortDataByType(type, null);

    html = "";
    for (i = 0; i < labels.length; i++) {
        html += '<i class="fa fa-lg fa-circle" aria-hidden="true" style="color:' + colors[i % colors.length] + ';"></i>';
        html += '<span class="circle">' + labels[i] + '</span>';
    }
    $('#chart-labels').empty();
    $('#chart-labels').append(html);

    $('#pie-chart').empty();

    var vis = d3.select('#pie-chart')
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

function createBarChart() {
    var type = "Age"
    var w = window.innerWidth;

    var data = [
        {"label": "5-9", "value": 0},
        {"label": "10-14", "value": 0},
        {"label": "15-19", "value": 0},
        {"label": "20-24", "value": 0},
        {"label": "25-29", "value": 0},
        {"label": "30-34", "value": 0},
        {"label": "35-39", "value": 0},
        {"label": "40-44", "value": 0},
        {"label": "45-49", "value": 0},
        {"label": "50-54", "value": 0},
        {"label": "55-59", "value": 0},
        {"label": "60-64", "value": 0},
        {"label": "65-69", "value": 0},
        {"label": "70-74", "value": 0},
        {"label": "75-79", "value": 0},
    ];

    for (i = 0; i < victims.length; i++) {
        if (victims[i][type] >= 5 && victims[i][type] <= 9) {
            data[0]["value"] += 1;
        }
        if (victims[i][type] >= 10 && victims[i][type] <= 14) {
            data[1]["value"] += 1;
        }
        if (victims[i][type] >= 15 && victims[i][type] <= 19) {
            data[2]["value"] += 1;
        }
        if (victims[i][type] >= 20 && victims[i][type] <= 24) {
            data[3]["value"] += 1;
        }
        if (victims[i][type] >= 25 && victims[i][type] <= 29) {
            data[4]["value"] += 1;
        }
        if (victims[i][type] >= 30 && victims[i][type] <= 34) {
            data[5]["value"] += 1;
        }
        if (victims[i][type] >= 35 && victims[i][type] <= 39) {
            data[6]["value"] += 1;
        }
        if (victims[i][type] >= 40 && victims[i][type] <= 44) {
            data[7]["value"] += 1;
        }
        if (victims[i][type] >= 45 && victims[i][type] <= 49) {
            data[8]["value"] += 1;
        }
        if (victims[i][type] >= 50 && victims[i][type] <= 54) {
            data[9]["value"] += 1;
        }
        if (victims[i][type] >= 55 && victims[i][type] <= 59) {
            data[10]["value"] += 1;
        }
        if (victims[i][type] >= 60 && victims[i][type] <= 64) {
            data[11]["value"] += 1;
        }
        if (victims[i][type] >= 65 && victims[i][type] <= 69) {
            data[12]["value"] += 1;
        }
        if (victims[i][type] >= 70 && victims[i][type] <= 74) {
            data[13]["value"] += 1;
        }
    }

    var x = d3.scale.linear()
        .domain([0, w * .6])
        .range([0, 1400]);

    var chart = d3.select("#bar-chart");

    var bars = chart.selectAll("div")
        .data(data)
        .enter()
        .append("div")
        .attr("class", "bar-container")

    bars.append("div")
        .data(data)
        .text(function(d) {
            return d.label;
        })
        .attr("class", "bar-label");

    bars.append("div")
        .data(data)
        .attr("class", "bars")
        .style("width", function(d) {
            return x(d.value) + "px";
        })
        .append("div")
        .text(function(d) {
            return ( 100 * (d.value / victims.length)).toFixed(2) + "%";
        })
        .attr("class", "bar-percentage");


}

function changeAgeStatistics(element) {
    if (element != null) {
        $("#age-label").text($(element).prev().text());
        var range = ($(element).prev().text()).split("-");
    }
    else {
        initialText = "25-29";
        $("#age-label").text(initialText);
        var range = (initialText).split("-");
    }

    var numberDeaths = 0;
    for (i = 0; i < victims.length; i++) {
        var age = victims[i]["Age"];
        if (age >= Number(range[0]) &&  age <= Number(range[1])) {
            numberDeaths++;
        }
    }
    $("#age-number-deaths").text(numberDeaths);


    var armedData = sortDataByType("Was the deceased armed?", range);
    indexArmed = 0;
    for (i = 0; i < armedData.length; i++) {
        if (armedData[i].label == "Yes") {
            indexArmed = i;
            break;
        }
    }
    var numberArmed = armedData[indexArmed].value;
    var totalInRange = 0;
    for (i = 0; i < victims.length; i++) {
        if (victims[i]["Age"] >= range[0] && victims[i]["Age"] <= range[1]) {
            totalInRange++;
        }
    }
    numberArmed = ((numberArmed / totalInRange) * 100).toFixed(2);
    $("#age-percentage-armed").text(numberArmed + "%");

    var raceData = sortDataByType("Race", range);
    var maxValue = 0;
    var maxIndex = 0;
    for (i = 0; i < raceData.length; i++) {
        if (raceData[i].value > maxValue) {
            maxValue = raceData[i].value;
            maxIndex = i;
        }
    }
    $("#age-common-race").text(raceData[maxIndex].label);

    var officerData = sortDataByType("Was the officer involved fired or suspended?", range);
    indexPunished = 0;
    for (i = 0; i < officerData.length; i++) {
        if (officerData[i].label == "Yes") {
            indexPunished = i;
            break;
        }
    }
    var numberPunished = officerData[indexPunished].value;
    numberPunished = ((numberPunished / totalInRange) * 100).toFixed(2);
    $("#age-officer-punished").text(numberPunished + "%");
}

createPieChart("Race", null);
createBarChart();
changeAgeStatistics(null);

// FIX ME LATER....
$(".pie-text").mouseover(function() {
    $(this).prev().css("fill", "#ccc;");
});

$(".bars").click(function() {
    $(".bars").removeClass("selected-bar")
    $(".bars").css("background-color", "#ACCFCC")
    $(this).addClass("selected-bar");
    $(this).css("background-color", "#8a0917");
    changeAgeStatistics(this);
});

$(".bars").mouseover(function() {
    if (!($(this).hasClass("selected-bar"))) {
        $(this).css("background-color", "#eee");
    }
});

$(".bars").mouseout(function() {
    if (!($(this).hasClass("selected-bar"))) {
        $(this).css("background-color", "#ACCFCC");
    }
});
