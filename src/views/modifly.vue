<template>
  <div style="background-color:#e5e5f7;height:100%;width:100%;position:relative">
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
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </el-row>
      </div>
    </div>
    <div class="formBox">
      <div class="form">
        <div class="title">修改作品</div>
        <el-form label-width="2rem">
          <el-form-item label="作品名称">
            <el-input type="text" placeholder="请输入作品名称" v-model="sendData.opusName"></el-input>
          </el-form-item>
          <el-form-item label="作品介绍">
            <el-input type="textarea" placeholder="请输入作品介绍" resize="none" v-model="sendData.opusIntroduction"></el-input>
          </el-form-item>
          <el-form-item label="作品上传">
            <el-upload
              class="upload-demo"
              :action='$tool.upload.file()'
              :on-remove="removeFile"
              :before-upload="beforeUpload"
              :before-remove="beforeRemove"
              :limit="1"
              :on-success='onFileSuccess'
              :file-list="fileList_A"
            >
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
          </el-form-item>
          <el-form-item label="视频上传">
            <el-upload
              class="upload-demo"
              :action="$tool.upload.movie()"
              :before-upload="beforeUpload"
              :on-remove="removeMovie"
              :before-remove="beforeRemove"
              :limit="1"
              :on-success='onMovieSuccess'
              :file-list="fileList_B"
            >
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip" style="margin-top:-5px;line-height:20px;">(选填)</div>
            </el-upload>
          </el-form-item>
          <el-form-item label="附件">
            <el-upload
              class="upload-demo"
              :action="$tool.upload.file2()"
              :before-upload="beforeUpload"
              :on-remove="removeFile2"
              :before-remove="beforeRemove"
              :limit="1"
              :on-success='onFile2Success'
              :file-list="fileList_C"
            >
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip" style="margin-top:-5px;line-height:20px;">(选填，上传压缩包)</div>
            </el-upload>
          </el-form-item>
          <el-form-item label="开发工具">
            <el-radio-group v-model='sendData.tools'>
              <el-radio v-for="(item,index) in toolsList" :key='index' :label='item.value'>{{item.title}}</el-radio>
              <el-radio label="其他">其他 <input type="text" v-model="otherTool" class='otherTool'></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="指导老师">
            <el-input type="text" placeholder="请输入指导老师姓名" v-model="sendData.advisor"></el-input>
          </el-form-item>
          <div style="margin-left:2rem;" class="clearfix">
            <el-button style="width:40%;background-color:#fff;color:#000;border-color:#ccc" class="fl" @click="_back">返回</el-button>
            <el-button style="width:40%;background-color:#120fb7;color:#fff" class="fr" @click="_submit">提交</el-button>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { submitOp, getTools, getDetail } from '@/api/index'
export default {
  data () {
    return {
      options: [],
      fileList_A: [],
      fileList_B: [],
      fileList_C: [],
      toolsList: [],
      sendData: {
        scheduleId: this.$route.query.id,
        opusName: '',
        opusIntroduction: '',
        opusPath: '',
        opusPathName: '',
        videoPath: '',
        videoPathName: '',
        attachmentPath: '',
        attachmentPathName: '',
        advisor: '',
        tools: '源码熊'
      },
      otherTool: '',
      flag: true
    }
  },
  created () {
    // if (!this.sendData.scheduleId) {
    //   this.$router.push({
    //     name: 'home'
    //   })
    // }
    // this._getTools()
    // this.initPage()
  },
  mounted () {},
  methods: {
    async initPage () {
      const res = await getDetail(this.sendData.scheduleId)
      if (res.code !== 200) return this.$tool.messageError(res.message)
      let params = res.result[0]
      this.sendData.opusName = params.opusName
      this.sendData.opusIntroduction = params.opusIntroduction
      this.sendData.opusPath = params.opusPath
      this.sendData.opusPathName = params.opusPathName
      this.sendData.videoPath = params.videoPath
      this.sendData.videoPathName = params.videoPathName
      this.sendData.attachmentPath = params.attachmentPath
      this.sendData.attachmentPathName = params.attachmentPathName
      this.sendData.advisor = params.advisor
      if (params.tools !== '源码熊' && params.tools !== 'Scratch' && params.tools !== '编程猫') {
        this.sendData.tools = '其他'
        this.otherTool = params.tools
      } else {
        this.sendData.tools = params.tools
      }
      this.fileList_A.push({
        name: params.opusPathName
      })
      if (params.videoPathName) {
        this.fileList_B.push({
          name: params.videoPathName
        })
      }
      if (params.attachmentPathName) {
        this.fileList_C.push({
          name: params.attachmentPathName
        })
      }
    },
    removeFile (file, fileList) {
      this.sendData.opusPath = ''
      this.sendData.opusPathName = ''
    },
    removeMovie (file, fileList) {
      this.sendData.videoPath = ''
      this.sendData.videoPathName = ''
    },
    removeFile2 (file, fileList) {
      this.sendData.attachmentPath = ''
      this.sendData.attachmentPathName = ''
    },
    beforeRemove (file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    },
    beforeUpload (file) {
      this.flag = false
    },
    async _getTools () {
      const res = await getTools()
      if (res.code !== 200) return this.$tool.messageError(res.message)
      this.toolsList = res.result
    },
    onFileSuccess (res, file, fileList) {
      if (res.code !== 200) return this.$tool.messageError(res.message)
      this.sendData.opusPath = res.result
      this.sendData.opusPathName = file.name
      this.flag = true
    },
    onMovieSuccess (res, file, fileList) {
      if (res.code !== 200) return this.$tool.messageError(res.message)
      this.sendData.videoPath = res.result
      this.sendData.videoPathName = file.name
      this.flag = true
    },
    onFile2Success (res, file, fileList) {
      if (res.code !== 200) return this.$tool.messageError(res.message)
      this.sendData.attachmentPath = res.result
      this.sendData.attachmentPathName = file.name
      this.flag = true
    },
    _back () {
      this.$confirm(`未提交的数据将无法保存，是否返回`, '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$router.push({
          name: 'cards'
        })
      }).catch(() => {
      })
    },
    async _submit () {
      if (!this.flag) return this.$tool.message('请等待文件上传完成')
      let send = this.$tool.obCopy(this.sendData)
      if (!send.opusName || !send.opusIntroduction || !send.advisor) return this.$tool.messageError('请填写必要信息')
      if (!send.opusPath) return this.$tool.messageError('请上传作品')
      if (send.tools === '其他') {
        send.tools = this.otherTool
      }
      if (!send.tools) return this.$tool.messageError('请输入工具名称')
      this.$confirm('是否确认提交作品', '提示', {
        confirmButtonText: '确认提交',
        cancelButtonText: '再想想',
        type: 'warning'
      }).then(() => {
        submitOp(send).then(res => {
          if (res.code !== 200) return this.$tool.messageError(res.message)
          this.$tool.messageSuccess('提交成功')
          return this.$router.push({
            name: 'cards'
          })
        })
      }).catch(() => {
      })
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

<style lang="scss" scoped>
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
.otherTool{
  width: 1.5rem;
  border: 0;
  outline: none;
  background-color: rgba(0, 0, 0, 0);
  border-bottom: 1px solid #ccc;
  margin-left: -2px;
}
/deep/.el-cascader {
  width: 100%;
}
/deep/ .el-radio-group{
  padding-left: 10px;
}
/deep/ .el-radio{
  margin-left: -10px;
}
.formBox {
  width: 20.4rem;
  height: 15.6rem;
  background-color: #fff;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -45%);
  border-radius: 8px;
  .form {
    width: 10.32rem;
    height: 10.64rem;
    // border: 1px solid #ccc;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -70%);
    .title {
      padding: 0.4rem 0;
      text-align: center;
      font-size: 0.4rem;
    }
  }
}
</style>
