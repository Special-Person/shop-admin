module.export =  {
    devServer: {
        open: true,
        proxy: {
            '/api': {
                target: "xxx",
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ""
                }
            }
        }
    }
}
