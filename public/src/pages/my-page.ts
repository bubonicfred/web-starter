import {LitElement, html, css} from "lit";
import {customElement, eventOptions, property} from "lit/decorators.js";

declare global {
  interface HTMLElementTagNameMap {
    "my-page": MyPage;
  }
}


export default class MyPage extends LitElement {
  constructor () {
    super();
  }

  override connectedCallback() {
    super.connectedCallback()
  
    document.title = "MY Page";
  }

  override render() {
    return html`
      <span>"🎁 This is a custom element!"</span>
    `;
  }
}

customElements.define("my-page", MyPage);