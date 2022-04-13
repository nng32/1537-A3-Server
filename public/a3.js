unicornData = null;

function process_response(data) {
    console.log(data);
    unicornData = data;
    display();
}

function findUnicornByName() {
    console.log("findUnicornByName() was called")
    $.ajax(
        {
            url: "https://ump45-comp-1537-a3.herokuapp.com/findUnicornByName",
            type: "POST",
            data: {
                "unicornName": $("#unicornName").val()
            },
            success: process_response
        }
    )
    resetFilters();
    $('#filters').show();
}


function findUnicornByWeight() {
    console.log("findUnicornByWeight() was called")
    $.ajax(
        {
            url: "https://ump45-comp-1537-a3.herokuapp.com/findUnicornByWeight",
            type: "POST",
            data: {
                "unicornWeightLower": parseInt($("#lowerWeight").val()),
                "unicornWeightUpper": parseInt($("#upperWeight").val())
            },
            success: process_response
        }
    )
    resetFilters();
    $('#filters').show();
}

function findUnicornByFood() {
    appleIsChecked = "unchecked";
    carrotIsChecked = "unchecked";

    if($('#apple').is(":checked")) {
        appleIsChecked = "checked";
    }

    if($('#carrot').is(":checked")) {
        carrotIsChecked = "checked";
    }

    console.log("findUnicornByFood() was called")
    $.ajax(
        {
            url: "https://ump45-comp-1537-a3.herokuapp.com/findUnicornByFood",
            type: "POST",
            data: {
                "appleIsChecked": appleIsChecked,
                "carrotIsChecked": carrotIsChecked
            },
            success: process_response
        }
    )
    resetFilters();
    $('#filters').show();
}

function display() {
    dataObject = JSON.parse(unicornData);

    nameIsChecked = false;
    weightIsChecked = false;

    if ($('#unicornNameFilter').is(":checked")) {
        nameIsChecked = "checked";
    }

    if ($('#unicornWeightFilter').is(":checked")) {
        weightIsChecked = "checked";
    }

    displayResults = dataObject.map(unicorn => {
        result = [];

        if (nameIsChecked) {
            result.push(unicorn['name']);
        }

        if (weightIsChecked) {
            result.push(unicorn['weight']);
        }

        if (!nameIsChecked && !weightIsChecked) {
            result.push(JSON.stringify(unicorn));
        }

        return result;
    })

    $('#result').html(displayResults.toString());
}

function resetFilters() {
    $('#unicornNameFilter').prop('checked', false);
    $('#unicornWeightFilter').prop('checked', false);    
}

function setup() {
    $('#filters').hide();
    resetFilters();
    
    $('#findUnicornByName').click(findUnicornByName);
    $('#findUnicornByFood').click(findUnicornByFood);
    $('#findUnicornByWeight').click(findUnicornByWeight);
    $('#filter').click(display);
}

$(document).ready(setup);