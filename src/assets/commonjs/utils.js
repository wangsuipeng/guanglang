import Vue from 'vue'
import moment from 'moment'

Vue.filter('datrfmt', function (input, fmtstring) {
  //当input为时间戳时，需转为Number类型
  // 使用momentjs这个日期格式化类库实现日期的格式化功能
  return moment(input).format(fmtstring);
});

Vue.prototype.$moment = function (value, format) {
  if(value){
    return moment(parseInt(value)).format(format || 'YYYY-MM-DD')
  }else{
    return '';
  }
};
