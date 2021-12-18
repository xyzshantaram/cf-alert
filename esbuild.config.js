require('esbuild').build({
    entryPoints: ['src/main.ts'],
    bundle: true,
    minify: true,
    outfile: 'dist/main.js',
    watch: true
}).catch((err) => {
    console.error(err)
    process.exit(1)
})
