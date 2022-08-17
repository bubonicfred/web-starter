import {LitElement, html, css} from "lit";
import {customElement, property} from "lit/decorators.js";

declare global {
  interface HTMLElementTagNameMap {
    "app-navigation": NavigationElement;
  }
}

/**
* An example element.
*
* @fires count-changed - Indicates when the count changes
* @slot - This element has a slot
* @csspart button - The button
*/
@customElement("app-navigation")
export default class NavigationElement extends LitElement {
  static override styles = css`
:host {
  display: block;
}
.nav-item {
  display: inline-block;
  background-color: crimson;
  color: white;
  font-weight: 700;
  padding: 10px 20px;
  margin: 0 5px;
}
  `;

  override render() {
    return html`
      <a class="nav-item" href="home">Go to home!</a>
      <a class="nav-item" href="settings">Go to settings!</a>
      <a class="nav-item" href="web-component">Go to a custom element!</a>
      <a class="nav-item" href="my_element">Go to my element!</a>
      <a class="nav-item" href="coin_toss">Go to Coin Toss!</a>
      <a class="nav-item" href="api_call">Go to Api Call!</a>
    `;
  }
}
