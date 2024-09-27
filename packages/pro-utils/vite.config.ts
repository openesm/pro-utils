import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        dts({
            tsconfigPath   : resolve(__dirname, 'tsconfig.json'),
            rollupTypes    : true,
            declarationOnly: true,
        }),
    ],
    build: {
        target: 'es2015',
        outDir: 'types',
        lib   : {
            entry: {
                core   : './src/core/index.ts',
                browser: './src/browser/index.ts',
                axios  : './src/axios/index.ts',
                cipher : './src/cipher/index.ts',
            },
            formats: ['es'],
        },
        rollupOptions: {
            external: [
                'lodash-es',
                'dayjs',
                'dayjs/plugin/utc',
                'dayjs/plugin/relativeTime',
                'dayjs/plugin/timezone',
                'axios',
                /crypto-js\/.*/,
            ],
            output: {
                preserveModules    : true,
                preserveModulesRoot: 'src',
                exports            : 'named',
            },
        },
    },
})
