/**
 * We want to monkey-patch backbone before anything else imports it
 */
define(['backbone/backbone', 'cocktail'], function(Backbone, Cocktail) {
	Cocktail.patch(Backbone);
	return Backbone;
});