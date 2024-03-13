import { Injectable } from '@nestjs/common';
import {
  Connection,
  Workflow,
  WorkflowClient,
  WorkflowHandle,
  WorkflowStartOptions,
} from '@temporalio/client';
import { WorkflowExecutionAlreadyStartedError } from '@temporalio/workflow';
import axios from 'axios';

import { API_KEY } from 'apps/hasura-webhooks/src/config/apiKey';

import { ConfigService } from '@app/config';

@Injectable()
export class TemporalClientService {
  private workflowClient: WorkflowClient;

  constructor(private readonly configService: ConfigService) {}

  async getTemporalClient(): Promise<WorkflowClient> {
    if (this.workflowClient) return this.workflowClient;
    const host = this.configService.get('temporal.host');
    const port = this.configService.get('temporal.port');
    const connection = await Connection.connect({
      address: `${host}:${port}`,
    });
    this.workflowClient = new WorkflowClient({ connection });
    return this.workflowClient;
  }

  async startWorkflow(
    workflow: string,
    options: WorkflowStartOptions,
  ): Promise<WorkflowHandle> {
    const client = await this.getTemporalClient();
    return client.start(workflow, options);
  }

  /**
   * Start a new workflow or returning existing already running workflow handle
   * @param workflow
   * @param options
   */
  async getOrStartWorkflow(
    workflow: string,
    options: WorkflowStartOptions,
  ): Promise<WorkflowHandle> {
    const client = await this.getTemporalClient();

    try {
      return await this.startWorkflow(workflow, options);
    } catch (e) {
      if (!(e instanceof WorkflowExecutionAlreadyStartedError)) {
        throw e;
      }
      return client.getHandle(options.workflowId);
    }
  }

  async executeWorkflow<T extends Workflow>(
    workflow: string,
    options: WorkflowStartOptions<T>,
  ) {
    const client = await this.getTemporalClient();
    return client.execute<T>(workflow, options);
  }

  /**
   * Start to retired the following accounts info
   * @param id
   */
  async getFollowerAccounts(
    id: string,
  ) {

    try {
      return await this.getFollowerAccountHandler(id);
    } catch (e) {
      console.log(e);
      return 'error'
    }
  }

  async getFollowerAccountHandler(id: string): Promise<any> {
    const options = {
      method: 'GET',
      url: 'https://twitter154.p.rapidapi.com/user/followers',
      params: {
        user_id: id,
        limit: '100'
      },
      headers: {
        'X-RapidAPI-Key': API_KEY,
        'X-RapidAPI-Host': 'twitter154.p.rapidapi.com'
      }
    };
    
    try {
      const response = await axios.request(options);
      console.log(response.data);
      return response.data
    } catch (error) {
      console.error(error);
      return error;
    }
  }

  async getFollowerCount(id: string): Promise<any> {
    const axios = require('axios');

    const options = {
      method: 'GET',
      url: 'https://twitter135.p.rapidapi.com/v1.1/Users/',
      params: { ids: id },
      headers: {
        'X-RapidAPI-Key': API_KEY,
        'X-RapidAPI-Host': 'twitter135.p.rapidapi.com'
      }
    };

    try {
      const response = await axios.request(options);
      console.log(response.data);
      return response.data[0].followers_count
    } catch (error) {
      console.error(error);
    }
  }

  async getUserDate(id: string): Promise<any> {
    const axios = require('axios');

    const options = {
      method: 'GET',
      url: 'https://twitter135.p.rapidapi.com/v1.1/Users/',
      params: { ids: id },
      headers: {
        'X-RapidAPI-Key': API_KEY,
        'X-RapidAPI-Host': 'twitter135.p.rapidapi.com'
      }
    };

    try {
      const response = await axios.request(options);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  async getFollowers(id: string): Promise<any> {
    const delay = (ms: any) => new Promise((res) => setTimeout(res, ms));

    // Get the follower count
    const count = await this.getFollowerCount(id);
    console.log('count ==> ', count)
    await delay(1500);

    let flag = false;
    let followerIdList = [];
    let nextCurse = '';

    // get the followerIdList
    while (flag == false) {
      await delay(500);
      const axios = require('axios');

      const options = nextCurse == '' ?
        {
          method: 'GET',
          url: 'https://twitter135.p.rapidapi.com/v1.1/FollowersIds/',
          params: {
            id: id,
            count: '5000'
          },
          headers: {
            'X-RapidAPI-Key': API_KEY,
            'X-RapidAPI-Host': 'twitter135.p.rapidapi.com'
          }
        }
        :
        {
          method: 'GET',
          url: 'https://twitter135.p.rapidapi.com/v1.1/FollowersIds/',
          params: {
            id: id,
            count: '5000',
            cursor: nextCurse
          },
          headers: {
            'X-RapidAPI-Key': API_KEY,
            'X-RapidAPI-Host': 'twitter135.p.rapidapi.com'
          }
        };

      const response = await axios.request(options);

      followerIdList = followerIdList.concat(response.data.ids);
      nextCurse = response.data.next_cursor_str;

      if (nextCurse == "0") flag = true;
    }

    const testArr = [
      "1767460581424979968", "1767462065151840256", "1767461399528194048", "1734809790411620353", "1767461936461914112", "1767462030997655552", "1767364414477377536", "1767461370751053825"
    ]

    let newFollowers = followerIdList.filter(x => !testArr.includes(x));
    let unfollowers = testArr.filter(x => !followerIdList.includes(x));
    let unfollwersDetails = await this.getUserDate(unfollowers.toString());
    delay(500);
    let newFollwersDetails = await this.getUserDate(newFollowers.toString());

    return {
      unfollowers,
      newFollowers,
      unfollwersDetails,
      newFollwersDetails
    };
  }
}
