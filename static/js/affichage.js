
$(function(){
    var $f = $('#question');
    alert('coucou je suis dans le .js');
    $f.on('click', function(e){
        alert('recup quqetion');
        e.preventDefault();
        var question = $('#champ').val();
        var $r = $('#result');
        var $r1 = $('#result1');
        var $r2 = $('#result2');



        alert('tu recherche l adresse du site: ' + question );
        var question_json= {'text':question,};
        alert('en json' + question_json.text);
        question = question +"\n"
        $r.text(question);



        if (question !=""){
            $.ajax({
            url: '/find-site',
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            dataType: 'json',
            data: JSON.stringify(question_json),
            success: function(data){
                alert('success' );
                    //alert(ata[di].candidates[0].formatted_address);
                    var lieu = data.candidates[0].name;
                    var adresse = data.candidates[0].formatted_address;

                    $r1.text('Bien sûr mon poussin ! La voici l adresse de '+ lieu + ': ' + adresse);

                    $r2.text(' Et je suis si gentils que je  l indique sur la carte ci dessous : ');
                    // on va inserer la carte

                    var img = document.createElement("img");
                    var center = 'center='+adresse;
                    var markers ='&markers=size:mid%7Ccolor:red%7CSan'+adresse;
                    img.src = 'https://maps.googleapis.com/maps/api/staticmap?'+ center + '&zoom=12&size=600x300&maptype=roadmap' + markers +'&key=AIzaSyAu-GCUJE1l_rVUxe0Tk0c5DXdNXnM94Oo';


                   $('#map').replaceWith(img);

                    },
            error: function(){
                 alert('erreur recup data');
            }
            });
        }
        alert('sortie du POST');

    });
})


