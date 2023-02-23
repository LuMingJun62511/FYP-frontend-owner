<template>
  <el-menu
    :collapse="isCollapse"
    active-text-color="#2F74FF"
    class="menu"
    default-active="2"
    router
    text-color="#606266"
  >
    <el-sub-menu index="Offline">
      <template #title>
        <span>Offline store Management</span>
      </template>
      <el-menu-item-group title="Order Management">
        <router-link to="/oms/allInfo">
          <el-menu-item index="allInfo">allInfo</el-menu-item>
        </router-link>
        <router-link to="/oms/changeOne">
          <el-menu-item index="oneOrder">one order</el-menu-item>
        </router-link>
        <router-link to="/oms/detail">
          <el-menu-item index="detail">detail</el-menu-item>
        </router-link>
      </el-menu-item-group>

    <el-menu-item-group title="Shelf Management">
      <router-link to="/sms/shelfManage">
        <el-menu-item index="shelfManage">shelf manage</el-menu-item>
      </router-link>
    </el-menu-item-group>
    </el-sub-menu>
  </el-menu>
</template>

<script>

export default {
  name: 'Sidebar',
  props:{
    isCollapse: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose(key, keyPath){
      console.log(key, keyPath)
    }
  }
}
</script>

<style scoped>
.menu{
  min-height: 90vh;
}
</style>
