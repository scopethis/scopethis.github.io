const util = require("util");
// 11ty configuration
module.exports = (config) => {
    config.addPassthroughCopy("assets");

   config.addFilter("console", function (value) {
       return util.inspect(value);
   });

    config.addCollection("posts", (collection) =>
        collection
            .getAllSorted()
            .filter((item) => {
                const isPost =
                    item.url &&
                    !item.inputPath.includes("index.njk") &&
                    item.data.tags &&
                    item.data.page.date &&
                    item.inputPath.startsWith("./src/templates/posts/");
                if (isPost) {
                    return item;
                }
            })
            .reverse()
    );

    config.addCollection("vue", (collection) =>
        collection
            .getAllSorted()
            .filter((item) => {
                const isPost =
                    item.url &&
                    !item.inputPath.includes("index.njk") &&
                    item.data.tags &&
                    item.data.page.date &&
                    item.data.tags.includes("vue") &&
                    item.inputPath.startsWith("./src/templates/posts/");
                if (isPost) {
                    return item;
                }
            })
            .reverse()
    );

    config.addCollection("latest", (collection) =>
        collection
            .getAllSorted()
            .filter(
                (item) => {
                    const isPost =
                        item.url &&
                        !item.inputPath.includes("index.njk") &&
                        item.data.tags &&
                        item.data.page.date &&
                        item.inputPath.startsWith("./src/templates/posts/");
                    if (isPost) {
                        return item;
                    }
                }
            )
            .reverse()
            .slice(0, 3)
    );

    config.addCollection("work", (collection) =>
        collection
            .getAllSorted()
            .filter((item) => {
                const isPost =
                    item.url &&
                    !item.inputPath.includes("index.njk") &&
                    item.data.tags &&
                    item.inputPath.startsWith("./src/templates/work/");
                if (isPost) {
                    return item;
                }
            })
            .reverse()
    );

    // 11ty defaults
    return {
        markdownTemplateEngine: "njk",
        dir: {
            passthroughFileCopy: true,
            input: "src/templates",
            output: "docs",
        },
    };
};
