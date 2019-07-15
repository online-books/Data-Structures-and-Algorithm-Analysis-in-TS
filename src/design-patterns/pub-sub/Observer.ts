import Topic, {
    IHandler,
} from './Topic';

export default class Observer {
    private rootTopic: Topic
    constructor(topicName: string) {
        this.rootTopic = new Topic(topicName);
    }
    /**
     * 消息发布
     * @param topicName 
     * @param data 
     */
    public publish(topicName: string, data: any): void {
        const topicArr = topicName.split('.');
        const {
            length,
        } = topicArr;
        let subTopic: Topic | null = this.rootTopic;
        let subTopicName = '';
        for (let i = 0; i < length; i++) {
            if (!subTopic) {
                return;
            }
            if (i === 0) {
                subTopicName = topicArr[0]
            } else {
                subTopicName = subTopicName + '.' + topicArr[i];
                subTopic = subTopic.getSubTopic(subTopicName);
            }
            (subTopic as Topic).getHandlers().forEach(handler => handler(data));
        }
    }
    /**
     * 订阅
     * @param topicName 订阅的频道名称
     * @param handler 该频道有消息通知时触发的回调函数
     */
    public subscribe(topicName: string, handler: IHandler) {
        const topic = this.getTopic(topicName, true);
        if (topic) {
            topic.addHandler(handler);
        }
    }
    /**
     * 取消订阅
     * @param topicName  取消订阅的频道名称
     * @param handler 取消订阅频道的回调函数,若无，则清空该频道下的回调函数
     */
    public unSubscribe(topicName: string, handler?: IHandler) {
        const topic = this.getTopic(topicName);
        if (topic) {
            topic.removeHandler(handler);
        }
    }
    /**
     * 
     * @param topicName 频道名称
     * @param produce 若频道不存在，是否创建，默认false
     */
    private getTopic(topicName: string, produce = false): Topic | null {
        const subTopicNames = topicName.split('.');
        const {
            length,
        } = subTopicNames;
        let topic = this.rootTopic;
        if (length === 1) {
            if (topic.name === topicName) {
                return topic;
            }
            return null
        }
        let subTopicName = topic.name;
        for (let i = 1; i < length; i++) {
            subTopicName = subTopicName + '.' + subTopicNames[i];
            const subTopic = topic.getSubTopic(subTopicName);
            if (!subTopic) {
                if (!produce) {
                    return null;
                }
                topic = topic.addSubTopic(subTopicName);
            } else {
                topic = subTopic;
            }
        }
        return topic;
    }
}