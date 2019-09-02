const Mock = require('mockjs'); // 获取mock对象
const Random = Mock.Random; //获取random对象，随机生成各种数据
const domain = 'http://mockjs.com/api'; // 定义默认域名，随便写
const code = 200; //返回的状态码


// 随机生成文章数据
const postData = req => {

  console.log(req); // 请求体，用于获取参数

  let posts = []; // 用于存放文章数据的数组

  for (let i = 0; i < 10; i++) {
    let post = {
      title: Random.csentence(10, 25), // 随机生成长度为10-25的标题
      icon: Random.dataImage('250x250', '文章icon'), // 随机生成大小为250x250的图片链接
      author: Random.cname(), // 随机生成名字
      date: Random.date() + ' ' + Random.time() // 随机生成年月日 + 时间
    };

    posts.push(post)
  }

  // 返回状态码和文章数据posts
  return {
    code,
    posts
  }
};

// 定义请求链接，类型，还有返回数据
Mock.mock(`${domain}/posts`, 'get', postData);

// 随机生成文章数据
const maintainData = req => {

  let data = []; // 用于存放文章数据的数组
  for (let i = 0; i < Math.ceil(Math.random() * 40); i++) {
    let post = {
      name: Random.name(),
      code: Math.random() * 22222222222222222222 + 10000000000000000000, // 随机生成大小为250x250的图片链接
      time: Random.date(),
      mark: Random.csentence(10, 25),
      ment: Random.cname(),
      state: '保养'
    };

    data.push(post)
  }

  // 返回状态码和文章数据posts
  return {
    code,
    data
  }
};

Mock.mock(`${domain}/posts/maintain`, 'post', maintainData);

// 随机生成文章数据
const repairData = req => {

  let data = []; // 用于存放文章数据的数组
  for (let i = 0; i < Math.ceil(Math.random() * 40); i++) {
    let post = {
      name: Random.name(),
      code: Math.random() * 22222222222222222222 + 10000000000000000000, // 随机生成大小为250x250的图片链接
      time: Random.date(),
      mark: Random.csentence(10, 25),
      ment: Random.cname(),
      state: '维修'
    };

    data.push(post)
  }

  // 返回状态码和文章数据posts
  return {
    code,
    data
  }
};

Mock.mock(`${domain}/posts/repair`, 'post', repairData);


// 随机生成文章数据
const replaceData = req => {

  let data = []; // 用于存放文章数据的数组
  for (let i = 0; i < Math.ceil(Math.random() * 40); i++) {
    let post = {
      name: Random.name(),
      code: Math.random() * 22222222222222222222 + 10000000000000000000, // 随机生成大小为250x250的图片链接
      time: Random.date(),
      mark: Random.csentence(10, 25),
      ment: Random.cname(),
      state: '更换'
    };

    data.push(post)
  }

  // 返回状态码和文章数据posts
  return {
    code,
    data
  }
};

Mock.mock(`${domain}/posts/replace`, 'post', replaceData);


// 随机生成文章数据
const fileData = req => {

  let data = []; // 用于存放文章数据的数组
  for (let i = 0; i < Math.ceil(Math.random() * 40); i++) {
    let post = {
      name: Random.name(), // 随机生成长度为10-25的标题
      time: Random.date(),
      hour: Random.time(),
    };

    data.push(post)
  }

  // 返回状态码和文章数据posts
  return {
    code,
    data
  }
};

Mock.mock(`${domain}/posts/files`, 'post', fileData);
