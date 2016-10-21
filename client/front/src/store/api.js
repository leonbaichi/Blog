/* eslint-disable */
import { EventEmitter } from 'events'

import request from 'superagent'

const host = typeof location === 'undefined' ? 'http://localhost:8080' : '';

const prefix = `${host}/proxyPrefix/api`;

const blogAPI = `${host}/proxyPrefix/api/post`;

const tagAPI = `${host}/proxyPrefix/api/tag`;

const categoryAPI = `${host}/proxyPrefix/api/category`;

const postTagAPI = `${host}/proxyPrefix/api/postTag`;

const postCateAPI = `${host}/proxyPrefix/api/postCategory`;

const aboutAPI = `${host}/proxyPrefix/api/post?title=关于`

const store = new EventEmitter()

const perPage = 10;

export default store

function isObject(obj){
  return Object.prototype.toString.call(obj).slice(8, -1) === 'Object';
}

function convertObjectToArray(args){
  return isObject(args) ? Object.keys(args).map((value,index)=>{
      let temp = {};
      temp[value] = args[value];
      return temp;
  }) : [];
}

store.fetchOption = () => {
  return request.get(`${prefix}/option`)
    .then((response) => {
      return response.body;
    }, (err) => {
      console.log(err)
    })
}

store.fetchPostByID = (id, conditions, args) => {
  args = convertObjectToArray(args);
  return args.reduce((prev, curr)=>{
    prev = prev.query(curr);
    return prev;
  }, request.get(`${blogAPI}/${id}?conditions=${JSON.stringify(conditions)}`))
  .then((response) => {
    return response.body;
  }, (err) => {
    console.log(err)
  })
}

store.fetchPost = (conditions, args) =>{
  args = convertObjectToArray(args);
  return args.reduce((prev, curr)=>{
    prev = prev.query(curr);
    return prev;
  }, request.get(`${blogAPI}/?conditions=${JSON.stringify(conditions)}`))
  .then((response) => {
    return response.body;
  }, (err) => {
    console.log(err)
  })
}

store.fetchTags = () => {
  return request.get(tagAPI).then((response) => {
    return response.body;
  }, (err) => {
    console.log(err)
  })
}


store.fetchPostTags = () => {
  return request.get(postTagAPI).then((response) => {
    return response.body;
  }, (err) => {
    console.log(err)
  })
}

// store.fetchTagsByPostID = (queryJSON) => {
//   let keys = Object.keys(queryJSON);
//   let values = Object.keys(queryJSON).map(value=>queryJSON[value]);
//   return vue.resource(postTagAPI+'{?keys,values}').get({
//       keys,
//       values,
//   }).then((response) => {
//     return response.body;
//   }, (err) => {
//     console.log(err)
//   })
// }




// store.fetchCatesByPostID = (queryJSON) => {
//   let keys = Object.keys(queryJSON);
//   let values = Object.keys(queryJSON).map(value=>queryJSON[value]);
//   return vue.resource(postCateAPI+'{?keys,values}').get({
//       keys,
//       values,
//   }).then((response) => {
//     return response.body;
//   }, (err) => {
//     console.log(err)
//   })
// }


// store.fetchCates = () => {
//   return vue.http.get(categoryAPI).then((response) => {
//     return response.body;
//   }, (err) => {
//     console.log(err)
//   })
// }


