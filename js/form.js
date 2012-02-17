$(document).ready(function() {
    
    writeSelectData()
});

function writeSelectData() {

    for(var year = 1900;year <= 2011;++year) {
        
        var option = $('<option>' + year + '</option>');
        $("#b_year").append(option); 
    }
 
    for(var month = 1;month <= 12;++month) {
        
        var option = $('<option>' + month + '</option>');
        $("#b_month").append(option); 
    }
    
    for(var day = 1;day <= 31;++day) {
        
        var option = $('<option>' + day + '</option>');
        $("#b_day").append(option); 
    }
}

function submitData() {
    var data = {}
    
    data['day'] = $('#b_day option:selected').text();
    data['year'] = $('#b_year option:selected').text();
    data['month'] = $('#b_month option:selected').text();
    data['pass'] = $('#pass').val();
    data['fname'] = $('#fname').val();
    data['lname'] = $('#lname').val();
    data['email'] = $('#email').val();
    data['pass'] = $('#pass').val();
    
    $.each(data, function(attr, val) {
        console.log(attr + ' > ' + val)
    });
}