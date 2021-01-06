# hello-vue

Learning Vue.

## Vue App Instances

Create a Vue instance :

```
const app = Vue.createApp({})
```

Mount the app to the html in the DOM you want to control using a unique css id selector :

```
app.mount('#assignment')
```

```
<section id="assignment">
    <h2>Hello World</h2>
    <p></p>
</section>
```

We can now configure our app.

The data properety is reserved in Vue and requires a function as a value.

```
const app = Vue.createApp({
    data: function() {
        return {
            name: 'Evan'
        }
    }
})
```

Or with Javascript method shorthand :

```
const app = Vue.createApp({
    data() {
        return {
            name: 'Evan'
        }
    }
})
```

This function always requires an object to be returned. Inside that object we can create any key value pair of our choice.

## Interpolation

In html we can reference our returned data object using the `{{ }}` syntax.

```
<section id="assignment">
    <h2>Hello World</h2>
    <p>{{ name }}</p>
</section>
```

## Data Binding

You don't always want to use interpolation. For example, link and image attributes :

```
const app = Vue.createApp({
    data() {
        return {
            name: 'Evan',
            myLink: 'https://vuejs.org/'
        }
    }
})
```

Use the built-in `v-bind` Vue directive.

```
<section id="assignment">
    <h2>Hello World</h2>
    <p>{{ name }}</p>
    <a v-bind:href="myLink">Visit Vue</a>
</section>
```

## Methods

We can define custom functions in Vue. 

The `methods` property is an object full of functions :

```
const app = Vue.createApp({
    data() {
        return {
            name: 'Evan',
            myLink: 'https://vuejs.org/'
        }
    },
    methods: {
        randomNumber() {
            return Math.random();
        }
    }
})
```

We can call a method in our html using Interpolation.

```
<section id="assignment">
    <h2>Hello World</h2>
    <p>{{ name }}</p>
    <a v-bind:href="myLink">Visit Vue</a>
    <p>{{ randomNumber() }}</p>
</section>
```

When using Interpolaion, we can evaluate JavaScript expressions. For example, the ternary operator.

## This

All methods will have their `this` context automatically bound to the Vue instance.

In `methods` we can access `data` properties using the `this` keyword.

```
const app = Vue.createApp({
    data() {
        return {
            name: 'Evan',
            myLink: 'https://vuejs.org/'
        }
    },
    methods: {
        whatIsMyName() {
            return this.name;
        }
    }
})
```

This is not valid JavaScript but Vue takes `data` and merges with it the global Vue instance.

## Security

Vue protects against cross-site scripting attacks.

Avoid this pattern if you can.