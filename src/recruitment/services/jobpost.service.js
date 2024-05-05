import axios from "axios";
import {jobPostsBaseUrl} from "../../apiConfig.js";

const http = axios.create({
    baseURL: jobPostsBaseUrl
});

export class JobPostApiService {
    createJobPost (companyId, recruiterId, jobPostData) {
        return http.post(`/?companyId=${companyId}&recruiterId=${recruiterId}`, {
            title: jobPostData.title,
            description: jobPostData.description,
        })
    }
}