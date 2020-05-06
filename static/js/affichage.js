
$(function()
    {

    //$f.append('Salut GrandPy ! Est-ce que tu connais l\'adresse de');


    var $f = $('#question');
    //$r.val(" ");
    $f.on('click', function(e){
        e.preventDefault();
        var $r = $('#champ_question_reponse');
        $f.hide();// effce le bouton envoyer
        $('#question_chargement').show(); // affiche le bouton télechargement


        var question = $('#champ').val();

        //var $r1 = $('#result1');
        //var $r2 = $('#result2');
        //var $r3 = $('#result3');
        //var $r4 = $('#result4');
        $r.append(question);
        $r.append('\r\n');// return at the new ligne
        var question_json= {'text':question,};

        if (question !=""){

            $.ajax({
            url: '/find-site',
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            dataType: 'json',
            data: JSON.stringify(question_json),
            success: async function recover_adresse(data){
                    var lieu = data.candidates[0].name;
                    var adresse = data.candidates[0].formatted_address;
                    var site_json ={'site':adresse,}
                    $r.append('Bien sûr mon poussin ! La voici l\' adresse de '+ lieu + ': ' + adresse);
                    $r.append('\r\n');
                    $r.append(' Et je suis si gentils que je  l\' indique sur la carte ci dessous : ');
                    $r.append('\r\n');
                    $r.append('Mais t ai-je déjà raconté l\' histoire de ce quartier qui m\' a vu en culottes courtes ?');
                    $r.append('\r\n');
                    var img = document.createElement("img");
                    var center = 'center='+adresse;
                    var markers ='&markers=size:mid%7Ccolor:red%7CSan'+adresse;
                    img.src = 'https://maps.googleapis.com/maps/api/staticmap?'+ center + '&zoom=12&size=400x200&maptype=roadmap' + markers +'&key=AIzaSyAu-GCUJE1l_rVUxe0Tk0c5DXdNXnM94Oo';
                    $('#map').replaceWith(img);
                    if (adresse != "")

                                {
                                $.ajax({
                                url: '/find-article',
                                method: 'POST',
                                headers: {
                                'Content-Type': 'application/json'
                                          },
                                dataType: 'text',
                                data: JSON.stringify(site_json),
                                success: async function recover_article(data){
                                        var article = data
                                        $r.append(article);
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
        setTimeout(function(){
        $('#question_chargement').hide();// effce le bouton chargement
        $f.show();   // affiche le bouton envoyer
        },2000);



});
})




