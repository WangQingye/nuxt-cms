<template>
  <div class="invite"
    v-show="show"
    :style="{backgroundImage:`url(${backImg})`}">
    <div class="header">
      <img class="header-logo"
        :src="$store.state.config.webConfig.logo|cloudImage"
        alt="logo"
        @click="$router.push('/')">
      <div :class="[!showInfo ? 'hide':'', 'btns']">
        <el-link @click="preview"
          style="font-size:0.12rem;text-decoration:underline">保存预览</el-link>
        <el-button type="primary"
          size="mini"
          style="margin-left: 0.2rem"
          @click="submit">保存提交</el-button>
      </div>
    </div>
    <section class="step step-1"
      v-if="!showInfo">
      <div class="wrapper" v-if="stepOneForm.urlcode">
        <p class="title">{{stepOneForm.name}} 资料填写邀请</p>
        <div class="form">
          <p class="label">请输入邀请码：</p>
          <el-input class="input"
            v-model="inviteCode"></el-input>
          <el-button type="primary"
            class="button"
            @click="goInfo">确认查看填写</el-button>
          <p class="time">有限期至{{stepOneForm.expire_time|parseTime('{y}-{m}-{d} {h}:{i}:{s}')}}</p>
        </div>
      </div>
      <div class="wrapper" v-else>
        <div class="form">
          <p class="error-text">抱歉，链接已失效</p>
          <el-button type="primary" class="button" @click="$router.push('/')">返回首页</el-button>
        </div>
      </div>
    </section>
    <section class="step step-2"
      v-if="showInfo">
      <div class="wrapper">
        <div class="top">
          <p class="title">注：以下带<span style="color:#FF2222">*</span>为必填项。可点击右上角保存预览查看实际展示样式，确认填写完成后点击保存提交。</p>
        </div>
        <div class="form">
          <el-form ref="form"
            :model="infoForm"
            label-width="100px"
            label-position="top">
            <div class="top-wrapper">
              <CropperUploadMobile action="/file/upload"
                @upload-success="uploadPhotoSuccess"
                :fixedNumber="[140, 190]">
                <div slot="child"
                  class="photo">
                  <i v-if="infoForm1.avatar"
                    class="el-icon-delete del-image"
                    @click.stop="infoForm1.avatar = ''" />
                  <el-image v-if="infoForm1.avatar"
                    class="cover"
                    :fit="'cover'"
                    :src="infoForm1.avatar | cloudImage" />
                  <div v-else
                    class="btn">
                    <i class="el-icon-upload icon" />
                    <span>形象照</span>
                  </div>
                </div>
              </CropperUploadMobile>
              <div class="top-left">
                <el-form-item label="姓名"
                  class="top-item"
                  required>
                  <el-input v-model="infoForm.name"
                    disabled></el-input>
                </el-form-item>
                <el-form-item label="所属部门"
                  class="top-item"
                  required>
                  <el-select v-model="tagsValue"
                    multiple
                    placeholder="请选择"
                    disabled
                    :clearable="false"
                    style="width:100%">
                    <el-option v-for="item in infoForm.tags"
                      :key="item.key"
                      :label="item.name"
                      :value="item.key">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="副标题1"
                  class="top-item"
                  required>
                  <el-input v-model="infoForm.post"
                    disabled></el-input>
                </el-form-item>
                <el-form-item label="副标题2"
                  class="top-item"
                  required>
                  <el-input v-model="infoForm.job_content"
                    disabled></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="middle-wrapper">
              <el-form-item label="所在系所">
                <el-input v-model="infoForm1.dept"></el-input>
              </el-form-item>
              <el-form-item>
                <p slot="label">办公电话</p>
                <el-input v-model="infoForm1.tel"></el-input>
              </el-form-item>
              <el-form-item label="电子邮件">
                <el-input v-model="infoForm1.email"></el-input>
              </el-form-item>
              <el-form-item>
                <p slot="label">个人主页</p>
                <el-input v-model="infoForm1.homepage"></el-input>
              </el-form-item>
              <el-form-item label="通讯地址">
                <el-input v-model="infoForm1.address"></el-input>
              </el-form-item>
              <el-form-item label="工作内容或个人简介"
                required>
                <el-input type="textarea"
                  :rows="4"
                  maxlength="120"
                  show-word-limit
                  v-model="infoForm1.intro"></el-input>
              </el-form-item>
            </div>
          </el-form>
          <el-form ref="form1"
            :model="infoForm1"
            label-width="100px"
            label-position="top">
            <el-form-item :label="label.name"
              v-for="label in infoForm1.labels"
              :key="label.key"
              style="margin-bottom: 0.1rem">
              <el-input style="white-space: pre-line;"
                type="textarea"
                :rows="5"
                maxlength="1000"
                show-word-limit
                v-model="label.content"></el-input>
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
import backImg from '@/static/imgs/bg-1.jpg'
export default {
  name: 'Invite',
  data() {
    return {
      show: false,
      backImg,
      inviteCode: '',
      showInfo: false,
      stepOneForm: {},
      infoForm: {},
      infoForm1: {},
      tagsValue: [],
    }
  },
  async asyncData(context) {
    // const isMoible =
    //   /(Android|webOS|iPhone|iPod|tablet|BlackBerry|Mobile)/i.test(
    //     context.userAgent
    //   )
    //     ? true
    //     : false
    // if (isMoible) {
    //   context.redirect('/error?msg=请用电脑端打开此页面')
    // }
    await context.app.$utils.getInitData(context)
    let stepOneForm = {}
    if (context.params.id) {
      stepOneForm = await context.app.$api.department.personInvite({
        urlcode: context.params.id,
      })
    }
    return {
      stepOneForm,
    }
  },
  mounted() {
    //按照宽度375图算， 1rem = 100px;
    function changeSize() {
      document.documentElement.style.fontSize = `${
        document.body.clientWidth / 3.75
      }px`
    }
    changeSize()
    window.addEventListener('resize', changeSize, false)
    // 解决HTML先于CSS加载的问题
    this.show = true
  },
  methods: {
    isMoible(UA) {
      return
    },
    async goInfo() {
      if (!this.inviteCode) {
        this.$message.error('请输入邀请码')
        return
      }
      let info = await this.$api.department.personInvite({
        urlcode: this.$route.params.id,
        code: this.inviteCode,
      })
      this.infoForm = JSON.parse(JSON.stringify(info))
      info.labels && info.labels.forEach((label) => {
        if (label.content) {
          label.content = label.content.replace(/\\n/g, '\n')
          label.content = label.content.slice(1)
          label.content = label.content.slice(0, -1)
        }
      })
      this.infoForm1 = JSON.parse(JSON.stringify(info))
      this.tagsValue = this.infoForm1.tags && this.infoForm1.tags.map((t) => t.key)
      this.showInfo = true
    },
    async preview() {
      if (!this.testForm()) return
      let res = await this.$api.department.personUpdate({
        urlcode: this.$route.params.id,
        code: this.inviteCode,
        ...this.infoForm1,
      })
      if (res.id) {
        window.open(`/mobilePreview/person/${res.id}`, '_blank')
      }
    },
    uploadPhotoSuccess(res) {
      this.infoForm1.avatar = res.filename
    },
    testForm() {
      if (!this.infoForm1.intro) {
        this.$message.error('工作内容或个人简介不能为空')
        return false
      }
      return true
    },
    async submit() {
      if (!this.testForm()) return
      let res = await this.$api.department.personUpdate({
        urlcode: this.$route.params.id,
        code: this.inviteCode,
        ...this.infoForm1,
      })
      if (res.id) {
        this.$confirm('保存成功！', '提示', {
          confirmButtonText: '前往首页',
          cancelButtonText: '留在本页',
          type: 'success',
        })
          .then(() => {
            this.$router.replace('/')
          })
          .catch(() => {})
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.invite {
  width: 100%;
  min-height: 100vh;
  height: auto;
  background-attachment: fixed;
  background-size: 100% auto;
  .header {
    height: 0.5rem;
    border-bottom: 0.01rem solid rgba(255, 255, 255, 0.1);
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
    padding: 0 0.2rem;
    .header-logo {
      height: 0.26rem;
      z-index: 2;
      cursor: pointer;
    }
    .btns {
      display: flex;
      align-items: center;
      height: 0.5rem;
    }
    .hide {
      display: none;
    }
    .submit {
      margin-left: 0.1rem;
      width: 0.2rem;
      height: 0.4rem;
      border-radius: 0.2rem;
    }
  }
  .footer {
    width: 100%;
    font-size: 0.12rem;
    color: #1a1a1a;
    height: 0.5rem;
    line-height: 0.5rem;
    text-align: center;
  }
  .step {
    width: 100%;
    min-height: calc(100vh - 0.5rem);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .step-1 {
    .title {
      font-size: 0.15rem;
      font-weight: 500;
      color: #000000;
      text-align: center;
      margin-bottom: 0.3rem;
    }
    .form {
      width: 3rem;
      // height: 2.7rem;
      display: flex;
      flex-direction: column;
      background: #ffffff;
      box-shadow: 0px 0.1rem 0.2rem 0px rgba(10, 103, 253, 0.05);
      border-radius: 0.04rem;
      padding: 0.2rem 0.2rem;
      box-sizing: border-box;
      .label {
        font-size: 0.14rem;
        color: #999999;
      }
      .error-text {
        text-align: center;
        font-size: 0.14rem;
        color: #999999;
        margin: 0.5rem 0;
      }
      .input {
        margin: 0.3rem 0;
        ::v-deep .el-input__inner {
          width: 2.6rem;
          height: 0.5rem;
          background: #f7f8fa;
        }
      }
      .button {
        width: 2.6rem;
        height: 0.5rem;
        margin-bottom: 0.2rem;
      }
      .time {
        font-size: 0.12rem;
        color: #999999;
        text-align: center;
      }
    }
  }
  .step-2 {
    padding-top: 1rem;
    padding-bottom: 0.3rem;
    .wrapper {
      width: 3.5rem;
      .top {
        @include flex-between;
        font-size: 0.12rem;
        line-height: 0.18rem;
        color: #4d4d4d;
        margin-bottom: 0.1rem;
        .example {
          color: $--color-primary;
          cursor: pointer;
        }
      }
      .form {
        width: 3.5rem;
        background: #ffffff;
        box-shadow: 0px 0.1rem 0.2rem 0px rgba(10, 103, 253, 0.05);
        border-radius: 0.04rem;
        padding: 0.15rem;
        padding-bottom: 0.35rem;
        box-sizing: border-box;
        .top-wrapper {
          @include flex-between;
          align-items: center;
          flex-direction: column;
          border-bottom: 1px solid #e5e5e5;
          .top-item {
            width: 3.2rem;
          }
          .photo {
            width: 1.2rem;
            height: 1.65rem;
            margin-top: 0.2rem;
            border: 1px dashed #d9d9d9;
            @include flex-between;
            border-radius: 6px;
            position: relative;
            .del-image {
              position: absolute;
              right: 3px;
              top: 3px;
              z-index: 1;
              color: grey;
              font-size: 0.18rem;
              cursor: pointer;
            }
            .btn {
              color: #4d4d4d;
              font-size: 0.15rem;
              .icon {
                display: block;
                margin-bottom: 10px;
              }
              width: 100%;
              text-align: center;
            }
          }
        }
        .middle-wrapper {
          padding-bottom: 0.15rem;
          margin-bottom: 0.1rem;
          border-bottom: 1px solid #e5e5e5;
        }
        ::v-deep .el-form-item {
          margin-bottom: 0;
          display: flex;
          flex-direction: column;
        }
        ::v-deep .el-form-item__label {
          padding: 0;
          line-height: 0.2rem;
          margin: 0.1rem 0;
        }
      }
    }
  }
}
</style>
<style lang="scss">
.el-message-box {
  width: 3rem !important;
}
.el-message {
  min-width: 1rem;
  max-width: 3.75rem;
  .el-message__icon {
    font-size: 0.14rem;
  }
}
</style>
