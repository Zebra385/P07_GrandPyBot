
$(function(){
    var $f = $('#question');
    alert('coucou je suis dans le .js');
    $f.on('click', function(e){
        alert('recup quqetion');
        e.preventDefault();
        var question = $('#champ').val();
        var $r = $('#result');
        alert('tu recherche l adresse du site: ' + question );
        var question_json= {'text':question,};
        alert('en json' + question_json.text);
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
                    $r.text('l adresse du site est : ' +data.candidates[0].formatted_address);
                    //$r.text= data[i].candidates[0].formatted_address;
                    },
            error: function(){
                 alert('erreur recup data');
            }
            });
        }
        alert('sortie du POST');

    });
})


