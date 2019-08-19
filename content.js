var elements = document.getElementsByTagName('*');
var chosenItem;
var sourceWordsToTargetWords = [];

var items = ["dozens of eggs", "pounds of bananas", "pounds of sirloin steak",
"houses", "cars", "gallons of gas", "pairs of Airpods", "avocados", "Amazon Echo Dots",
"hamburgers", "cups of coffee", "Chipotle burritos", "pairs of denim jeans",
"reusable metal straws", "pairs of atheletic shoes"];
var itemPrices = [1.43, 0.56, 8.07, 289500, 31352, 2.9, 160, .89, 49.99, 2.64, 5.9,
6.5, 34, 7.5, 58.16];
var prices = [];
var websitePrices = [];

function findPrice(text) {
//var text = document.body.textContent || document.body.innerText,
    regex = /(USD|EUR|€|\$|£)\s?(\d{1,}(?:[.,]\d{3})*(?:[.,]\d{2}))|(\d{1,3}(?:[.,]\d{3})*(?:[.,]\d{2})?)\s?(USD|EUR)/g,
    match = text.match(regex);
    if (match) {
      match = match[0].replace(/\s/g,"");
      //alert("match found: " + match.toString());
      var strMatch = match.toString();
      websitePrices.push(strMatch);
      strMatch = strMatch.replace(/\$/g, "");
      //alert("removed $: " + strMatch);
      prices.push(parseFloat(strMatch));
      //alert("match added, prices now: " + prices.toString());
    }
};

for (var i = 0; i < elements.length; i++) {
    var element = elements[i];

    for (var j = 0; j < element.childNodes.length; j++) {
        var node = element.childNodes[j];

        if (node.nodeType === 3) {
          var text = node.nodeValue;
          findPrice(text);
        }
    }
}

function doChange() {
  var denom = itemPrices[chosenItem];

  for(var i = 0; i < websitePrices.length; i++){
      var pair = [];
      var numerator = prices[i];
      var array = [];
      pair.push(array.push(websitePrices[i]));
      var unrounded = numerator / denom;
      var rounded = Math.round( unrounded * 10 ) / 10;
      var pairStr = "" + rounded + item[chosenItem];
      pair.push(pairStr);
      sourceWordsToTargetWords.push(pair);
  }
};
//console.log(document.innerHTML);
//window.onload = wo();
//document.addEventListener("DOMContentLoaded", function() {console.log("hello")});

//window.addEventListener ("load", itemClicked, false);


var listOfItemsSelect = document.getElementById("listOfItems");
listOfItemsSelect.addEventListener("click", itemClicked.bind(this));


function itemClicked(event)
{
  chosenItem = parseInt(listOfItemsSelect.value);
  doChange();
};

function makeRegex(sourceWords) {
    return new RegExp('\\b' + sourceWords.join('\\b|\\b') + '\\b', 'g');
};

function identity(string) {
    return string;
};

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

function toUpperCase(string) {
    return string.toUpperCase();
};

function makeRegexToTargetWords(sourceWordsToTargetWords, modifyWords) {
    return sourceWordsToTargetWords.map(function(sourceAndTarget) {
        var [source,target] = sourceAndTarget;
        source = source.map(modifyWords);
        target = modifyWords(target);
        return [makeRegex(source), target];
    });
};

var sourceRegexToTargetWords = makeRegexToTargetWords(sourceWordsToTargetWords, identity).concat(makeRegexToTargetWords(sourceWordsToTargetWords, capitalizeFirstLetter)).concat(makeRegexToTargetWords(sourceWordsToTargetWords, toUpperCase));

function replaceTextWithRegexes(text, sourceRegexToTargetWords) {
    for (var k = 0; k < sourceRegexToTargetWords.length; k++) {
        var [regex, targetWord] = sourceRegexToTargetWords[k];
        var replacedText = text.replace(regex, targetWord);
        text = replacedText
    }
    return text;
};

for (var i = 0; i < elements.length; i++) {
    var element = elements[i];

    for (var j = 0; j < element.childNodes.length; j++) {
        var node = element.childNodes[j];

        if (node.nodeType === 3) {
            var text = node.nodeValue;
            replacedText = replaceTextWithRegexes(text, sourceRegexToTargetWords);

            if (replacedText !== text) {
                console.log('replaced');
                element.replaceChild(document.createTextNode(replacedText), node);
            }
        }
    }
}
