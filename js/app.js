'use strict';


function UnicornPic(image_url, title, description, keyword, horns) {
  this.image_url = image_url;
  this.title = title;
  this.description = description;
  this.keyword = keyword.toLowerCase();
  this.horns = horns;
  UnicornPic.allPics.push(this);
}
UnicornPic.allPics = [];

UnicornPic.prototype.renderUnicornPic = function () {
  const $liCopy = $('li:first-child').clone();
  $liCopy.addClass(this.keyword);
  $liCopy.find('h2').text(this.title);
  $liCopy.find('img').attr('src', this.image_url);
  $liCopy.find('p').text(this.description);
  // console.log(this);
  $('main>ul').append($liCopy);
};

UnicornPic.prototype.renderWithJQueryAndMustache = function () {
  // 1. get the html from the script tag
  // 2. pass the html and an object to Mustache.render(html, object)
  // 3. append it to the page
  const $templateFromHtml = $('#mustache-template-tr').html();
  const outputFromMustache = Mustache.render($templateFromHtml, this);
  $('main > ul').append(outputFromMustache);
  // css for a table that is a direct child of the body
};


// $('mustache-template-tr').remove();
// $('mustache-template-tr').empty();

UnicornPic.newUnicornArray = [];
UnicornPic.newUnicornArray2 = [];

// $.ajax('../data/page-1.json').then(resurrectDataFunction);
$.ajax('../data/page-1.json').then(data => {
  resurrectDataFunction(data, UnicornPic.newUnicornArray);

  $.ajax('../data/page-2.json').then(data => {
    resurrectDataFunction(data, UnicornPic.newUnicornArray2);
    dropDownMenu();
  });
});

function resurrectDataFunction(resurrectedData, nameOfTheArray) {
  resurrectedData.forEach(unicornObject => {
    nameOfTheArray.push(new UnicornPic(unicornObject.image_url, unicornObject.title, unicornObject.description, unicornObject.keyword, unicornObject.horns));
  });
}

function dropDownMenu() {
  const tempArr = [];
  UnicornPic.allPics.forEach(unicornObject => {
    unicornObject.renderUnicornPic();
    if (!tempArr.includes(`${unicornObject.keyword.toLowerCase()}`)) {
      tempArr.push((unicornObject.keyword).toLowerCase());
    }
  });
  // sorting the drop down menu
  tempArr.sort(function (left, right) {
    if (left.toLowerCase() > right.toLowerCase()) {
      return 1;
    } else if (left.toLowerCase() < right.toLowerCase()) {
      return -1;
    } else {
      return 0;
    }
  });
  // here we want to do another check to see if the li's on the page actually have that keyword - then include the keyword in the array - otherwise remove that keyword from the array;
  tempArr.forEach(label => $('select').append(`<option value="${label}">${label}</option>`));
}

// need event handler that listens for 'change' (behaves like a checkbox behind the scenes) - on('change') listen to some value of keyword .... once you can get that value (console.log) -   $('li').hide(); - hide everything and show only selection keyword objects - loop through all objects in allPics - if it has that value on it
//  write it into a function

$('select').on('change', handleClickingDropDown);

function handleClickingDropDown(event) {
  let eventValue = event.target.value;
  // Hide and show way: hide all and then show some : HTML focused
  $('li').hide();
  // could still change this to a forEach method ....
  for (let i = 0; i < UnicornPic.allPics.length; i++) {
    if (UnicornPic.allPics[i].keyword === eventValue) {
      // $('li:includes=`${eventValue}`').show();
      $(`li[class="${eventValue}"]`).show();
    }
  }
}

// vanilla: create everything from scratch then append it: 12 lines of code
// jQuery: copy everything and change each element line by line: 6 lines of code
// Mustache: copy everything and let Mustache change each element for you: 3 lines of code
let thePageYouAreOn = 1;

// Pagination
$('button:first-of-type').on('click', () => {
  thePageYouAreOn = 1;
  // $('body > table tr:nth-child(n+2)').empty();
  $('ul').empty();
  $('ul').append('<li><h2></h2><img src="" alt=""><p></p></li>');
  UnicornPic.newUnicornArray.forEach(unicornObject => unicornObject.renderWithJQueryAndMustache());
  // UnicornPic.newUnicornArray.forEach(unicornObject => unicornObject.renderUnicornPic());
  // another idea - empty out the drop down menu and rerender it;
  // console.log(UnicornPic.newUnicornArray);
});

$('button:nth-of-type(2)').on('click', () => {
  thePageYouAreOn = 2;
  // $('body > table tr:nth-child(n+2)').empty();
  $('ul').empty();
  $('ul').append('<li><h2></h2><img src="" alt=""><p></p></li>');

  UnicornPic.newUnicornArray2.forEach(unicornObject => unicornObject.renderWithJQueryAndMustache());
  // UnicornPic.newUnicornArray2.forEach(unicornObject => unicornObject.renderUnicornPic());
});

$('button:nth-of-type(3)').on('click', () => {
  // console.log(thePageYouAreOn);
  // $('body > table tr:nth-child(n+2)').empty();
  $('ul').empty();

  // sort images by name
  $('ul').append('<li><h2></h2><img src="" alt=""><p></p></li>');
  // Pet.allPets2.forEach(pet => pet.renderWithJQueryAndMustache());
  if (thePageYouAreOn === 1) {
    UnicornPic.newUnicornArray.forEach(unicornObject => unicornObject.renderUnicornPic());
    console.log(thePageYouAreOn);
  } else {
    UnicornPic.newUnicornArray2.forEach(unicornObject => unicornObject.renderUnicornPic());
  }


});

$('button:nth-of-type(4)').on('click', () => {
  // console.log(thePageYouAreOn);
  // $('body > table tr:nth-child(n+2)').empty();
  $('ul').empty();

  // sort images by horns
  $('ul').append('<li><h2></h2><img src="" alt=""><p></p></li>');
  // Pet.allPets2.forEach(pet => pet.renderWithJQueryAndMustache());
  if (thePageYouAreOn === 1) {
    UnicornPic.newUnicornArray.forEach(unicornObject => unicornObject.renderUnicornPic());
  } else {
    UnicornPic.newUnicornArray2.forEach(unicornObject => unicornObject.renderUnicornPic());
  }
});
=======
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






