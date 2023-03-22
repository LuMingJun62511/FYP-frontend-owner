<template xmlns:el-col="http://www.w3.org/1999/html">
  <p>Process this week's online shopping orders</p>
  <el-steps :active="steps" finish-status="success">
    <el-step title="Process all orders for this week"></el-step>
    <el-step title="Process orders with problem manually"></el-step>
    <el-step title="review all receipts"></el-step>
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
                <el-col :span="8">name</el-col>
                <el-col :span="8">amount</el-col>
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
      <div style="width: 800px">
        <el-table
          :data="unhandledOrders"
          style="width: 100%">
          <el-table-column type="expand">
            <template v-slot="props">
              <el-row>
                <el-col :span="6">id</el-col>
                <el-col :span="6">name</el-col>
                <el-col :span="6">amount needed</el-col>
                <el-col :span="6">operation</el-col>
              </el-row>
              <div v-for="item in props.row.items">
                <div v-if="item.lack === 1" class="lack-one" style="background-color: rgb(250,201,210)">
                  <el-row>
                    <el-col :span="6">{{item.product_id}}</el-col>
                    <el-col :span="6">{{item.product_name}}</el-col>
                    <el-col :span="6">{{item.amount}}</el-col>
                    <el-col :span="6">
                      <el-button @click="chooseItemToHandle(props.row.id,item)">
                        find alt for this
                      </el-button>
                    </el-col>
                  </el-row>
                </div>
                <div v-if="item.lack === 0" class="not-lack-one">
                  <el-row>
                    <el-col :span="6">{{item.product_id}}</el-col>
                    <el-col :span="6">{{item.product_name}}</el-col>
                    <el-col :span="6">{{item.amount}}</el-col>
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
      <div v-if="tempOrderItem.product_id">
        <el-row>
          <el-col :span = "6">The item you are currently processing is</el-col>
          <el-col :span = "6">total need</el-col>
          <el-col :span = "6">currently available stock</el-col>
          <el-col :span = "6">need at least</el-col>
        </el-row>
        <div v-if="tempLackedItemInStock.product_id">
          <el-row>
            <el-col :span = "6">{{tempOrderItem.product_name}}</el-col>
            <el-col :span = "6">{{tempOrderItem.amount}}</el-col>
            <el-col :span = "6">{{ tempLackedItemInStock.product_temp_stock }}</el-col>
            <el-col :span = "6">{{ tempOrderItem.amount - tempLackedItemInStock.product_temp_stock - sumChosen }}</el-col>
          </el-row>
        </div>
      </div>
      <el-divider content-position="left">products can be chosen as alternatives</el-divider>
      <div>
        <el-row>
          <el-col :span="6">id</el-col>
          <el-col :span="6">name</el-col>
          <el-col :span="6">amount left</el-col>
          <el-col :span="6"> your choice</el-col>
        </el-row>
        <div v-for="(item,index) in tempSimilarProducts" :key="index">
            <el-row>
              <el-col :span="6">{{item.product_id}}</el-col>
              <el-col :span="6">{{item.product_name}}</el-col>
              <el-col :span="6">{{item.product_temp_stock}}</el-col>
              <el-col :span="6">
                <el-input-number v-model="item.product_chosen" @change="handleChosen(index,item.product_chosen, item.product_temp_stock)" :min="0" :max="item.product_temp_stock"></el-input-number>
              </el-col>
            </el-row>
        </div>
        <el-button style="margin-top: 12px;" @click="manualHandlingThisOrder">finish fixing this order</el-button>
      </div>
      <el-button style="margin-top: 12px;" @click="finishManualHandling">finish manual handling</el-button>
    </div>

    <div v-if="steps === 2">
      <div style="width: 1100px">
        <el-table
          :data="receipts"
          style="width: 100%">
          <el-table-column type="expand">
            <template v-slot="props">
              <el-row>
                <el-col :span="8">name</el-col>
                <el-col :span="8">amount</el-col>
                <el-col :span="8">total price</el-col>
              </el-row>
              <div v-for="item in props.row.items">
                <div v-if="item.status === 1" class="changed-one" style="background-color: rgb(250,242,201)">
                  <el-row>
                    <el-col :span="8">{{item.product_name}}</el-col>
                    <el-col :span="8">{{item.amount}}</el-col>
                    <el-col :span="8">{{item.total_price}}</el-col>
                  </el-row>
                </div>
                <div v-if="item.status === 0" class="not-lack-one">
                  <el-row>
                    <el-col :span="8">{{item.product_name}}</el-col>
                    <el-col :span="8">{{item.amount}}</el-col>
                    <el-col :span="8">{{item.total_price}}</el-col>
                  </el-row>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            label="receipt id"
            prop="id"
            width="200">
          </el-table-column>
          <el-table-column
            label="receiver_id"
            prop="receiver_id"
            width="200">
          </el-table-column>
          <el-table-column
            label="member_id"
            prop="member_id"
            width="200">
          </el-table-column>
          <el-table-column
            label="total_amount"
            prop="total_amount"
            width="200">
          </el-table-column>
          <el-table-column
            label="operations"
            prop="id">
            <template v-slot="scope">
              <el-button @click="abolishReceipt(scope.row.id)">
                abolish this order and re-deal
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <p>You have processed all the orders, the next step is to outbound, do you want to outbound now? If you do, please click to jump to the outbound page</p>
        <el-button @click="jumpToOutbound">
          jump to outbound
        </el-button>
      </div>
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
      tempOrder:{},//这是后面解决冲突用的，我得知道在解决哪个订单的问题
      tempOrderItem:{},//这是后面解决冲突用的，我得知道在解决哪条缺货
      tempLackedItemInStock:{},//这是后面解决冲突用的，缺货的商品信息
      tempSimilarProducts:[],//这是后面解决冲突用的，是找到的同类商品
    }
  },

  methods:{
    finishAutoHandling(){
      if(this.unhandledOrders.every(order => order.hasProblem === 1)){//加一层判断，unhandledOrders里不能剩下没问题的订单
        if(this.unhandledOrders.length === 0){
          this.steps = 2;
          this.addItemsToReceipt()
        }else {
          this.steps = 1;
        }
      }
    },

    finishManualHandling(){
      if(this.unhandledOrders.length === 0){
        this.steps = 2;
        this.addItemsToReceipt()
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
      order.items.forEach(item =>{//因为订单可能多种货物缺货，所以要全判断完才能结束，不能中途退出
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
        this.dealUnhandledOrdersWithoutProblem(order)
      }
    },

    dealUnhandledOrdersWithoutProblem(order){
      const index = this.unhandledOrders.indexOf(order);
      order.status = 1
      this.unhandledOrders.splice(index, 1)//最后将其从unhandledOrders中删去，
      this.handledOrders.push(order)
      //生成receipt,往receipt里面存一份数据,其实这个receipt的数据和order真可以说是一模一样
      this.generateReceipt(order)
      //生成receiptItems,也是一模一样
      this.generateReceiptItems(order)
    },

    generateReceipt(order){
      this.receipts.push({
        id:order.id,
        memberId:order.member.id,
        orderId:order.id,
        receiverId:order.receiver.id,
        totalAmount:order.totalAmount,
        payAmount:order.payAmount,
        deliveryAmount:order.deliveryAmount,
        discountAmount:order.discountAmount,
        status:0
      })
    },

    generateReceiptItems(order){
      order.items.forEach(item =>{
        this.receiptItems.push({
          receipt_id:order.id,
          product_id:item.product_id,
          product_name:item.product_name,
          total_price:item.amount*item.price,//只记一总价，而且这个时候，对应的单价也已经被改了，所以不用担心
          amount:item.amount,
          status:item.status
        })
      })
    },

    chooseItemToHandle(id,item){
      //0确定这个订单是谁
      this.unhandledOrders.forEach(o =>{
        if(o.id === id) {//找到对应条目
          this.tempOrder = o
        }
      })
      //1确定在处理的item是订单上的哪一条
      this.tempOrderItem = item
      this.tempSimilarProducts = []//可选商品先清零，后面才能再添加
      //2找现阶段库存中对应的商品
      this.tempStock.forEach(targetProduct =>{
        if(targetProduct.product_id === item.product_id) {//找到对应条目
          this.tempLackedItemInStock = targetProduct
        }
      })
      //3找相似的products
      this.findSimilarProducts(item)
    },

    findSimilarProducts(item){
      axios.get('http://localhost:8080/api/pms/productsOfSimilarCategory/'+item.product_id).then(response => {
        response.data.forEach(p =>{
          this.tempSimilarProducts.push({
            product_id:p.id,
            product_name:p.name,
            product_temp_stock:p.stock - p.toBeOutbound,
            product_chosen:0
          })
        })
        //因为处理事务的数据没同步上去，所以get得到的库存会虚多，所以需要更新一下这个库存
        this.tempSimilarProducts.forEach(product => {
          this.tempStock.forEach(stockItem => {
            if(product.product_id === stockItem.product_id) {
              product.product_temp_stock = stockItem.product_temp_stock
            }
          })
        })
      })
    },

    manualHandlingThisOrder(){
      if(this.tempOrderItem.amount-this.tempLackedItemInStock.product_temp_stock-this.sumChosen <= 0){//用户至少得把问题处理完再进行下一步
        this.manualUpdateOrderItems() //1，更新order items,把实际能给的给到，再把新增的替代品添加进来，更改需求
        this.manualAddItemsToStock()//2把因选替代品而要在待用库存中用到的东西添加进去
        this.checkAllUnhandledOrders()//3，全检查一遍未处理订单，因为要出货，其他订单和本订单都只有变坏的可能，可此订单是好坏参半，也有可能成为可处理订单，所以需要检查
        if(this.tempOrder.items.every(item => item.lack === 0)){//4判断一下，这个订单里面是否都ok，如果都ok,就标记这份订单为处理过了，然后把他放到handledOrders里
          this.tempOrder.hasProblem = 0
          this.manualUpdateStock() //5，要虚拟出库了，这时才更新库存tempStock，
          this.dealUnhandledOrdersWithoutProblem(this.tempOrder)//6更新unhandled,生成receipt相关,
          this.checkAllUnhandledOrders()//7虚拟出库了，所以其他订单可能变坏，这就需要再全检查一遍
        }
        this.tempSimilarProducts = []
        this.tempOrder = []
        this.tempLackedItemInStock = []
      }
    },

    manualAddItemsToStock(){
      this.tempSimilarProducts.forEach(tp =>{ //为待用库存增添新货物
        if(tp.product_chosen !== 0){
          if(this.tempStock.findIndex(i => i.product_id === tp.product_id) === -1){//如果这库存里已有我后加的item,那我就不用在加
            this.tempStock.push({
              product_id:tp.product_id,
              product_name:tp.product_name,
              product_temp_stock:tp.product_temp_stock,
            })
          }
        }
      })
    },

    checkAllUnhandledOrders(){
      this.unhandledOrders.forEach( order =>{
        order.items.forEach(item => {//因为订单可能多种货物缺货，所以要全判断完才能结束，不能中途退出
          this.tempStock.forEach(targetProduct => {
            if (targetProduct.product_id === item.product_id) {//找到了一个单子上有的商品，
              if (targetProduct.product_temp_stock - item.amount < 0) {//货储不充足
                item.lack = 1
                order.hasProblem = 1
              }else {
                item.lack = 0
              }
            }
          })
        })
      })
    },

    manualUpdateOrderItems(){
      this.tempOrderItem.amount = this.tempLackedItemInStock.product_temp_stock//我尽可能多的给了用户用户想要的，倾库存相与
      this.tempOrderItem.lack = 0//处理好了，所以不缺了
      this.tempSimilarProducts.forEach(tp =>{ //更新order中的items
        if(tp.product_chosen !== 0){
          const orderItemHave = this.tempOrder.items.findIndex(i => i.product_id === tp.product_id)
          if(orderItemHave !== -1){//如果这订单里有我后加的item,那我就不应该直接加，而是修改
            this.tempOrder.items[orderItemHave].amount = this.tempOrder.items[orderItemHave].amount+tp.product_chosen
          }else {
            this.tempOrder.items.push({
              product_id:tp.product_id,
              product_name:tp.product_name,
              amount:tp.product_chosen,
              price:this.tempOrderItem.price,//这个是单价，和后面的总价应该区分开
              total_price:this.tempOrderItem.price*tp.product_chosen,
              lack:0,
              status:1//这个是表示你这个货物是不是原生的
            })
          }
        }
      })
    },

    manualUpdateStock(){
      this.tempLackedItemInStock.product_temp_stock = 0//该项库存被吃光了
      this.tempSimilarProducts.forEach(tp =>{ //出库，减除新增物品的库存
        if(tp.product_chosen !== 0){
          const orderItemHave = this.tempStock.findIndex(i => i.product_id === tp.product_id)
          if(orderItemHave !== -1){//如果这库存里已有我后加的item,那我就不应该直接加，而是修改
            this.tempStock[orderItemHave].product_temp_stock = this.tempStock[orderItemHave].product_temp_stock - tp.product_chosen
          }else {
            this.tempStock.push({
              product_id:tp.product_id,
              product_name:tp.product_name,
              product_temp_stock:tp.product_temp_stock-tp.product_chosen,
            })
          }
        }
      })
    },

    addItemsToReceipt(){
      this.receipts.forEach(receipt =>{
        receipt.items = []
      })
      this.receiptItems.forEach(receiptItem =>{
        this.receipts.forEach(receipt =>{
          if (receiptItem.receipt_id === receipt.id){
            receipt.items.push(receiptItem)
          }
        })
      })
    },

    async updateReceipt () {
      let res = []
      await this.receipts.forEach(receipt => {
        res.push({
          id:receipt.id,
          member: { id: receipt.memberId },
          order: { id: receipt.orderId },
          receiver: { id: receipt.receiverId },
          totalAmount: receipt.totalAmount,
          payAmount: receipt.payAmount,
          deliveryAmount: receipt.deliveryAmount,
          discountAmount: receipt.discountAmount,
          status: receipt.status
        })
      })
      await axios.post('http://localhost:8080/api/oms/receiptsSaving', res).then(response => {
        console.log(response.status)
      })
    },

    updateReceiptItems(){
      let res = []
      this.receiptItems.forEach(receiptItem=>{
        res.push({//问题是这样，auto increment使得receipt不可控，
          id:{
            receiptId:receiptItem.receipt_id,
            productId:receiptItem.product_id,
            batchId:0,
          },
          receipt:{
            id:receiptItem.receipt_id
          },
          product:{
            id:receiptItem.product_id
          },
          batch:{
            id:0
          },
          totalPrice:receiptItem.total_price,
          amount:receiptItem.amount,
          status:receiptItem.status
        })
      })
      axios.post('http://localhost:8080/api/oms/receiptItemsSaving',res).then(response =>{
        console.log(response.status)
      })
    },

    updateOrders(){
      let res = []
      this.handledOrders.forEach(ho =>{
        res.push(ho.id)
      })
      // 把id发回去，凡是有这个id的，都把status更新了
      axios.post('http://localhost:8080/api/oms/updateOrderStatus',res).then(response =>{
        console.log(response.status)
      })
      //主要是把没处理的这些标识为处理过的
    },

    abolishReceipt(receiptID){
      // 查找要删除的receipt在list中的索引
      const receiptIndexToDelete = this.receipts.findIndex(
        (r) => r.id === receiptID
      );
      //1归还库存
      let toBeDeletedReceipt = this.receipts[receiptIndexToDelete]
      toBeDeletedReceipt.items.forEach(item =>{
        this.tempStock.forEach (ts =>{
          if (ts.id === item.id){
            ts.product_temp_stock = ts.product_temp_stock + item.amount
          }
        })
      })
      //2删除receipt
      this.receipts.splice(receiptIndexToDelete, 1);
      //3放归order
      const orderIndexToBePutBack = this.handledOrders.findIndex(
        (o) => o.id === receiptID
      );
      let orderToBePutBack = this.handledOrders[orderIndexToBePutBack]
      this.unhandledOrders.push(orderToBePutBack)
      this.handledOrders.splice(orderIndexToBePutBack, 1)
    },

    async jumpToOutbound () {
      await this.updateReceipt()//收据得推上去
      await this.updateReceiptItems()//收据里的东西得推上去,同时还改了batch,和warehouse里的商品数
      await this.updateOrders()//然后把handledOrders里的order更新上去，主要是update为已处理
      await this.$router.push('/ims/outbound')
    },

    handleChosen(index, chosen, max) {
      if (chosen > max) {
        this.tempSimilarProducts[index].product_chosen = max;
      } else {
        this.tempSimilarProducts[index].product_chosen = chosen;
      }
    },

    deepCopy (obj) {
      return JSON.parse(JSON.stringify(obj));
    }
  },

  computed:{
    sumChosen(){
      return this.tempSimilarProducts.reduce((acc, cur) => {
        return acc + cur.product_chosen;
      }, 0);
    }
  },

  async created () {
    //   第一步，查订单
    await axios.get('http://localhost:8080/api/oms/ordersThisWeek').then(response => {
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
      axios.get('http://localhost:8080/api/oms/orderItems/'+order.id).then(response => {
        let tempOrderItems = []
        response.data.forEach(item=>{
          tempOrderItems.push({
            product_id:item.abstractProduct.id,
            product_name:item.abstractProduct.name,
            amount:item.amount,
            price:item.abstractProduct.price,//这个是单价，和后面的总价应该区分开
            total_price:item.totalPrice,
            lack:0,
            status:0//这个是标识你这个货物是不是原生的
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
