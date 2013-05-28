package controllers

import play.api.mvc.{Controller, Action}
import play.api.Routes
import play.api.cache.Cached
import play.api.Play.current

object Javascript extends Controller {

	def jsRoutes = Cached("js-routes") {
		Action {
			implicit request =>
				val jsRoutes = Routes.javascriptRouter("routes")(
				)
				Ok(
					s"define(function () { $jsRoutes; return routes; });"
				).as(JAVASCRIPT)
		}
	}

}