import "router-slot";
import "./components/layout.js";
import "./components/app-navigation.js";
import routes from "./routes.js";

// Setup the router
const routerSlot = document.querySelector("router-slot")!;
routerSlot.add(routes);