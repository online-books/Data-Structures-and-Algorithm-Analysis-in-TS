export type IHandler = (data: any) => void;

export default class Topic {
    private handlers: IHandler[];
    private subTopics: { [propName: string]: Topic };
    constructor(public name: string) {
        this.name = name;
        this.subTopics = {};
        this.handlers = [];
    }
    public addSubTopic(this: Topic, topicName: string): Topic {
        const topic = new Topic(topicName);
        this.subTopics[topicName] = topic;
        return topic;
    }
    public getSubTopic(topicName: string): Topic | null {
        return this.subTopics[topicName] || null;
    }
    public getHandlers() {
        return this.handlers;
    }
    public addHandler(handler: IHandler): void {
        this.handlers.push(handler);
    }
    public removeHandler(handler?: IHandler): void {
        if (!handler) {
            this.handlers.length = 0;
            return;
        }
        const {
            length
        } = this.handlers;
        for (let i = 0; i < length; i++) {
            if (this.handlers[i] === handler) {
                this.handlers.splice(i, 1);
                return;
            }
        }
    }
    public notify(data: any) {
        this.handlers.forEach(handler => handler(data));
    }
}