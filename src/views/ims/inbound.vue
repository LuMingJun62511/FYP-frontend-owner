<template>
  <el-card shadow="always">
    <p>Here are the receipts with items to return</p>
    <div style="width: 1100px">
      <el-table
        :data="receipts"
        style="width: 100%">
        <el-table-column type="expand">
          <template v-slot="props">
            <el-row>
              <el-col :span="6">product id</el-col>
              <el-col :span="6">amount</el-col>
              <el-col :span="6">total price</el-col>
              <el-col :span="6">operation</el-col>
            </el-row>
            <div v-for="item in props.row.items">
              <div v-if="item.status === 2" class="to-return" style="background-color: rgb(250,242,201)">
                <el-row>
                  <el-col :span="6">{{item.product_id}}</el-col>
                  <el-col :span="6">{{item.amount}}</el-col>
                  <el-col :span="6">{{item.total_price}}</el-col>
                  <el-col :span="6">
                    <el-button @click="chooseItemToReturn(item)">check this one</el-button>
                  </el-col>
                </el-row>
              </div>
              <div v-if="item.status === 0 || item.status === 1" class="not-to-return">
                <el-row>
                  <el-col :span="6">{{item.product_id}}</el-col>
                  <el-col :span="6">{{item.amount}}</el-col>
                  <el-col :span="6">{{item.total_price}}</el-col>
                  <el-col :span="6">no operation</el-col>
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
          prop="receiver.id"
          width="200">
        </el-table-column>
        <el-table-column
          label="member_id"
          prop="member.id"
          width="200">
        </el-table-column>
        <el-table-column
          label="total_price"
          prop="totalAmount"
          width="200">
        </el-table-column>
        <el-table-column
          label="paid_amount"
          prop="payAmount"
          width="200">
        </el-table-column>
      </el-table>
    </div>
  </el-card>
<!--  <el-card shadow="always"></el-card>-->
  <el-row>
    <el-col :span="8">
      <el-card shadow="always">
        <p>to return items</p>
        <el-form :data="itemToReturn">
          <el-form-item label="which product">
            <p>{{itemToReturn.product_id}}</p>
          </el-form-item>
          <el-form-item label="which batch">
            <p>{{itemToReturn.batch_id}}</p>
          </el-form-item>
          <el-form-item label="amount">
            <p>{{itemToReturn.amount}}</p>
          </el-form-item>
        </el-form>
      </el-card>
    </el-col>
    <el-col :span="8">
      <el-card shadow="always">
        <p>product Info</p>
        <el-form :data="productInfo">
          <el-form-item label="product name">
            <p>{{productInfo.name}}</p>
          </el-form-item>
          <el-form-item label="how many left">
            <p>{{productInfo.stock}}</p>
          </el-form-item>
          <el-form-item label="single price">
            <p>{{productInfo.price}}</p>
          </el-form-item>
        </el-form>
      </el-card>

    </el-col>
    <el-col :span="8">
      <el-card shadow="always">
        <p>batch Info</p>
        <el-form :data="batchInfo">
          <el-form-item label="how many left">
            <p>{{batchInfo.amount}}</p>
          </el-form-item>
          <el-form-item label="BBD">
            <p>{{batchInfo.bbd}}</p>
          </el-form-item>
        </el-form>
      </el-card>

    </el-col>
  </el-row>

  <el-button @click="returnAllItems">return all items</el-button>

</template>

<script>
import axios from 'axios'

export default {
  name: 'inbound',
  data(){
    return{
      receiptId:0,
      receipts:[],
      itemToReturn:{},
      productInfo:{},
      batchInfo:{}
    }
  },
  methods:{
    returnAllItems(){
      for (let i = this.receipts.length - 1; i >= 0; i--) {
        this.receipts[i].items.forEach(item=>{
          if(item.status === 2){
            this.returnThisItem(item)
          }
        })
        //反正我默认处理完了，就把receipt删去了吧
        this.receipts.splice(i, 1)
      }
    },

    chooseItemToReturn(item){
      this.itemToReturn.receipt_id=item.receipt_id
      this.itemToReturn.product_id=item.product_id
      this.itemToReturn.batch_id=item.batch_id
      this.itemToReturn.total_price=item.totalPrice
      this.itemToReturn.amount=item.amount
      axios.get('http://localhost:8080/api/ims/productInfo/'+item.product_id).then(response => {
        this.productInfo = response.data
        console.log(this.productInfo)
      })
      axios.get('http://localhost:8080/api/ims/batchInfo/'+item.batch_id).then(response => {
        this.batchInfo = response.data
        console.log(this.batchInfo)
      })
    },

    returnThisItem(itemToReturn){
      this.updateBatch(itemToReturn.batch_id,itemToReturn.amount);
      this.updateProduct(itemToReturn.product_id,itemToReturn.amount);
      this.updateReceiptItem(itemToReturn.receipt_id,itemToReturn.product_id,itemToReturn.batch_id,itemToReturn.amount);
      this.updateReceipt(itemToReturn.receipt_id)
    },

    updateBatch(batchId,amount){
      axios.post('http://localhost:8080/api/ims/updateBatch/'+batchId+'/'+amount).then(response => {
        console.log(response.status)
      })
    },

    updateProduct(productId,amount){
      axios.post('http://localhost:8080/api/ims/updateProduct/'+productId+'/'+amount).then(response => {
        console.log(response.status)
      })
    },

    updateReceiptItem(receiptId,productId,batchId,amount){
      axios.post('http://localhost:8080/api/ims/updateReceiptItems/'+amount,{receiptId,productId,batchId}).then(response => {
        console.log(response.status)
      })
    },

    updateReceipt(receiptId){
      axios.post('http://localhost:8080/api/ims/updateReceipt/'+ receiptId).then(response => {
        console.log(response.status)
      })
    },
  },

  async created () {
    await axios.get('http://localhost:8080/api/ims/toReturnReceipts').then(response => {//还没实现，就是取status为2的receipt,
      this.receipts = response.data
    })
    await this.receipts.forEach(receipt=>{
      axios.get('http://localhost:8080/api/ims/receiptItemsByReceiptId/'+receipt.id).then(response => {
        let receiptItems = []
        response.data.forEach(item=>{
          receiptItems.push({
            receipt_id:receipt.id,
            product_id:item.product.id,
            batch_id:item.batch.id,
            total_price:item.totalPrice,
            amount:item.amount,
            status:item.status
          })
        })
        receipt.items = receiptItems;
      })
    })

  }
}
</script>

<style scoped>
.el-card {
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>
