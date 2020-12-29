
export type StreamInfo = {
  kind: String,
  etag: String,
  id: {
    kind: String,
    videoId: String
  },
  snippet: {
    publishedAt: String,
    channelId: String,
    title: String,
    description: String,
    thumbnails: {
      default: Object,
      medium: Object,
      high: Object
    },
    channelTitle: String,
    liveBroadcastContent: String,
    publishTime: String
  }
}


export class Interval {
  private value = 6000;

  public getInterval() {
    return this.value;
  }

  public setInterval(val: number) {
    this.value = this.translateUnits(val);
  }

  private translateUnits(val: number) {
    return val * 1000;
  }

  constructor(val?: number) {
    this.value = this.translateUnits(val);
  }
}
