import sbt._
import Keys._
import play.Project._

object ApplicationBuild extends Build {

	val appName = "orchard"
	val appVersion = "0.1-SNAPSHOT"

	val appDependencies = Seq(
		javaCore, javaJdbc, javaEbean,
		"be.objectify" %% "deadbolt-java" % "2.1-RC2"
	)

	def customLessEntryPoints(base: File): PathFinder = (
		(base / "app" / "assets" / "stylesheets" / "bootstrap" * "bootstrap.less") +++
			(base / "app" / "assets" / "stylesheets" / "bootstrap" * "responsive.less") +++
			(base / "app" / "assets" / "stylesheets" * "*.less")
		)


	val main = play.Project(appName, appVersion, appDependencies).settings(
		lessEntryPoints <<= baseDirectory(customLessEntryPoints),
		resolvers += "Morphia Maven Repo" at "http://morphia.googlecode.com/svn/mavenrepo/",
		resolvers += "MongoDb Java Driver Repository" at "http://repo1.maven.org/maven2/org/mongodb/mongo-java-driver/",
		resolvers += Resolver.url("Objectify Play Repository", url("http://schaloner.github.com/releases/"))(Resolver.ivyStylePatterns),
		resolvers += Resolver.url("Objectify Play Snapshot Repository", url("http://schaloner.github.com/snapshots/"))(Resolver.ivyStylePatterns)
	)

}

