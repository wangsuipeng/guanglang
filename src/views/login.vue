<template>
  <div class="context">
    <div class="bg-container"></div>
    <div class="bg-color">
      <div class="login-container">
        <div class="top">
          <div class="title">管廊智能管理平台</div>
          <div class="explain">
            <i class="el-icon-lock"></i>
            用户验证
          </div>
          <el-form ref="form" :model="form">
            <div class="label">
              用户名
            </div>
            <el-form-item>
              <el-input v-model="form.username"></el-input>
            </el-form-item>
            <div class="label">
              密　码
            </div>
            <el-form-item>
              <el-input v-model="form.password" type="password"></el-input>
            </el-form-item>
            <el-form-item>
              <el-checkbox-group v-model="form.remember">
                <el-checkbox label="记住我的登录" name="remember"></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-button type="primary" @click="signIn">登录</el-button>
            <div class="help">
              <i class="el-icon-question"></i>
              无法登录账号
            </div>
          </el-form>
        </div>
        <div class="flex">
          <div class="flex-item">
            <div class="row1">基于BIM的管廊管理平台</div>
            <div class="row2">@2018</div>
          </div>
          <div class="flex-item">
            <img src="../assets/images/QRcode.png" alt="">
            <div class="row-context">
              <div class="row1">
                扫二维码
              </div>
              <div class="row2">
                移动端下载
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data: () => ({
      form: {
        username: '',
        password: '',
        remember: []
      }
    }),
    methods: {
      signIn() {
        this.$router.push({path: '/part/home', name: 'Home'});
      }
    }
  }

</script>

<style lang="scss" scoped>
  $fc: #575757; // 文字
  $bc: #e1e1e1; // 边线

  .context {
    height: 100vh;
    width: 100vw;

    .bg-container {
      width: calc(100vw - 600px);
      height: 100%;
      float: left;
      background: url("../assets/images/back.jpg");
      background-size: cover;
    }

    .bg-color {
      background: #000;
      height: 100%;

      .login-container {
        width: 600px;
        height: 100%;
        float: left;
        background: #fff;
        border-radius: 4px;
        box-shadow: inset 0 0 3px #9c9c9c;
        padding: 20px 35px;
        box-sizing: border-box;
        color: $fc;

        .top {
          height: calc(100vh - 88px);

          .title {
            font-size: 18px;
            padding: 40px 0;
          }

          .explain {
            padding: 10px 0;
            font-size: 20px;
            margin-bottom: 20px;
            border-bottom: .5px solid $bc;
          }

          .label {
            padding: 5px 0;
          }

          .help {
            font-size: 14px;
            color: #0098ff;
            padding: 30px 0;
            cursor: pointer;

            i {
              font-size: 16px;
            }
          }
        }

        .flex {
          display: flex;
          height: 48px;
          font-size: 12px;

          .row1 {
            padding: 4px 0;
          }

          .row2 {
            padding: 4px 0;
            color: #0098ff;
          }

          .flex-item {
            flex: 1;

            img {
              height: 100%;
              float: left;
            }

            .row-context {
              float: left;
              margin-left: 20px;

              .row1 {
                padding: 4px 0;
              }

              .row2 {
                padding: 4px 0;
                color: #0098ff;
                cursor: pointer;
              }
            }
          }
        }
      }
    }


  }

</style>
