
export default class TemplateHoc extends HTMLElement {

	static get observableAtts() {
	  return ['open', 'template'];
	}

	constructor() {
      super();
	  this.attachShadow({ mode: 'open' });
      this.close = this.close.bind(this);
	}

	get open() {
	  return this.hasAttribute('open');
	}
	  
	get template() {
	  return this.getAttribute('template');
	}

	render() {}
}