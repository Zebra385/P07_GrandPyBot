
var request = new XMLHttpRequest();
request.onreadystatechange = function() {
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
        var response = JSON.parse(this.responseText);

        alert ('ladresse du site : ' + site +' est : ' + response.candidates.formatted_address);

    }
};


var $f = $('#question');

$f.on('submit', function(e){
    var $r = $('#result');
    e.preventDefault();

    alert('changement');
    var question = $('#champ').val();
    alert('tu recherche l adresse du site: ' + question );
    var site = question.split(" ")[10];

    $r.text('tu recherche l adresse du site: ' + site );
    var package_url = 'https://www.google.fr/maps/place/openclassrooms}';
    request.open("GET", 'https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input={site}&inputtype=textquery&fields=formatted_address,name,geometry&key=AIzaSyAu-GCUJE1l_rVUxe0Tk0c5DXdNXnM94Oo');
    request.send();

});
