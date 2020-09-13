<template>
    <div class="box" @click="back">
        <div>{{cardInfo.matchName}}-{{cardInfo.scheduleName}}</div>
        <div class="right">
            <div class="first">报名时间：{{cardInfo.applyTime}}</div>
            <div class="second">参赛状态：{{cardInfo.isJudged?'已评阅':(cardInfo.isJoined?'已提交':'未提交')}}</div>
            <div class="three"><span>{{cardInfo.matchStatus}}</span></div>
        </div>
    </div>
</template>

<script>
export default {
  props: ['cardInfo'],
  data () {
    return {
    }
  },
  methods: {
    back () {
      this.$emit('toSubmit', this.cardInfo)
    }
  }
}
</script>

<style lang="scss" scoped>
    .box{
        width: 22rem;
        height: 1.5rem;
        border-radius: 8px;
        background-color: #fff;
        box-shadow: 0 5px 5px rgba(0, 0, 0, 0.1),0 0 10px 0 rgba(0,0,0,0.2);
        margin-bottom: 0.4rem;
        display: flex;
        cursor: pointer;
        >div {
            flex: 1;
            height: 100%;
            line-height: 1.5rem;
            padding-left: 0.5rem;
        }
        .right{
            display: flex;
            .first{
                flex:2;
                font-size: 0.25rem;
                color: #666;
            }
            .second{
                flex:2;
                font-size: 0.25rem;
                text-align: center
            }
            .three{
                flex:1;
                font-size: 0.25rem;
                text-align: center;
                span{
                    padding: 0.1rem 0.2rem;
                    background-color: #fff5d4;
                    color: #ffc162;
                    border-radius: 20px;
                }
            }
        }
    }
</style>
