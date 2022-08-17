import Ky from "ky";
import {LitElement, html, css} from "lit";
import {customElement, eventOptions, property} from "lit/decorators.js";

declare global {
  interface HTMLElementTagNameMap {
    "api-call": ApiCallElement;
  }
}

/**
* An example element.
*
* @fires count-changed - Indicates when the count changes
* @slot - This element has a slot
* @csspart button - The button
*/
@customElement("api-call")
export default class ApiCallElement extends LitElement {
  static override styles = css`
    :host {
      display: block;
      border: solid 1px gray;
      padding: 16px;
      max-width: 800px;
    }

    .btn.red {
      background-color: red;
      color: white;
      font-weight: 700;
    }
  `;

  /**
  * The name to say "Hello" to.
  */
  @property()
  data: any = null;

  @property()
  state = "IDLE";

  override connectedCallback() {
    super.connectedCallback()
  
    document.title = "Api Call";
  }

  override render() {

    const dataDisplay = (this.data) ? html`<div>Output was: ${JSON.stringify(this.data)}</div>` : html`<h6>Nothing to show yet</h6>`;
    return html`
      <h1>CLICK THE RED BUTTON</h1>
      <button class="btn red" @click=${this._onClick} part="button">
        Click to fetch from API
      </button>

      <div>
        <h3>Current State ${this.state}</h3>
        ${dataDisplay}
      </div>
    `;
  }

  @eventOptions({capture: false})
  private _onClick() {

    this.state = "FETCHING";
    Ky.get("/data/hello").json().then((result) => {
      this.data = result;
    }).finally(() => {

      this.state = "IDLE";
    });
    this.dispatchEvent(new CustomEvent("count-changed"));
  }
}
