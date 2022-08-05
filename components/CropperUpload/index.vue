/* eslint-disable */
<template>
  <!-- eslint-disable -->
  <div :class="$options.name" v-loading.fullscreen.lock="fullscreenLoading">
    <el-upload class="upload-el" accept="image/*" ref="fileUpload" name="pic" :action="action" :on-change="selectChange" :show-file-list="false" :auto-upload="false" :http-request="httpRequest">
      <slot name="child"></slot>
      <!-- <div>
        <span
          class="icon upload-icon" />
        <el-button>选择图片</el-button>
      </div> -->
      <div slot="tip" class="el-upload__tip">
        {{tip}}
      </div>
    </el-upload>
    <cropper :dialog-visible.sync="showCropper" :cropper-img="cropperImg" :title="title" :fixedNumber="fixedNumber" @colse-dialog="closeDialog" @upload-img="uploadImg" />
  </div>
</template>
<script>
/* eslint-disable */
import Cropper from './cropper.vue'
import { baseUrl } from '@/config'
export default {
  name: 'UploadImg',
  components: {
    Cropper,
  },
  props: {
    tip: {
      type: String,
      default: '',
    },
    sizeLimit: {
      type: Number,
      default: 5,
    },
    title: {
      type: String,
      default: '图片裁剪',
    },
    action: {
      type: String,
      default: '',
    },
    fixedNumber: {
      type: Array,
      default: () => [16, 9],
    },
  },
  data() {
    return {
      cropperImg: '', // 需要裁剪的图片
      showCropper: false, // 是否显示裁剪框
      uploadFile: '', // 裁剪后的文件
      fullscreenLoading: false,
    }
  },
  methods: {
    // submit 之后会触发此方法
    httpRequest(request) {
      const { action, data, filename } = request
      // 新建formDate对象
      let formData = new FormData()
      // 文件单独push
      formData.append('file', this.uploadFile)
      // this.fullscreenLoading = true
      this.$axios({
        headers: {
          contentType: 'multipart/form-data', // 需要指定上传的方式
        },
        url: '/file/upload',
        method: 'post',
        data: formData,
        timeout: 200000000, // 防止文件过大超时
      })
        .then((res) => {
          this.$emit('upload-success', res)
          this.fullscreenLoading = false
          this.showCropper = false
        })
    },
    // 选择文件
    selectChange(file) {
      const { raw } = file
      this.openCropper(raw)
    },
    /**
     * @param {file} 上传的文件
     */
    openCropper(file) {
      var files = file
      let isOutSize = files.size > this.sizeLimit << 20
      if (isOutSize) {
        this.$message.error(`请上传${this.sizeLimit}M内的图片`)
        return false
      }
      var reader = new FileReader()
      reader.onload = (e) => {
        let data
        if (typeof e.target.result === 'object') {
          // 把Array Buffer转化为blob 如果是base64不需要
          data = window.URL.createObjectURL(new Blob([e.target.result]))
        } else {
          data = e.target.result
        }
        this.cropperImg = data
      }
      // 转化为base64
      // reader.readAsDataURL(file)
      // 转化为blob
      reader.readAsArrayBuffer(files)
      this.showCropper = true
    },
    // 上传图片
    uploadImg(file) {
      this.uploadFile = file
      this.$refs.fileUpload.submit()
    },
    // 关闭窗口
    closeDialog() {
      this.showCropper = false
      this.$refs.fileUpload.clearFiles()
    },
  },
}
</script>

<style lang="scss" scoped>
.UploadImg {
  .video-image {
    display: flex;
    figure {
      width: 100px;
      img {
        width: 100%;
        display: block;
      }
    }
  }
}
</style>