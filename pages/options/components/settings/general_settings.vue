<template>
    <basic-settings title="General" color="green" :data="generalSettings">
        <div class="row">
            <div class="col-md-6">
                <h3><span class="semi-bold">Users</span></h3>
                <p>Enable/Disable Family Plan Members</p>
                <br>
                <div v-for="user in generalSettings.users">
                    <div class="row-fluid">
                        <div class="checkbox check-primary">
                            <input :id="user.name" type="checkbox" v-model="user.enabled">
                            <label :for="user.name">{{ user.label }}</label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </basic-settings>
</template>
<script>
export default {
  props: ['generalSettings']
}
</script>
