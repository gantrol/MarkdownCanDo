// first version of this file copy from: https://github.com/vuejs/docs/blob/main/src/tutorial/tutorial.data.ts
// @ts-ignore
import {createMarkdownRenderer} from "vitepress";
import {readExamples} from "./examples_data_utils";
import markdown_it_footnote from "markdown-it-footnote";
import markdown_it_task_list from "markdown-it-task-checkbox";

export const DESC_MD = 'description.md';
export const TEMPLATE_MD = 'template.md';
export const HINT_DIR = '_hint';
export const APP_DIR = "App";

export default async (src_path: string) => {
    const md = await createMarkdownRenderer(process.cwd(), {
        theme: 'github-dark' ,
        math: true,
        config: (md) => {
            md.use(markdown_it_footnote)
            md.use(markdown_it_task_list)
        }
    }, '/')
    const files = readExamples(src_path)
    for (const step in files) {
        const stepFiles = files[step]
        const desc = stepFiles[DESC_MD] as string
        if (desc) {
            stepFiles[DESC_MD] = md.render(desc)
        }
        const hint_desc = stepFiles[HINT_DIR]?.[DESC_MD] as string
        if (hint_desc) {
            stepFiles[HINT_DIR][DESC_MD] = md.render(hint_desc)
        }
    }
    return files
}
