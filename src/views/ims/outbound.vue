<template>
  <div style="width: 1100px">
    <el-table
      :data="receipts"
      style="width: 100%">
      <el-table-column type="expand">
        <template v-slot="props">
          <el-row>
            <el-col :span="8">product id</el-col>
            <el-col :span="8">amount</el-col>
            <el-col :span="8">total price</el-col>
          </el-row>
          <div v-for="item in props.row.items">
            <div v-if="item.status === 1" class="changed-one" style="background-color: rgb(250,242,201)">
              <el-row>
                <el-col :span="8">{{item.product_id}}</el-col>
                <el-col :span="8">{{item.amount}}</el-col>
                <el-col :span="8">{{item.total_price}}</el-col>
              </el-row>
            </div>
            <div v-if="item.status === 0" class="not-lack-one">
              <el-row>
                <el-col :span="8">{{item.product_id}}</el-col>
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
    <el-button @click="outboundAll">
      outbound all
    </el-button>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'outbound',
  data(){
    return{
      receipts:[], //因为生成了订单后，也得生成收据，所以就也得维护一个这个，这个在这里维护的时候是整体，推上去更新的时候分开推，比较好办
      receiptItems:[],
    }
  },
  methods:{

    outboundAll(){
      let queryList = []
      this.receipts.forEach(receipt =>{
        queryList.push(receipt.id)
      })
      //1,把product修改，同时把统计数据修改一下
      axios.post('http://localhost:8080/api/pms/updateProductStock').then(response => {
        console.log(response.status)
      })
      //2,把receipts 状态修改一下
      axios.post('http://localhost:8080/api/oms/updateReceiptStatus',queryList).then(response => {
        console.log(response.status)
      })
    }
  },

  async created () {
  //  查receipt
    await axios.get('http://localhost:8080/api/ims/notFinishedReceipts').then(response => {
      this.receipts = response.data
    })

    await console.log(this.receipts)
    await this.receipts.forEach(receipt =>{
      axios.get('http://localhost:8080/api/ims/receiptItemsByReceiptId/'+receipt.id).then(response => {
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
        receipt.items = receiptItems;
      })
    })

  }
}
</script>

<style scoped>

</style>
