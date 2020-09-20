import Vue from './vue.esm.browser.js'
import Vuex from './vuex.esm.js'
import App from './components/App.js'


Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        count: 0
    },
    mutations: {
        increment(state) {
            state.count++
        }
    }
})

new Vue({
    render: h => h(App),
    store: store
}).$mount(`#app`)