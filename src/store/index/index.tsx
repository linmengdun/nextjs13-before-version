import { observable, makeObservable } from "mobx";

class IndexStore {
    constructor() {
        // makeObservable 在mobx6 版本之后 必添加项
        makeObservable(this);
    }
    // 全局基础信息
    @observable test: string = ''

}
export default IndexStore;