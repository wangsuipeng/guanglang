<template>
  <div class="maintain">
    <div class="buttonGroup">
      <el-button type="primary" icon="el-icon-plus">新增</el-button>
    </div>
    <div class="container">
      <template v-for="(item, index) in files">
        <div class="folder" :key="index">
          <div class="row">
            <div class="tit">{{item.name}}</div>
            <div class="state">{{item.state}}</div>
          </div>
          <div class="row">
            <span style="font-size: 14px">{{item.code}}</span>
          </div>
          <div class="row">
            <span style="font-size: 14px">时间：{{item.time}}</span>
          </div>
          <div class="row">
            <span style="font-size: 14px">备注：{{item.mark}}</span>
          </div>
          <div class="row">
            <span style="font-size: 14px">操作人：{{item.ment}}</span>
          </div>
          <div class="footer">
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
    name: "Maintain",
    data: () => ({
      files: []
    }),
    mounted() {
      $http.post('/posts/maintain', {}).then(data => {
        if (data.code === 200) {
          this.files = data.data || [];
        }
      });
    }
  }
</script>

<style lang="scss" scoped>
  .maintain {

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
        height: 180px;
        width: 280px;
        border: 1px solid #d7e0ee;
        margin-right: 30px;
        margin-bottom: 30px;
        text-align: left;
        padding: 20px;
        color: #b4b4b4;
        font-size: 14px;
        border-radius: 10px;
        transition: all .3s;
        box-sizing: border-box;

        &:hover {
          color: #5bb8ff;
          box-shadow: 5px 5px 10px #d9d9d9;

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
          padding: 2px 10px;
          box-sizing: border-box;
          cursor: default;
          line-height: 20px;

          .tit {
            font-size: 18px;
            float: left;
            width: calc(100% - 40px);
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }

          .state {
            font-size: 16px;
            float: right;
            color: #5edf6a;
            width: 40px;
            text-align: right;
          }

        }

        .footer {
          width: 100%;
          text-align: right;
          margin-top: 5px;
          padding: 0 10px;
          box-sizing: border-box;
          height: 20px;
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
