class App {
    constructor($target) {
        this.$target = $target;

        this.state = {
            isRoot: true,
            nav: [],
            data: null,
        }

        this.Breadcrumb = new Breadcrumb({ $target, state: this.state });

        this.Nodes = new Nodes({
            $target,
            state: this.state,
            onClickItem: (item) => {
                this.onFetchGetId(item, null);
            },
            onClickBack: (item) => {
                if (item.parent?.id) {
                    this.onFetchGetId(item, 'back');
                } else {
                    this.onInit();
                }
            }
        })

        this.onInit();
    }

    setState(state) {
        this.state = state;

        this.Nodes.setState({
            ...this.state,
        })
    }

    async onInit() {
        try {
            const response = await getRoot();

            this.setState({
                ...this.state,
                isRoot: true,
                data: response,
                nav: [],
            });
            this.Breadcrumb.setState({ ...this.state });
        } catch(e) {
            console.error(e);
        }
    }

    async onFetchGetId(item, type) {
        try {
            const response = await getId(type === 'back' ? item.parent?.id : item.id);

            const nav = [...this.state.nav];

            if (type === 'back') {
                nav.splice(nav.length - 1);
            } else {
                nav.push(item);
            }

            this.setState({
                ...this.state,
                isRoot: false,
                data: response,
                nav,
            });
            this.Breadcrumb.setState({ ...this.state });
        } catch(e) {
            console.error(e);
        }
    }
}