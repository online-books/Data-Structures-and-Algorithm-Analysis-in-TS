import Observer from './pub-sub/Observer';
import singleton from './singleton/Singleton';

describe('design-patterns', () => {
    test('pub-sub', () => {
        const observer = new Observer('test');
        const handler = jest.fn();
        const handler1 = jest.fn();
        const handler2 = jest.fn();
        const handler3 = jest.fn();
        observer.subscribe('test', handler);
        observer.subscribe('test.a', handler1);
        observer.subscribe('test.b', handler2);
        observer.subscribe('test.a.b', handler3);
        observer.publish('test.a', 'test data');
        observer.publish('test.b', 'test data');
        observer.publish('test.a.b', 'test data');
        expect(handler).toHaveBeenCalledTimes(3);
        expect(handler1).toHaveBeenCalledTimes(2);
        expect(handler2).toHaveBeenCalledTimes(1);
    });
    test('singleton', () => {
        const mySingleton1 = singleton.getInstance();
        const mySingleton2 = singleton.getInstance();
        expect(mySingleton1).toBe(mySingleton2);
    });
});
