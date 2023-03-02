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
    <el-menu-item-group title="Shelf Management">
      <router-link to="/sms/createShelf" style="text-decoration: none">
        <el-menu-item index="shelfManage">create a new shelf(empty now)</el-menu-item>
      </router-link>
      <router-link to="/sms/shelfManage" style="text-decoration: none">
        <el-menu-item index="shelfManage">shelf manage</el-menu-item>
      </router-link>
    </el-menu-item-group>
    </el-sub-menu>

    <el-sub-menu index="Online">
      <template #title>
        <span>Online store Management</span>
      </template>
      <el-menu-item-group title="Order Management">
        <router-link to="/oms/allInfo" style="text-decoration: none">
          <el-menu-item index="allInfo">orders (empty now)</el-menu-item>
        </router-link>
      </el-menu-item-group>

      <el-menu-item-group title="Inbound/Outbound Management">
        <router-link to="/ims/allInfo" style="text-decoration: none">
          <el-menu-item index="allInfo">outbound (empty now)</el-menu-item>
        </router-link>
        <router-link to="/ims/changeOne" style="text-decoration: none">
          <el-menu-item index="oneOrder">inbound (empty now)</el-menu-item>
        </router-link>
      </el-menu-item-group>

      <el-menu-item-group title="Product Management">
        <router-link to="/pms/warehouse" style="text-decoration: none">
          <el-menu-item index="warehouse">my warehouse (empty now)</el-menu-item>
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
    // handleOpen(key, keyPath) {
    //   console.log(key, keyPath)
    // },
    // handleClose(key, keyPath){
    //   console.log(key, keyPath)
    // }
  }
}
</script>

<style scoped>
.menu{
  min-height: 90vh;
}
</style>
