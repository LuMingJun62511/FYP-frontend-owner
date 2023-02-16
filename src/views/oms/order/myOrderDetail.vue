<template>
  <div>
    <el-steps :active="formatStepStatus(order.status)" finish-status="success" align-center>
      <el-step title="提交订单" :description="formatTime(order.createTime)"></el-step>
      <el-step title="支付订单" :description="formatTime(order.paymentTime)"></el-step>
      <el-step title="平台发货" :description="formatTime(order.deliveryTime)"></el-step>
      <el-step title="确认收货" :description="formatTime(order.receiveTime)"></el-step>
      <el-step title="完成评价" :description="formatTime(order.commentTime)"></el-step>
    </el-steps>
<!-- 这里有两点，第一，我能不能做到点某一步，然后就跳转到那一步，同时还存着上面的数据   -->
<!-- 第二，是怎么做到某一步和一些页面的连接,同样是-->
  </div>
  <el-card shadow="never" style="margin-top: 15px">
    <div class="operate-container">
      {{$log("order是空的？")}}
      {{$log(order)}}
<!--      好,今天我看能不能把订单形状确定了,然后传一个订单过来-->
      <div class="operate-button-container" v-show="order.status===0">
        <el-button size="mini" @click="showUpdateReceiverDialog">修改收货人信息</el-button>
        <el-button size="mini">修改商品信息</el-button>
        <el-button size="mini" @click="showUpdateMoneyDialog">修改费用信息</el-button>
        <el-button size="mini" @click="showMessageDialog">发送站内信</el-button>
        <el-button size="mini" @click="showCloseOrderDialog">关闭订单</el-button>
        <el-button size="mini" @click="showMarkOrderDialog">备注订单</el-button>
      </div>
      <div class="operate-button-container" v-show="order.status===1">
        <el-button size="mini" @click="showUpdateReceiverDialog">修改收货人信息</el-button>
        <el-button size="mini" @click="showMessageDialog">发送站内信</el-button>
        <el-button size="mini">取消订单</el-button>
        <el-button size="mini" @click="showMarkOrderDialog">备注订单</el-button>
      </div>
      <div class="operate-button-container" v-show="order.status===2||order.status===3">
        <el-button size="mini" @click="showLogisticsDialog">订单跟踪</el-button>
        <el-button size="mini" @click="showMessageDialog">发送站内信</el-button>
        <el-button size="mini" @click="showMarkOrderDialog">备注订单</el-button>
      </div>
      <div class="operate-button-container" v-show="order.status===4">
        <el-button size="mini" @click="handleDeleteOrder">删除订单</el-button>
        <el-button size="mini" @click="showMarkOrderDialog">备注订单</el-button>
      </div>
      <!-- 第二，是怎么做到某一步和一些页面的连接-->
<!--这个问题有答案了,他根据order.status确定订单处理到哪一步了,然后就确定了该怎么渲染页面,同样的,:active="formatStepStatus(order.status)" 确定了步骤的状态-->

    </div>
  </el-card>
</template>

<script>
import { formatDate } from '@/utils/date'
const defaultReceiverInfo = {
  orderId:null,
  receiverName:null,
  receiverPhone:null,
  receiverPostCode:null,
  receiverDetailAddress:null,
  receiverProvince:null,
  receiverCity:null,
  receiverRegion:null,
  status:null
};
export default {
  name: 'myOrderDetail',
  data() {
    return {
      id: null,
      order: {},
      receiverDialogVisible:false,
      receiverInfo:Object.assign({},defaultReceiverInfo),
      moneyDialogVisible:false,
      moneyInfo:{orderId:null, freightAmount:0, discountAmount:0,status:null},
      messageDialogVisible:false,
      message: {title:null, content:null},
      closeDialogVisible:false,
      closeInfo:{note:null,id:null},
      markOrderDialogVisible:false,
      markInfo:{note:null},
      logisticsDialogVisible:false
    }
  },
  methods: {
    formatNull(value) {
      if(value===undefined||value===null||value===''){
        return '暂无';
      }else{
        return value;
      }
    },
    formatLongText(value) {
      if(value===undefined||value===null||value===''){
        return '暂无';
      }else if(value.length>8){
        return value.substr(0, 8) + '...';
      }else{
        return value;
      }
    },
    formatPayType(value) {
      if (value === 1) {
        return '支付宝';
      } else if (value === 2) {
        return '微信';
      } else {
        return '未支付';
      }
    },
    formatSourceType(value) {
      if (value === 1) {
        return 'APP订单';
      } else {
        return 'PC订单';
      }
    },
    formatOrderType(value) {
      if (value === 1) {
        return '秒杀订单';
      } else {
        return '正常订单';
      }
    },
    formatAddress(order) {
      let str = order.receiverProvince;
      if (order.receiverCity != null) {
        str += "  " + order.receiverCity;
      }
      str += "  " + order.receiverRegion;
      str += "  " + order.receiverDetailAddress;
      return str;
    },
    formatStatus(value) {
      if (value === 1) {
        return '待发货';
      } else if (value === 2) {
        return '已发货';
      } else if (value === 3) {
        return '已完成';
      } else if (value === 4) {
        return '已关闭';
      } else if (value === 5) {
        return '无效订单';
      } else {
        return '待付款';
      }
    },
    formatPayStatus(value) {
      if (value === 0) {
        return '未支付';
      } else if(value===4){
        return '已退款';
      }else{
        return '已支付';
      }
    },
    formatDeliverStatus(value) {
      if (value === 0||value === 1) {
        return '未发货';
      } else {
        return '已发货';
      }
    },
    formatProductAttr(value){
      if(value==null){
        return '';
      }else{
        let attr = JSON.parse(value);
        let result='';
        for(let i=0;i<attr.length;i++){
          result+=attr[i].key;
          result+=":";
          result+=attr[i].value;
          result+=";";
        }
        return result;
      }
    },
    onSelectRegion(data){
      this.receiverInfo.receiverProvince=data.province.value;
      this.receiverInfo.receiverCity=data.city.value;
      this.receiverInfo.receiverRegion=data.area.value;
    },
    formatTime(time) {
      if (time == null || time === '') {
        return '';
      }
      let date = new Date(time);
      return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
    },
    formatStepStatus(value) {
      if (value === 1) {
        //待发货
        return 2;
      } else if (value === 2) {
        //已发货
        return 3;
      } else if (value === 3) {
        //已完成
        return 4;
      }else {
        //待付款、已关闭、无限订单
        return 1;
      }
    },
    showUpdateReceiverDialog(){
      this.receiverDialogVisible=true;
      this.receiverInfo={
        orderId:this.order.id,
        receiverName:this.order.receiverName,
        receiverPhone:this.order.receiverPhone,
        receiverPostCode:this.order.receiverPostCode,
        receiverDetailAddress:this.order.receiverDetailAddress,
        receiverProvince:this.order.receiverProvince,
        receiverCity:this.order.receiverCity,
        receiverRegion:this.order.receiverRegion,
        status:this.order.status
      }
    },
    handleUpdateReceiverInfo(){
      this.$confirm('是否要修改收货信息?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        updateReceiverInfo(this.receiverInfo).then(response=>{
          this.receiverDialogVisible=false;
          this.$message({
            type: 'success',
            message: '修改成功!'
          });
          getOrderDetail(this.id).then(response => {
            this.order = response.data;
          });
        });
      });
    },
    showUpdateMoneyDialog(){
      this.moneyDialogVisible=true;
      this.moneyInfo.orderId=this.order.id;
      this.moneyInfo.freightAmount=this.order.freightAmount;
      this.moneyInfo.discountAmount=this.order.discountAmount;
      this.moneyInfo.status=this.order.status;
    },
    handleUpdateMoneyInfo(){
      this.$confirm('是否要修改费用信息?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        updateMoneyInfo(this.moneyInfo).then(response=>{
          this.moneyDialogVisible=false;
          this.$message({
            type: 'success',
            message: '修改成功!'
          });
          getOrderDetail(this.id).then(response => {
            this.order = response.data;
          });
        });
      });
    },
    showMessageDialog(){
      this.messageDialogVisible=true;
      this.message.title=null;
      this.message.content=null;
    },
    handleSendMessage(){
      this.$confirm('是否要发送站内信?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.messageDialogVisible=false;
        this.$message({
          type: 'success',
          message: '发送成功!'
        });
      });
    },
    showCloseOrderDialog(){
      this.closeDialogVisible=true;
      this.closeInfo.note=null;
      this.closeInfo.id=this.id;
    },
    handleCloseOrder(){
      this.$confirm('是否要关闭?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let params = new URLSearchParams();
        params.append("ids",[this.closeInfo.id]);
        params.append("note",this.closeInfo.note);
        closeOrder(params).then(response=>{
          this.closeDialogVisible=false;
          this.$message({
            type: 'success',
            message: '订单关闭成功!'
          });
          getOrderDetail(this.id).then(response => {
            this.order = response.data;
          });
        //   这就是从后台取数据啊，行，今天写一个试试
        });
      });
    },
    showMarkOrderDialog(){
      this.markOrderDialogVisible=true;
      this.markInfo.id=this.id;
      this.closeOrder.note=null;
    },
    handleMarkOrder(){
      this.$confirm('是否要备注订单?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let params = new URLSearchParams();
        params.append("id",this.markInfo.id);
        params.append("note",this.markInfo.note);
        params.append("status",this.order.status);
        updateOrderNote(params).then(response=>{
          this.markOrderDialogVisible=false;
          this.$message({
            type: 'success',
            message: '订单备注成功!'
          });
          getOrderDetail(this.id).then(response => {
            this.order = response.data;
          });
        });
      });
    },
    handleDeleteOrder(){
      this.$confirm('是否要进行该删除操作?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let params = new URLSearchParams();
        params.append("ids",[this.id]);
        deleteOrder(params).then(response=>{
          this.$message({
            message: '删除成功！',
            type: 'success',
            duration: 1000
          });
          this.$router.back();
        });
      })
    },
    showLogisticsDialog(){
      this.logisticsDialogVisible=true;
    }
  }
}
</script>

<style scoped>

</style>
