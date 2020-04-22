// const input=document.querySelector('form');
var $f = $('form');
// on declare(ecoute) l'element que l'on charger
// log=document.getElementById('result');
var $r = $('result');
//on recupere l'elemnt sur lequel on veut afficher notre input
//input.addEventListener('input', updateValue);
$f.on(input,updateValue);
//on ecoute ce quue l'on rentre
function updateValue(e){
	$r.show(e.target.value);
	//on remplit avec la valeur recuperer
};