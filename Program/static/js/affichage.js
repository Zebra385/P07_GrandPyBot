
$(function() {
    // No Key all is secret
    var $f =  ($('#champ'));
    // function to adapted the dimension of the textarea
    var $r = $('#champ_question_reponse');
    var count=0;

    //function to make a new random question
    function search_question(){
            var min = 1;
            var max = 5;
            var random = Math.floor(Math.random() * (max - min)) ;
            //Math.floor(x) get a bigger integer that is more little or egal to a number x.
            var arr = ['Mais t ai-je déjà raconté l\' histoire de ce quartier qui m\' a vu en culottes courtes ?',
                        'Je suis un brin admiratif pour t\'ajouter cet article sur ce quartier :',
                        'Ne t\'en vas pas déjà car je te rajoute un peu d\'histoire: ',
                        'Attends un peu je n\'ai pas fini, voici l\'histoire de ce quartier :',
                        'Mais t\'ai-je déjà raconté l\' histoire de ce quartier qui m\' a vu en culottes courtes ?'];

            return arr[random] // Return one of the four sentences
            };
    const regex1 = /<script>/gi;// to do not a mistake XSS
    const regex2 = /<\/script>/gi;


    $f.keypress(function(e){

        if( e.which == 13 ){
            e.preventDefault();
            count += 1;// we use a count to star a automatic sroll after the first answer

            var $i = $('#map');
            $r.append('\r\n');
            $('#question_chargement').show(); // we show a turn icone durind the loading
            $('#question_chargement2').show();

            var question = $('#champ').val();
            question = question.replace(regex1,"");
            question = question.replace(regex2,"");
            $r.append(question);// the question avoid XSS flaw

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
                        if (typeof(data.candidates[0])== 'undefined'){
                              $r.append('Désolé GrandPyBot n\'a pas compris ta demande d\'adresse');
                              $r.append('\r\n');
                            } else {
                                var site_question = data.candidates[0].name;
                                var adresse = data.candidates[0].formatted_address;
                                var site_json ={'site':adresse,}
                                var question_papy = search_question()
                                //we write the answer in windows
                                $r.append('Bien sûr mon poussin ! La voici l\' adresse de '+ site_question + ': ' + adresse);
                                $r.append('\r\n');
                                $r.append('Et je suis si gentil que je  te l\' indique sur la carte ci-dessous . ');
                                $r.append('\r\n');
                                //we write a sentence to describe the history of this site
                                $r.append(question_papy);
                                $r.append('\r\n');
                                }

                        if (adresse != "")
                                    {
                                    // we look for a map with adresse
                                    $.ajax({
                                    url: '/map',
                                    method: 'POST',
                                    headers: {
                                    'Content-Type': 'application/json'
                                    },
                                    dataType: 'text',
                                    data: JSON.stringify(question_json),
                                    success: async function recover_map(data){
                                            var img_src =data
                                            // we show the map
                                            $i.attr('src',img_src);
                                            },
                                    error: function(){
                                            $i.attr('src',"static/images/Fond_carte_non.jpg");
                                            }
                                            });
                                    // we call the route find_article to find a article on this site
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
                                            $r.append('---------------------------------------');
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
                };

            setTimeout(function(){
            $('#question_chargement').hide();// we erase the button loading
            $('#question_chargement2').hide();
            if (count > 1){
                $r.scrollTop($r[0].scrollHeight);// to make an automaticely scroll
                }
            },2000);
        }
    });
})




