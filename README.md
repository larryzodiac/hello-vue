# hello-vue

Learning Vue.

This page needs editing.

## Two Way Binding

v-model shorthand for v-bind and v-input

## Methods used for Data Binding

When data binding a method {{ outputFullname() }} not the best way of doing that.

When other v-on events happen, Vue behind the scenes looks for what parts of the page to update. Vue will update e.g {{ counter }}

Vue does not know if counter is used in outputFullname() method. So, Vue will update specific part of page and call any interpolated methods.

Vue goes ahead, and re-executes any method you're using anywhere in your HTML code between curly braces, or with the v-bind, or with the HTML, so any non-event bound method will be re-executed by Vue, whenever anything on the screen changes.

Performance not so great. e.g log the method in the browser.

## Computed Properties

Solution

Computed properties are essentially like methods with one important difference view will be aware of their dependencies(data properties) and only reexecute them if one of the dependencies changed.

Third big configuration for our Vue apps.

We use computed functions like data properties and should name them similarly i.e not setName but name. We do not call them.

You can now use the computed method in our html. Never call them, only point and Vue will call it for us.

In the browser console we don't see the computed function call.

You still bind your events to methods.

You don't bind events to computer properties.

## Watchers

Similar to computed properties. A watcher is a function you can tell Vue to execute when one of its dependencies changed.

You can use instead of computed properties, but generally shouldn't.

Whenever name changes, this watcher method will re execute

You repeat another data or computed property name in a watcher method as a method name there and when you do that, that watcher method will be executed automatically by Vue whenever a property of that name changes.

We do not need to refer to this.name here, a watcher function automatically gets the last value, the latest value of the watch property as an argument.

Can accept new value and old value as arguments.

Bad because if we have multiple properties to be watched, we need multiple watchers.

Whereas in a computeded property we can use one method only and just reference the other dependency. Desiered behaviour with less code.

Watchers are good for individual tasks. E.g resetting a counter, making a http request or setting a timer.

if you wanna run some code, which may be, but not necessarily also updates some data property in reaction to a property changing or if you wanna do that execute code because something changed, then watchers can be helpful.

If you just want to calculate some output value dynamically, computed properties are your friend.

## Methods vs Computed Properties vs Watchers

Use methods with data(interpolation) or event binding.

If you use a method in the data binding use case to outsource logic from the template to your view instance, then the method is executed for every 're-render' cycle of the component.

So whenever something changes and the template is re-evaluated, every method that's called in the template will be called again.

You should use methods primarily for event binding.

Alternatively, for data that really needs to be re-evaluated all of the time.

Otherwise, use computed properties as they can only be used with data binding.

You don't use them with event binding.

Computed Properties are only re-evaluated if one of their dependent data values changes.

So if the data used inside of the computed property changed, they will not be re-evaluated if some other data changed.

Use Computed Properties for data that depends on other data.

Watchers are not directly used in the template.

You can watch any data property and even computed properties.

Watchers allows you to run code in reaction to some change data.

Send a HTTP request, set a timer, store something in local storage,

You should use Watchers for any non data updates you want to make. Whenever you have some behind the scenes work to do based on some changing data.

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
