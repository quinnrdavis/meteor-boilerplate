import React from "react"
import { Meteor } from "meteor/meteor"
import { Router, Route, Redirect, Switch } from "react-router-dom"
import createHistory from "history/createBrowserHistory"
import { Tracker } from "meteor/tracker"

import Signup from "../ui/Signup"
import Dashboard from "../ui/Dashboard"
import NotFound from "../ui/NotFound"
import Login from "../ui/Login"

const history = createHistory()
const unauthenticatedPages = ["/", "/signup"]
const authenticatedPages = ["/dashboard"]

const onEnterPublicPage = Component => {
    if (Meteor.userId()) {
        return <Redirect to="/dashboard" />
    } else {
        return <Component />
    }
}

const onEnterPrivatePage = Component => {
    if (Meteor.userId()) {
        return <Component />
    } else {
        return <Redirect to="/" />
    }
}

const AppRouter = () => (
    <Router history={history}>
        <Switch>
            <Route exact path="/" render={() => onEnterPublicPage(Login)} />
            <Route path="/signup" render={() => onEnterPublicPage(Signup)} />
            <Route
                path="/dashboard"
                render={() => onEnterPrivatePage(Dashboard)}
            />
            <Route path="*" component={NotFound} />
        </Switch>
    </Router>
)

Tracker.autorun(() => {
    const isAuthenticated = !!Meteor.userId()
    const pathname = history.location.pathname
    const isUnauthenticatedPage = unauthenticatedPages.includes(pathname)
    const isAuthenticatedPage = authenticatedPages.includes(pathname)

    if (isUnauthenticatedPage && isAuthenticated) {
        history.push("/dashboard")
    } else if (isAuthenticatedPage && !isAuthenticated) {
        history.push("/")
    }
})

export default AppRouter
