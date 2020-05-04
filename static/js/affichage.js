
$(function()
    {
    var $f = $('#question');

    $f.on('click', function(e){
        alert('recup quqetion');
        e.preventDefault();
        var question = $('#champ').val();
        var $r = $('#result');
        var $r1 = $('#result1');
        var $r2 = $('#result2');
        var $r3 = $('#result3');
        var $r4 = $('#result4');
        $r.text(question);


        var question_json= {'text':question,};
        alert('en json' + question_json.text);
        question = question +"\n"




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

                    var site_json ={'site':adresse,}
                    $r1.text('Bien sûr mon poussin ! La voici l adresse de '+ lieu + ': ' + adresse);

                    $r2.text(' Et je suis si gentils que je  l indique sur la carte ci dessous : ');
                    // on va inserer la carte

                    var img = document.createElement("img");
                    var center = 'center='+adresse;
                    var markers ='&markers=size:mid%7Ccolor:red%7CSan'+adresse;
                    img.src = 'https://maps.googleapis.com/maps/api/staticmap?'+ center + '&zoom=12&size=400x200&maptype=roadmap' + markers +'&key=AIzaSyAu-GCUJE1l_rVUxe0Tk0c5DXdNXnM94Oo';


                    $('#map').replaceWith(img);
                    if (adresse != "")
                                alert('on entre dans ajax adresse');
                                {
                                $.ajax({
                                url: '/find-article',
                                method: 'POST',
                                headers: {
                                'Content-Type': 'application/json'
                                          },
                                dataType: 'text',
                                data: JSON.stringify(site_json),
                                success: function(data){
                                    alert('2ieme success' );

                                        var article = data
                                        $r4.text(article);
                                                        },
                                error: function(){
                                    alert('erreur recup article');
                                                }
                                        });

                                }
                    },
            error: function(){
                 alert('erreur recup data1');
            }
            });
        }
        alert('sortie du premier POST');
        $r3.text('Mais t ai-je déjà raconté l histoire de ce quartier qui m a vu en culottes courtes ?');




    });

    })
