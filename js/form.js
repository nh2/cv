var completed = 'false';
var forms = ['basic info', 'personal profile', 'skills & jobs', 'aspirations', '', '']
var form_id = 0;

$(document).ready(function() {
    changeForm('basic info')
    writeSelectData()
});

function addEducation() {
}

function addCompany() {

}

function writeSelectData() {

    console.log(completed)

    //if(completed == 'true') {
        //To FIX:
        $('#fname').val( $('#name').val() );
        $('#lname').val( $('#name').val() );
        $('#email').val( $('#email').val() );
        $('#email2').val( $('#email').val() );
        $('#pass').val( $('#pass').val() );
    //}

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

    if(form == 'next_page') {
        completed = 'true';
        console.log(completed);

        window.location = '/form.html';
        $("#table1").css('display', '');
        $("#input-title2").html('Basic Info');
    }
    if(form == 'basic info') {
        form_id = 0;
        $("#table1").css('display', '');
        $("#input-title2").html('Basic Info');
    }
    else if(form == 'personal profile') {
        form_id = 1;
        $("#table2").css('display', '');
        $("#input-title2").html('Personal Profile');
    }
    else if(form == 'skills & jobs') {
        form_id = 2;
        $("#table3").css('display', '');
        $("#input-title2").html('Skills & Jobs');
    }
    else if(form == 'aspirations') {
        form_id = 3;
        $("#table4").css('display', '');
        $("#input-title2").html('Aspirations');
    }
    else {
        form_id = 4;
        $("#table5").css('display', '');
        $("#input-title2").html('You\'re Done');
    }
    
    //$('#button5').css('background-color', 'white');
}

function submitData() {
    if(form_id == 4)
        window.location = '/';
    else {
        form_id = form_id + 1;
        changeForm(forms[form_id]);
    }
}
