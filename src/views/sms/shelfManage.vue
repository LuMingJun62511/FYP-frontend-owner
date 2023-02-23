<template>
  <div style="align-content: center">
    <p>the shelf you are manipulating is number {{shelfID}}</p>
  </div>
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
              <CommodityCard :imgUrl = testUrl :name = card.data ></CommodityCard>
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
                <CommodityCard :imgUrl = testUrl :name = card.data ></CommodityCard>
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
    <div class="operate-button-container">
      <span>auto sort</span>
      <el-button @click="fillAccordingBBD">according BBD</el-button>
      <el-button @click="fillAccordingSale">according sale amount</el-button>
    </div>
    <div class="operate-button-container">
      <span>new to be added</span>
      <el-button @click="findAccordingBBD">according BBD</el-button>
      <el-button @click="findAccordingSale">according sale amount</el-button>
      <el-button @click="findAccordingTime">according create time</el-button>
<!--      还得加个下拉，能选商品category-->
    </div>
    <div class="operate-button-container">
      <span>finished? </span>
      <el-button @click="saveShelf">save this shelf</el-button>
    </div>
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
    axios.get('http://localhost:8080/api/sms/shelfBasicInfo').then(function (res) {
      _this.shelfID = res.data.id
      _this.rowNum = res.data.rowNum
      _this.colNum = res.data.colNum
      _this.categoryID = res.data.categoryId
    })
    axios.get('http://localhost:8080/api/sms/getItems').then(function (res) {
      let temp = res.data
      let newScene = {children:[]}
      for (let i=0; i<_this.rowNum; i++ ){
        newScene.children.push({id: `column${i}`,children:[]})
      }
      for (let i=0; i<temp.length; i++ ){
        newScene.children[temp[i].positionRow-1].children.push({id: `${temp[i].positionRow-1}${temp[i].positionColumn}`,abstractProductId:temp[i].abstractProduct.id, data:temp[i].abstractProduct.name})
      }
      _this.fromExist = newScene
    })
    axios.get('http://localhost:8080/api/pms/productsAccordingToCategory').then(function (res) {
      let temp = res.data
      let newScene = {children:[{id: 'column1',children:[]}]}
      for (let i=0; i<temp.length; i++ ){
        newScene.children[0].children.push({id: `${i}`,data:temp[i].name, abstractProductId:temp[i].id})
      }
      _this.fromDatabase = newScene
    })
  },

  methods: {
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
      // 先根据本表格生成一个要插入的数据
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
    // 肯定不能完全不传参数，至少得指定一些货物种类
    // autoFillAccordingBBD(){
    //   axios.get('http://localhost:8080/sms/ShelfManagement').then(function (res) {
    //     this.fromExist = res.data
    //   })
    // },
    // autoFillAccordingSale(){
    //   axios.get('http://localhost:8080/sms/ShelfManagement').then(function (res) {
    //     this.fromExist = res.data
    //   })
    // },
    // autoFindAccordingBBD(){
    //   axios.get('http://localhost:8080/sms/ShelfManagement').then(function (res) {
    //     this.fromDatabase = res.data
    //   })
    // },
    // autoFindAccordingSale(){
    //   axios.get('http://localhost:8080/sms/ShelfManagement').then(function (res) {
    //     this.fromDatabase = res.data
    //   })
    // },

  }
}
</script>


<style scoped>
/*.card{*/
/*  height: 100px;*/
/*  width: 150px;*/
/*  border-style:solid;*/
/*  border-width:1px;*/
/*}*/
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
  height:150px;
}
.button-container{

}

</style>
