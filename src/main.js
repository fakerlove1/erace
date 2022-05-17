import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import '../src/assets/css/global.css'
import JsZip from "jszip"
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'
// import './utils/rem.js'


import './theme/index.css'

import request from "./utils/request"

Vue.prototype.$http = request

Vue.config.productionTip = false

// require('../mock')

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')