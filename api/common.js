import { request } from '../api/request';
import { data } from '../api/data'


//  export function getShopList() {
//     return request({
//       url: `http://localhost:3000/`, //开发者后端url使用者可自行替换
//     });
//   }

//   export function getOrderList() {
//     return request({
//       url: `http://localhost:3000/`, //开发者后端url使用者可自行替换
//     });
//   }
//以下为模拟
 export function getShopList() {
    // return request({
    //       url: `http://localhost:8080/jobHunter/hello`, //开发者后端url使用者可自行替换
    //     });
    return data
  }

  export function getOrderList() {
    return data
  }

  export function getCity() {
    return data
  }

  export function getProvince() {
    return data
  }

  export function getCustomResume() {
    return data.customResume
  }

  export function getCustomJoinLog() {
    return data
  }