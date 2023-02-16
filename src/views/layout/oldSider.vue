<template>

  <!--  <el-menu-->
  <!--    :collapse="props.isCollapse"-->
  <!--    :collapse-transition="false"-->
  <!--    active-text-color="#2F74FF"-->
  <!--    background-color="#ebf1f5"-->
  <!--    class="menu"-->
  <!--    default-active="2"-->
  <!--    router-->
  <!--    text-color="#606266"-->
  <!--    @close="handleClose"-->
  <!--    @open="handleOpen"-->
  <!--  >-->
  <el-menu
    :collapse="isCollapse"
    active-text-color="#2F74FF"
    class="menu"
    default-active="2"
    router
    text-color="#606266"
    @close="handleClose"
    @open="handleOpen"
  >
    <el-sub-menu>
      <!--    <el-sub-menu index="1">-->
      <template #title>
        <!--        <el-icon><location /></el-icon>-->
        <span>Offline store Management</span>
      </template>
      <el-menu-item-group title="Order Management">
        <!--        <template #title><span>Order Management</span></template>-->
        <router-link to="/oms/allInfo">
          <el-menu-item>allInfo</el-menu-item>
        </router-link>
        <router-link to="/oms">
          <el-menu-item>allInfo too</el-menu-item>
        </router-link>
        <!--        <el-menu-item >allInfo too</el-menu-item>-->
      </el-menu-item-group>
      <!--      <el-menu-item-group title="Group Two">-->
      <!--        <el-menu-item index="1-3">Commodity Management</el-menu-item>-->
      <!--      </el-menu-item-group>-->
      <!--      <el-sub-menu index="1-4">-->
      <!--        <template #title><span>item four</span></template>-->
      <!--        <el-menu-item index="1-4-1">item one</el-menu-item>-->
      <!--      </el-sub-menu>-->
    </el-sub-menu>
    <!--    <el-menu-item index="2">-->
    <!--&lt;!&ndash;      <el-icon><icon-menu /></el-icon>&ndash;&gt;-->
    <!--      <template #title>Navigator Two</template>-->
    <!--    </el-menu-item>-->
    <!--&lt;!&ndash;    <el-menu-item index="3" disabled>&ndash;&gt;-->
    <!--    <el-menu-item index="3" >-->
    <!--&lt;!&ndash;      <el-icon><document /></el-icon>&ndash;&gt;-->
    <!--      <template #title>Navigator Three</template>-->
    <!--    </el-menu-item>-->
    <!--    <el-menu-item index="4">-->
    <!--&lt;!&ndash;      <el-icon><setting /></el-icon>&ndash;&gt;-->
    <!--      <template #title>Navigator Four</template>-->
    <!--    </el-menu-item>-->
  </el-menu>
</template>

<script>

export default {
  name: 'AppMenu',
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
  /*min-height: calc(100vh - 80px);*/
  min-height: 85vh;
}
</style>
