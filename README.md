# hello-vue

Learning Vue.

This page needs editing.

## Inline Styles

Regular inline style attribute :

```
<div style="border-color: red" @click="boxSelected('A')"></div>
```

If you use the `v-bind` syntax to dynamically bind the style attribute, Vue supports a special object syntax using camelCase.

```
<div :style="{borderColor: 'red'}" @click="boxSelected('A')"></div>
```

We can make style more dynamic by adding JavaScript.

```
<div 
    :style="{borderColor: boxSelected ? 'red' : '#ccc'}"
    @click="boxSelected('A')"
></div>
```

## Dynamic CSS Classes

We use the `v-bind` directive shorthand to bind class attributes.

`class` requires a string :

```
<div
    :class="'demo'"
    @click="boxSelected('A')"
></div>
```

We can check if `boxASelected` with a ternary expression :

```
<div
    :class="boxASelected ? 'demo active' : 'demo'"
    @click="boxSelected('A')"
></div>
```

The above is difficult to read. Especially if there are more classes.

Just as swith `style` attribute, Vue supports a special `class` object syntax with `v-bind`.

We can add properties, where the properties reflect CSS classes, and the values of those properties are truthy or falsey. This indicates whether a class should be added.

```
<div
    :class="{demo: true, active: boxASelected}"
    @click="boxSelected('A')"
></div>
```

Less redundant :

```
<div
    class="demo"
    :class="{active: boxASelected}"
    @click="boxSelected('A')"
></div>
```

`demo` does not need to be dynamically bound and can therefore be added to the regular class attribute.

## Classes & Computed Properties

Example with computed properties for more advanced checks.

```
<div
    class="demo"
    :class="boxAClasses"
    @click="boxSelected('A')"
></div>
```

```
const app = Vue.createApp({
    data: function() {
        return {
            boxASelected: false
        }
    },
    computed: {
        boxAClasses() {
            return { active: this.boxASelected };
        }
    },
    methods: {
        boxSelected(box) {
            if(box === 'A') {
                this.boxASelected = !this.boxASelected;
            } else if(box === 'B') { ... }
        }
    }
})
```

## Array Syntax

```
<div
    class="demo"
    :class="{active: boxASelected}"
    @click="boxSelected('A')"
></div>
```

Alternatively, Vue supports another array syntax with classes.

```
<div
    :class="['demo', {active: boxASelected}]"
    @click="boxSelected('A')"
></div>
```