import fs from 'fs-extra'
import { execSync } from 'child_process'

run()
function run() {
    try {
        // 创建临时发布目录
        fs.mkdirSync('temp', { recursive: true })

        // 拷贝打包输出文件
        fs.copySync('dist', 'temp/dist')

        // 拷贝相关发布文件
        fs.copyFileSync('README.md', 'temp/README.md')
        fs.copyFileSync('LICENSE', 'temp/LICENSE')

        // 构造发布 package.json
        const raw_json       = fs.readJSONSync('package.json')
        const overwrite_json = fs.readJSONSync('package.overwrite.json')
        const json = { ...raw_json, ...overwrite_json }
        delete json['scripts']
        fs.writeJsonSync('temp/package.json', json, { spaces: 4 })

        execSync('cd ./temp')
        execSync('pnpm publish --no-git-checks')

        fs.removeSync('temp')
    } catch(e) {
        console.error(e)
    }
}
