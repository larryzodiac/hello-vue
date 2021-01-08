# hello-vue

Learning Vue.

## Event Binding

For reacting to user input we use the `v-on` directive.

```
<section id="assignment">
    <h2>Hello World</h2>
    <button v-on:click="counter++">Add</button>
    <p>{{ counter }}</p>
</section>
```

The `v-on` directive takes the event you want to listen for. We can listen to all default [events](https://developer.mozilla.org/en-US/docs/Web/Events) available on html elements.

## Events & Methods

`counter++` is a single JavaScript expression. We can write more complex code using methods.

We can use The `v-on` directive to _point_(or call()) at method for us when a certain event occurs.

```
<section id="assignment">
    <h2>Hello World</h2>
    <button v-on:click="add">Add</button>
    <p>{{ counter }}</p>
</section>
```

The logic is now outsourced to JavaScript. In Vue, you will typically use methods to connect to events.

```
const app = Vue.createApp({
    data: function() {
        return {
            counter: 0,
        }
    },
    methods: {
        add() {
            this.counter = this.counter + 1;
        }
    }
})
```

## Events with Arguments

Often we want to make functions more dynamic by accepting parametres.

```
const app = Vue.createApp({
    <!-- ... -->
    methods: {
        add(num) {
            this.counter = this.counter + num;
        }
    }
})
```

Using the `v-on` directive, we can _call_ a method and pass arguments.

```
<section id="assignment">
    <h2>Hello World</h2>
    <button v-on:click="add(5)">Add</button>
    <p>{{ counter }}</p>
</section>
```

## Using the Native Event Object

To capture user input, we can _also_ use the `v-on` directive.

We can use events like `keyup` or `keydown`, but the best event to use is `input`; a default DOM event availible on an input element.

We can specify to code between the double quotes that should execute when an input event is emitted, which will be the case on every keystroke.

```
<section id="assignment">
    <h2>Hello World</h2>
    <input type="text" v-on:input="setName" />
    <p>{{ name }}</p>
</section>
```

In JavaScript, we can add an event listener to a html element and then point it at a function to be executed when that event occurs.

That function will automatically get an object as an argument describing the event that occured.

In `setName` we can accept that argument as a parametre, naming it however we like.

We can then access the `target` of the event, giving us access to the html element on which the event occurred.

```
const app = Vue.createApp({
    <!-- ... -->
    methods: {
        setName(event) {
            this.name = event.target.value;
        }
    }
})
```

In this example we _pointed_ to the function `setName` and let the browser provide the default object.

In the previous example we orverride this by instead _calling_ the function `add` using the `()` soft braces syntax.

```
<button v-on:click="add(5)">Add</button>
```

There might be scenarios where you need to do both.

We can use the reserved `$event` name in Vue.

```
<section id="assignment">
    <h2>Hello World</h2>
    <input type="text" v-on:input="setName($event, 'Mac Hale')" />
    <p>{{ name }}</p>
</section>
```

We now have access to both the event and the argument.

```
const app = Vue.createApp({
    <!-- ... -->
    methods: {
        setName(event, lastName) {
            this.name = event.target.value + '' + lastName;
        }
    }
})
```

## Event Modifiers

When a button is clicked inside a form, the browser default is to submit that form and send a HTTP request to the server serving the app.

With frameworks like Vue, typically we want to prevent this default and handle this behaviour manually in JavaScript with Vue's help.

```
<form>
    <input type="text" />
    <button>Sign Up</button>
</form>
```

Using the `v-on` directive, we can listen for form submission events.

```
<form v-on:submit="submitForm">
    <input type="text" />
    <button>Sign Up</button>
</form>
```

We can access the default browser event object passed to the `submitForm` method to _prevent_ the default behaviour.

```
const app = Vue.createApp({
    <!-- ... -->
    methods: {
        submitForm(event) {
            event.preventDefault();
            alert('Submitted!);
        }
    }
})
```

Instead of this we can use event modifiers with less code.

We can add event modifier with a `.` after an event name.

```
<form v-on:submit.prevent="submitForm">
    <input type="text" />
    <button>Sign Up</button>
</form>
```

We can do other things like :

```
<button v-on:click.right="add(5)">Add</button>
```

Another example is hitting enter once a user is finished typing.

```
<section id="assignment">
    <h2>Hello World</h2>
    <input type="text" v-on:input="setName($event, 'Mac Hale')" v-on:keyup.enter="confirmInput" />
    <p>{{ confirmedName }}</p>
</section>
```

```
const app = Vue.createApp({
    <!-- ... -->
    methods: {
        setName() {
            this.name = event.target.value + '' + lastName;
        }
        confirmInput() {
            this.confirmedName = this.name
        }
    }
})
```

## Locking Content with v-once

We can use the `v-once` directive to preserve the initial value of a data property.

```
<section id="assignment">
    <h2>Hello World</h2>
    <button v-on:click="counter++">Add</button>
    <p v-once>Starting couter : {{ counter }}</p>
    <p>Result : {{ counter }}</p>
</section>
```

This tells Vue that any dynamic data bindings on this element should only be evaluated once.