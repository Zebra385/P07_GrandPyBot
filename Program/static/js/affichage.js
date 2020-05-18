
$(function() {
    var API_KEY = os.environ['API_KEY']
    var $f =  ($('#question')); // protection faille XSS
    function search_question(){
            var min=1;
            var max=4;
            var random = Math.floor(Math.random() * (max - min)) + min;
            var arr = ['Mais t ai-je déjà raconté l\' histoire de ce quartier qui m\' a vu en culottes courtes ?',
                        'Je suis un brin admiratif pour t\'ajouter cet article sur ce quartier',
                        'Ne t\'en vas pas dèjà car je te rajoute un peu d\'histoire: ',
                        'Attends un peu je n\'ai pas fini, voici l\'histoire de ce quartier'];

            return arr[random] // Return one of the four sentences
            };

    $f.on('click', function(e){
        e.preventDefault();
        var $r = $('#champ_question_reponse');
        var $i = $('#map');

        $f.hide();// we erase the button "envoyer"
        $('#question_chargement').show(); // we show a turn icone durind the loading
        $('#question_chargement2').show();

        var question = $('#champ').val();

        $r.append(question + "?");//we write the question in windows

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
                    var site_json ={'site':adresse,}
                    var question_papy = search_question()
                    //we write the answer in windows
                    $r.append('Bien sûr mon poussin ! La voici l\' adresse de '+ site_question + ': ' + adresse);
                    $r.append('\r\n');
                    $r.append(' Et je suis si gentils que je  l\' indique sur la carte ci dessous : ');
                    $r.append('\r\n');
                    //we write a sentence to describe the history of this site
                    $r.append(question_papy);
                    $r.append('\r\n');
                    // We find a mp of this adresse
                    var center = 'center='+adresse;
                    var markers ='&markers=size:mid%7Ccolor:red%7CSan'+adresse;
                    var key='&key='+ API_KEY
                    var img_src = 'https://maps.googleapis.com/maps/api/staticmap?'+ center + '&zoom=12&size=400x200&maptype=roadmap' + markers + key;
                    // we show the map
                    $i.attr('src',img_src);
                    //$i.replaceWith(img);
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
                                    $r.append('Désolé je n\'ai pas trouvé d\'article sur ce  site!');
                                    $r.append('\r\n');
                                    $r.append('Fait un essai pour un autre site');
                                                }
                                        });
                                }
                    },
            error: function(){
                   $r.append('Désolé je n\'ai pas trouvé ton adresse!');
                   $r.append('\r\n');
                   $r.append('Essaye en une autre');
            }
            });
            }
        setTimeout(function(){
        $('#question_chargement').hide();// we erase the button loading
        $('#question_chargement2').hide();
        $f.show();   // we show again the button "envoyer'
        },2000);



});
})




