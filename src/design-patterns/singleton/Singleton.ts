export class Singleton {
    private name: 'singleton';
    public getName() {
        return this.name;
    }
}

const singleTon = (() => {
    let instance: null | Singleton = null;
    return {
        getInstance() {
            if (!instance) {
                instance = new Singleton();
            }
            return instance;
        }
    }
})();

export default singleTon;