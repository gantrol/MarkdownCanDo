// first version of this file copy from: https://github.com/vuejs/docs/blob/main/src/tutorial/tutorial.data.ts
// @ts-ignore
import path from 'path'
import { ExampleData } from '../utils/utils'
import tutorial_data_utils from '../utils/tutorial_data_utils'

export declare const data: Record<string, ExampleData>

export default {
    watch: './src/**',
    async load() {
        const src_path = path.resolve(__dirname, './src')
        return tutorial_data_utils(src_path)
    }
}
