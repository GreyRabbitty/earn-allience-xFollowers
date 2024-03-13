
import { Controller, Param, Post, Get, Body } from '@nestjs/common';

import { InjectLogger, Logger } from '@app/logging';
import {
  TASK_QUEUE_WALL_POST,
  TemporalClientService,
  WORKFLOW_WALL_POST_CREATED,
} from '@app/temporal';

// import { TwitterFollowerRawData } from '@app/database/entities/twitter-follower.entity';
// import { DatabaseService } from '@app/database';

@Controller('twitter-follower')
export class WallPostsController {
  constructor(
    @InjectLogger(WallPostsController.name)
    private readonly logger: Logger,
    private readonly temporalClientService: TemporalClientService,
    // private readonly databaseService: DatabaseService
  ) {}

  @Post(':wallPostId/created')
  async onWallPostCreated(
    @Param('wallPostId') wallPostId: string,
  ): Promise<string> {
    this.logger.info(`Wall post created: ${wallPostId}`);
    const workflowId = `create-wall-post-like-bot-${wallPostId}`;
    await this.temporalClientService.getOrStartWorkflow(
      WORKFLOW_WALL_POST_CREATED,
      {
        workflowId,
        taskQueue: TASK_QUEUE_WALL_POST,
        args: [wallPostId],
      },
    );

    return 'OK';
  }

  @Get(':id/followers')
  async getTwitterFollowers(@Param('id') id: string) {
    return this.temporalClientService.getFollowers(id);
  }

  @Get('test')
  async test(): Promise<string> {
    return 'OK';
  }
}
