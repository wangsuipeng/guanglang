<template>
  <div class="FileManage">
    <div class="buttonGroup">
      <el-button type="primary" icon="el-icon-plus">新建文件夹</el-button>
      <el-button type="primary" icon="el-icon-delete">删除文件夹</el-button>
      <el-button type="primary" icon="el-icon-upload">上传文件</el-button>
      <el-button type="primary" icon="el-icon-download">下载文件</el-button>
    </div>
    <div class="container">
      <template v-for="(item, index) in files">
        <div class="folder" :key="index">
          <div style="margin-top: 10px;">
            <i class="el-icon-folder"></i>
          </div>
          <div class="row">{{item.name}}</div>
          <div class="row">{{item.time}}</div>
          <div class="row">{{item.hour}}</div>
          <div class="footer">
            <i class="el-icon-view"></i>
            <i class="el-icon-edit"></i>
            <i class="el-icon-delete" style="color: red"></i>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
  export default {
    name: "FileManage",
    data: () => ({
      files: []
    }),
    mounted() {
      $http.post('/posts/files', {}).then(data => {
        if (data.code === 200) {
          this.files = data.data || [];
        }
      });
    }
  }
</script>

<style lang="scss" scoped>
  .FileManage {

    .buttonGroup {
      padding: 10px 0;
    }

    .container {
      overflow: hidden;
      padding: 20px 0 20px 20px;
      box-sizing: border-box;
      border: 1px solid #d7e0ee;
      border-radius: 4px;
      min-height: 700px;

      .folder {
        float: left;
        height: 170px;
        width: 120px;
        border: 1px solid #d7e0ee;
        margin-right: 30px;
        margin-bottom: 30px;
        text-align: center;
        color: #b4b4b4;
        font-size: 14px;
        border-radius: 5px;
        transition: all .3s;

        &:hover {
          color: #5bb8ff;
          border: 1px solid #5bb8ff;

          .footer {
            opacity: 1;
          }
        }

        i {
          font-size: 70px;
          cursor: pointer;
        }

        .row {
          width: 100%;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
          padding: 0 10px;
          box-sizing: border-box;
          height: 20px;
          cursor: default;
          line-height: 20px;
        }

        .footer {
          width: 100%;
          margin-top: 10px;
          text-align: center;
          height: calc(100% - 150px);
          transition: opacity 1s;
          opacity: 0;

          i {
            font-size: 12px;
            margin-right: 5px;
            cursor: pointer;
          }
        }
      }
    }

  }

</style>
