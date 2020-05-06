
$(function() {

    var $f = $('#question');

    $f.on('click', function(e){
        e.preventDefault();
        var $r = $('#champ_question_reponse');
        $f.hide();// we erase the button "envoyer"
        $('#question_chargement').show(); // we show a turn icone durind the loading


        var question = $('#champ').val();

        $r.append(question);//we write the question in windows
        $r.append('\r\n');// return at the new ligne
        var question_json= {'text':question,};

        if (question !=""){
            // we call the route find site to find the adresse of site
            $.ajax({
            url: '/find-site',
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            dataType: 'json',
            data: JSON.stringify(question_json),
            success: async function recover_adresse(data){
                    // we name the site
                    var site_question = data.candidates[0].name;
                    var adresse = data.candidates[0].formatted_address;
                    var site_json =
                    //we write the answer in windows
                    $r.append('Bien sûr mon poussin ! La voici l\' adresse de '+ site_question + ': ' + adresse);
                    $r.append('\r\n');
                    $r.append(' Et je suis si gentils que je  l\' indique sur la carte ci dessous : ');
                    $r.append('\r\n');
                    //we write a sentence to describe the history of this site
                    $r.append('Mais t ai-je déjà raconté l\' histoire de ce quartier qui m\' a vu en culottes courtes ?');
                    $r.append('\r\n');
                    // We find a mp of this adresse
                    var img = document.createElement("img");
                    var center = 'center='+adresse;
                    var markers ='&markers=size:mid%7Ccolor:red%7CSan'+adresse;
                    img.src = 'https://maps.googleapis.com/maps/api/staticmap?'+ center + '&zoom=12&size=400x200&maptype=roadmap' + markers +'&key=AIzaSyAu-GCUJE1l_rVUxe0Tk0c5DXdNXnM94Oo';
                    // we show the map
                    $('#map').replaceWith(img);
                    if (adresse != "")
                                // we call the route find_article to find a article on this site
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
                                        // we add the article in the windows
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
        $('#question_chargement').hide();// we erase the button loading
        $f.show();   // we show again the button "envoyer'
        },2000);



});
})




