// @ts-ignore
import path from 'path'
import {readExamples} from "../utils/examples_data_utils";
import type { ExampleData } from '../utils/utils'

export declare const data: Record<string, ExampleData>

export type { ExampleData }

export default {
  watch: 'src/**',
  load() {
    const srcDir = path.resolve(__dirname, './src')
    return readExamples(srcDir)
  }
}
