import request from '@/utils/request'
import to from '@/utils/to'

/* const headerInfo = (info) => {
    return {
        clientInfo: JSON.stringify({ runEnv, clientId }),
        ...info
    }
} */

// 基础接口
export const initData = async () => {
    return await to(request.post('init', {
        headers: {},
        data: {}
    }))
}