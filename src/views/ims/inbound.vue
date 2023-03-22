<template>
  <p>有哪个receipt的东西被退货了，就查一下看看</p>
  <el-input name="receiptId"
            type="text"
            v-model="receiptId"
            autoComplete="on"
            placeholder="enter receipt ID please">
  </el-input>
  <el-button @click="findReceiptById">
    查找收据
  </el-button>
  <div style="width: 1100px">
    <el-table
      :data="receipt"
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
            <div v-if="item.status === 1" class="changed-one" style="background-color: rgb(250,242,201)">
              <el-row>
                <el-col :span="6">{{item.product_id}}</el-col>
                <el-col :span="6">{{item.amount}}</el-col>
                <el-col :span="6">{{item.total_price}}</el-col>
                <el-col :span="6">
                  <el-button @click="chooseItemToReturn(item)">return this one</el-button>
                </el-col>
              </el-row>
            </div>
            <div v-if="item.status === 0" class="not-lack-one">
              <el-row>
                <el-col :span="6">{{item.product_id}}</el-col>
                <el-col :span="6">{{item.amount}}</el-col>
                <el-col :span="6">{{item.total_price}}</el-col>
                <el-col :span="6">
                  <el-button @click="chooseItemToReturn(item)">return this one</el-button>
                </el-col>
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
  <p>下面是查出来的，然后写点函数，更新一下batch, product, receiptItem</p>
  <div v-if="itemToReturn.product_id">
    <el-form :data="itemToReturn">
      <el-form-item label="which product">
        <el-input v-model="itemToReturn.product_id"></el-input>
      </el-form-item>
      <el-form-item label="which batch">
        <el-input v-model="itemToReturn.batch_id"></el-input>
      </el-form-item>
      <el-form-item label="amount">
        <el-input v-model="itemToReturn.amount"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="updateAll(itemToReturn)">结束创建</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'inbound',
  data(){
    return{
      receiptId:0,
      receipt:[{}],
      itemToReturn:{}
    }
  },
  methods:{
    async findReceiptById(){
      await axios.get('http://localhost:8080/api/ims/receipt/'+this.receiptId).then(response => {
        this.receipt[0] = response.data
      })
      await axios.get('http://localhost:8080/api/ims/receiptItemsByReceiptId/'+this.receiptId).then(response => {
        let receiptItems = []
        response.data.forEach(item=>{
          receiptItems.push({
            receipt_id:item.receipt.id,
            product_id:item.product.id,
            batch_id:item.batch.id,
            total_price:item.totalPrice,
            amount:item.amount,
            status:item.status
          })
        })
        this.receipt[0].items = receiptItems;
      })
    },

    chooseItemToReturn(item){
      this.itemToReturn.receipt_id=item.receipt_id
      this.itemToReturn.product_id=item.product_id
      this.itemToReturn.batch_id=item.batch_id
      this.itemToReturn.total_price=item.totalPrice
      this.itemToReturn.amount=item.amount
    },

    updateAll(itemToReturn){
      this.updateBatch(itemToReturn.batch_id,itemToReturn.amount);
      this.updateProduct(itemToReturn.product_id,itemToReturn.amount);
      this.updateReceiptItem(itemToReturn.receipt_id,itemToReturn.product_id,itemToReturn.batch_id,itemToReturn.amount);
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
      //在后端记得判断一下，如果这单
    },

  },
}
</script>

<style scoped>

</style>
