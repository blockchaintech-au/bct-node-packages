import { WebClient } from '@slack/client';
import Transport from 'winston-transport';

const token = process.env.SLACK_TOKEN;
const conversationId = process.env.CONVERSATION_ID;

class Slack {
  constructor() {
    this.web = new WebClient(token);
  }

  async sendMessage(msg) {
    return this.web.chat.postMessage({ channel: conversationId, text: msg });
  }
}

class SlackTransport extends Transport {
  constructor(opts) {
    const slackOpts = { ...opts };
    slackOpts.silent = opts.silent || !(token && conversationId);
    super(slackOpts);
    this.slack = new Slack();
  }

  log(info, callback) {
    this.slack.sendMessage(info)
      .then()
      .catch(err => console.error(err));
    callback();
  }
}

export default SlackTransport;
