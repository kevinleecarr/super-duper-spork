import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class OrgService {
  async createOrg(
    baseUrl: string,
    accessToken: string,
    name: string,
    subdomain: string,
  ) {
    const endpoint = baseUrl + '/api/v1/orgs';
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'SSWS ' + accessToken,
    };
    const data = {
      name: name,
      subdomain: subdomain,
      website: 'https://www.2022-10-18-t-0-8.com',
      editionId: 18,
      admin: {
        profile: {
          firstName: 'First',
          lastName: 'Last',
          email: 'kevin.l.carr+' + subdomain + '@okta.com',
          login: 'kevin.l.carr+' + subdomain + '@okta.com',
          mobilePhone: null,
        },
        credentials: {
          password: { value: '2^Ra4FrvERmdBvgY' },
          recovery_question: {
            question: 'generic banana question',
            answer: 'mySuperSecretAnswer222',
          },
        },
      },
    };

    try {
      return (await axios.post(endpoint, data, { headers })).data;
    } catch (error) {
      console.log(error);
    }
  }
}
