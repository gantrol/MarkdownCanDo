import { defineConfig } from 'vitepress'
import { shared } from './shared'
import { en } from './en'
import { zh } from './zh'
import { pt } from './pt'
import {withMermaid} from "vitepress-plugin-mermaid";


export default withMermaid(
    defineConfig({
        ...shared,
        locales: {
            root: { label: 'English', ...en },
            zh: { label: '简体中文', ...zh },
            pt: { label: 'Português', ...pt },
        }
    })
)
