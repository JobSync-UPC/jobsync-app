import axios from "axios";
import {jobPostsBaseUrl} from "../../apiConfig.js";

const http = axios.create({
    baseURL: jobPostsBaseUrl
});

export class JobPostApiService {
    createJobPost (companyId,recruiterId,data) {
        return http.post(`/`,companyId,recruiterId, {
            data.title,
            data.description
        })


    }
}