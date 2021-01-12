const app =  Vue.createApp({
    data() {
        return {
            classInput: '',
            paragraph: true,
            backgroundInput: ''
        }
    },
    methods: {
        toggleParagraph() {
            this.paragraph = !this.paragraph;
        },
        backgroundToAdd() {
            return this.backgroundInput
        }
    },
    computed: {
        paragraphClasses() {
            return {
                user1: this.classInput === 'user1',
                user1: this.classInput === 'user1',
                visible: this.paragraph,
                hidden: !this.paragraph
            }
        }
    }
})

app.mount('#assignment')