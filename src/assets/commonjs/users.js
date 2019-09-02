import Vue from 'vue'
import stote from '@/store'
import router from '@/router'

function out() {
  $axios({
    url: 'bjupm/users/quit',
    method: "post",
    data: {
      username: stote.getters.username
    }
  }).then(res => {
    if (res.code === 200) {
      clearStote();
      this.$message({type: 'success', message: '退出成功！'});
      router.push('/login');
    } else {
      clearStote();
      this.$message({type: 'error', message: '退出失败！'});
      router.push('/login');
    }
  }).catch(err => {
    clearStote();
    this.$message({type: 'error', message: err});
    router.push('/login');
  })
}

function clearStote(){
  stote.dispatch('token', '');
  stote.dispatch('username', '');
  stote.dispatch('nickname', '');
  stote.dispatch('sidebarData', '[]');
  stote.dispatch('currentProjectId', '');
  stote.dispatch('defaultActive', '');
}

Vue.prototype.outSystem = out;
