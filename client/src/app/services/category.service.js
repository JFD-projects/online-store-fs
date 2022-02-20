import httpService from "./http.service";

const categoriesEndpoint = "categories/";

const categoriesService = {
    get: async () => {
        const req = await httpService.get(categoriesEndpoint);
        return req.data;
    }
};
export default categoriesService;
