require('esbuild').build({
    entryPoints: ['src/cf-alert.ts'],
    bundle: true,
    minify: true,
    outfile: 'dist/cf-alert.js',
    format: 'esm',
}).catch((err) => {
    console.error(err)
    process.exit(1)
})
