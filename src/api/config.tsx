/*
 * 
 与环境有关的配置项
 */

const IS_PRODUCTION = process.env.NODE_ENV == 'production'

let configs: any = {
    beta: {     // 测试环境 and 开发环境
        apiHost: {
            act: "https://test-api-gact.23you.net/api/act/sd-4zn/",
        },
    },
    prod: {     // 生产环境
        apiHost: {
            act: "https://api-game-activity.23you.net/api/act/sd-4zn/",
        },
    }
}

let cgisConfig: any = {
    init: 'act|init'
}

export default {
    ...configs[IS_PRODUCTION ? 'prod' : 'beta'],
    cgis: cgisConfig,
}