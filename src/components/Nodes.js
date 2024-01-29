class Nodes {
    constructor({ $target, state, onClickItem, onClickBack }) {
        this.$target = $target;
        this.state = state;
        this.onClickItem = onClickItem;
        this.onClickBack = onClickBack;

        const $el = document.createElement('div');
        $el.className = 'Nodes';
        this.$el = $el;

        $target.appendChild($el);
    }

    setState(state) {
        this.state = state;
        this.render();
    }

    handleClickNode() {
        this.$el.querySelectorAll('.Node').forEach($node => {
            $node.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();

                const id = e.currentTarget.dataset.id;
                const type = e.currentTarget.dataset.type;

                if (type === 'DIRECTORY') {
                    const selectedItem = this.state.data.find(item => item.id === id);
                    this.onClickItem(selectedItem);
                }
            })
        })
    }

    handleClickBack() {
        document.querySelector('#back').addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();

            const lastNavItem = this.state.nav[this.state.nav.length - 1];

            this.onClickBack(lastNavItem);
        })
    }

    render() {
        if (!!this.state.data?.length) {
            this.$el.innerHTML = this.state.data.map(item => {
                return `
                    <div class="Node" data-id="${item.id}" data-type="${item.type}">
                        <img src="./assets/${item.type.toLowerCase()}.png" />
                        <div>${item.name}</div>
                    </div>
                `;
            }).join('');

            if (!this.state.isRoot) {
                this.$el.insertAdjacentHTML("afterbegin", '<div class="Node" id="back"><img src="./assets/prev.png"></div>');
                this.handleClickBack();
            }

            this.handleClickNode();
        } else {
            return null;
        }
    }
}