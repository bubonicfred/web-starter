// Define a web component
export default class MyPage extends HTMLElement {
  constructor () {
    super();
    const shadow = this.attachShadow({mode: "open"});
    shadow.appendChild(document.createTextNode("🎁 This is a custom element!"));
  }
}

customElements.define("my-page", MyPage);