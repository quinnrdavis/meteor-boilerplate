import { Meteor } from "meteor/meteor"
import React from "react"
import ReactDOM from "react-dom"

import AppRouter from "../imports/routes/AppRouter"
import "../imports/startup/simple-schema-configuration"

Meteor.startup(() => {
    ReactDOM.render(<AppRouter />, document.getElementById("app"))
})
