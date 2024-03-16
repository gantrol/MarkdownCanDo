// @ts-ignore
import path from 'path'
import {readExamples} from "../utils/examples_data_utils";
import { ExampleData } from '../utils/utils'

export declare const data: Record<string, ExampleData>

export { ExampleData }

export default {
  watch: 'src/**',
  load() {
    const srcDir = path.resolve(__dirname, './src')
    return readExamples(srcDir)
  }
}
