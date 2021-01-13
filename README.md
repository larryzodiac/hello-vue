# hello-vue

Learning Vue.

## Two Way Binding

You might have `input`s where you don't just want to get the value the user entered, but where you also want to set the value of the input.

We achieve this by listening to the input with the `v-on` directive, and by sending the stored value back into the input by binding the value attribute with the `v-bind` directive.

```
<section id="assignment">
    <h2>Hello World</h2>
    <input type="text" v-bind:value="name" v-on:input="setName" />
    <p>{{ name }}</p>
</section>
```

This is such a common pattern that Vue has a shorthand `v-model` directive.

If you bind a value and listen to input changes, use `v-model`.

```
<section id="assignment">
    <h2>Hello World</h2>
    <input type="text" v-model="name" />
    <p>{{ name }}</p>
</section>
```

This is two way binding.

## Methods used for Data Binding

Consider the following data binding :

```
<section id="assignment">
    <h2>Hello World</h2>
    <input type="text" v-model="name" />
    <p>{{ outputFullname() }}</p>
</section>
```

```
const app = Vue.createApp({
    <!-- ... -->
    methods: {
        outputFullname() {
            console.log('Running')
            if(this.name === '') {
                return '';
            }
            return this.name + '' + 'Mac Hale'
        }
    }
})
```

This is not the best way of data binding `outputFullname`

When other `v-on` events occur, Vue looks behind the scenes for what parts of the page to update. For example, a counter :

```
    <button v-on:click="add(5)">Add</button>
    <p>{{ counter }}</p>
```

Vue does not know if `counter` is used in the `outputFullname` method. 

Vue goes ahead, and re-executes any method you're using anywhere in your HTML code interpolated between `{{ }}`, or with `v-bind` and `v-html`.

Any non-event bound methods will be re-executed by Vue whenever anything on screen changes.

This is bad for performance. e.g log the method in a browser.

This is why methods are not the best solution for outputting dynamically calculated values.

## Computed Properties

Solution to the above.

Computed properties are methods with one important difference. Vue will be aware of their dependencies(data properties) and only re-execute them if one of their dependencies changes.

Computed Properties are the third big configuration for our Vue apps.

We use computed functions like data properties and should name them similarly i.e not `outputFullname` but `fullname`. We do not call them.

```
const app = Vue.createApp({
    <!-- ... -->
    computed: {
        fullname() {
            if(this.name === '') {
                return '';
            }
            return this.name + '' + 'Mac Hale'
        }
    }
})
```

`name` is a dependency of `fullname`.

You can now use the computed function in our html. Never call them, only point and Vue will call it for us.

```
<section id="assignment">
    <h2>Hello World</h2>
    <input type="text" v-model="name" />
    <p>{{ fullname() }}</p>
</section>
```

In the browser console we don't see the computed function call like before.

It's better to use computed properties over methods for outputting values in most cases.

You will still bind your events to methods.

You don't bind events to computed properties.

## Watchers

Watchers are similar to computed properties. A watcher is a function you can tell Vue to execute when one of its dependencies changed.

You can use watchers instead of computed properties, but generally shouldn't.

When naming a watcher method we __repeat__ another data or computed property name.

Whenever the `name` data property changes, the `name` watcher method will re execute

```
const app = Vue.createApp({
    data() {
        return {
            name: '',
            fullname; ''
        }
    }
    <!-- ... -->
    watch: {
        name() {
            this.fullname = this.name + '' + 'Mac Hale'
        }
    }
})
```

The watcher method will be executed automatically by Vue whenever a data property of that name changes.

We do not need to refer to `this.name` here. A watcher function automatically gets the the latest value of the watch property as an argument.

```
const app = Vue.createApp({
    <!-- ... -->
    watch: {
        name(value) {
            this.fullname = value + '' + 'Mac Hale'
        }
    }
})
```

Can accept new value and old value as arguments.

```
watch: {
    name(newValue, oldValue) { ... }
}
```

Wacthers can be troublesome if we have multiple properties to be watched; we need multiple watchers.

In a computeded property we can use one method only and just reference the other dependency. This has the desiered behaviour with less code.

```
const app = Vue.createApp({
    <!-- ... -->
    computed: {
        fullname() {
            if(this.name === '') {
                return '';
            }
            return this.name + '' + this.lastname
        }
    }
})
```

Watchers are good for individual tasks. For example, resetting a counter, making a http request or setting a timer.

if you want to run some code which might, but not necessarily, update a data property in reaction to a property change or if you want to execute code because something changed, then watchers can be helpful.

If you just want to calculate some output value dynamically, computed properties are your friend.

## Methods vs Computed Properties vs Watchers

### Methods :

1. Use methods with data(interpolation) or event binding.
2. If you use a method in the data binding use case to outsource logic from a template to your view instance, then the method is executed for every 're-render' cycle of the component.
3. So whenever something changes and the template is re-evaluated, every method that's called in the template will be called again.
4. You should use methods primarily for event binding.
5. Alternatively, for data that really needs to be re-evaluated all of the time.

### Computed Properties :

Otherwise, use computed properties as they can only be used with data binding.

1. You don't use them with event binding.
2. Computed Properties are only re-evaluated if one of their dependent data values changes.
3. So, if the data used inside of the computed property changed, they will not be re-evaluated if some other data changed.
4. Use Computed Properties for data that depends on other data.

### Watchers

1. Watchers are not directly used in the template.
2. You can watch any data property and even computed properties.
3. Watchers allows you to run code in reaction to some change data.
4. Send a HTTP request, set a timer, store something in local storage,
5. You should use Watchers for any non data updates you want to make. Whenever you have some behind the scenes work to do based on some changing data.

## `v-bind` and `v-on` Shorthands

`v-on` :

```
<button v-on:click="add(10)">Add</button>
```

Shorthand is `@`

```
<button @:click="add(10)">Add</button>
```

`v-bind` :

```
<img v-bind:src="someImage" width="500"/>
```

Shorthand is `:`

```
<img :src="someImage" width="500"/>
```

There is no `v-model` shortcut.
