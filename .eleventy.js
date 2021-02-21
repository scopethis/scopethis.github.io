const util = require("util");

const collections = [
    { name: "vue", dir: "posts" },
    { name: "lockdown", dir: "posts" },
    { name: "haiku", dir: "posts" },
    { name: "work", dir: "work" },
];

module.exports = (config) => {
    config.addPassthroughCopy("assets");

    config.addFilter("console", function (value) {
        return util.inspect(value);
    });

    collections.forEach((grouping) => {
        config.addCollection(grouping.name, (collection) =>
            collection
                .getAllSorted()
                .filter((item) => {
                    const isPost =
                        item.url &&
                        !item.inputPath.includes("index.njk") &&
                        item.data.tags &&
                        item.data.tags.includes(`${grouping.name}`) &&
                        item.data.page.date &&
                        item.inputPath.startsWith(`./src/templates/${grouping.dir}/`);
                    if (isPost) {
                        return item;
                    }
                })
                .reverse()
        );
    })

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
