import { post_picture, post } from "../http/axios"

export default {
    namespaced: true,
    state: {
        user: {}
    },
    mutations: {

    },
    actions: {
        async register(context, data) {
            //console.log(data);

            const formData = new FormData();
            formData.append('file', data.headPortrait);

            let response = await post_picture("/customer/uploadPicture", formData)
            console.log(response.data);
            let user = data.user;
            user.headPortrait = response.data;
            //console.log(data.user);

            response = await post("/customer", data.user)
            console.log(response);
            return response;
        }
    }
}
