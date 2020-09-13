<template>
    <div class="wrapper">
<!--      顶部-->
      <div class="w">
        <div class="head">
          <el-row class="clearfix">
            <div class="match1 fl" >
              <img src="../assets/match.png" alt="">
            </div>
            <div class="fl pointer colorf">
              <span @click="toHome">首页</span>
            </div>
            <div class="fr pointer">
              <el-dropdown @command="handleCommand">
                <span class="el-icon-user-solid colorc loginInfo"></span>
                <el-dropdown-menu slot="dropdown" style="margin-top:-10px;">
                  <el-dropdown-item command="a" @click="logOut" style="width:2rem;text-align:center">注销</el-dropdown-item>
                  <el-dropdown-item    @click.native="revise" style="width:2rem;text-align:center">修改密码</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </el-row>
        </div>
      </div>
<!--      中间列表-->
      <div class="opus_wrapper">
        <div class="group_item">
          <p v-for="item in prompt" :key="item.totalNum">{{item.title}} 总数 : <span>{{item.totalNum}}</span> 未评阅 : <span style="color: red">{{item.isJudged}}</span> </p>
        </div>
      <div class="opus_title">
        <div class="sort_left">
          <div v-for="(item,index) in groupArr" :key="item.id" @click="chooseGroup(item.id,index,item.title)" :class="{ red:changeRed == index}">
            <!-- <img src="../assets/tab1.png" alt="" > -->
            <span> {{item.title}}</span>
          </div>
        </div>
<!--                                                                     安阳赛事-->
        <!-- </div> -->
        <div class="sort_right">
          <el-select v-model="matchNameValue" placeholder="请选择" @change="matchItem">
            <el-option
              v-for="item in matchName"
              :key="item.id"
              :label="item.title"
              :value="item.title"
              :size="200"
              >
            </el-option>
          </el-select>
<!--                                                            源码熊赛项-->
          <el-select v-model="matchValue" placeholder="请选择" @change="matchThing">
            <el-option
              v-for="item in matchList"
              :key="item.id"
              :label="item.title"
              :value="item.title"
              :size="200">
            </el-option>
          </el-select>
        </div>
      </div>
<!--             图形化编程卡片 -->
      <div class="opus_body clearfix" v-if="matchItemBool">
        <div class="opus_item" v-for="item in listCard" :key="item.id" @click="toGui(item.id,item.opusPath,item.index,item.opusName)">
        <p class="p_title">{{item.opusName}}</p>
        <p class="p_img"><img src="../assets/cross.png" alt="">图形化编程设计 <img src="../assets/cross.png" alt=""></p>
        <p class="p_title">作品简介</p>
        <p class="p_info">{{item.opusIntroduction}}</p>
          <div class="icon">
            <img src="../assets/readArrow.png" alt="" v-if="item.isJudged===0">
            <img src="../assets/judged.png" alt="" v-if="item.isJudged===1">
          </div>
        </div>
      </div>
<!--               其他赛项卡片 -->
      <div class="otherOpus_body opus_body clearfix" v-else>
        <div class="opus_item" v-for="item in listCard" :key="item.id" >
        <p class="p_title">{{item.opusName}}</p>
        <p class="p_img"><img src="../assets/cross.png" alt="">图形化编程设计 <img src="../assets/cross.png" alt=""></p>
        <p class="p_title">作品简介</p>
        <p class="other_info" :title="item.opusIntroduction">{{item.opusIntroduction}}</p>
       <div class="handle">
         <span @click="works(item.id)">作品下载</span>
         <span @click="seeMovie(item.id)">视频</span>
         <!-- <a :href="item.videoPath"></a> -->
         <span  @click="judgeScore(item.id)">打分</span>
         <span @click="ruleDetail(item.id)">评分细则</span>
       </div>
          <div class="icon">
            <img src="../assets/readArrow.png" alt="" v-if="item.isJudged===0">
            <img src="../assets/judged.png" alt="" v-if="item.isJudged===1">
          </div>
        </div>
      </div>

    </div>
<!--      底部-->
      <div class="footer_wrapper">
        <div class="foot " style="width: 70%;margin: 0 auto">
          <div class="link">
            <div class="box">
              <div class="top">
                <span @click="toPage(1)">关于我们</span>
                <span @click="toPage(2)">源码熊</span>
                <span @click="toPage(3)">源码教室</span>
              </div>
              <div class="box_info">
                深圳三点一四教育科技有限公司 / 粤ICP备18155800号-2
              </div>
            </div>
          </div>
          <div class="zw"></div>
          <div class="qrcode">
            <img src="../assets/barcode1.png" alt="">
            <img src="../assets/barcode2.png" alt="">
          </div>
        </div>
      </div>
      <!--      评判规则弹框-->
      <el-dialog
        title="评审规则"
        :visible.sync="dialogRule"
        width="70%"
        class="scroeDialog">
        <el-table
          :data="tableData"
          border
          style="width: 100%"
          :cell-style='cellStyle'
          :header-cell-style='rowClass'
          >
            <el-table-column
            v-for='(item,index) in tableCoulmn'
            :key='index'
              :prop="item"
              :label="item"
              >
            </el-table-column>
        </el-table>
        <div class="title">* 注：明显抄袭他人，或重复提交，或与参赛主旨不符，或内容明显脱离道德规范的作品一律予以淘汰。</div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogRule = false">取 消</el-button>
          <el-button type="primary" @click="dialogRule = false">确 定</el-button>
       </span>
    </el-dialog>
      <!--      打分弹框-->
      <el-dialog
        title="打分"
        :visible.sync="scoreDialog"
        width="634px"
        class="scoreDialog"
        :close-on-press-escape=escBool
        :close-on-click-modal = escBool
        >
        <div class="title">
          <p>{{response.opusName}}</p>
          <p>图形化编程设计</p>
        </div>
        <div class="block" v-for="(item,i) in response.scoreSet" :key="item.length">
          <span class="demonstration">{{item.title}}</span>
          <el-slider v-model="val[i]" @change="changeGrade" :max="item.percentage" :step="step" :marks=item.marks></el-slider>
        </div>
        <div class="totalScore">
          <span>总得分</span>
          <input type="text" :placeholder="totalGrade" readonly>
        </div>
        <div class="makeSure">
          <el-button @click="scoreDialog = false">取 消</el-button>
          <el-button @click="save">确 定</el-button>
        </div>
      </el-dialog>
      <!--      视频弹框-->
      <el-dialog
        title="视频"
        :visible.sync="videoDialog"
        width="60%"
        class="videoDialog"
      >
        <video :src="videoPath" width="100%" height="500" controls >
          <source :src="videoPath" type="video/mp4">
          <source :src="videoPath" type="video/ogg">
        </video>
      </el-dialog>
    </div>
</template>

<script>
import city from '@/components/city/index.vue'
import { getMatchItem, getAssessCard, getRecordDetail ,keepScore , getRuleTable} from '@/api/index'
import { tool } from '@/utils/tool.js'
import { log } from 'util'
export default {
  components: { city },
  data () {
    return {
      escBool:false,
      val:[],
      gradeOptions: [],
      selected: [],
      groupIndex: 1,
      sendData: {
        groupId: '',
        contestantName: '',
        contact: '',
        location: '',
        school: '',
        grade: '',
        code: '',
        mobile: ''
      },
      changeRed:0,
      dialogRule:false,
      tableCoulmn:[],
      tableData: [],
      drawer: false,
      matchName: [],
      matchNameValue: '',
      matchList: [],
      matchValue: '',
      path:'',
      title:'',
      matchItemBool: true,
      groupArr: [],
      response:[],
      scorarray:[],
      step: 0.01,
      videoDialog: false,
      scoreDialog: false,
      totalGrade:0,
      listCard: [
      ],
      id:"",
      isDisabled: false,
      time: 60,
      videoPath:'',
      groupTitle:'',
      prompt:[],
      isJudge:0,
      judged:0
    }
  },
  created () {
    // this.chooseGroup(this.groupArr[0].id)
  },
  beforeMount () {
    // this.initMatchItem()
  },
  methods: {
    revise () {
      this.$router.push({
        name:'revisePassword'
      })
    },
    // 作品
    async works(id){
      const res =await getRecordDetail(id)
      if(res.code !== 200) return this.$tool.message("加载失败")
      this.title = res.result.opusName
      this.path = res.result.opusPath
        fetch(this.path, {
          method: "get",
          responseType: "blob" })
        .then(res => {
          return res.blob()
        })
        .then(blob => {
          let reader = new FileReader()
          reader.onload = e => {
            let a = document.createElement("a")
            let url = window.URL.createObjectURL(blob)
            let fileName = this.title
            a.href = url
            a.download = fileName + '.'+this.path.split('.')[this.path.split('.').length-1]
            a.click()
            window.URL.revokeObjectURL(url)
          }
          reader.readAsText(blob)
        })
    },
    // 表格居中
    cellStyle ({row, column, rowIndex, columnIndex}) {
      return 'text-align:center'
    },
    rowClass ({row, rowIndex}) {
      return 'text-align:center'
    },
    // 评分细则
    async ruleDetail(id){
      const response = await getRecordDetail(id)
      if(response.code !== 200) return this.$tool.message(response.message)
      const res = await getRuleTable(response.result.groupId)
      if(res.code !== 200) return this.$tool.message(res.message)
      let arr = [res.result.title].concat(res.result.value)
      this.tableData = arr
      this.tableCoulmn = []
      for(let item in this.tableData[0]) {
        if(item !== '评审标准'){
          this.tableCoulmn.push(item)
        }
      }
      this.tableCoulmn.unshift('评审标准')
      this.dialogRule = true
    },
    // 打分
    async judgeScore (id) {
      this.id = id
      const res = await getRecordDetail(id)
      if(res.code !== 200) return this.$tool.message(res.message)
      this.response = res.result
      this.val = new Array(this.response.scoreSet.length).fill(0)
      let setArr = JSON.parse(JSON.stringify(this.response.scoreSet))
      setArr.forEach((item,i) => {
        let max = item.percentage
        let map = new Map()
        map.set('0', "0").set(max, max.toString());
        const mapObj = (map) => {
          let obj = {};
          for (let [k, v] of map) {
            obj[k] = v
          }
          return obj
        }
        item.marks = mapObj(map)
      })
      this.response.scoreSet = setArr
      this.totalGrade = 0
      if(this.response.scoreGet !== null){
        let arr = []
        this.val=[]
        this.response.scoreGet.scoreDetails.split('$').forEach((item, i) => {
          arr.push(JSON.parse(item))
        })
        arr = JSON.parse(JSON.stringify(arr))
        JSON.parse(JSON.stringify(this.response.scoreSet)).forEach((item , i) => {
          arr.forEach((sonItem,i) => {
            if(item.title == sonItem.title){
              this.val.push(sonItem.score)
            }
          })
        })
          this.totalGrade = this.response.scoreGet.totalScore
      }
      this.scoreDialog = true
    },
    // 提交
    async save(){
      this.scorarray = JSON.parse(JSON.stringify(this.response.scoreSet))
      this.scorarray.forEach((item, i) => {
        item.percentage = this.val[i]
        item.score = this.val[i]
        let arg = ['percentage']
        item = this.$tool.deleteParams(item, ...arg)
      })
      let arr = []
      this.scorarray.forEach(item => {
        arr.push(JSON.stringify(item))
      })
      let str = arr.join('$')
      let argu = JSON.stringify({
        matchRecordId: this.id,
        totalScore: this.totalGrade.toString(),
        scoresDetails: str
      })
      const res = await keepScore(argu)
      if(res.code !=200) return this.$tool.message('提交失败')
      this.scoreDialog = false
      return this.$tool.message(res.message)
      this.scoreDialog = false
    },
    // 滑块
    changeGrade(){
      var num = 0
      this.val.forEach(item => {
        num += item
      })
      num= Math.floor(num*100) / 100
      this.totalGrade = num
    },
    // 视频
    async seeMovie (id) {
      const res = await getRecordDetail(id)
      if(res.code !== 200) return this.$tool.message('加载失败')
      if(res.result.videoPath ==='') return this.$tool.message('视频不存在')
      this.videoPath = res.result.videoPath
      this.videoDialog = true
    },
    toGui (id, url, index, title) {
      this.$tool.localSet('groupTitle', this.groupTitle)
      this.$tool.localSet('cardIndex', index)
      this.$router.push({
        name: 'scratchGui',
        query: { id, url, index, title }
      })
    },
    formatTooltip (val) {
      return val / 100
    },
    // 获取卡片
    async chooseGroup (i,index,title) {
      this.changeRed = index
      this.groupTitle = title
      const res = await getAssessCard(i)
      if(res.code !== 200) return this.$tool.message(res.message)
      this.listCard = res.result
      this.$tool.localSet('cardList', this.listCard)
    },
    // 获取组别
    async matchThing (v) {
      const res = await getMatchItem()
      if(res.code !== 200) return this.$tool.message(res.message)
      res.result.forEach((item, i) => {
        if (item.title === this.matchNameValue) {
          this.matchList = item.children
          item.children.forEach((item, i) => {
            if (item.title === v) {
              this.groupArr = item.children
            }
          })
        }
        this.groupTitle = this.groupArr[0].title
      })
      if (v == '图形化编程赛项') {
        this.matchItemBool = true
      } else {
        this.matchItemBool = false
      }
      const resP = await getAssessCard(this.groupArr[0].id)
      if(resP.code !== 200) return this.$tool.message(resP.message)
      this.listCard = resP.result

      this.prompt = []
      console.log(this.groupArr,6666666)
      this.groupArr.forEach(async item => {
        let obj = {}
        obj.title = item.title
        const resPe = await getAssessCard(item.id)
        obj.totalNum = resPe.result.length
        let num = 0
        resPe.result.forEach(item => {
          if(item.isJudged ===0){
            num++
          }
        })
        obj.isJudged = num
        this.prompt.push(obj)
      })
      console.log(this.prompt)
    },
    // 获取赛项
    async matchItem (v) {
      const res = await getMatchItem()
      if(res.code !== 200) return this.$tool.message(res.message)
      res.result.forEach((item, i) => {
        if (item.title === v) {
          item.children.forEach((item, i) => {
            this.matchList.push(item)
          })
        }
      })
    },
    // 初始化
    async initMatchItem () {
      const res = await getMatchItem()
      if(res.code !== 200) return this.$tool.message(res.message)
      res.result.forEach((item, i) => {
        this.matchName.push(item)
      })
      this.matchNameValue = this.matchName[0].title
      this.matchItem(this.matchNameValue)
      this.matchValue = this.matchName[0].children[0].title
      // console.log(this.matchName[0].children[0].title)
      this.$tool.localSet('matchItem',this.matchName[0].children[0].title)
      const response = await getMatchItem(this.matchValue)
      if(response.code !== 200) return this.$tool.message(response.message)
      this.groupArr = response.result[0].children[0].children


      this.prompt = []
      this.groupArr.forEach(async item => {
        let obj = {}
        obj.title = item.title
        const resPe = await getAssessCard(item.id)
        obj.totalNum = resPe.result.length
        let num = 0
        resPe.result.forEach(item => {
          if(item.isJudged ===0){
            num++
          }
        })
        obj.isJudged = num
        this.prompt.push(obj)
      })
      console.log(this.prompt)

      const resP = await getAssessCard(this.groupArr[0].id)
      if(resP.code !== 200) return this.$tool.message(resP.message)
      this.listCard = resP.result
      this.$tool.localSet('cardList', this.listCard)
      this.groupTitle = this.groupArr[0].title
    },
    toPage (e) {
      if (e === 1) {
        window.location.href = 'http://dianyixueyuan.com'
      } else if (e === 2) {
        window.location.href = 'http://www.yuanmaxiong.cn'
      } else if (e === 3) {
        window.location.href = 'https://ymjs.dianyixueyuan.com'
      }
    },
    logOut () {
      this.$tool.sessionRem('userType')
      this.$tool.sessionRem('accessToken')
      this.$router.push({
        name: 'home'
      })
    },
    handleCommand (command) {
      if (command === 'a') {
        this.$tool.sessionRem('userType')
        this.$tool.sessionRem('accessToken')
        this.$router.push({
          name: 'home'
        })
      }
    },
    toHome () {
      this.$router.push({
        name: 'home'
      })
    }
  }
}
</script>

<style scoped lang="scss">
      .opus_wrapper{
        width: 1200px;
        margin: 25px auto 20px;
        .group_item{
          display: flex;
          margin-bottom: 20px;
          color: #666666;
          p{
            margin-right: 30px;
          }
        }
          .opus_title{
            display: flex;
            justify-content: space-between;
            .sort_left{
              // width: 375px;
              height: 60px;
              border-top-left-radius: 8px;
              border-top-right-radius: 8px;
              background-color: #4E8CFF;
              /*background: url(../assets/opusbg.png) no-repeat ;*/
              -webkit-background-size: cover;
              background-size: cover;
              display: flex;
              line-height: 60px;
              text-align: center;
              color: #FFFFFF;
              cursor: pointer;
              &>div:nth-child(1){
                 width: 125px;
                position: relative;
                box-sizing: border-box;
                span{
                  position: absolute;
                  top: 50%;
                  left:50%;
                  transform: translate(-50%,-50%);
                }
               }
              &>div:nth-child(2){
                width: 125px;
                position: relative;
                box-sizing: border-box;
                span{
                  position: absolute;
                  top: 50%;
                  left:50%;
                  transform: translate(-50%,-50%);
                }
              }
              &>div:nth-child(3){
                width: 125px;
                /*padding-right: 13px;*/
                position: relative;
                box-sizing: border-box;
                span{
                  position: absolute;
                  top: 50%;
                  left:50%;
                  transform: translate(-60%,-50%);
                }
              }
            }
            .sort_right{
              // width: 280px;
              // height: 48px;
              box-sizing: border-box;
              /*border:1px solid rgba(210,210,210,1);*/
              /*border-radius:8px;*/
              &>div:nth-child(1){
                margin-right: 30px;
              }
              .el-select{
                width: 279px;
                border-radius:8px;
              }
            }
          }
        .opus_body{
          overflow-y: scroll;
          width: 1200px;
          height: 794px;
          /*box-sizing: border-box;*/
          border: 1px solid #4678FF;
          padding: 0 0;
          border-radius:0 10px 10px 10px;
          /*display: flex;*/
          /*justify-content: flex-start;*/
          /*flex-wrap: wrap;*/
          /*align-items: flex-start;*/
          .opus_item{
            width: 373px;
            height: 238px;
            box-sizing: border-box;
            padding-top: 25px;
            border:1px solid rgba(204,204,204,1);
            box-shadow:0 0 4px 0 rgba(51,51,51,0.3);
            border-radius:8px;
            float: left;
            margin-left: 20px;
            margin-top: 20px;
            text-align: center;
            position: relative;
            background: url("../assets/opus.png");
            cursor: pointer;
            color: #999999;
            // background-size: cover
            p{
              margin: 0 0 10px 0;
            }
            .p_title{
              font-size: 18px;
              color: #111111;
              padding: 0 76px;
              overflow: hidden;
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 1;
              word-break: break-all;
            }
            .p_img{
              display: flex;
              align-items: center;
              justify-content: space-between;
              padding: 0 76px;
              color: #666666;
            }
            .p_info{
              width: 192px;
              margin: 0 auto;
              height: 105px;
              color: #666666;
              overflow: hidden;
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 5;
              word-break: break-all;
            }
            .handle{
              margin: 30px 15px;
              display: flex;
              justify-content: space-between;
              color: #FFFFFF;
              span{
                height: 29px;
                min-width: 70px;
                max-width: 90px;
                display: inline-block;
                /*padding: 0 10px;*/
                box-sizing: border-box;
                background:#FFFFFF;
                box-shadow:0 1px 2px 0 rgba(0, 0, 0, 0.35);
                border-radius:6px;
                text-align: center;
                line-height: 28px;
                cursor: pointer;
                color: #4678ff;
                border: 1px solid #4678ff;
                font-size: 14px;
                a{
                  width: 100%;
                  height: 100%;
                  overflow: hidden;
                  display: block;
                  color: #FFFFFF;
                  text-decoration: none;
                }
              }
              span:hover{
                background-color:#4678ff;
                color: #FFFFFF;
              }
            }
            .icon{
              position: absolute;
              left: 0;
              top: 31px;
            }
          }
        }
         .otherOpus_body{
          overflow-y: scroll;
          width: 1200px;
          height: 794px;
          /*box-sizing: border-box;*/
          border: 1px solid #4678FF;
          padding: 0 0;
          border-radius:0 10px 10px 10px;
          .opus_item{
            width: 373px;
            height: 238px;
            box-sizing: border-box;
            padding-top: 25px;
            border:1px solid rgba(204,204,204,1);
            box-shadow:0 0 4px 0 rgba(51,51,51,0.3);
            border-radius:8px;
            float: left;
            margin-left: 20px;
            margin-top: 20px;
            text-align: center;
            position: relative;
            // background: url("../assets/opus.png");
            background: #fff;
            cursor: pointer;
            .other_info{
              width: 192px;
              margin: 0 auto;
              height: 41px;
              color: #666666;
              overflow: hidden;
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 2;
              word-break: break-all;
            }
          }
        }
      }
      /deep/ .scoreDialog{
        .el-dialog{
          padding: 0 138px;
          border-radius:10px;
        }
        .el-dialog__header{
          display: none;
        }
        .title{
          margin-top: 20px;
          text-align: center;
          p:nth-child(1){
            color: #333333;
            font-size: 18px;
            margin-bottom: 7px;
            font-weight: 600;
          }
          p:nth-child(2){
            color: #666666;
            margin-bottom: 20px;
          }
        }
        .block{
          height: 70px;
          .el-slider__marks{
            &>div:nth-child(1){
              text-align: right;
              width: 20px;
            }
            &>div:nth-child(2){
              text-align:left;
              width: 23px;
            }
          }

        }
        .totalScore{
          display: flex;
          justify-content: space-between;
          margin-bottom: 40px;
          span{
            font-size: 18px;
            font-weight: 600;
            line-height: 40px;
          }
          input{
            width: 80px;
            height: 36px;
            text-align: center;
            border: 1px solid rgba(220,220,220,1);
            outline: none;
            border-radius:6px;
          }
        }
        .makeSure{
          display: flex;
          justify-content: space-between;
          margin-bottom: 50px;
          button{
            border: none;
            background-color: #DCDCDC;
            color: #666666;
          }
          button:nth-child(2){
            background-color: #FCC760;
            border: none;
            color: #FFFFFF;
          }
        }
      }
      /deep/ .videoDialog{
        &>.el-dialog{
          padding: 0;
          border-radius: 10px;
        }
      }
      .match1 {
        margin-left: 1.4rem;
        margin-right: 1.7rem;
        position: relative;
        top: -6px;
          img{
            position: relative;
            top: 15px;
            left: 0;
          }
      }
      .w {
        width: 100%;
        background:linear-gradient(0deg,rgba(66,111,255,1),rgba(88,167,255,1));
        height: 1.5rem;
      .apply {
        padding: 0.1rem 0.3rem;
        margin-right: 0.2rem;
        border: 1px solid #ccc;
        border-radius: 30px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
      }
      .loginInfo {
        padding: 0.1rem 0.1rem;
        background-color: #fff;
        border-radius: 100%;
        font-size: 0.5rem;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
      }
      .head {
        width: 70%;
        margin: 0 auto;
        height: 100%;
        line-height: 1.5rem;
      }
      }
      /deep/.el-cascader{
        width: 100%;
      }
      .par{
        position: relative;
      .right{
        position: absolute;
        right:0;
      }
      }
      .formBox {
        width: 19.4rem;
        height: 11.6rem;
        background-color: #fff;
        border-radius: 8px;
        margin: 0.8rem auto 0;
      .form {
        width: 10.32rem;
        height: 8.64rem;
        margin: 0 auto;
      // border: 1px solid #ccc;
      .title {
        padding: 0.4rem 0;
        text-align: center;
        font-size: 0.4rem;
      }
      }
      }
      .footer_wrapper{
        background: url('../assets/footer.png') no-repeat;
        background-size: cover;
        height: 230px;
        /*height: 182px;*/
        padding-top: 47px;
        box-sizing: border-box;
        /*position: absolute;*/
        /*bottom: 0;*/
        /*left: 0;*/
        width: 100%;
      .foot{
        display: flex;
        box-sizing: border-box;
      .zw{
        flex: 1;
      }
      .link{
        flex: 3;
        color: #fff;
        position: relative;
        margin-left: 20px;
        text-shadow:0px 1px 2px rgba(0, 0, 0, 0.45);
      .box{
        position: absolute;
        left: 0;
      .top{
        display: flex;
        margin-bottom: 1.1rem;
      span{
        flex: 1;
        text-align: left;
        color: #fff;
        cursor: pointer;
        font-size: 28px;
      }
      }
      .box_info{
        font-size: 25px;
      }
      }
      }
      .qrcode{
        flex: 2;
        box-sizing: border-box;
        padding-left: 40px;
      img{
        width: 28%;
      }
      img:nth-child(1){
        margin-left: 0.8rem;
        margin-right: 1.2rem;
      }
      }
      }
      .intro{
        width: 100%;
        flex: 1;
      }
      .w{
        width: 70%;
        margin: 0 auto;
      .apply{
        padding: 0.1rem 0.3rem;
        margin-right: 0.2rem;
        border:1px solid #ccc;
        border-radius: 30px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
      }
      .loginInfo{
        padding: 0.1rem 0.1rem;
        background-color: #fff;
        border-radius: 100%;
        font-size: 0.5rem;
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
      }
      }
      }
      /deep/ .scroeDialog thead{
        display: none
      }
      /deep/ .scroeDialog{
        .el-dialog__body{
          padding: 4px 20px 12px;
        }
        .title{
          color: red;
          margin-top: 10px;
        }
        &>.el-dialog{
          border-radius: 10px
        }
      }
      .red{
          background-color: #689cfd;
          border-top-left-radius: 8px;
          border-top-right-radius:8px;
        }
</style>
