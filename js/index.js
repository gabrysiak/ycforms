window.onload = function () {
    var button = document.getElementById("the_button");
    button.onclick = count();

    function count() {
        var a = 0;
        var demo = document.getElementById("demo");
        return function () {
            demo.innerHTML = ++a;

        }
    }

    $('#wwid').val('doneeee');


}