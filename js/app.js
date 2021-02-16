'use strict';

function Horns(url, title, description, keyword, horns) {
  this.url = url;
  this.title = title;
  this.description = description;
  this.keyword = keyword;
  this.horns = horns;
  Horns.allHorns.push(this);
}
Horns.allHorns = [];

Horns.prototype.renderHorns = function() {
  const $liCopy = $('li:first-child').clone();
  $liCopy.find('h2').text(this.title);
  $liCopy.find('p').text(this.description);
  $liCopy.find('img').attr('src', this.url);
  console.log(this);
  $('ul').append($liCopy);
};

$.ajax('page-1.json').then();
