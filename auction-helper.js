function $ (selector, el) {
     if (!el) {el = document;}
     return el.querySelector(selector);
}
function $$ (selector, el) {
     if (!el) {el = document;}
     return el.querySelectorAll(selector);
     // Note: the returned object is a NodeList.
     // If you'd like to convert it to a Array for convenience, use this instead:
     // return Array.prototype.slice.call(el.querySelectorAll(selector));
}

var formButtonDiv = $('#form-button');
var createButton = $('#button-create', formButtonDiv);

var undercutButton = document.createElement('button');
undercutButton.className = 'ui-button button1';
undercutButton.innerHTML = createButton.innerHTML;
undercutButton.addEventListener('click', onUndercut);
var buttonLabel = $('.button-right', undercutButton);
buttonLabel.textContent = 'Undercut';

formButtonDiv.appendChild(undercutButton);

function onUndercut(e) {
	var firstSimilarAuction = $('#similar-auctions tbody tr');

	if (!firstSimilarAuction)
		return;

	var priceElement = $('.price', firstSimilarAuction);

	var priceObj = {
		gold: Number($('.icon-gold', priceElement).textContent.replace(',','')),
		silver: Number($('.icon-silver', priceElement).textContent),
		copper: Number($('.icon-copper', priceElement).textContent),
	}

	var price = toPriceNumber(priceObj);
	var startPrice = (Math.floor(price/500) - 2) * 500;
	var startPriceObj = toPriceObject(startPrice);
	var buyoutPrice = (Math.floor(price/500) - 1) * 500;
	var buyoutPriceObj = toPriceObject(buyoutPrice);

	var startGoldElement = $('#form-startGold');
	startGoldElement.value = startPriceObj.gold;

	var startSilverElement = $('#form-startSilver');
	startSilverElement.value = startPriceObj.silver;
	
	var startCopperElement = $('#form-startCopper');
	startCopperElement.value = startPriceObj.copper;
	
	var buyoutGoldElement = $('#form-buyoutGold');
	buyoutGoldElement.value = buyoutPriceObj.gold;
	
	var buyoutSilverElement = $('#form-buyoutSilver');
	buyoutSilverElement.value = buyoutPriceObj.silver;
	
	var buyoutCopperElement = $('#form-buyoutCopper');
	buyoutCopperElement.value = buyoutPriceObj.copper;

	if (e.shiftKey) {
		createButton.click();
	}
}

function toPriceObject(priceNumber) {
	return {
		gold: Math.floor(priceNumber / (100 * 100)),
		silver: Math.floor(priceNumber / 100) % 100,
		copper: Math.floor(priceNumber) % 100,
	}
}

function toPriceNumber(priceObject) {
	return priceObject.gold * 100 * 100 +
		priceObject.silver * 100 +
		priceObject.copper;
}

