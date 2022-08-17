import MyPage from "./pages/my-page.js";

export default [
  {
    path: "web-component",
    // Load a web component
    component: MyPage
  },
  {
    path: "home",
    component: () => {
      // Manually create the home page 
      const $div = document.createElement("div");
      $div.innerText = `🏠 This is the home page!`;
      return $div;
    }
  },
  {
    path: "settings",
    component: () => {
      // Manually create the settings page 
      const $div = document.createElement("div");
      $div.innerText = `⚙️ This is the settings page!`;
      return $div;
    }
  },
  {
    path: "my_element",
    component: () => {
      return import("./pages/my-element.js");
    }
  },
  {
    path: "coin_toss",
    component: () => {
      return import("./pages/coin-toss.js");
    }
  },
  {
    path: "api_call",
    component: () => {
      return import("./pages/api-call.js");
    }
  },
  {
    path: "**",
    redirectTo: "home"
  }
];