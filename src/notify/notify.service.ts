import { Injectable } from '@nestjs/common';
import { InjectSlack } from 'nestjs-slack-webhook';
import { IncomingWebhook, IncomingWebhookSendArguments } from '@slack/client';

@Injectable()
export class NotifyService {
  constructor(@InjectSlack() private readonly slack: IncomingWebhook) {}

  async notifyText(text: string) {
    const requestNotify: IncomingWebhookSendArguments = {
      text,
    };

    return await this.notify(requestNotify);
  }

  async notify(args: IncomingWebhookSendArguments) {
    return await this.slack.send(args);
  }
}
