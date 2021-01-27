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
