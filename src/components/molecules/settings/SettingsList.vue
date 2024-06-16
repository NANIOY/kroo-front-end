<script>
export default {
    name: 'SettingsList'
};
</script>

<template>
    <div class="sidebar">
        <ul>
            <li><a href="#account">Account</a></li>
            <li><a href="#billing">Billing</a></li>
            <li><a href="#notifications">Notifications</a></li>
            <li><a href="#accessibility" class="active">Accessibility</a></li>
        </ul>
    </div>
</template>

<style scoped>
.sidebar {
    width: 200px;
    background-color: #f0f0f0;
    padding: 20px;
}

.sidebar ul {
    list-style-type: none;
    padding: 0;
}

.sidebar li {
    margin: 20px 0;
}

.sidebar a {
    text-decoration: none;
    color: black;
    font-size: 18px;
}

.sidebar a.active {
    color: white;
    background-color: #6200ee;
    padding: 10px;
    border-radius: 5px;
}
</style>