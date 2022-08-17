import {LitElement, html, css} from "lit";
import {customElement, eventOptions, property} from "lit/decorators.js";

declare global {
  interface HTMLElementTagNameMap {
    "my-element": MyElement;
  }
}

/**
* An example element.
*
* @fires count-changed - Indicates when the count changes
* @slot - This element has a slot
* @csspart button - The button
*/
@customElement("my-element")
export default class MyElement extends LitElement {
  static override styles = css`
    :host {
      display: block;
      border: solid 1px gray;
      padding: 16px;
      max-width: 800px;
    }
  `;

  /**
  * The name to say "Hello" to.
  */
  @property()
  name = "World";

  /**
  * The number of times the button has been clicked.
  */
  @property({type: Number})
  count = 0;

  override render() {
    return html`
      <h1>${this.sayHello(this.name)}!</h1>
      <button @click=${this._onClick} part="button">
        Click Count: ${this.count}
      </button>
      <slot></slot>
    `;
  }

  @eventOptions({capture: false})
  private _onClick() {
    this.count++;
    this.dispatchEvent(new CustomEvent("count-changed"));
  }

  /**
  * Formats a greeting
  * @param name The name to say "Hello" to
  */
  sayHello(name: string): string {
    return `Hello, ${name}`;
  }
}
