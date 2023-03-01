<template>
  <div style="align-content: center">
    <p>the shelf you are manipulating is number {{shelfID}}</p>
  </div>
  <el-row align="middle">
    <el-col :span="6" :offset="3">
      <img src="@/assets/icons/new.png" style="vertical-align: middle;max-width: 30px;max-height:30px "/>
      <p>newly created</p>
    </el-col>

    <el-col :span="6">
      <img src="@/assets/icons/hotSale.png" style="vertical-align: middle;max-width: 30px;max-height:30px "/>
      <p>hot sale</p>
    </el-col>

    <el-col :span="6">
      <img src="@/assets/icons/urgent.png" style="vertical-align: middle;max-width: 30px;max-height:30px "/>
      <p>have batches near BBD</p>
    </el-col>
  </el-row>


  <div class="upper-area">
    <Container
      orientation="vertical"
      drag-handle-selector=".column-drag-handle"
      :drop-placeholder="upperDropPlaceholderOptions"
    >
      <Draggable v-for="column in fromExist.children" :key="column.id">
        <div class="card-container">
          <Container
            orientation="horizontal"
            group-name="col"
            @drop="(e) => onCardDropUpper(column.id, e)"
            :get-child-payload="getCardPayloadUpper(column.id)"
            drag-class="card-ghost"
            drop-class="card-ghost-drop"
            :drop-placeholder="dropPlaceholderOptions"
          >
            <Draggable v-for="card in column.children" :key="card.id">
              <CommodityCard :imgUrl = testUrl :name = card.name :isUrgent = card.isUrgent :sale = card.sale :createdTime = card.createdTime ></CommodityCard>
            </Draggable>
          </Container>
        </div>
      </Draggable>
    </Container>
  </div>

  <div class="lower-area">
    <el-scrollbar >
      <Container
        class="toBeAddedList"
        orientation="horizontal"
        drag-handle-selector=".column-drag-handle"
        :drop-placeholder="upperDropPlaceholderOptions"
      >
        <Draggable v-for="column in fromDatabase.children" :key="column.id">
          <div class="card-container">
            <Container
              orientation="horizontal"
              group-name="col"
              @drop="(e) => onCardDropLower(column.id, e)"
              :get-child-payload="getCardPayloadLower(column.id)"
              drag-class="card-ghost"
              drop-class="card-ghost-drop"
              :drop-placeholder="dropPlaceholderOptions"
            >
              <Draggable v-for="card in column.children" :key="card.id">
                <CommodityCard :imgUrl = testUrl :name = card.name :isUrgent = card.isUrgent :sale = card.sale :createdTime = card.createdTime ></CommodityCard>
              </Draggable>
            </Container>
          </div>
        </Draggable>
      </Container>
    </el-scrollbar>
  </div>

  <div class="button-container">
    <p>——————————————————————————————————————————————————</p>
    <p>functional button area</p>
    <p>——————————————————————————————————————————————————</p>

    <el-row
      class="operate-button-container"
      align="middle"
    >
      <el-col :span="6">
        <p>auto sort</p>
      </el-col>
      <el-col :span="6">
        <el-button @click="autoSortByBBD">according BBD</el-button>
      </el-col>
      <el-col :span="6">
        <el-button @click="autoSortBySale">according sale amount</el-button>
      </el-col>
      <el-col :span="6">
        <el-button @click="autoSortByCreated">according created time</el-button>
      </el-col>
    </el-row>

    <el-row
      class="operate-button-container"
      align="middle"
    >
      <el-col :span="6">
        <p>new to be added</p>
      </el-col>
      <el-col :span="6">
        <el-button @click="autoFindByBBD">according BBD</el-button>
      </el-col>
      <el-col :span="6">
        <el-button @click="autoFindBySale">according sale amount</el-button>
      </el-col>
      <el-col :span="6">
        <el-button @click="autoFindByCreated">according create time</el-button>
      </el-col>
    </el-row>

    <el-row
      class="operate-button-container"
      align="middle"
    >
      <el-col :span="6">
        <p>finished?</p>
      </el-col>
      <el-col :span="9">
        <el-button @click="saveShelf">save this shelf</el-button>
      </el-col>
      <el-col :span="9">
        <el-button @click="deleteShelf">delete this shelf</el-button>
      </el-col>
    </el-row>
  </div>
</template>


<script>
import { Container, Draggable } from 'vue3-smooth-dnd'
import { applyDrag } from '@/utils/helper'
import axios from 'axios'
import CommodityCard from '@/views/sms/components/commodityCard.vue'

const shelfID = 0
const categoryID = 0
const rowNum = 10
const colNum = 10
const fromExist = {}
const fromDatabase = {}
const testUrl = "commo1.png"
export default {
  name: 'testBoth',

  components: {
    CommodityCard,
    Container, Draggable},

  data () {
    return {
      testUrl,
      fromExist,
      fromDatabase,
      shelfID,
      categoryID,
      rowNum,
      colNum,
      upperDropPlaceholderOptions: {
        className: 'cards-drop-preview',
        animationDuration: '150',
        showOnTop: true
      },
      dropPlaceholderOptions: {
        className: 'drop-preview',
        animationDuration: '150',
        showOnTop: true
      }
    }
  },

  created () {
    const _this = this
    _this.shelfID = this.$route.params.id
    axios.get('http://localhost:8080/api/sms/shelfBasicInfo/'+_this.shelfID).then(function (res) {
      _this.shelfID = res.data.id
      _this.rowNum = res.data.rowNum
      _this.colNum = res.data.colNum
      _this.categoryID = res.data.categoryId
    })
    axios.get('http://localhost:8080/api/sms/getItems/'+_this.shelfID).then(function (res) {
      _this.fromExist = _this.startTrimUpper(res.data,_this.rowNum)
    })
    axios.get('http://localhost:8080/api/pms/productsAccordingToCategory').then(function (res) {
      _this.fromDatabase = _this.startTrimLower(res.data)
    })

  },

  methods: {
    trimUpper(temp,rowNum,colNum){
      let newScene = {children:[]}
      let actualRow = Math.ceil(temp.length/colNum)
      for (let i=0; i<actualRow; i++ ){
        newScene.children.push({id: `column${i}`,children:[]})
      }
      for (let i=0; i<actualRow-1; i++ ){//最后一行特殊对待一下子，因为可能不满编
        for (let j=0; j<colNum; j++ ){
          newScene.children[i].children.push({
            id: `${i}${j}`,
            abstractProductId: temp[i*colNum+j].abstractProduct.id,
            name: temp[i*colNum+j].abstractProduct.name,
            isUrgent: temp[i*colNum+j].abstractProduct.isUrgent,
            sale: temp[i*colNum+j].abstractProduct.sale,
            createdTime:temp[i*colNum+j].abstractProduct.createdTime
          })
        }
      }
      for (let i=(actualRow-1)*colNum; i<temp.length; i++ ) {
        newScene.children[actualRow - 1].children.push({
          id: `${i / colNum}${i % colNum}`,
          abstractProductId: temp[i].abstractProduct.id,
          name: temp[i].abstractProduct.name,
          isUrgent: temp[i].abstractProduct.isUrgent,
          sale: temp[i].abstractProduct.sale,
          createdTime: temp[i].abstractProduct.createdTime
        })
      }
      return newScene
    },
    startTrimUpper(temp,rowNum){
      let newScene = {children:[]}
      for (let i=0; i<rowNum; i++ ){
        newScene.children.push({id: `column${i}`,children:[]})
      }
      for (let i=0; i<temp.length; i++ ){
        newScene.children[temp[i].positionRow-1].children.push({
          id: `${temp[i].positionRow-1}${temp[i].positionColumn}`,
          abstractProductId: temp[i].abstractProduct.id,
          name: temp[i].abstractProduct.name,
          isUrgent: temp[i].abstractProduct.isUrgent,
          sale: temp[i].abstractProduct.sale,
          createdTime:temp[i].abstractProduct.createdTime
        })
      }
      for (let i=0; i<rowNum; i++ ){
        newScene.children[i].children.sort((a, b) => a.id.localeCompare(b.id));
      }
      return newScene
    },
    startTrimLower(temp){
      let newScene = {children:[{id: 'column1',children:[]}]}
      for (let i=0; i<temp.length; i++ ){
        newScene.children[0].children.push({
          id: `${i}`,
          abstractProductId:temp[i].id,
          name: temp[i].name,
          isUrgent: temp[i].isUrgent,
          sale: temp[i].sale,
          createdTime:temp[i].createdTime
        })
      }
      return newScene
    },
    onCardDropUpper (columnId, dropResult) {
      if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {
        const fromExist = Object.assign({}, this.fromExist)
        const column = fromExist.children.filter(p => p.id === columnId)[0]
        const columnIndex = fromExist.children.indexOf(column)
        const newColumn = Object.assign({}, column)
        newColumn.children = applyDrag(newColumn.children, dropResult)
        fromExist.children.splice(columnIndex, 1, newColumn)
        this.checkCol(columnId)
        this.fromExist = fromExist
      }
    },
    onCardDropLower (columnId, dropResult) {
      if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {
        const fromDatabase = Object.assign({}, this.fromDatabase)
        const column = fromDatabase.children.filter(p => p.id === columnId)[0]
        const columnIndex = fromDatabase.children.indexOf(column)
        const newColumn = Object.assign({}, column)
        newColumn.children = applyDrag(newColumn.children, dropResult)
        fromDatabase.children.splice(columnIndex, 1, newColumn)
        this.fromDatabase = fromDatabase
      }
    },
    getCardPayloadUpper (columnId) {
      return index => {
        return this.fromExist.children.filter(p => p.id === columnId)[0].children[index]
      }
    },
    getCardPayloadLower (columnId) {
      return index => {
        return this.fromDatabase.children.filter(p => p.id === columnId)[0].children[index]
      }
    },
    checkCol (columnId) {
      const colNum = this.colNum //拿到表格中每一行的最大数
      const fromExist = Object.assign({}, this.fromExist) //然后这个深复制，相当于新创对象吧
      const fromDatabase = Object.assign({}, this.fromDatabase)
      const column = fromExist.children.filter(p => p.id === columnId)[0]
      if(column.children.length > colNum){                      //column一定是产生变动的栏，我就不管增加还是减少了，反正变动了，我就看他有没有超
        const node1 = Object.assign({}, column.children[colNum]) //把超出来的元素深复制
        fromDatabase.children[0].children.push(node1)                  //再把他塞到下面的待选栏
        column.children = column.children.slice(0,colNum)              //然后把超长的栏修整
        fromExist.children[columnId] = Object.assign({}, column)
        this.fromExist = fromExist                                     //然后这些放回去操作也挺重要的，注意这个this
        this.fromDatabase = fromDatabase
      }
    },
    saveShelf(){
      let updatedData = []
      const fromExist = this.fromExist
      const shelfID = this.shelfID
      for (let i=0; i<fromExist.children.length; i++ ){
        for (let j=0; j<fromExist.children[i].children.length; j++ ){
          updatedData.push(
            {
              id:
                {
                  shelfId:shelfID,
                  abstractProductId:fromExist.children[i].children[j].abstractProductId
                },
              shelf:{
                id:shelfID
              },
              abstractProduct:{
                id:fromExist.children[i].children[j].abstractProductId
              },
              positionRow:i+1,
              positionColumn:j+1
            }
          )
        }
      }
      axios.post('http://localhost:8080/api/sms/itemsSaving',updatedData).then(function (res) {
        console.log(res.status)
      })
    },
    autoSortByCreated(){
      let Data = []
      let fromExist = this.fromExist
      const shelfID = this.shelfID
      const colNum = this.colNum

      for (let i=0; i<fromExist.children.length; i++ ){
        for (let j=0; j<fromExist.children[i].children.length; j++ ){
          Data.push({
              id: fromExist.children[i].children[j].abstractProductId
          })
        }
      }
      // 把所有数据传上去，然后根据传上来的数据去查，batch,把最近的batch安上，然后把这个排序的传过来，传的时候还得加shelf，的信息
      axios.post('http://localhost:8080/api/sms/sortByCreated/'+shelfID+'/'+colNum,Data).then(response => {
        this.fromExist = this.trimUpper(response.data,rowNum,colNum)
        console.log(this.fromExist)
        })
    },
    autoSortBySale(){
      let Data = []
      let fromExist = this.fromExist
      const shelfID = this.shelfID
      const colNum = this.colNum

      for (let i=0; i<fromExist.children.length; i++ ){
        for (let j=0; j<fromExist.children[i].children.length; j++ ){
          Data.push({
            id: fromExist.children[i].children[j].abstractProductId
          })
        }
      }
      axios.post('http://localhost:8080/api/sms/sortBySales/'+shelfID+'/'+colNum,Data).then(response => {
        this.fromExist = this.trimUpper(response.data,rowNum,colNum)
        console.log(this.fromExist)
      })
    },
    autoSortByBBD(){
      let Data = []
      let fromExist = this.fromExist
      const shelfID = this.shelfID
      const colNum = this.colNum

      for (let i=0; i<fromExist.children.length; i++ ){
        for (let j=0; j<fromExist.children[i].children.length; j++ ){
          Data.push({
            id: fromExist.children[i].children[j].abstractProductId
          })
        }
      }
      // 把所有数据传上去，然后根据传上来的数据去查，batch,把最近的batch安上，然后把这个排序的传过来，传的时候还得加shelf，的信息
      axios.post('http://localhost:8080/api/sms/sortByBBD/'+shelfID+'/'+colNum,Data).then(response => {
        this.fromExist = this.trimUpper(response.data,rowNum,colNum)
        console.log(this.fromExist)
      })
    },
    autoFindByCreated(){
      const categoryID = this.categoryID
      axios.get('http://localhost:8080/api/pms/findProductsByCreated/'+categoryID).then(response => {
        this.fromDatabase = this.startTrimLower(response.data)
        console.log(this.fromDatabase)
      })
    },
    autoFindBySale(){
      const categoryID = this.categoryID
      axios.get('http://localhost:8080/api/pms/findProductsBySale/'+categoryID).then(response => {
        this.fromDatabase = this.startTrimLower(response.data)
        console.log(this.fromDatabase)
      })
    },
    autoFindByBBD(){
      const categoryID = this.categoryID
      axios.get('http://localhost:8080/api/pms/findProductsByBBD/'+categoryID).then(response => {
        this.fromDatabase = this.startTrimLower(response.data)
        console.log(this.fromDatabase)
      })
    },
  }
}
</script>


<style scoped>

.toBeAddedList{
  display: flex;
}
.upper-area{
  display:table;
  margin:0 auto;
}
.lower-area{
  margin-top: 10px;
  margin-bottom: 10px;
  height:170px;
}
.button-container{

}

</style>
