import {LitElement, html, css} from "lit";
import {customElement, property} from "lit/decorators.js";

declare global {
  interface HTMLElementTagNameMap {
    "app-layout": LayoutElement;
  }
}

@customElement("app-layout")
export default class LayoutElement extends LitElement {
  static override styles = css`
:host {
  display: block;
}
  `;

  override render() {
    return html`
    <slot name="header"></slot>
    <slot name="body"></slot>
    <slot name="footer"></slot>
    `;
  }
}
