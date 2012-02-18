$(document).ready(function() {
    changeForm('basic info')
    writeSelectData()
});

function addEducation() {
}

function addCompany() {
    
}

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
    
    console.log(data);
    
    $.post('http://nh2.me/cv/users/put/', data, function(ret) {
        
        });    
}

function changeForm(form) {
    $("#table1").css('display', 'none');
    $("#table2").css('display', 'none');
    $("#table3").css('display', 'none');
    $("#table4").css('display', 'none');
    $("#table5").css('display', 'none');
    
    console.log(form)
    
    if(form == 'basic info') {
        $("#table1").css('display', '');
        $("#input-title2").html('Basic Info');
    }
    else if(form == 'personal profile') {
        $("#table2").css('display', '');
        $("#input-title2").html('Personal Profile');
    }
    else if(form == 'skills & jobs') {
        $("#table3").css('display', '');
        $("#input-title2").html('Skills & Jobs');
    }
    else if(form == 'aspirations') {
        $("#table4").css('display', '');
        $("#input-title2").html('Aspirations');
    }
    else {
        $("#table5").css('display', '');
        $("#input-title2").html('Your Done');
    }
}
