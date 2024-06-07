import axios from "axios";
import {jobPostsBaseUrl, recruitmentProcessesBaseUrl} from "../../apiConfig.js";

const http = axios.create({
  baseURL: recruitmentProcessesBaseUrl
});


export class RecruitmentApiService {
  getRecruitmentProcessesByCompanyId(companyId) {
    return http.get(`/company/${companyId}`);
  }
  isRecruitmentProcessFromCompany(recruitmentProcessId, companyId) {
    return http.get(`/is-from-company?recruitmentProcessId=${recruitmentProcessId}&companyId=${companyId}`);
  };
  getRecruitmentProcessById(recruitmentProcessId) {
    return http.get(`/${recruitmentProcessId}`);
  }
  updateEnabledRecruitmentProcess(recruitmentProcessId) {
    return http.put(`/update-enabled/${recruitmentProcessId}`);
  }
}