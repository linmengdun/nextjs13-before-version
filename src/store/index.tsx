import IndexStore from "./index"
import PayStore from "./pay"

const stores: any = {
    index: new IndexStore(),
    pay: new PayStore()
}
/// 默认导出接口
export default stores