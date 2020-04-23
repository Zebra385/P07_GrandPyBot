
var $f = $('#question');


var $r = $('#result');




$f.on('submit', function(e){
    e.preventDefault();
    $r.text('changement');
    var id_article = $(this).attr("name");
    alert(id_article);

});