import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AppService {
  async getOktaAccessToken() {
    const subdomain = 'hardtank';
    const domain = 'clouditude.com';
    const clientId = '0oa1vac98f7QR934F406';
    const privatekey = `-----BEGIN PRIVATE KEY-----
MIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDg+I+wewuIwMxe
MgCgVk1Oc3vkRmGDPG9fD00gbwLzW/VtKFsrfkycixMaqXalq/kDywTe3+jBf4j0
pKy9/kq9K0lXY/2IfBxvXIHYKpzYQbhREEzUr3PIEv8ZXhRuQglbnfBWIDYMZvj9
thqYT5Vb8088vd4KeQWqPSX6dWsAg3FTf4UcC8cXfOOwyt94QcHGLeAZR5JfVznM
QNJXxQhTYo+1q76eo953DliGTcqoowNfLBwsxHfO+tRqpFSDY6Lnue4Y7yYxWrjy
7mNzem4/szfbEC/T7LzJ76dtOau5IQHPZEOoQ+hj/oTTzT8pVRR0mit7L5yTDWUe
Plwv+ECZAgMBAAECggEAAcD7pnRQcsnlU07//BVYJ8ZU3wLLyVEMDDlrZZc/9mOP
OQE2yWgZaEyu7YcIhAJLIBlcfxv57aI/0CpwJ1CyG/dDAdxSHRbcm436JtQu4gJh
0bihugm+dRRC1VuLUhBlOsfd2F9gFH4sBEGqbj62lcotN2EX4qHZZl+bf3BGu9ux
Y66BzfCvdJhwlg+txCbrhPjNX0Nu1Qm0fGrtQ6PFouRQ63R+Fku95WB40+Ow8kes
psoczS1sniDMvHVjcai3ok2WGRM/n9La2UC1htxc3lM2woco1dqYaXRIedjL4poR
3NJtDAF1xayoweiVEJPtBdLc+fIhepufHn+wGs9CxQKBgQD+czqGLaTPXWrzq/3U
+r/AMV9C4SCWSeujvR+QyojHRy/qkBXC8Fo5CdLqU6FmyOhfYY8rmV5uhyeaRVjQ
fs9B3CrlkIvOl4xx3I4u9S++UJi5guKMEe9Uj2RxHLgMRV0E5ThmOrWCDMuX2ogV
vo+KgPrKv2hDnEUGCbBuDx7f5QKBgQDiV11t8UnVTiTjCE0F5gLGuBiOknuIT8Zu
34f3PHaH8vW8RLzAnrcdfxX/veq6p8Iw2TIVt7zSg3Ns9RbJRAIW9ic8+spLKdRJ
n02mqIUHhoH2L3c9HgLJHgLKsD1HZm0ydQd6gLfj6gCPvhmf68yg6skw+luIMdDR
Qv/JN9cKpQKBgFMTIfdu7ZE6adHWxJAFshc4x2ZZhD8tMT8LX0PxrEiLyGwn0MMN
oBdhSrhwx5B8ZcnGW20brMYfYGGw5Hdl/5r8HBFJaSvxNMxz+wP/zy+utr5Sqk6b
CG2uR1fazYhMGTug7xIJdvtX3BzfH3Eh/1F0HO2XIp54Zdy7yxuT2ju1AoGAVfmV
lbN3tjyOqmZ2y2zJVS6MtWtS3T5gQ7FI9lLTO2TAjxkVEZ24NM4XTyOWy/v5OZDn
A3TdlqEz8QlP9HeOy6YI1ZL10IM9DhIi7tFIZsljCF6TTnXd3QM3UEKNpFd11xq5
EoFeWIaEXBV7qlFpUx6b+ay/pAY4KaTngEljt7kCgYBTNK5y5lvzg/aIGYs6wtsk
MOQxnVP/+DNpy4VEuc8vdLSuW4A/7McSm89gIJAoVQHFk061rbcgQJ5F58GOSIr9
EXKoFlqIGf49cCnRfzoVFb1GsNscbE/2ETr0Gk07oFzkQgPZEJHV1qMv/jAgl3Ho
91IoBp2tkCfftYxTaDCDvQ==
-----END PRIVATE KEY-----
`;

    const now = Math.floor(Date.now() / 1000);
    const payload = {
      jti: uuidv4(),
      aud: `https://${subdomain}.${domain}/oauth2/v1/token`,
      iss: clientId,
      sub: clientId,
      iat: now,
      exp: now + 3600,
    };

    const assertion = jwt.sign(payload, privatekey, { algorithm: 'RS256' });

    const endpoint = 'https://' + subdomain + '.' + domain + '/oauth2/v1/token';
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
    };
    const data = {
      grant_type: 'client_credentials',
      scope: 'okta.accounts.manage okta.accounts.read',
      client_assertion_type:
        'urn:ietf:params:oauth:client-assertion-type:jwt-bearer',
      client_assertion: assertion,
    };

    const res = await axios.post(endpoint, data, { headers });
    return res.data.access_token;
  }
}
