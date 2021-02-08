---
layout: post.njk
title: "Why I think VueJS is easy for new devs to pick up"
tags: ['vue']
date: 2021-02-05
excerpt: "With Vue, there are no doubts about where things belong. You can quickly put something together without too much trouble"
---
Setting aside the surrounding ecosystem of Vue and the numerous ways you can now compile code, I think the main reason why Vue has been so popular for developers is the speed at which you can become confident with what you've written.

This is down to the structured way you write code inside a component. With Vue, there are no doubts about where things belong, and you can quickly put something together without too much trouble.

There are two things that make it easy to pick up

## Code placement within a component

A Vue component is a combination of HTML, Javascript and CSS all in one file. Sometimes a component can be written in a stand alone file called a Single File Component, which has a *.vue* extension. The code for the file is divided up into 3 main segments representing HTML, Javascript and CSS. 
```html
<template>
    <p>{% raw %}{{firstName}}{% endraw %}</p>
</template>

<script>
export default {
    ...
    props: {
      firstName: {
        type: String,
        required: true
      }
    }
    ...
}
</script>

<style>
    p {
        color: blue;
    }
</style>
```
There is no ambiguity about where code should go. It's self documenting.

## Code placement within the script block

Ambiguity is also averted within the script block. Vue makes it clear where code should live. It gives us objects to hold code that will be executed in a certain way and at a certain time. The four main parts that get used the most are:

### 1. Props
**An object** that defines the properties the component should be given. These properties can be listed as optional.
```javascript
export default {
    ...
    props: {
      firstName: {
        type: String,
        required: true
      }
    }
    ...
}
```

### 2. Mounted
**A function** that's called when the component has been added to the DOM.
```javascript
export default {
    ...
    mounted () {
        console.log('Hello world! Can you see me?')
        // Execute other code that can only
        // be run when the component is "loaded"
    }
    ...
}
```
### 3 Computed
**An object** that defines properties that are a combination of other properties.
```javascript
export default {
    ...
    computed: {
        fullName () {
          // update the greeting when
          // the name changes
          return `${this.firstName} ${this.lastName}`
        }
    },
    ...
}
```
### 4 Methods
**An object** that defines custom functions that can be used within the component.
```javascript
export default {
    ...
    methods: {
        getGreeting(greeting) {
            return `${greeting} ${this.fullName}`
        }
    }
    ...
}
```
You can find an example like this on the VueJs website. However I think it's worth noting, as when you open a component file, it's relatively easy to get your bearings quickly. This makes it great for new devs who have never used Vue before. It goes without saying that the more functionality you add, the more complex things get.

Your code placement options might seem a little restrictive to start with, but this restraint really allows you to think about your component instead of the framework. 