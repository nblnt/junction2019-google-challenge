

function checkDatepicker(){
    if (document.getElementById("datepicker1").value == "") {
    document.getElementById("datepicker1").style.backgroundImage = "none";
    }
    else{
        document.getElementById("datepicker1").style.backgroundImage = "linear-gradient(to top right, #a2d240, #1b8b00 )";
        document.getElementById("datepicker1").style.border = "1px solid #1b8b00";
    }

    if (document.getElementById("datepicker2").value == "") {
        document.getElementById("datepicker2").style.backgroundImage = "none";
    }
    else{
        document.getElementById("datepicker2").style.backgroundImage = "linear-gradient(to top right, #a2d240, #1b8b00 )";
        document.getElementById("datepicker1").style.border = "1px solid #1b8b00";
    }
}