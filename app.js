const app = Vue.createApp({
  data() {
    return {
      counter: 0,
    };
  },
  methods: {
    add(value) {
      this.counter = this.counter + value;
    },
  },
  computed: {
    result() {
      console.log("hello");
      if (this.counter < 37) {
        return "Not there yet";
      } else if (this.counter > 37) {
        return "Too much!";
      } else {
        return this.counter;
      }
    },
  },
  watch: {
    result() {
      console.log("hello watcher");
      const that = this;
      //   Interesting....
      //   const that = this;
      //   setTimeout(function () {
      //     this.counter = 0;
      //   }, 5000);
      setTimeout(() => {
        this.counter = 0;
      }, 5000);
    },
  },
});

app.mount("#assignment");
