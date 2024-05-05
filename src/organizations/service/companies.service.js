import axios from "axios";
import {companiesBaseUrl} from "../../apiConfig.js";

const http = axios.create({
    baseURL: companiesBaseUrl
});

export class CompaniesService {
    getCompanyById(id) {
        return http.get(`/${id}`);
    }

    getAllCompanies() {
        return http.get(`/`);
    }

    updateCompanyById (id) {
        return http.put(`/update/${id}`);
    }

    addRecruitersToCompany (companyId,recruiterId) {
        return http.put(`${companyId}/add/recruiters/${recruiterId}`);
    }

    createCompany (companyData,recruiterId) {
        console.log(companyData.name);
        return http.post(`/create/${recruiterId}`, {
            name: companyData.name,
            description: companyData.description,
            country: companyData.country,
            address: companyData.address,
            logoUrl: companyData.logoUrl,
            website: companyData.website,
            industry: companyData.industry,
        });
    }
}