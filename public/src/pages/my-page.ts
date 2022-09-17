import {LitElement, html, css} from "lit";

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