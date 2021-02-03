// 11ty configuration
module.exports = (config) => {
    config.addPassthroughCopy("assets");
    // 11ty defaults
    return {
        dir: {
            passthroughFileCopy: true,
            input: "src/templates",
            output: "docs",
        },
    };
};
