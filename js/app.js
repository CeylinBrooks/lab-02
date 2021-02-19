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

// vanilla JS: create everything from scratch then append it: 12 lines of code
// jQuery: copy everything and change each element line by line: 6 lines of code
// Mustache: copy everything and let Mustache change each element for you: 3 lines of code

// the jQuerry method - to first populate the page on load
UnicornPic.prototype.renderUnicornPic = function () {
  const $liCopy = $('li:first-child').clone();
  $liCopy.addClass(this.keyword);
  $liCopy.find('h2').text(this.title);
  $liCopy.find('img').attr('src', this.image_url);
  $liCopy.find('p').text(this.description);
  $('#thejQuerryUl').append($liCopy);
};

// the mustache method to refresh the page click button one or two
UnicornPic.prototype.renderWithJQueryAndMustache = function () {
  // 1. get the html from the script tag - and NO UL's !!!
  // 2. pass the html and an object to Mustache.render(html, object)
  // 3. append it to the page
  const $templateFromHtml = $('#mustache-template-tr').html();
  const outputFromMustache = Mustache.render($templateFromHtml, this);
  $('#theMustacheId').append(outputFromMustache);
};

// $('mustache-template-tr').remove();
// $('mustache-template-tr').empty();

UnicornPic.newUnicornArray = [];
UnicornPic.newUnicornArray2 = [];

// $.ajax('/data/page-1.json').then(resurrectDataFunction);
$.ajax('/data/page-1.json').then(data => {
  resurrectDataFunction(data, UnicornPic.newUnicornArray);

  $.ajax('/data/page-2.json').then(data => {
    resurrectDataFunction(data, UnicornPic.newUnicornArray2);
    UnicornPic.allPics.forEach(unicornObject => {
      unicornObject.renderUnicornPic();
    });
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
    // unicornObject.renderUnicornPic();
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
  $('li').hide();
  // could still change this to a forEach method ....

  for (let i = 0; i < UnicornPic.allPics.length; i++) {
    if (UnicornPic.allPics[i].keyword === eventValue) {
      $(`li[class="${eventValue}"]`).show();
    }
  }
}
// this function empties out both the js and the mustach rendered pictures
function emptyOutPage() {
  $('#thejQuerryUl').empty();
  $('#theMustacheId').empty();
}
// this sorting function takes in the array(either 1 or 2) and the sort criterion to sort by
function sortBy(arrayPassedInHere, sortingParam) {
  arrayPassedInHere.sort(function (left, right) {
    if (left[sortingParam] > right[sortingParam]) {
      return 1;
    } else if (left[sortingParam] < right[sortingParam]) {
      return -1;
    } else {
      return 0;
    }
  });
  return arrayPassedInHere;
}


let thePageYouAreOn = 0;

// Pagination
$('button:first-of-type').on('click', () => {
  emptyOutPage();
  thePageYouAreOn = 1;
  // $('ul').append('<li><h2></h2><img src="" alt=""><p></p></li>');
  UnicornPic.newUnicornArray.forEach(unicornObject => unicornObject.renderWithJQueryAndMustache());
  // another idea - empty out the drop down menu and rerender it;
});

$('button:nth-of-type(2)').on('click', () => {
  emptyOutPage();
  thePageYouAreOn = 2;
  UnicornPic.newUnicornArray2.forEach(unicornObject => unicornObject.renderWithJQueryAndMustache());
  // again empty out dropdown menu and rerender it
});

$('button:nth-of-type(3)').on('click', () => {
  emptyOutPage();
  // sort images by name
  if (thePageYouAreOn === 1) {
    // console.log('before SORT', UnicornPic.newUnicornArray);
    let newlySortedArray = sortBy(UnicornPic.newUnicornArray, 'title');
    // console.log('after SORT', UnicornPic.newUnicornArray);
    newlySortedArray.forEach(unicornObject => unicornObject.renderWithJQueryAndMustache());
  } else {
    // console.log('before SORT 2', UnicornPic.newUnicornArray);
    let newlySortedArray2 = sortBy(UnicornPic.newUnicornArray2, 'title');
    // console.log('after SORT 2', UnicornPic.newUnicornArray);
    newlySortedArray2.forEach(unicornObject => unicornObject.renderWithJQueryAndMustache());
  }
});

$('button:nth-of-type(4)').on('click', () => {
  emptyOutPage();
  // sort images by horns
  if (thePageYouAreOn === 1) {
    let newlySortedArray = sortBy(UnicornPic.newUnicornArray, 'horns');
    newlySortedArray.forEach(unicornObject => unicornObject.renderWithJQueryAndMustache());
  } else {
    let newlySortedArray2 = sortBy(UnicornPic.newUnicornArray2, 'horns');
    newlySortedArray2.forEach(unicornObject => unicornObject.renderWithJQueryAndMustache());
  }
});







