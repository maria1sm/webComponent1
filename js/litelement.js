
import {html, css, LitElement} from 'https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js';
class AvatarComponent extends LitElement {
  static get styles() {
    const { cssRules } = document.styleSheets[0]
    //const { cssRules2 } = document.styleSheets[1]
    const bootstrap = css([Object.values(cssRules).map(rule => 
    rule.cssText).join('\n')])
    //const style = css([Object.values(cssRules2).map(rule => 
    //rule.cssText).join('\n')])
    return [
      //style,
      bootstrap,
      css`
      .disabled{
        opacity: 0.3;
      }
      `
    ];
  }
  static properties = {
    personas: { type: Array },
  };

  constructor() {
    super();
    this.personas = [];
  }

  async connectedCallback() {
    super.connectedCallback();
    await this.fetchPeople();
    this.requestUpdate();
  }

  async fetchPeople() {
    try {
      const response = await fetch('https://randomuser.me/api/?results=5');
      const data = await response.json();
      this.personas = data.results;
    } catch (error) {
      console.error('Error fetching data', error);
    }
  }

  render() {
    return html`
      <div class="d-flex flex-wrap justify-content-center mt-5">
        ${this.personas.map(
          (persona) => html`
            <picture class="d-flex flex-column m-2 align-items-center ${persona.disabled ? 'disabled' : ''}">
              <img class="rounded-circle" src="${persona.picture.large}" @click=${() => this.toggleDisabled(persona)}>
              <b>${persona.name.first}</b>
            </picture>
          `
        )}
      </div>
    `;
  }

  toggleDisabled(persona) {
    persona.disabled = !persona.disabled;
    this.requestUpdate();
  }
}

customElements.define('avatar-component', AvatarComponent);
