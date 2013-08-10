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

	def threadRoutes = Cached("thread-routes") {
		Action {
			implicit request =>
				import controllers.api.routes.javascript._
				val routes = Routes.javascriptRouter("routes")(
					TopicAPI.list,
					TopicAPI.get,
					TopicAPI.getBySlug,
					TopicAPI.create,
					TopicAPI.update,

					UserAPI.get
				)
				Ok(
					s"define(function() { $routes; return routes.controllers; });"
				).as(JAVASCRIPT)
		}
	}

}