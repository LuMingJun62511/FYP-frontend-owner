<template>
  <p>处理这一周的网购订单</p>
  <el-steps :active="steps" finish-status="success">
    <el-step title="处理本周所有订单"></el-step>
    <el-step title="手动处理有问题的订单"></el-step>
    <el-step title="review所有receipt"></el-step>
  </el-steps>
  <div class="container">
    <div v-if="steps === 0">
      <el-divider content-position="left">unhandled orders</el-divider>
      <div style="width: 800px;">
        <el-table
          :data="unhandledOrders"
          style="width: 100%">
          <el-table-column type="expand">
            <template v-slot="props">
              <el-row >
                <el-col :span="8">id</el-col>
                <el-col :span="8">名称</el-col>
                <el-col :span="8">数量</el-col>
              </el-row>
              <div v-for="item in props.row.items">
                <div v-if="item.lack === 1" class="lack-one" style="background-color: rgb(250,201,210)">
                  <el-row>
                    <el-col :span="8">{{item.product_id}}</el-col>
                    <el-col :span="8">{{item.product_name}}</el-col>
                    <el-col :span="8">{{item.amount}}</el-col>
                  </el-row>
                </div>
                <div v-if="item.lack === 0" class="not-lack-one">
                  <el-row>
                    <el-col :span="8">{{item.product_id}}</el-col>
                    <el-col :span="8">{{item.product_name}}</el-col>
                    <el-col :span="8">{{item.amount}}</el-col>
                  </el-row>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            label="order id"
            prop="id"
            width="200">
          </el-table-column>
          <el-table-column
            label="status"
            prop="status"
            width="200">
          </el-table-column>
          <el-table-column
            label="payAmount"
            prop="payAmount"
            width="200">
          </el-table-column>
          <el-table-column
            label="notes"
            prop="note"
            width="200">
          </el-table-column>
        </el-table>
      </div>


      <el-divider content-position="left">handled orders</el-divider>
      <div style="width: 800px;">
        <el-table
          :data="handledOrders"
          style="width: 100%">
          <el-table-column
            label="order id"
            prop="id"
            width="200">
          </el-table-column>
          <el-table-column
            label="status"
            prop="status"
            width="200">
          </el-table-column>
          <el-table-column
            label="payAmount"
            prop="payAmount"
            width="200">
          </el-table-column>
          <el-table-column
            label="notes"
            prop="note"
            width="200">
          </el-table-column>
        </el-table>
      </div>
      <el-button style="margin-top: 12px;" @click="autoHandleOrders">auto handling</el-button>
      <el-button style="margin-top: 12px;" @click="finishAutoHandling">finish auto handling</el-button>
    </div>

    <div v-if="steps === 1">
      <div style="width: 800px;">
        <el-table
          :data="unhandledOrders"
          style="width: 100%">
          <el-table-column type="expand">
            <template v-slot="props">
              <el-row >
                <el-col :span="8">id</el-col>
                <el-col :span="8">名称</el-col>
                <el-col :span="8">数量</el-col>
              </el-row>
              <div v-for="item in props.row.items">
                <div v-if="item.lack === 1" class="lack-one" style="background-color: rgb(250,201,210)">
                  <el-row>
                    <el-col :span="8">{{item.product_id}}</el-col>
                    <el-col :span="8">{{item.product_name}}</el-col>
                    <el-col :span="8">{{item.amount}}</el-col>
                  </el-row>
                </div>
                <div v-if="item.lack === 0" class="not-lack-one">
                  <el-row>
                    <el-col :span="8">{{item.product_id}}</el-col>
                    <el-col :span="8">{{item.product_name}}</el-col>
                    <el-col :span="8">{{item.amount}}</el-col>
                  </el-row>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            label="order id"
            prop="id"
            width="200">
          </el-table-column>
          <el-table-column
            label="status"
            prop="status"
            width="200">
          </el-table-column>
          <el-table-column
            label="payAmount"
            prop="payAmount"
            width="200">
          </el-table-column>
          <el-table-column
            label="notes"
            prop="note"
            width="200">
          </el-table-column>
        </el-table>
      </div>

      <p>下面这里选替代货物，大致是选中上面某一条，点处理，然后就可以自动蹦可选项，选一些，问题就解决了，</p>
      <p>过程中，1，要刷新tempStock因为可能涉及到新货物增加，2要刷新所有订单上货物状态，因为</p>
      <p> 然后是设计的问题，怎么设计这里的数据结构比较好呢，</p>
      <p>我选中一个条目，然后呢，我得维持tempOrderItem,这样才能给下面的用，</p>

      <el-button style="margin-top: 12px;" @click="finishManualHandling">finish manual handling</el-button>
    </div>

    <div v-if="steps === 2">
      <p>您已经处理完所有订单，现在是否要开始出货呢，如果要开始出货，请点击以跳转到出货界面</p>
    </div>

  </div>

</template>

<script>
import axios from 'axios'

export default {
  name: 'orderDealing',
  data(){
    return{
      steps:0,
      tempStock:[],//根据订单里所有物品种类，去查出来库存，形成数组
      handledOrders:[],
      unhandledOrders:[],//这里说明一下，在初始化的时候，把order items查出来，添加到每个order里，
      receipts:[], //因为生成了订单后，也得生成收据，所以就也得维护一个这个，这个在这里维护的时候是整体，推上去更新的时候分开推，比较好办
      receiptItems:[],
      tempOrderItem:{}//这是后面解决冲突用的，我得知道现在要解决的冲突是哪个，所以得记一下
    }
  },
  methods:{
    finishAutoHandling(){
      if(this.unhandledOrders.length === 0){
        this.steps = 2;
      }else {
        this.steps = 1;
      }
    },
    finishManualHandling(){
      if(this.unhandledOrders.length === 0){
        this.steps = 2;
        this.updateReceipt()
      }
    },
    //可能改变数组长度的方法要从后向前遍历
    autoHandleOrders() {
      for (let i = this.unhandledOrders.length - 1; i >= 0; i--) {
        this.handleOrder(this.unhandledOrders[i]);
      }
    },
    //注意，但手动生成receipt后，也要再过一遍，因为可能出现后面本来没问题的订单就有问题了，不过这个过一遍是简化版的计算，只需要重新计算货物要不要标红
    handleOrder(order){//点自动处理订单，要全过一遍，

      let copyStock = this.deepCopy(this.tempStock)// 得复制一份tempStock，然后再指过去
      order.items.forEach(item =>{
      //因为订单可能多种货物缺货，所以要全判断完才能结束，不能中途退出
        copyStock.forEach(targetProduct =>{
          if(targetProduct.product_id === item.product_id){//找到了一个单子上有的商品，
            if(targetProduct.product_temp_stock - item.amount >= 0){//货储还充足
              targetProduct.product_temp_stock = targetProduct.product_temp_stock - item.amount
            }else {//货储不充足
              item.lack = 1
              order.hasProblem = 1
            }
          }
        })
        this.tempStock = copyStock//全判断完了，可以指过去了
      })//这里才是一张订单上的所有item都跑了一遍，那么，我就需要查看这份订单是否有问题了
      if (order.hasProblem === 0){//如果检查完，这份订单是可处理的,则可删去，
        const index = this.unhandledOrders.indexOf(order);
        order.status = 1
        this.unhandledOrders.splice(index, 1)//最后将其从unhandledOrders中删去，
        this.handledOrders.push(order)
        //生成receipt,往receipt里面存一份数据,其实这个receipt的数据和order真可以说是一模一样
        this.generateReceipt(order)
      }else {
        console.log(order)
      }
    },

    generateReceipt(order){
      this.receipts.push({
        id:order.id,
        member_id:order.member.id,
        order_id:order.id,
        receiver_id:order.receiver.id,
        total_amount:order.totalAmount,
        pay_amount:order.payAmount,
        delivery_amount:order.deliveryAmount,
        discount_amount:order.discountAmount,
        status:0
      })
      order.items.forEach(item =>{
        console.log("生成receipt了")
        console.log(item)

        this.receiptItems.push({
          receipt_id:order.id,
          price:item.amount*item.price,
          amount:item.amount,
          status:0
        })
      })
    },

    updateReceipt(){

    },
    deepCopy (obj) {
      return JSON.parse(JSON.stringify(obj));
    }



  },
  async created () {
    //   第一步，查订单
    await axios.get('http://localhost:8080/api/order/ordersThisWeek').then(response => {
      response.data.forEach(element =>{
        if(element.status === 1){
          this.handledOrders.push(element)
        }else {
          let changed = {...element,hasProblem:0}
          this.unhandledOrders.push(changed)
        }
      })
    })
    //   第二,三步，查物品及库存
    await this.unhandledOrders.forEach(order =>{
      axios.get('http://localhost:8080/api/order/orderItems/'+order.id).then(response => {
        let tempOrderItems = []
        response.data.forEach(item=>{
          tempOrderItems.push({
            product_id:item.abstractProduct.id,
            product_name:item.abstractProduct.name,
            amount:item.amount,
            lack:0
          })
          if(this.tempStock.findIndex(temp => temp.product_id === item.abstractProduct.id) === -1){//库存去重,库存中没有这个才能加
            this.tempStock.push({
              product_id:item.abstractProduct.id,
              product_temp_stock:item.abstractProduct.stock - item.abstractProduct.toBeOutbound
            })
          }
        })
        order.items = tempOrderItems;
      })
    })
  }
}
</script>

<style scoped>

</style>
