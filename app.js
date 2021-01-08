const app = Vue.createApp({
    data() {
        return {
            fname: '',
            lname: '',
            confirmedLname: '',
        }
    },
    methods: {
        myAlert() {
           alert('Wow')
        },
        setName(event, name) {
            const val = event.target.value;
            name === 'fname' ? this.fname = val : this.lname = val;
        },
        confirmLname() {
            this.confirmedLname = this.lname;
        }
    }
})

app.mount('#assignment')