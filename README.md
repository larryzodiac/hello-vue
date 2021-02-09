# hello-vue

Learning Vue.

[vue-router](https://router.vuejs.org/guide/).

## Registering & Rendering Routes

```
const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/teams', component: TeamsList }
    ]
});

const app = createApp(App);

app.use(router);

app.mount('#app');
```

`app.use()` makes our Vue app aware of routes.

Built-in `<router-vue />` component tells router that this is the place where the selected _routed to component_ should be loaded.

## Navigating with router-link

`router-link` renders a special anchor tag which will not load a different page & reload the entire app, & hence loose the current state.

The browser default of loading a different page is prevented. Instead, the view router takes over analyses the link the user clicked, downloads the appropriate component & updates the URL.

```
<router-link to="/teams">Teams</router-link>
```

## Styling Links

`<router-link />` adds special css classes to links that are currently selected.

```
a:router-link-active {
    color: #f1a80a;
}
```

There is also a `router-link-exact-active` class added for use with nested links.

You can configure these css classes in `createRouter`.

```
const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/teams', component: TeamsList }
    ],
    linkActiveClass: 'active'
});
```

## Programmatic Navigation

There will be scenarios where you will want to click a button, send some data, then redirect, etc.

This is programmatic navigation. Routing without seleecting a `<router-link />` component. We don't just want to navigate away, we want to perform a task.

```
<button @click="confirmInput">Confirm</button>
```

Our vue app gives us accesss to a special `$router` property on which we can call various methods.

```
methods: {
    confirmInput() {
        this.$router.push('/teams');
    }
}
```

We also have `back()` & `forward()` to emulate the browser buttons.

## Passing Data with Route Params (Dynamic Segments)

You define a dynamic segment by aadding a colon.

```
routes: [
    { path: '/teams', component: TeamsList }
    { path: '/teams/:teamId', component: TeamsMembers }
]
```

The route will become active if the user enters `/teams` & anything after.

The order matters.

```
routes: [
    { path: '/teams', component: TeamsList }
    { path: '/teams/:teamId', component: TeamsMembers }
    { path: '/teams/new' }
]
```

You should place other routes that are not dynamic segments first. Otherwise

In this case, the path '/teams/:teamId' would match '/teams/new' because _new_ would be interpreted as a _teamId_.

We can get access to the value the user entered in the browser URL via the loaded component.

In the loaded router component we can access `$route` to get the route parametres.

```
export default {
    inject: ['users', 'teams'],
    components: {
        UserItem
    },
    data() {
        return { // ... }
    },
    created() {
        const teamId = this.$route.params.teamId;
        const selectedTeam = this.teams.find(team => team.id === teamId)
        // ...
    }
}
```

We used the path `/teams/:teamId` which means we can access the parametre through `this.route.params.teamId`.

## Navigation & Dynamic Paths

If we want the id of each team id to be different we can use `router-link`.

We bind an id prop to the `to` attributte which then points at a JavaScript Expression.

```
<router-link :to="'/teams/' + id">View Members</router-link>
```

You can also use computed properties in this scenario :

```
<router-link :to="'/teams/' + id">View Members</router-link>
```

```
export default {
    props: ['id', 'name', 'memberCount']
    computed: {
        teamMembersLink() {
            return '/teams/' + this.id;
        }
    }
}
```

## Updating Params Data with Watchers

Route parametres can be tricky.

Consider om a page that was loaded for a given parameter, you want to click a button & go to the same page with a _different_ parametre.

```
// ... Bottom of page
<router-link to="/teams/t2">Go to Team 2</router-link>
```

You will face this problem of nothing happening.

If you start at `t1`, the URL will update to `t2` but the data on screen will not change.

This is an intended behavior.

The view router does not destroy & rebuild the components that were loaded when you navigate around.

It's more efficient to cash them than to always destroy & rebuild them when the URL changes.

Therefore, the code in `created` does not run again when the URL changed.

```
export default {
    // ...
    created() {
        const teamId = this.$route.params.teamId;
        const selectedTeam = this.teams.find(team => team.id === teamId)
        // ...
    }
}
```

When the URL changes, the `$route` property changes. It will always hold the latest parametre.

Therefore, you can use a _watcher_ in this scenario.

```
export default {
    // ...
    methods: {
        loadTeamMembers(route) {
            const teamId = route.params.teamId;
            const selectedTeam = this.teams.find(team => team.id === teamId)
            // ...
        }
    },
    created() {
        this.loadTeamMembers(this.$route);
    },
    watch: {
        $route(newRoute) {
            this.loadTeamMembers(newRoute);
        }
    }
}
```

This is one way to solve this problem.

## Passing Params as Props

The previous _TeamMembers_ component has one potential disadvantage. It is only loadable through routing.

It relies on `$route` which is used in `created()` & `watch`.

It would be problematic when we wish to use this component elsewhere.

It might be better if _TeamMembers_ would be loaded such that you get `teamId` as a prop.

```
export default {
    props: ['teamId']
    methods: {
        loadTeamMembers(teamId) {
            const selectedTeam = this.teams.find(team => team.id === teamId)
            // ...
        }
    },
    created() {
        this.loadTeamMembers(this.teamId);
    },
    watch: {
        teamId(newId) {
            this.loadTeamMembers(newId);
        }
    }
}
```

However, if we change `$route` for a `teamId` props, the router by default does not add any props to a loaded component.

We can change this in the router config by adding the _prop_ option to a route.

```
routes: [
    { path: '/teams', component: TeamsList }
    { path: '/teams/:teamId', component: TeamsMembers, props:true }
]
```

This tells the view router that dynamic parametres should be passed into this component as _props_ rather than just on the `$route` property.

This component is not strictly tied to routing anymore.

## Redirecting & Catch All Routes

Most users will reach a page by entering your domain in the URL. There will be scenarios where there will be no matching routes.

We want to handle this & display something else on screen.

## Nested Routes

```
routes: [
  { path: "/", redirect: "/teams" },
  {
    name: "teams",
    path: "/teams",
    component: TeamsList,
    children: [
      {
        name: "team-members",
        path: ":teamId",
        component: TeamMembers,
      },
    ],
  },
  // ..
]
```

No longer registered directly in routes, so will not appear in the root router.

You need to add another `<router-view />` in the component where the nested route is defined as a child route.

As a side note, nested routes make the root route active with css.

## More Fun with Nested Routes & Location Objects

Vue offers useful features that help us with heavily nested router apps.

The `<router-link />`'s `:to` prop does not only take a string; you can alternatively pass an object.

This becomes more useful when combined with _named routes_.

```
computed: {
  teamMembersLink() {
    // return '/teams/' + this.id;
    return {
      name: 'team-members',
      params: { teamId: this.id },
    };
    // this.$router.push({ name: 'team-members', params: { teamId: this.id } });
  },
},
```

Very readable & maintainable. Anytime you wish to change the route, the name stays the same.

You can also navigate programatically using `push()`.

## Query Params

A query parameter is an optional route parameter which is not needed to find & load a component, but which may be used to pass extra information into that component.

They are not defined in the route config.

```
return {
  name: 'team-members',
  params: { teamId: this.id },
  query: { sort: 'asc' },
};
```

You can extract it using `this.$route.query`. 

```
created() {
  // this.$route.path // /teams/t1
  this.loadTeamMembers(this.teamId);
  console.log(this.$route.query);
},
```

They cannot be passed as props, e.g `this.query`.

## Rendering Multiple Routes with Named Router Views

You can have multiple `<router-views/>` on the same level.

```
<template>
  <the-navigation></the-navigation>
  <main>
    <router-view></router-view>
  </main>
  <footer>
    <router-view></router-view>
  </footer>
</template>
```

Not too helpful, but instead we can load multiple components per-route & send them to certain `<router-view/>`s.

Instead of just having one component in a route, we can many _components_.

```
{
  name: "teams",
  path: "/teams",
  components: { default: TeamsList, footer: TeamsFooter },
  children: [
    {
      name: "team-members",
      path: ":teamId",
      component: TeamMembers,
    },
  ],
},
```

We can then name a second `<router-view/>`.

```
<template>
  <the-navigation></the-navigation>
  <main>
    <router-view></router-view>
  </main>
  <footer>
    <router-view name="footer"></router-view>
  </footer>
</template>
```

## Controlling Scroll Behaviour

Whenever we switch a route, scroll to the top.

This is something we can add in the vue router; You can add a scroll behavior property, which is actually a method.

This method will be called by the router whenever your page changes. The scroll behavior method will then receive arguments automatically.

`to` & `from` are route objects that you would get with `this.$route` inside a loaded component.

`savedPosition` is only set if using the back button.

If you log it, you see it is an object with a left and a top property describing where the user scrolled to on the previous page.

```
const router = createRouter({
  // ...
  scrollBehavior( to, from, savedPosition) { ... },
});
```

```
const router = createRouter({
  // ...
  // _, _2 are indicators to not use.
  scrollBehavior(_, _2, savedPosition) {
    // If we do go back, use previous position
    if (savedPosition) {
      return savedPosition;
    }
    // No saved position? Scroll user to top
    return { left: 0, top: 0 };
  },
});
```

## Introducing Navigtion Guards

Functions/methods which are called automatically by router when a navigation action started.

`beforeEach` requires a function as an argument. It will be called by the router whenever we navigate from one page to another.

It takes arguments `to`, `from` & `next` which is a function we have to call to either confirm or deny the navigation action.

```
router.beforeEach(function(to, from, next) {
  // Can use an if
  next();
});
```

Can say `next(false)` to deny.

Later we'll also see how we could use that feature in combination with checking whether a user is authenticated or not.

## Diving Deeper into Navigation Guards

The previous `beforeEach` would run for every route. Sometimes you just want to protect individual routes.

Use `beforeEnter()` :

```
{
  path: "/users",
  components: {
    default: UsersList,
    footer: UsersFooter,
  },
  beforeEnter(to, from, next) {
    console.log("users beforeEnter");
    console.log(to, from);
    next();
  },
},
```

If you don't want these in your config, you can use them in component lifecycle :

```
export default {
  // ...
  beforeRouteEnter(to, from, next) {
    console.log('UsersList Cmp beforeRouteEnter');
    console.log(to, from);
    next();
  },
}
```

This is the order in which guards are executed. Global first, then route & then component level.

Next is `beforeRouteUpdate` which we call in components that are reused.

```
export default {
  // ...
  beforeRouteUpdate(to, from, next) {
    // this.loadTeamMembers(to.params.teamId);
    next();
  },
}
```

## Global "afterEach" Guard

`afterEach` will run when a navigation is confirmed. Cannot use it to control what the user sees.

Could be handy for sending analytics for example.

It does not take `next`.

```
router.afterEach(function(to, from) {
  // sending analytics data
  console.log(to, from);
});
```

## Beyond Entering: Route Leave Guards

There is a useful guard triggered when a user wants to leave a page.

Of course, when you leave a page & go to another, all before guards are triggered.

You might want to run some code on the component that is being left right before it's being left.

You could use `unmounted` lifecycle hook, but this runs after the navigation has been confirmed. It gives us no way to cancel the navigation.

Example use case is form validation or hitting the back button accidentally.

```
beforeRouteLeave(to, from, next) {
  data() {
    return { changesSaved: false }
  }
  // ...
  if (this.changesSaved) {
    next();
  } else {
    const userWantsToLeave = confirm('Are you sure? You got unsaved changes!');
    next(userWantsToLeave);
  }
},
```

## Utilising Route Metadata

On any given route you can add an extra property `meta:{}` where you can store any type of values.

```
{
  name: 'teams',
  path: '/teams',
  meta: { needsAuth: true },
  components: { default: TeamsList, footer: TeamsFooter },
  children: [
    {
      name: 'team-members',
      path: ':teamId',
      component: TeamMembers,
      props: true
    } // /teams/t1
  ]
},
```

You can access this meta field where the route object is available, i.e the dollar sign route object.

For example, you could check in every global `beforeEach` if a user is authenticated.

```
router.beforeEach(function(to, from, next) {
  if (to.meta.needsAuth) {
    console.log('Needs auth!');
    next();
  } else {
    next();
  }
});
```