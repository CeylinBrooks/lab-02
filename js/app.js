'use strict';

function Horns(image_url, title, description, keyword, horns) {
  this.image_url = image_url;
  this.title = title;
  this.description = description;
  this.keyword = keyword;
  this.horns = horns;
  Horns.allHorns.push(this);
}
Horns.allHorns = [];

Horns.prototype.renderHorns = function() {
  console.log('test');
  const $liCopy = $('li:first-child').clone();
  $liCopy.find('h2').text(this.title);
  $liCopy.find('p').text(this.description);
  $liCopy.find('img').attr('src', this.image_url);
  console.log(this);
  $('#show-pics').append($liCopy);
  
};



$.ajax('../data/page-1.json').then(bringTheHorns);
const uniArr = [];
function bringTheHorns(value){
  console.log(value);

  value.forEach(hornedObj => {
    new Horns(hornedObj.image_url,hornedObj.title, hornedObj.description,hornedObj.keyword,hornedObj.horns)
    uniArr.push(hornedObj.keyword);
    
  }
});

  Horns.allHorns.forEach(Horns => Horns.renderHorns());
}

// $("li")
//   .filter(function(keyword){
//     return $("",this).length === 
//   })

$('select').on('click', handleClick);
$('select').on('click', handleClick);

function handleClick() {
  $('li').hide();
  $('li: contains()').show();
}





