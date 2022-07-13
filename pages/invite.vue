<template>
  <div class="invite" v-show="show" :style="{backgroundImage:`url(${backImg})`}">
    <div class="header">
      <img class="header-logo" :src="$store.state.config.webConfig.logo|cloudImage" alt="logo" @click="$router.push('/')">
      <div :class="[!showInfo ? 'hide':'']">
        <el-link @click="preview">保存预览</el-link>
        <el-button type="primary" class="submit" @click="submit">保存提交</el-button>
      </div>
    </div>
    <section class="step step-1" v-if="!showInfo">
      <div class="wrapper">
        <p class="title">某某某 资料填写邀请</p>
        <div class="form">
          <p class="label">请输入邀请码：</p>
          <el-input class="input" v-model="inviteCode"></el-input>
          <el-button type="primary" class="button" @click="goInfo">确认查看填写</el-button>
          <p class="time">有限期至2022-08-01 12:38:11</p>
        </div>
      </div>
    </section>
    <section class="step step-2" v-if="showInfo">
      <div class="wrapper">
        <div class="top">
          <p class="title">注：以下带<span style="color:#FF2222">*</span>为必填项。可点击右上角保存预览查看实际展示样式，确认填写完成后点击保存提交。</p>
          <p>不会填写？<span class="example">查看示例</span></p>
        </div>
        <div class="form">
          <el-form ref="form" :model="infoForm" label-width="100px" label-position="left">
            <div class="top-wrapper">
              <div class="top-left">
                <el-form-item label="姓名" class="top-item">
                  <el-input v-model="infoForm.name"></el-input>
                </el-form-item>
                <el-form-item label="所属部门" class="top-item">
                  <el-input v-model="infoForm.name"></el-input>
                </el-form-item>
                <el-form-item label="主管工作" class="top-item">
                  <el-input v-model="infoForm.name"></el-input>
                </el-form-item>
                <el-form-item label="工作内容" class="top-item">
                  <el-input v-model="infoForm.name"></el-input>
                </el-form-item>
              </div>
              <el-upload class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false">
                <img v-if="photoUrl" :src="photoUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </div>
            <div class="middle-wrapper">
              <el-row>
                <el-col :span="12">
                  <el-form-item label="所在系所">
                    <el-input v-model="infoForm.name"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item>
                    <p slot="label" style="text-align:right">办公电话</p>
                    <el-input v-model="infoForm.name"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="电子邮件">
                    <el-input v-model="infoForm.name"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item>
                    <p slot="label" style="text-align:right">个人主页</p>
                    <el-input v-model="infoForm.name"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-form-item label="通讯地址">
                <el-input v-model="infoForm.name"></el-input>
              </el-form-item>
              <el-form-item label="人员简介">
                <el-input type="textarea" :rows="4" maxlength="120" show-word-limit v-model="infoForm.name"></el-input>
              </el-form-item>
            </div>
          </el-form>
          <el-form ref="form1" :model="infoForm1" label-width="100px" label-position="top">
            <el-form-item label="教育背景">
              <el-input type="textarea" :rows="5" maxlength="1000" show-word-limit v-model="infoForm.name"></el-input>
            </el-form-item>
            <el-form-item label="工作经历">
              <el-input type="textarea" :rows="5" maxlength="1000" show-word-limit v-model="infoForm.name"></el-input>
            </el-form-item>
            <el-form-item label="研究方向">
              <el-input type="textarea" :rows="5" maxlength="1000" show-word-limit v-model="infoForm.name"></el-input>
            </el-form-item>
            <el-form-item label="科研项目">
              <el-input type="textarea" :rows="5" maxlength="1000" show-word-limit v-model="infoForm.name"></el-input>
            </el-form-item>
            <el-form-item label="代表性论文专著">
              <el-input type="textarea" :rows="5" maxlength="1000" show-word-limit v-model="infoForm.name"></el-input>
            </el-form-item>
            <el-form-item label="教学工作">
              <el-input type="textarea" :rows="5" maxlength="1000" show-word-limit v-model="infoForm.name"></el-input>
            </el-form-item>
            <el-form-item label="学术兼职">
              <el-input type="textarea" :rows="5" maxlength="1000" show-word-limit v-model="infoForm.name"></el-input>
            </el-form-item>
            <el-form-item label="荣誉奖励">
              <el-input type="textarea" :rows="5" maxlength="1000" show-word-limit v-model="infoForm.name"></el-input>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </section>
    <div class="footer">
      <p>
        <span v-if="$store.state.config.webConfig.copyright">
          {{ $store.state.config.webConfig.copyright }}
        </span>
        <span v-if="$store.state.config.webConfig.beian">
          | {{ $store.state.config.webConfig.beian }}
        </span>
      </p>
    </div>
  </div>
</template>

<script>
import backImg from '@/static/imgs/home/b-3.jpg'
export default {
  name: 'Invite',
  data() {
    return {
      show: false,
      backImg,
      inviteCode: '',
      showInfo: false,
      infoForm: {
        name: '',
      },
      infoForm1: {
        name: '',
      },
      photoUrl: '',
    }
  },
  head() {
    let title = this.$store.state.config.webConfig.name
    return {
      title: title,
      meta: [
        {
          hid: 'description',
          name: title,
          content: title,
        },
      ],
    }
  },
  async asyncData(context) {
    const isMoible =
      /(Android|webOS|iPhone|iPod|tablet|BlackBerry|Mobile)/i.test(
        context.userAgent
      )
        ? true
        : false
    if (isMoible) {
      context.redirect('/error?msg=请用电脑端打开此页面')
    }
    await context.app.$utils.getInitData(context)
  },
  mounted() {
    this.show = true
    console.log(this.$store.state.config)
  },
  methods: {
    isMoible(UA) {
      return
    },
    goInfo() {
      if (!this.inviteCode) {
        this.$message.error('请输入邀请码')
        return
      }
      this.showInfo = true
    },
    preview() {
      window.open('/preview/person?params=785ab934b9d94affbe7a2924d4c34682','_blank')
    },
    submit() {

    }
  },
}
</script>

<style lang="scss" scoped>
.invite {
  width: 100%;
  min-width: 1400px;
  min-height: 100vh;
  height: auto;
  .header {
    height: 80px;
    padding: 0 10%;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
    align-items: center;
    color: white;
    background: white;
    z-index: 2;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    .header-logo {
      height: 38px;
      z-index: 2;
      cursor: pointer;
    }
    .hide {
      display: none;
    }
    .submit {
      margin-left: 50px;
      width: 120px;
      height: 40px;
      border-radius: 20px;
    }
  }
  .footer {
    width: 100%;
    font-size: 15px;
    color: #1a1a1a;
    height: 60px;
    line-height: 60px;
    text-align: center;
  }
  .step {
    width: 100%;
    min-height: calc(100vh - 60px);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .step-1 {
    .title {
      font-size: 19px;
      font-weight: 500;
      color: #000000;
      text-align: center;
      margin-bottom: 30px;
    }
    .form {
      width: 500px;
      height: 270px;
      background: #ffffff;
      box-shadow: 0px 10px 20px 0px rgba(10, 103, 253, 0.05);
      border-radius: 4px;
      padding: 35px 80px;
      box-sizing: border-box;
      .label {
        font-size: 14px;
        color: #999999;
        margin-bottom: 10px;
      }
      .input {
        ::v-deep .el-input__inner {
          width: 340px;
          height: 50px;
          background: #f7f8fa;
        }
        margin-bottom: 30px;
      }
      .button {
        width: 340px;
        height: 50px;
        margin-bottom: 30px;
      }
      .time {
        font-size: 14px;
        color: #999999;
        text-align: center;
      }
    }
  }
  .step-2 {
    padding-top: 130px;
    padding-bottom: 30px;
    .wrapper {
      width: 900px;
      .top {
        @include flex-between;
        font-size: 14px;
        color: #4d4d4d;
        margin-bottom: 15px;
        .example {
          color: $--color-primary;
          cursor: pointer;
        }
      }
      .form {
        width: 900px;
        background: #ffffff;
        box-shadow: 0px 10px 20px 0px rgba(10, 103, 253, 0.05);
        border-radius: 4px;
        padding: 35px;
        box-sizing: border-box;
        .top-wrapper {
          @include flex-between;
          padding-bottom: 15px;
          margin-bottom: 35px;
          border-bottom: 1px solid #e5e5e5;
          .top-item {
            width: 500px;
          }
        }
        .middle-wrapper {
          padding-bottom: 15px;
          margin-bottom: 35px;
          border-bottom: 1px solid #e5e5e5;
        }
      }
    }
  }
}
</style>
