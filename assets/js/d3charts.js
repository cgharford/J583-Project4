// D3 component of application

// Initially create pie chat and bar chart with pre-selected values (understood
//by null) to give users a sense of how the application works
createPieChart("Race", null);
createBarChart();
changeAgeStatistics(null);

// When the window resizes, reload d3 graphs for responsiveness and declare
// jQuery functionality for the graphs
$(window).resize(function() {
    createPieChart("Race", null);
    createBarChart();

    // When bar graph is clicked, change its color and change statistic information
    // in side box
    $(".bars").click(function() {
        $(".bars").removeClass("selected-bar")
        $(".bars").css("background-color", "#ACCFCC")
        $(this).addClass("selected-bar");
        $(this).css("background-color", "#8a0917");
        changeAgeStatistics(this);
    });

    // Different color on hover
    $(".bars").mouseover(function() {
        if (!($(this).hasClass("selected-bar"))) {
            $(this).css("background-color", "#eee");
        }
    });

    // Different color off hover
    $(".bars").mouseout(function() {
        if (!($(this).hasClass("selected-bar"))) {
            $(this).css("background-color", "#ACCFCC");
        }
    });
});

// Helper function that gets desired labels based on a field
function getLabels(type) {
    var labels = [];

    for (i = 0; i < victims.length; i++) {
        if (!labels.includes(victims[i][type])) {
            labels.push(victims[i][type]);
        }
    }
    return labels;
}

// Helper function that
function sortDataByType(type, ageRange) {
    var labels = [];
    var counts = [];
    var data = [];

    // Iterate over entire deceased list
    for (i = 0; i < victims.length; i++) {
        // If this is not the first time seeing this label, increment the frequency
        if (!labels.includes(victims[i][type])) {
            // If this is for the bar graph component
            if (ageRange != null) {
                age = victims[i]["Age"]
                if (age >= ageRange[0] && age <= ageRange[1]) {
                    labels.push(victims[i][type]);
                    counts[labels.indexOf(victims[i][type])] = 1;
                }
            }
            // If this is for the pie graph component
            else {
                labels.push(victims[i][type]);
                counts[labels.indexOf(victims[i][type])] = 1;
            }
        }
        // If this is the first time seeing this label
        else {
            // If this is for the bar graph component
            if (ageRange != null) {
                age = victims[i]["Age"]
                if (age >= ageRange[0] && age <= ageRange[1]) {
                    counts[labels.indexOf(victims[i][type])] += 1;
                }
            }
            // If this is for the pie graph component
            else {
                counts[labels.indexOf(victims[i][type])] += 1;
            }
        }
    }

    // Create main data array based on our labels and counts array
    for (i = 0; i < labels.length; i++) {
        data.push({"label": labels[i], "value": counts[labels.indexOf(labels[i])]});
    }

    return data;
}

// Creates pie chart using d3
function createPieChart(type, element) {
    // If this is initial time loading pie chart, default to race category
    if (element == null) {
        $('#race').addClass("category-button-active");
    }
    // If this was called via a user's click, change the button's appearance to reflect
    // active state
    else {
        $('.category-button').removeClass("category-button-active");
        $(element).addClass("category-button-active");
    }

    // Check window width for responsiveness
    if (window.innerWidth < 900) {
        var w = window.innerWidth * .82;
    }
    else {
        var w = window.innerWidth * .45;
    }

    // Set width, height, and radius
    var h = w;
    var r = h/2;

    // Set array of default colors to cycle through
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

    // Get labels for the given fields
    var labels = getLabels(type);
    // Get full list of labels and values
    var data = sortDataByType(type, null);

    // Build labels with icon color codes above pie chart for user to match the color and value
    html = "";
    for (i = 0; i < labels.length; i++) {
        html += '<i class="fa fa-lg fa-circle" aria-hidden="true" style="color:' + colors[i % colors.length] + ';"></i>';
        html += '<span class="circle">' + labels[i] + '</span>';
    }
    $('#chart-labels').empty();
    $('#chart-labels').append(html);

    $('#pie-chart').empty();

    // Append svg to pie chart element
    var vis = d3.select('#pie-chart')
        .append("svg:svg")
        .data([data])
        .attr("width", w)
        .attr("height", h)
        .append("svg:g")
        .attr("transform", "translate(" + r + "," + r + ")");

    // Use d3 pie chart layout
    var pie = d3.layout.pie()
        .value(function(d) {
            return d.value;}
        );

    // Use an arc generator function
    var arc = d3.svg.arc()
        .outerRadius(r)
        .innerRadius(r - 200);

    // Select paths from pie slices and generates arcs
    var arcs = vis.selectAll("g.slice")
        .data(pie)
        .enter()
        .append("svg:g")
        .attr("class", "slice")
        .attr("id", function(d, i){
            return i;
        });

    // Add paths using arcs generated
    arcs.append("svg:path")
        // Cycle through colors array
        .attr("fill", function(d, i){
            return colors[i % colors.length];
        })
        .attr("d", function (d) {
            return arc(d);
        })
        .attr("class", "pie-slice")
        .style("stroke", "#AAAAAA")

    // Add percentage labels to pie slices of they will will visually fit
    arcs.append("text")
        .attr("transform", function(d) {
            return "translate(" + arc.centroid(d) + ")";
        })
        // Add unique id to text element
        .attr("id", function(d, i){
            return "text-" + i;
        })
        // Generate percentage label based on the values from the data
        .text( function(d, i) {
            return (100 * (data[i].value / victims.length)).toFixed(0)  + "%";
        })
        // Whether or not the label displays depends on how big the percentage is
        .style('opacity', function (d, i) {
            percentage = (100 * (data[i].value / victims.length)).toFixed(0);
            // Take into account screen size
            if (window.innerWidth < 500) {
                if (percentage < 6) {
                    return 0;
                }
            }
            else if (percentage < 2) {
                return 0;
            }
            else {
                return 1;
            }
        })
        // Set font-size based on percentage...the higher, the bigger
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

// Creates a bar graph using d3
function createBarChart() {
    // Focus of bar graph is age frequency
    var type = "Age"
    // Set ultiplier for bar chart based on screen size for responsiveness
    var w = window.innerWidth;
    var multiplier = 0;
    if (w > 1395) {
        multiplier = .6;
    }
    else if (w <= 1395 && w > 1220) {
        multiplier = .9;
    }
    else if (w <= 1220 && w > 1200) {
        multiplier = 1.1;
    }
    else if (w <= 1200 && w > 950) {
        multiplier = .8;
    }
    else if (w <= 950 && w > 890) {
        multiplier = .9;
    }
    else if (w <= 890 && w > 800) {
        multiplier = 1.2;
    }
    else if (w <= 800 && w > 750) {
        multiplier = 1.4;
    }
    else if (w <= 750 && w > 700) {
        multiplier = 1.7;
    }
    else if (w <= 700 && w > 670) {
        multiplier = 1.9;
    }
    else if (w <= 670 && w > 600) {
        multiplier = 2.3;
    }
    else if (w <= 600 && w > 500) {
        multiplier = 4;
    }
    else if (w <= 500 && w > 470) {
        multiplier = 6;
    }
    else {
        multiplier = 9;
    }

    // Set age ranges and labels for bar graph
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

    // Iterate through deceased list and tally individuals in each age range
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

    // Create a linear scale based on the screen size
    var x = d3.scale.linear()
        .domain([0, w * multiplier])
        .range([0, 1400]);

    $("#bar-chart").empty();
    var chart = d3.select("#bar-chart");

    // Create bar containers for different sized bars and labels
    var bars = chart.selectAll("div")
        .data(data)
        .enter()
        .append("div")
        .attr("class", "bar-container")

    // Put labels for each age range on each bar
    bars.append("div")
        .data(data)
        .text(function(d) {
            return d.label;
        })
        .attr("class", "bar-label");

    // Make widths of the bars correspond to the frequencies
    bars.append("div")
        .data(data)
        .attr("class", "bars")
        .style("width", function(d) {
            return x(d.value) + "px";
        })
        // Put percentage on the end of each bar
        .append("div")
        .text(function(d) {
            return ( 100 * (d.value / victims.length)).toFixed(2) + "%";
        })
        .attr("class", "bar-percentage");
}

// Changes informational box on the side when user clicks on a different age range
function changeAgeStatistics(element) {
    // If user cllicked on a bar, get age range for that bar
    if (element != null) {
        $("#age-label").text($(element).prev().text());
        var range = ($(element).prev().text()).split("-");
    }
    // Otherwise, this is the initial load and user default age range
    else {
        initialText = "25-29";
        $("#age-label").text(initialText);
        var range = (initialText).split("-");
    }

    // Compute the total number of deaths for the age range and add to page
    var numberDeaths = 0;
    for (i = 0; i < victims.length; i++) {
        var age = victims[i]["Age"];
        if (age >= Number(range[0]) &&  age <= Number(range[1])) {
            numberDeaths++;
        }
    }
    $("#age-number-deaths").text(numberDeaths);

    // Computer the total percentage of individuals who were armed bofore being killed
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

    // Compute the most common race killed for the given age range
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

    // Compute the percentage of officers who were suspended or fired due to the incident
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

// jQuery functionality must be declared twice because of window resize

// When bar graph is clicked, change its color and change statistic information
// in side box
$(".bars").click(function() {
    $(".bars").removeClass("selected-bar")
    $(".bars").css("background-color", "#ACCFCC")
    $(this).addClass("selected-bar");
    $(this).css("background-color", "#8a0917");
    changeAgeStatistics(this);
});

// Different color on hover
$(".bars").mouseover(function() {
    if (!($(this).hasClass("selected-bar"))) {
        $(this).css("background-color", "#eee");
    }
});

// Different color off hover
$(".bars").mouseout(function() {
    if (!($(this).hasClass("selected-bar"))) {
        $(this).css("background-color", "#ACCFCC");
    }
});
