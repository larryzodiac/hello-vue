const App = {
    data() {
        return {
            myName: 'Evan',
            myAge: 25,
            someImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Vue.js_Logo_2.svg/1200px-Vue.js_Logo_2.svg.png'
        }
    },
    methods: {
        randomNumber() {
            const r = Math.random();
            return r;
        }
    }
}

Vue.createApp(App).mount('#assignment')
  