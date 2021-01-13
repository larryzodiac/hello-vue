<template>
    <li>
        <h2>{{ profile.name }}</h2>
        <button @click="toggleDetails">Show Details</button>
        <ul v-if="detailsAreVisible">
            <li><strong>Phone</strong> {{ profile.phone }}</li>
            <li><strong>Email</strong> {{ profile.email }}</li>
        </ul>
    </li>
</template>

<script>
export default {
    data() {
        return {
            detailsAreVisible: false,
            profile : {
                id: 'evan',
                name: 'Evan Mac Hale',
                phone: '123456789',
                email: 'evan@cool.com'
            }
        }
    },
    methods: {
        toggleDetails() {
            this.detailsAreVisible = !this.detailsAreVisible;
        }
    }
}
</script>