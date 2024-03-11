// first version of this file copy from: https://github.com/vuejs/docs/blob/main/src/tutorial/tutorial.data.ts
// @ts-ignore
import {createMarkdownRenderer} from "vitepress";
import {readExamples} from "./examples.data";

export default async (src_path: string) => {
    const md = await createMarkdownRenderer(process.cwd(), undefined, '/')
    const files = readExamples(src_path)
    for (const step in files) {
        const stepFiles = files[step]
        const desc = stepFiles['description.md'] as string
        if (desc) {
            stepFiles['description.md'] = md.render(desc)
        }
        const hint_desc = stepFiles['_hint']?.['description.md'] as string
        if (hint_desc) {
            stepFiles['_hint']['description.md'] = md.render(hint_desc)
        }
    }
    return files
}
