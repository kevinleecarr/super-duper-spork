import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class AccountService {
  async linkOrg(baseUrl: string, accessToken: string, orgId: string) {
    const endpoint = baseUrl + '/api/v1/orgs';
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + accessToken,
    };
    const data = {
      orgId: orgId,
    };

    try {
      const response = await axios.post(endpoint, data, { headers });
      return response.data;
    } catch (error) {
      console.log(error.response.data.errorCauses[0]);
    }
  }

  async updateSkus(
    baseUrl: string,
    accessToken: string,
    linkedProductId: string,
    skus: { id: string }[],
  ) {
    const endpoint =
      baseUrl + '/api/v1/linked-products/' + linkedProductId + '/skus';
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + accessToken,
    };

    try {
      const response = await axios.put(endpoint, skus, { headers });
      return response.data;
    } catch (error) {
      console.log(error.response.data.errorCauses[0]);
    }
  }

  async getEntitledSkus(baseUrl: string, accessToken: string) {
    const endpoint = baseUrl + '/api/v1/skus';
    const headers = {
      Accept: 'application/json',
      Authorization: 'Bearer ' + accessToken,
    };

    try {
      const response = await axios.get(endpoint, { headers });
      return response.data?.data ? response.data.data : response.data;
    } catch (error) {
      console.log(error.response.data.errorCauses[0]);
    }
  }
}
