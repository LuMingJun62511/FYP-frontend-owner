<template>
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
              <div class="card" >
                <p>{{ card.data }}</p>
              </div>
            </Draggable>
          </Container>
        </div>
      </Draggable>
    </Container>
  </div>
  <div style="height: 100px">
    <p>——————————————————————————————————————————————————</p>
    <p>There are going to have a lot of functional button</p>
    <p>——————————————————————————————————————————————————</p>
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
                <div class="card">
                  <p>{{ card.data }}</p>
                </div>
              </Draggable>
            </Container>
          </div>
        </Draggable>
      </Container>
    </el-scrollbar>
  </div>
</template>


<script>
import { Container, Draggable } from 'vue3-smooth-dnd'
import { applyDrag } from '@/utils/helper'
import axios from 'axios'

const rowNum = 10
const colNum = 10
const fromExist = {}
const fromDatabase = {}

export default {
  name: 'testBoth',

  components: {Container, Draggable},

  data () {
    return {
      fromExist,
      fromDatabase,
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
    axios.get('http://localhost:8080/sms/ShelfBasicInfoRow').then(function (res) {
      _this.rowNum = res.data
    })
    axios.get('http://localhost:8080/sms/ShelfBasicInfoCol').then(function (res) {
      _this.colNum = res.data
    })
    axios.get('http://localhost:8080/sms/ShelfManagement').then(function (res) {
      let temp = res.data
      let newScene = {children:[]}
      for (let i=0; i<_this.rowNum; i++ ){
        newScene.children.push({id: `column${i}`,children:[]})
      }
      for (let i=0; i<temp.length; i++ ){
        newScene.children[temp[i].positionRow-1].children.push({id: `${temp[i].positionRow-1}${temp[i].positionColumn}`,data:temp[i].abstractProduct.name})
      }
      _this.fromExist = newScene
    })
    axios.get('http://localhost:8080/pms/productsAccordingToCategory').then(function (res) {
      let temp = res.data
      let newScene = {children:[{id: 'column1',children:[]}]}
      for (let i=0; i<temp.length; i++ ){
        newScene.children[0].children.push({id: `${i}`,data:temp[i].name})
      }
      console.log(newScene)
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
    }
  }
}
</script>

<style scoped>
.card{
  height: 100px;
  width: 150px;
  border-style:solid;
  border-width:1px;
}
.toBeAddedList{
  display: flex;
}
.lower-area{
  height:150px;
}

</style>
