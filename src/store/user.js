
import { get, post_json, post_array, post, post_picture } from '../http/axios'
import { baseURL } from '../http/axios'

export default {
  namespaced: true,
  state: {
    userinfo: {},
    Authorization: localStorage.getItem('Authorization') ? localStorage.getItem('Authorization') : ''
  },
  mutations: {
    refreshUser(state, userinfo) {
      state.userinfo = userinfo;
    },
    setToken(state,data){
      state.Authorization = user.Authorization;
      localStorage.setItem('Authorization', user.Authorization);
    }
  },
  actions: {
    async login({ dispatch }, data) {
      let result = await post_array("/authentication/loginCustomer", data);
      let token = result.data.token;
      dispatch("getUserInfo", token);
    },
    async getUserInfo({ commit, dispatch }, token) {
      let result = await post_array("/authentication/infoCustomer", { token });
      result.data.headPortrait = baseURL + "/image/" + result.data.headPortrait;
      commit("refreshUser", result.data);
    },
    async updateUserInfo(context, data) {
      console.log(data);
      let path = data.headPortrait;
      let result = path.split("/").pop();
      data.headPortrait = result;
      let res = await post("/customer", data);
      return res;
    },
    async updateHeadPortrait(context, data) {
      //console.log(data);
      data.originalName = data.originalName.split("/").pop();

      const formData = new FormData();
      formData.append('file', data.headPortrait);
      // console.log(formData);
      // console.log(formData.get("file"));

      post_picture("/customer/updatePicture", formData, { originalName: data.originalName })
        .then(function (response) {
          console.log(response);
          //console.log(data.userinfo);
          data.userinfo.headPortrait = response.data;
          post("/customer", data.userinfo)
          .then(function (response) {
            console.log(response);
            data.userinfo.headPortrait = baseURL + "/image/" + data.userinfo.headPortrait;
          });
        });
    }
  }
}