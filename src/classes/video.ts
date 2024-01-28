export default class Video {
    SenderId: string;
    VideoUrl: string;
    VideoDesc: string;

    constructor(SenderId: string, VideoUrl: string, VideoDesc: string) {
        this.SenderId = SenderId;
        this.VideoUrl = VideoUrl;
        this.VideoDesc = VideoDesc;
    }

    // Método de fábrica para crear una instancia desde un objeto
    static createFromObject(obj: { SenderId: string, VideoUrl: string, VideoDesc: string }): Video {
        return new Video(obj.SenderId, obj.VideoUrl, obj.VideoDesc);
    }
}