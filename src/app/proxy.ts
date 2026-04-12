export default {
  "/api": {
    target: "https://xn--80abcjepbp1bfe2q.xn--p1ai",
    secure: true,
    changeOrigin: true,
    pathRewrite: {
      "^/api": "/api",
    },
  },
};
