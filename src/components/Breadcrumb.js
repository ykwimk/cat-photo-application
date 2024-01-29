class Breadcrumb {
    constructor({ $target, state }) {
        const $el = document.createElement('nav');
        $el.className = 'Breadcrumb';

        this.$el = $el;
        this.state = state;

        $target.appendChild($el);

        this.render();
    }

    setState(state) {
        this.state = state;
        this.render();
    }

    render() {
        let $navEl = '<div>root</div>';

        if (!this.state.isRoot) {
            this.state.nav.forEach(item => {
                $navEl += `<div>${item.name}</div>`;
            })
        }

        this.$el.innerHTML = $navEl;
    }
}