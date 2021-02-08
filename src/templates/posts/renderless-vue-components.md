---
layout: post.njk
title: "I'm not so sure about Renderless Components"
tags: ['vue']
date: 2021-02-08
excerpt: "Lets try and keep templates as dumb as possible. Sticking to the basics should keep your template dumb and ultimately maintainable"
---

There is a popular pattern within the Vue community that's commonly used to help write components that rely on data to build a set of results. They're called **Renderless Components**. These are Vue components that don't render anything directly to the browser. Instead, they behave like a service that provides UI functionality or data.

```html
<!--
An example of how renderless components 
work. Wrap your list in the 
renderless-component wrapper to receieve 
a response from the server.

The todos are provided by the
renderless component via scoped slots
-->

<template>
  <ul>
    <renderless-component 
      service="https://api.todos.com">
        <template :slot-scope="{todos}">
          <li v-for="(todo) in todos">
            {% raw %}{{todo.label}}{% endraw %}
          </li>
        </template>
    </renderless-component>
  </ul>
</template>
```

I think this is an **Anti Pattern** and I have a few issues with it.

1. You're adding Markup to the template. That (visually) increases the complexity of the template.
2. Logic tightly coupled to the template portion of your component makes that logic unusable for **non-Vue** parts of your app.
3. Accessing methods/variables on your Renderless Component becomes a bit cumbersome (or you don't provide any).

Most anti-patterns are born out of necessity and the real need here, with Renderless Components, is to **make the logic reuseable but keep the connection to Vue's lifecycle hooks and the reactivity model**.

Why can't this be done with standard javascript? What does this add that doing it the normal way doesn't?


```html
<template>
  <ul>
    <!-- simpler markup -->
    <li v-for="(todo) in todos">
        {% raw %}{{todo.label}}{% endraw %}
    </li>
  </ul>
</template>

<script>
export default {
    data () {
        return {
            todos: []
        }
    },

    methods: {
        getTodos() {
            ... // Some Promise/ajax/endpoint magic
            .then(response => {
                this.todos = response
            })
            ...
        }
    }
}
</script>
```

If you wanted to reuse the service call in another component, it's now trivial to move the getTodos call into a standard javascript module. That same module could be used by another completely  different framework if needed.

```javascript
// todo-service.js
export const getTodos = () => {
    ... // Some Promise/ajax/endpoint magic
    .then(response => {
        resolve(response)
    })
    ...
}
```
```javascript
// Your todo app/component
import {getTodos} from 'todo-service'
export default {
    ...
    methods: {
        getData = async () => {
            this.todos = await getTodos();
        }
    }
    ...
}
```

This makes more sense to me, and seems more future proof.

Lets try and keep templates as dumb as possible. Sticking to the basics should keep your template dumb and ultimately maintainable:
1. Simple data binding
2. Standard Loops
3. Events
