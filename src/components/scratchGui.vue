<template>
    <div class="theOne">
      <div class="rightModal_del" ref="drawer">
        <button @click="drawerLeft" class="clickMe" >
          <span>alt<br>+<br>c<br></span>
        </button>
        <div class="modal_wrapper rightModal">
          <div class="title_box">
            <div class="title">{{matchItem}}-{{groupTitle}}</div>
            <div>
              <button @click="out($route.query.id)">淘汰</button>
              <button @click="goBack">返回</button>
            </div>
          </div>
          <div class="opus_wrapper">
            <div class="opus_box">
              <p>作品名称</p>
              <input type="text" :placeholder="opusArray.opusName" readonly>
            </div>
            <div class="opus_box">
              <p>作品简介</p>
              <textarea name="" id="" cols="15" rows="4" :placeholder="opusArray.opusIntroduction" readonly></textarea>
            </div>
          </div>
          <div class="prompt">
            <p><span></span>查看学生视频</p>
            <span>
              <img src="../assets/start.png" alt="" @click="seeMovie">
            </span>
          </div>
          <div class="down">
            <p @click.stop="downloadRar" class="downloadRar"><img src="../assets/bottomArrow.png" alt="">下载附件</p>
            <p @click="downLoadOpus"><img src="../assets/bottomArrow.png" alt="">下载作品</p>
          </div>
          <p class="creatTool">创作工具：<span>{{tools}}</span></p>
          <div class="rules">
            <span>评分</span>
            <span @click="ruleDetail(opusArray.groupId)">评分细则？</span>
          </div>
          <div class="grade">
            <!--            <div></div>-->
            <div class="block" v-for="(item, i ) in scoreArray" :key="item.length" :range="true">
              <span class="demonstration">{{item.title}}</span>
              <el-slider  v-model="val[i]"  @change="changeGrade"  :max="item.percentage" :step="step" :marks=item.marks></el-slider>
            </div>
          </div>
          <div class="total_grade">
            <span>总分</span>
            <input type="text" :placeholder="count" readonly>
          </div>
          <div class="choose">
            <button @click="prev">上一道</button>
            <button @click="save">确定</button>
            <button @click="next">下一道</button>
          </div>
        </div>
      </div>
      <div style="height:100%;width: 100%" v-loading="loading"   >
        <iframe id='iframe' ref='iframe' src='/scratch-gui/' frameBorder='0' width='100%' height='100%' scrolling='auto'></iframe>
      </div>
<!--      <button @click="drawerLeft" class="clickMe" ref="drawer">-->
<!--        <span>alt<br>+<br>c<br></span>-->
<!--      </button>-->
<!--      视频弹框-->
      <el-dialog
        title="视频"
        :visible.sync="dialogVisible"
        width="50%"
        height="600px"
        >
        <video :src="opusArray.videoPath" width="100%" height="500" controls>
          <source :src="opusArray.videoPath" type="video/mp4">
          <source :src="opusArray.videoPath" type="video/ogg">
        </video>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
       </span>
      </el-dialog>
<!--      评判规则弹框-->
      <el-dialog
        title="评审规则"
        :visible.sync="dialogRule"
        width="70%"
        class="addTitle"
        >
        <el-table
          :data="tableData"
          border
          style="width: 100%"
          :cell-style='cellStyle'
          :header-cell-style='rowClass'>
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

      <!-- 下载弹框 -->
    <el-dialog
      title="提示"
      :visible.sync="downloadVisible"
      width="30%"
      >
      <span>作品无法播放请自行下载</span>
      <!-- <el-button type="primary" @click="downLoadOpus">下载作品</el-button> -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="downloadVisible = false">取 消</el-button>
        <el-button type="primary" @click="downLoadOpus">下 载</el-button>
      </span>
    </el-dialog>
    </div>

</template>

<script>
import { getRecordDetail, getRuleTable, keepScore,pass, getAssessCard} from '@/api/index'
import {tool} from '@/utils/tool.js'
export default {
  data () {
    return {
      loading:true,
      val: [],
      tableData: [],
      count: '0',
      titleArray: [],
      bodyArray: [],
      scoreArray: [ ],
      totalScore: '',
      tableCoulmn:[],
      drawer: true,
      drawerFlag: false,
      value1: 0,
      index: this.$route.query.index,
      id: this.$route.query.id,
      path: this.$route.query.url,
      scorarray: [ ],
      flag: true,
      downloadVisible:false,
      dialogVisible: false,
      dialogRule: false,
      step: 0.01,
      opusArray: [ ],
      go: '',
      tools: '',
      url: '/scratch-gui/',
      html: '',
      height: '100%',
      groupTitle:'',
      matchItem:'',
      events: {
        receiveMessageFromParent: async (event) => {
          this.loading = true
          // let url = this.getThisRoute.query.url
          // let title = this.getThisRoute.query.title
          let url = window.getThisRoute.query.url
          let title = window.getThisRoute.query.title
          var ifwind = document.getElementById('iframe').contentWindow
          switch (event.data.DYType) {
            case 'menuOk':
              var postData = {
                'DYType': 'opusData',
                'DYOpusData':{'createrName':'', 'opusname':title, 'ossPath':''},
                'DYShowSaveButton':false
              }
              ifwind.postMessage(postData, '*')
              var postData = {
                'DYType': 'aliStsData',
                'DYLoadType': 'down',
                'downLoadUrl': url
              }
              ifwind.postMessage(postData, '*')
              break
          }
          this.loading = false
        }
      }
    }
  },
  methods: {
    // 下载作品
    downLoadOpus() {
      fetch(this.path, {
          method: "get",
          responseType: "blob"
        })
        .then(res => {
          return res.blob()
        })
        .then(blob => {
          let reader = new FileReader()
          reader.onload = e => {
            let a = document.createElement("a")
            let url = window.URL.createObjectURL(blob)
            let fileName = this.$route.query.title
            a.href = url
            a.download = fileName + '.'+this.path.split('.')[this.path.split('.').length-1]
            a.click()
            window.URL.revokeObjectURL(url)
          }
          reader.readAsText(blob)
      })
      this.downloadVisible = false
    },
    // 返回上一级
    async goBack(){
      const res = await getAssessCard(this.opusArray.groupId)
      if(res.code !== 200) return this.$tool.message(res.message)
      let judged = 0
      res.result.forEach((item, i) => {
        if(item.isJudged===0){
          judged++
        }
      })
      this.$confirm(`还有${judged}个作品尚未评阅。 是否返回?`, '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
      }).then(() => {
         this.$router.push({
         name:'assess'
        })
         this.opusArray.groupId

      }).catch(() => {

      })
    },
    // 表格居中
    cellStyle ({row, column, rowIndex, columnIndex}) {
      return 'text-align:center'
    },
    rowClass ({row, rowIndex}) {
      return 'text-align:center'
    },
    // 淘汰
    out (id) {
      this.$confirm('此操作将该作品设置为淘汰,且无法恢复。 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        pass(id).then(res => {
          if (res.code !== 200) return this.$tool.messageError(res.message)
          this.$tool.messageSuccess(res.message)
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消淘汰'
        })
      })
    },
    // 下一道
    next () {
      let loction = this.$tool.localGet('cardList')
      let cardIndex = this.$tool.localGet('cardIndex')
      if (this.index == loction.length) {
        this.index = '1'
      } else {
        this.index = (++this.index).toString()
      }
      if(cardIndex === this.index){
        this.$tool.message('循环完毕')
      }
      loction.forEach((item, i) => {
        if (item.index === this.index) {
          this.$router.push({
            name: 'blank',
            query: { id: item.id, url: item.opusPath, index: item.index ,title:item.opusName }
          })
        }
      })
    },
    // 上一道
    prev () {
      let loction = this.$tool.localGet('cardList')
      let cardIndex = this.$tool.localGet('cardIndex')
      if (this.index == 1) {
        this.index = loction.length.toString()
      } else {
        this.index = (--this.index).toString()
      }
      if (cardIndex === this.index){
        this.$tool.message('循环完毕')
      }
      loction.forEach((item, i) => {
        if (item.index === this.index) {
          this.$router.push({
            name: 'blank',
            query: { id: item.id, url: item.opusPath, index: item.index ,title:item.opusName}
          })
        }
      })
    },
    // 提交分数
    async save () {
      this.scorarray = JSON.parse(JSON.stringify(this.opusArray.scoreSet))
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
        matchRecordId: this.$route.query.id,
        totalScore: this.count.toString(),
        scoresDetails: str
      })
      const res = await keepScore(argu)
      if(res.code !=200) return this.$tool.message('提交失败')
      return this.$tool.message(res.message)
    },
    // 下载附件
    downloadRar () {
       if(this.opusArray.attachmentPath === '') return this.$tool.message('不存在附件')
      window.location.href = this.opusArray.attachmentPath
    },
    // 规则表格
    async ruleDetail (i) {
      const res = await getRuleTable(i)
      if(res.code !== 200) return this.$tool.message(res.message)
      let arr = [res.result.title].concat(res.result.value)
      this.tableData = arr
      this.tableCoulmn = []
      for(let item in this.tableData[0]) {
        if(item !== '评审标准'){
          this.tableCoulmn.push(item)
        }
      }
      this.tableCoulmn.unsht('评审标准')
      this.dialogRule = true
    },
    // 视频弹窗
    seeMovie () {
      if (this.opusArray.videoPath === '') {
        return this.$tool.message('不存在视频')
      }
      this.dialogVisible = true
    },
    // 模态框
    drawerLeft () {
      if (this.flag === true) {
        this.$refs.drawer.style.marginRight = '-310px'
        this.flag = false
        this.$refs.iframe.style.width = document.body.clientWidth-20+"px"
      }else{
        this.$refs.drawer.style.marginRight = '0px'
        this.flag = true
        this.$refs.iframe.style.width = document.body.clientWidth - 310+"px"
      }
    },
    initUrl () {
      let url = '/scratch-gui/'
      if (url) {
        this.url = url
        this.go = url
      }
    },
    // 初始化数据
    async initData () {
      let res = await getRecordDetail(this.id)
      if(res.result.scoreSet.length <= 0) return this.$tool.message('未关联规则')
      if(res.code !== 200) return this.$tool.message(res.message)
      if(res.result.scoreSet == null) return this.$tool.message('请求失败')
      if (res.result.isCheat === 1) {
        this.$alert('该作品你已设置淘汰', '重要提示', {
          confirmButtonText: '确定'
        })
      }else{
        if(this.path.split('.')[this.path.split('.').length-1].search('sb') === (-1)){
          this.downloadVisible = true
        }
      }
      this.opusArray = res.result
      this.scoreArray = res.result.scoreSet
      this.tools = res.result.tool
      var arr = JSON.parse(JSON.stringify(this.scoreArray))
       arr.forEach((item,i) => {
        let max = item.percentage
        let map = new Map()
        map.set('0', "0")
        map.set(max, max.toString())
        const mapObj = (map) => {
          let obj = {}
          for(let [k,v] of map) {
              obj[k] = v
          }
          return obj
      }
        item.marks =mapObj(map)
      })
      // if(!res.result.scoreGet) return this.$tool.message(res.message)
      this.scoreArray = arr
      this.totalScore = res.result.scoreGet
      if(this.totalScore !== null && this.totalScore.scoreDetails !== '淘汰') {
        let arr = []
        this.totalScore.scoreDetails.split('$').forEach((item, i) => {
          arr.push(JSON.parse(item))
        })
        arr = JSON.parse(JSON.stringify(arr))
        JSON.parse(JSON.stringify(this.scoreArray)).forEach((item , i) => {
            arr.forEach((sonItem,i) => {
              if(item.title == sonItem.title){
                this.val.push(sonItem.score)
              }
            })
        })
        this.count = this.totalScore.totalScore
      }
      this.groupTitle = this.$tool.localGet('groupTitle')
      this.matchItem = this.$tool.localGet('matchItem')
      // this.drawerLeft()
    },
    formatTooltip (val) {
      return val / 100
    },
    // 统计总分
    changeGrade (v) {
      this.count = 0
      this.val.forEach((item, i) => {
        this.count += item
      })
      this.count = Math.floor(this.count * 100) / 100
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
    },
    keyboard (e) {
      // if(e.keyCode == 67 && e.altKey ) {
      //   if(this.drawer==false){
      //     this.drawer = true
      //     this.$refs.drawer.style.marginRight = '310px'
      //     this.flag = false
      //     this.$refs.iframe.style.width = document.body.clientWidth-310+"px"
      //   }else{
      //     this.drawer = false
      //     this.$refs.drawer.style.marginRight = '0px'
      //     this.flag = true
      //     this.$refs.iframe.style.width = document.body.clientWidth+"px"
      //   }
      // }
      if(e.keyCode == 67 && e.altKey ) {
        if (this.flag === true) {
          this.$refs.drawer.style.marginRight = '-310px'
          this.flag = false
          this.$refs.iframe.style.width = document.body.clientWidth-20+"px"
        }else{
          this.$refs.drawer.style.marginRight = '0px'
          this.flag = true
          this.$refs.iframe.style.width = document.body.clientWidth - 310+"px"
        }
      }
      // this.drawer = true
    }
  },
  watch: {
    // 'drawer': function (newData, oldData) {
    //   if (newData === false) {
    //     this.$refs.drawer.style.marginRight = '0px'
    //     this.flag = true
    //     this.$refs.iframe.style.width = document.body.clientWidth-20+"px"
    //   }
    // }
  },
  mounted () {
    this.initData()
    this.initUrl()
    window['getThisRoute'] = this.$route
    window.addEventListener('message', this.events.receiveMessageFromParent, false)
    let height = document.documentElement.clientHeight
    this.height = Number(height - 76) + 'px'
    setInterval(this.keepConnect, 1000 * 60 * 60)
    window.onresize = (e) =>{
      if (this.flag === true) {
        this.$refs.iframe.style.width = document.body.clientWidth-310+"px"
      }else{
        this.$refs.iframe.style.width = document.body.clientWidth - 20+"px"
      }
    }
    this.$refs.iframe.style.width = document.body.clientWidth-310+"px"
    window.onkeydown = (e) =>{
      this.keyboard(e)
    }
    this.$refs.iframe.contentWindow.onkeydown = (e) => {
      this.keyboard(e)
    }
  },
  beforeDestroy () {
    window.removeEventListener('message', this.events.receiveMessageFromParent, false)
  },
  beforeMount () {
  }
}
</script>

<style scoped lang="scss">
    .clickMe{
      position: fixed;
      top: 50%;
      right: 0;
      transition: all 0.23s;
      background: url(../assets/open.png) no-repeat;
      transform: translateY(-50%);
      width: 40px;
      height: 115px;
      border: none;
      outline: none;
      background-size: cover;
      span{
        position: absolute;
        top: -66px;
        left: 0;
        height: 50px;
        width:40px;
        /*background-color: #ff6bd6;*/
        font-size: 20px;
        line-height: 24px;
        color: black;
        word-wrap: break-word;
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
    margin: 0 auto 20px;
    height: 100%;
    line-height: 1.5rem;
    .back{
      color: #FFFFFF;
      cursor: pointer;
      margin-right: 30px;
      width: 100px;
      text-align: center;
    }
  }
  }

</style>

<style lang="scss">
.theOne{
  overflow-y: scroll;
  height: 100%;
  #iframe{
    width: 100%;
    height: 100%;
    body{
      width: 100%;
      height: 100%;
    }
  }
  /deep/.el-table__header-wrapper .el-table__header .has-gutter {
  display: none;
  }
}
  .rightModal_del {
    width: 310px;
    background-color: #3a3a3a;
    position: fixed;
    top: 0;
    right: 0;
    height: 100%;
    box-sizing: border-box;
    transition: all 0.2s;
    /*overflow-y: scroll;*/
    .clickMe{
      position: absolute;
      /*top: 50%;*/
      /*right:310px;*/
      top: 50%;
      right: 100%;
      transition: all 0.23s;
      background: url(../assets/open.png) no-repeat;
      transform: translateY(-50%);
      width: 40px;
      height: 115px;
      border: none;
      outline: none;
      background-size: cover;
      span{
        position: absolute;
        top: -66px;
        left: 0;
        height: 50px;
        width:40px;
        /*background-color: #ff6bd6;*/
        font-size: 20px;
        line-height: 24px;
        color: black;
        word-wrap: break-word;
      }
    }
    .modal_wrapper {
      width: 310px;
      background-color: #3a3a3a;
      position: absolute;
      top: 0;
      right: 0;
      height: 100%;
      overflow-y: scroll;
      padding: 20px 10px 20px 18px;
      box-sizing: border-box;
      .title_box {
        /*display: flex;*/
        /*justify-content: space-between;*/
        margin-bottom: 12px;
        /*align-items: center;*/
        div {
          color: #4D97FF;
          font-size: 21px;
          margin-bottom: 10px;
        }

        div:nth-child(2) {
          display: flex;
          justify-content: space-between;

          button {
            width: 60px;
            height: 28px;
            font-size: 16px;
          }

          button:nth-child(1) {
            box-sizing: border-box;
            background-color: #ff5151;
            border: none;
            outline: none;
            cursor: pointer;
            color: #FFFFFF;
            border-radius: 8px;
            margin-right: 10px;
            line-height: 28px;
          }

          button:nth-child(2) {
            box-sizing: border-box;
            background-color: #4D97FF;
            border: none;
            outline: none;
            cursor: pointer;
            color: #FFFFFF;
            border-radius: 8px;
            line-height: 28px;
          }
        }
      }

      .opus_wrapper {
        .opus_box {
          /*display: flex;*/
          /*justify-content: space-between;*/
          box-sizing: border-box;

          p {
            color: #FFFFFF;
            font-size: 18px;
            margin-bottom: 10px;
            /*width: 73px;*/
            /*height: 40px;*/
          }

          input {
            width: 100%;
            margin-bottom: 20px;
            height: 46px;
            border: 1px solid rgba(77, 151, 255, 1);
            border-radius: 8px;
            border: none;
            outline: none;
            padding-left: 10px;
            box-sizing: border-box;
          }

          textarea {
            width: 100%;
            border: 1px solid rgba(77, 151, 255, 1);
            border-radius: 8px;
            margin-bottom: 20px;
            border: none;
            outline: none;
            box-sizing: border-box;
            padding: 5px 5px;
          }
        }
      }

      .prompt {
        /*width: 278px;*/
        height: 35px;
        /*display: flex;*/
        /*justify-content: flex-end;*/
        /*padding-left: 85px;*/
        display: flex;
        /*margin-bottom: 30px;*/
        justify-content: space-between;
        margin-bottom: 12px;

        & > p:nth-child(1) {
          width: 112px;
          height: 65px;
          color: #FFFFFF;
          margin-right: 14px;

          span {
            color: #DE3737;
          }
        }

        & > span {
          display: inline-block;
          width: 40px;
          height: 40px;
          cursor: pointer;
          /*margin-right: 50px;*/
          position: relative;
          transform: translateX(-28px);

          img {
            width: 100%;
            height: 100%;
          }
        }
      }

      .down{
        display: flex;
        justify-content: space-between;
        margin-bottom: 12px;
        .downloadRar {
          color: #FFFFFF;
          display: flex;
          align-items: center;
          cursor: pointer;
          img {
            margin-right: 2px;
          }
        }
        p:nth-child(2){
          color: #FFFFFF;
          cursor: pointer;
          margin-right: 6px;
          display: flex;
          align-items: center;
          img {
            margin-right: 3px;
          }
        }
      }
      .creatTool{
        color: #FFFFFF;
        margin-bottom: 12px;
        span{
          color: red;
        }
      }
      .rules {
        display: flex;
        justify-content: space-between;
        margin-bottom: 15px;

        span:nth-child(1) {
          color: #FFFFFF;
          /*padding-left: 38px;*/
          font-size: 18px;
        }

        span:nth-child(2) {
          color: #91BDFA;
          cursor: pointer;

        }
      }

      .grade {
        margin-bottom: 10px;
        box-sizing: border-box;
        padding-right: 10px;
        color: #FFFFFF;

        div:nth-child(n+2) {
          /*padding-left: 64px;*/
          margin-bottom: 12px;
          color: #FFFFFF;

          & > span {
            /*margin-left: 64px;*/
            /*margin-bottom: 10px;*/
          }

          & > div {
            & > .el-slider__runway {
              /*margin-left: 65px;*/
              box-sizing: border-box;
              margin-right: 70px;
            }
          }
        }
      }

      .total_grade {
        display: flex;
        /*padding-left: 64px;*/
        box-sizing: border-box;
        margin-bottom: 20px;

        span {
          font-size: 18px;
          display: inline-block;
          width: 100px;
          color: #FFFFFF;
          line-height: 32px;
          /*margin: 0 50px 0 0;*/
          /*margin-right: 30px;*/
          box-sizing: border-box;
        }

        input {
          height: 35px;
          width: 163px;
          border-radius: 8px;
          border: none;
          outline: none;
          box-sizing: border-box;
          padding-left: 20px;
        }

        input::-webkit-input-placeholder {
          color: black
        }
      }

      .choose {
        box-sizing: border-box;
        /*margin-left: 64px;*/
        width: 100%;
        justify-content: space-between;
        display: flex;
        /*padding-right: 63px;*/
        button {
          border: none;
          outline: none;
          background-color: #606060;
          cursor: pointer;
          padding: 5px 10px;
          border-radius: 8px;
          width: 65px;
          height: 40px;
          color: #FFFFFF;
          font-size: 12px;
          box-sizing: border-box;
        }

        button:nth-child(2) {
          background-color: #4D97FF;
          margin-bottom: 15px;
        }
      }
    }
  }
  .addTitle{
    .el-dialog__body{
      padding: 4px 20px 12px;
    }
    .title{
      color: red;
      margin-top: 10px;
    }
  }
</style>
