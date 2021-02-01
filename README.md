# hello-vue

Learning Vue.

## `v-model` & Inputs

When buttons are inside of forms, you typically want to listen to the form submit event instead.

You add the `prevent` modifier to ensure that when form submission occurs, we don't have the browser default.

This would send a request & would result in a page reload, which in the end, restarts our app & loses all our data.

```
<form @submit.prevent="submitForm">
    // ...
    <div>
        <button>Save Data</button>
    </div>
</form>
```

We have two main ways of getting data out of inputs.

We use `v-model` or our own custom `@input` event listener. E.g, listening to every keystroke & storing what the user entered in some data property.

This is perfectly fine & especially useful if you want to validate an input element on every keystroke to show an error message before the user tries to submit anything.

If you use the `v-model`, you can use two way binding. This can help with resetting the form.

With two way binding, you can not only listen to what the user entered, but also overwrite what's in the form & you can change the value which is stored in an input.

```
<form @submit.prevent="submitForm">
    // ...
    <input id="user-name" name="user-name" type="text" v-model="userName" />
    <div>
        <button>Save Data</button>
    </div>
</form>
```

```
export default {
  data() {
    return {
      userName: '',
    };
  },
  methods: {
    submitForm() {
      console.log('Username: ' + this.userName);
      this.userName = '';
    },
  },
};
```

For this form we want to use `v-model`.

This means that Vue will automatically detect every keystroke & update the value stored in `username`.

Also, when we change what's stored in `username` with our code(e.g, when the form is submitted & we reset the value), changes will also be reflected in the input.

## `v-model` Modifiers & Numbers

There can be a common bug in Vue where you will think you've got a number from an input of `type="number"` when actually you are working with a string.

Be aware that if using `v-model` on an input of `type="number"` it will automatically fetch the user input & _convert_ it from a string to a number data type.

```
<input id="age" name="age" type="number" v-model="userAge" ref="ageInput"/>
```

If you are using just JavaScript or the `refs` attribute(the native JavaScript object representing this input), by default, what's stored in the value is always a string.

```
export default {
  data() {
    return {
      userName: '',
      userAge: null
    };
  },
  methods: {
    submitForm() {
      // ...
      console.log('User age:');                         // If input submitted was 30
      console.log(this.userAge + 5);                    // 35   // Number
      console.log(this.$refs.ageInput.value + 5);       // 305  // Concatenated string
      console.log(31);                                  // 31   // Number
      this.userAge = null;
    },
  },
};
```

This is an extra feature added by Vue & `v-model` which sees that an input is of `type="number"` & will therefore convert the default string value to a number of value for you.

You can also force this behaviour with other input types.

```
<input id="age" name="age" type="text" v-model.number="userAge" ref="ageInput"/>
```

Note the `v-model` modifiers:

- `v-model.lazy`
- `v-model.number`
- `v-model.trim`

## `v-model` & Dropdowns

`v-model` works on dropdowns in the same way as input elements.

```
<form @submit.prevent="submitForm">
    // ...
    <div class="form-control">
        <label for="referrer">How did you hear about us?</label>
        <select id="referrer" name="referrer" v-model="referrer">
            <option value="google">Google</option>
            <option value="wom">Word of mouth</option>
            <option value="newspaper">Newspaper</option>
        </select>
    </div>
    // ...
</form>
```

With dropdowns, you will want to start with a default choice.

```
export default {
  data() {
    return {
      userName: '',
      userAge: null,
      referrer: 'Google'
    };
  },
  methods: {
    submitForm() {
      // ...
      console.log('Referrer: ' + this.referrer);
      this.referrer = 'Google';
    },
  },
};
```

## `v-model` with Checkboxes & Radiobuttons

`v-model` works on checkboxes & radiobuttons too.

On every input element we will add `v-model` as an atrribute.

Remember to add a `value` attriubte to each element which acts as a unique identifier.

```
<div class="form-control">
  <h2>What are you interested in?</h2>
  <div>
    <input
      id="interest-news"
      name="interest"
      type="checkbox"
      value="news"
      v-model="interest"
    />
    <label for="interest-news">News</label>
  </div>
  // ...
</div>
<div class="form-control">
  <h2>How do you learn?</h2>
  <div>
    <input
      id="how-video"
      name="how"
      type="radio"
      value="video"
      v-model="how"
    />
    <label for="how-video">Video Courses</label>
  </div>
  // ...
</div>
<div class="form-control">
  <input
    type="checkbox"
    id="confirm-terms"
    name="confirm-terms"
    v-model="confirm"
  />
  <label for="confirm-terms">Agree to terms of use?</label>
</div>
```

When working with multiple checkboxes of the same name, JavaScript automatically creates a group of these checkboxes.

In this case, we create an empty array as a starting data property value & Vue will then add all checked elements to this array.

If you have a group of checkboxes which share the same `name` attribute value, you will get an array where all the check values will be elements in.

If you have a single checkbox for a given name value, then you get true or false.

```
export default {
  data() {
    return {
      // ...
      interest: [],
      how: null,
      confirm: false,
    };
  },
  methods: {
    submitForm() {
      // ...
      cconsole.log("Checkboxes");
      console.log(this.interest);
      console.log("Radio buttons");
      console.log(this.how);
      this.interest = [];
      this.how = null;
      console.log("Confirm?");
      console.log(this.confirm);
      this.confirm = false;
    },
  },
```

## Basic Form Validation

A very basic example using the built-in `@blur` event.

It is good to be aware of the many ways to validate.

```
<div
  class="form-control"
  :class="{ invalid: userNameValidity === 'invalid' }"
>
  <label for="user-name">Your Name</label>
  <input
    id="user-name"
    name="user-name"
    type="text"
    v-model.trim="userName"
    @blur="validateInput"
  />
  <p v-if="userNameValidity === 'invalid'">Please enter a valid name!</p>
</div>
```

```
export default {
  data() {
    return {
      // ...
      userNameValidity: "pending",
    };
  },
  methods: {
    submitForm() {
      // ...
    },
    validateInput() {
      if (this.userName === "") {
        this.userNameValidity = "invalid";
      } else {
        this.userNameValidity = "valid";
      }
    },
  },
```

## Custom Control Component

Create a `RatingControl.vue` component with three options.

```
<template>
  <ul>
    <li :class="{active: modelValue === 'poor'}">
      <button type="button" @click="activate('poor')">Poor</button>
    </li>
    <li :class="{active: modelValue === 'average'}">
      <button type="button" @click="activate('average')">Average</button>
    </li>
    <li :class="{active: modelValue === 'great'}">
      <button type="button" @click="activate('great')">Great</button>
    </li>
  </ul>
</template>
```

We want to keep track of which rating is selected.

```
export default {
  data() {
    return {
      activeOption: null,
    };
  },
  methods: {
    methods: {
    activate(option) {
      this.$emit('update:modelValue', option);
    },
  },
},
```

We need to connect this component to our form.

We can use our `<rating-control/>` component like the `input` elements in our form using `v-model`.

We can bind the value that this `<rating-control/>` has internally to some data property stored in the form component.

`v-model` is shorthand for the `@input=""` & `:value=""` attributes which are specific to `input` elements.

However, Vue supports using `v-model` on components too.

```
<div class="form-control">
  <rating-control v-model="rating"></rating-control>
</div>
```

If you use `v-model` on a component, it will set the very specific _prop_ in that component & it will listen to a very specific _event_, which you can emit in that component.

```
export default {
  props: ['modelValue'],
  emits: ['update:modelValue'],
  //  data() {
  //    return {
  //      activeOption: this.modelValue,
  //    };
  //  },
  //  computed: {
  //    activeOption() {
  //      return this.modelValue;
  //    }
  //  },
  methods: {
    methods: {
    activate(option) {
      this.$emit('update:modelValue', option);
    },
  },
},
```

Using `v-model` on a custom component is like manually binding the `:model-value=""` prop & the `@update:modelValue=""` event.

Now, back in our form.

```
export default {
  data() {
    return {
      // ...
      rating: null,
    };
  },
  methods: {
    submitForm() {
      // ...
      console.log("Rating");
      console.log(this.rating);
      this.rating = null;
    },
    validateInput() {
      // ...
    },
  },
```
