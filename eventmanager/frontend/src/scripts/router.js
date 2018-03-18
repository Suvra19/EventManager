const Router = {
    routes: [],
    mode: 'history',
    root: '/',
    config: function(options) {
        //this.mode = options && options.mode && options.mode == 'history' && !!(history.pushState) ? 'history' : 'hash';
        this.root = options && options.root ? '/' + this.clearSlashes(options.root) + '/' : '/';
        return this;
    },
    getFragment: function() {
        let fragment = '';
        console.log(decodeURI(location.pathname + location.search))
        fragment = this.clearSlashes(decodeURI(location.pathname + location.search));
        //fragment = fragment.replace(/\?(.*)$/, '');
        fragment = this.root != '/' ? fragment.replace(this.root, '') : fragment;
        return this.clearSlashes(fragment);
    },
    clearSlashes: function(path) {
        return path.toString().replace(/\/$/, '').replace(/^\//, '');
    },
    add: function(re, handler) {
        if (typeof re === 'function') {
            handler = re;
            re = '';
        }
        this.routes.push({re, handler});
        return this;
    },
    remove: function(param) {
        for (let i = 0, r; i < this.routes.length, r = this.routes[i]; i++) {
            if (r.handler === param || r.re.toString() === param.toString()) {
                this.routes.splice(i, 1);
                return this;
            }
        }
        return this;
    },
    flush: function() {
        this.routes = [];
        this.mode = 'history';
        this.root = '/';
        return this;
    },
    check: function(f) {
        const fragment = f || this.getFragment();
        for (let i = 0; i < this.routes.length; i++) {
            let match = fragment.match(this.routes[i].re);
            if (match) {
                match.shift();
                this.routes[i].handler.apply({}, match);
                return this;
            }
        }
    },
    onpopstate: function(event) {
        console.log(event.state.url);
        this.check(event.state.url);
    },
    navigate: function(path) {
        path = path ? path : '';
        console.log(path);
        history.pushState(null, null, this.root + this.clearSlashes(path));
        return this;
    }

}

Router.config({
    root: 'catalog'
}).add(/project\/(.*)/, function() {
    console.log('Project Details');
}).add(/image\/(.*)/, function() {
    console.log('Image details');
});

export default Router;





