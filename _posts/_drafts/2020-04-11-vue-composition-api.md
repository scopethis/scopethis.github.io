---
layout: post
title:  "A quick look at the new Vue JS Composition API"
tags: javascript modules
---

Those of you that use Vue, know that writing a single file component can be a very structured process, methods and variables must be written in specific, known, places. This is part of Vue's charm, in that it can be picked up quickly by newcomers.

```html
<template>
    <span>{% raw %}{{greeting}}{% endraw %}</span>
</template>
```
```javascript
// Main sections or blocks
// used in a single file component

export default {
    props: {
      name: {
        type: String,
        required: true
      }
    },

    watch: {
      name () {
        // Watch for changes on
        // the name property
        // Do anything you like here
      }
    },

    computed: {
        greeting () {
          // update the greeting when
          // the name changes
          return `Hello ${name}`
        }
    },

    methods: {
        sayGoodbye (input) {
            return `Goodbye ${name}`
        }
    }
}
```

The sections provided, such as **computed**, **method** and **watch** are excellent entry points when starting to write code in Vue. But that code can become hard to follow.  
>
Your overall logic is grouped by your use of Vue's computed, methods and watch sections, instead of the functionality of your component. 

Consider the size of the above code if(when) feature updates go unchecked.

When components get bigger they become more difficult to maintain, because part of the logic gets "lost" within the **computed**, **method** and **watch** sections.  
We generally stick to this process because of how Vue handles  [the component lifecycle](https://vuejs.org/v2/guide/instance.html#Instance-Lifecycle-Hooks)  and how Vue binds itself to the Document Object Model (the object that represents HTML markup in a browser).

To avoid the lost logic problem, we tend to move code, or features, into other components to group the functionality. As a result, this makes the code easier to follow ... 

<div markdown="1" class="code-container">
  <div markdown="1" class="code-of2">

```javascript
// Focus ALL code here
// on Feature A
export default {
  watch: {
    attributeA (input) {
      // do something when 
      // attributeA changes
    }
  },

  computed: {
    computedPropA () {
      return newResultOfAChange
    }
  },

  methods: {
     methodA (input) {
      return input * 2
    }
  },
}
```
  </div>
  <div markdown="1" class="code-of2">

```javascript
// Focus ALL code here
// on Feature B
export default {
  watch: {
    attributeB (input) {
      // do something when 
      // attributeB changes
    }
  },

  computed: {
    computedPropB () {
      return newResultOfBChange
    }
  },

  methods: {
     methodB (input) {
      return input * 2
    }
  },
}
```
  </div>
</div>

... but this can become more complex and **coupled** to Vue  when taken to extremes.

## Anti-pattern
There's a popular pattern within the Vue community that's commonly used to help write components that rely on data to build a set of results. They're called **Renderless Components**. These are Vue components that don't render anything directly to the browser. Instead, they behave like a service that provides UI functionality or data. 

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

I have a couple of issues with this pattern:

1. You're adding Markup to the template. That (visually)increases the complexity of the template.
2. Abstract logic tied to Vue's framework, which makes it unusable for **non-Vue** parts of your app.
3. Accessing methods/variables on your Renderless Component becomes a bit cumbersome (or you don't provide any).

Most anti-patterns are born out of necessity and the real need here, with Renderless Components, is to **extract the logic but keep the connection to Vue's lifecycle hooks and the reactivity model**.

## A New Way
This is precisely what the new Composition API is for - handling features and functionality in a maintainable way, while keeping the connection to Vue. At its core, the Composition API is an explicit approach to use when constructing large products. However, I think its real purpose is to encourage developers to think much further ahead, with modularity in mind. 

Its use is optional, so developers can choose the appropriate moment to apply the approach. It's modular and can be used outside of the Vue framework. The plugin for version 2.x makes the approach backwards compatible, so legacy code can be refactored over time.

However, what got me excited about using it, for me at least, was that it goes back to basics in terms of defining how modular reusable code could be written and used within Vue. 

Douglas Crockford popularised the idea of a Module Pattern that promotes code encapsulation. Code with relatively private and publicly accessible functionality. Addy Osmani covered this and the Revealing Module Pattern in his book Learning Javascript Design patterns. In its most basic form, the pattern is pretty simple: A function that returns an object exposing variables and methods.


```javascript
// Greeter.js

// Prepare a function that closes and
// maintains its scope as well 
// as providing and hiding functionality

function Greeter () {
  // Not visible externally
  const aGreeting = 'hello'

  // Visible externally
  function greet (name) {
    // go and get some data
    // with this function
    return `${privateFuntion()} ${name}`
  }

  // Not visible externally
  function privateFuntion () {
    // do some support for 
    // this feature
    return aGreeting
  }
  
  // Return what you think
  // should be exposed
  return {
    greet
  }
}

export {
  Greeter
}

```

```javascript
import {Greeter} from './Greeter.js'
const myGreeter = Greeter()

console.log(myGreeter.greet('Joseph'))
// Logs 'hello Joseph'

console.log(myGreeter.aGreeting)
// Logs 'undefined'
```

The Composition API lets you use the Module Pattern to provide logic and features to components in a way that is not so tightly coupled to the framework in the way a Renderless Component is. So if we were to redo our tiny list of todos, we might choose to do it like this instead ...

```javascript
// Todos.js

function Todos () {
  const todos = reactive({
    results: []
  })
  
  funtion getTodos() {
    // an ajax call to get
    // your todos.

    // Could also wrap this in a promise
    // and 'resolve' it
    // to make it useful elsewhere
    http.get('https://api.todos.com')
      .then(response => {
        todos.results = response
    })
  }
  
  return {
    todos,
    getTodos
  }
}

export {
  Todos
}
```

```html
<template>
  <ul>
    <li v-for="(todo) in todos.results">
      {% raw %}{{todo.title}}{% endraw %}
      <!-- Add checkbox here -->
    </li>
  </ul>
</template>
```

```javascript
import Todos from './Todos.js'

export default {
  setup () {
    const service = Todos()
    service.getTodos()
    
    // Expose the bindable bits
    // to our template
    return {
      todos: service.todos
    }
  }
}
```

For me, this is much more logical than using a Renderless Component. The template is much clearer and only contains rendering logic. In addition, the Todo module can be reused outside the Vue component ecosystem if required.

>
It's worth remembering that you can still use a module pattern to provide functionality for Vue components, you'd just need to jump through a few hoops if you wish to apply it to template bindings / reactivity model.

## VueX?
This is possible because the Composition API is bundled with optional binding functionality. I say optional because it would be a regular module without the ability to update a template automatically. The sample code above used a **reactive** function as part of the todo list storage.

```javascript
  const todos = reactive({
    results: []
  })
```

This helps the template(html) automatically bind itself to any changes to the result. And with the help of **provide** and **inject**, you can bind that same result property to **any** html within you app.

 So, where does this leave VueX? Honest answer is, I don't know. I've always thought it was a lot of work for not very much, so I'm glad to see another option available to developers.

## So ...
 I've been using the Composition API for a while now and can see improvements to how I think about building a Vue App. When you get so embedded within a frameworks opinionated style of development, it's very easy to forget older, tried and tested, ways of working. I'm hoping The Composition API reminds me of a few other things I've forgotten along the way.