import {LitElement, html, css} from "lit";
import {customElement, state} from "lit/decorators.js";
import {asyncAppend} from 'lit/directives/async-append.js';

declare global {
  interface HTMLElementTagNameMap {
    "coin-toss": CoinTossElement;
  }
}

async function *tossCoins(count: number) {

  for (let i=0; i<count; i++) {
    yield Math.random() > 0.5 ? 'Heads' : 'Tails';
    await new Promise((r) => setTimeout(r, 1000));
  }
}

@customElement('coin-toss')
export default class CoinTossElement extends LitElement {

  static override styles = css`
    :host {
      display: block;
      border: solid 1px gray;
      padding: 16px;
      max-width: 800px;
    }
  `;

  @state()
  private tosses = tossCoins(10);

  override connectedCallback() {
    super.connectedCallback()
  
    document.title = "Coin Toss";
  }

  render() {

    return html`<ul>${asyncAppend(this.tosses, (v: string, idx) => html`<li>Toss ${idx + 1}: ${v}</li>`)}</ul>`;
  }
}