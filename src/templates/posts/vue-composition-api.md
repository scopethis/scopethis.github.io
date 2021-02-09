---
layout: post
date: 2019-11-13
title:  "A quick look at the new Vue JS Composition API"
tags: ['vue']
excerpt: "Those of you that use Vue, know that writing a single file component can be a very structured process, methods and variables must be written in specific, known, places ..."
---
## Vue

Those of you that use Vue, know that writing a single file component can be a very structured process. Methods and variables must be written in specific, known, places. This is part of Vue's charm, in that it can be picked up quickly by newcomers.

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
          return `Hello ${this.name}`
        }
    },

    methods: {
        sayGoodbye () {
            return `Goodbye ${this.name}`
        }
    }
}
```

The **computed**, **method** and **watch** sections are great entry points when starting to write code in Vue. But, overtime, that code can become hard to follow.  
>
This is because your logic is grouped by the computed, methods and watch sections, instead of the functionality of your component. 

Consider the potential size of the above code if functionality updates went unchecked.

When components get big they become more difficult to maintain, because part of the logic gets "lost" within the **computed**, **methods** and **watch** sections.

There is a great image on the Vue website that [tries to visualise the problem](https://v3.vuejs.org/guide/composition-api-introduction.html).

However, we generally stick to this process because of how Vue builds a component.

To avoid the lost logic problem, we could move code into other components to group the functionality. Doing this makes the code easier to follow ... 

<div markdown="1" class="code-container">
  <div markdown="1" class="code-of2">

```javascript
// Write ALL Feature A code within
// the feature-a.js file
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
// Write ALL Feature B code within
// the feature-b.js file
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

... but this can also become more complex and **too coupled to the framework, because the code is still bound to the component style syntax**. VueX won't help here either, because it's not a state management issue. It's an organisation issue.

## A New Way
This is precisely what the new Composition API is for - handling features and functionality in a maintainable way, while keeping the connection to Vue. At its core, the Composition API is an explicit approach to use when constructing large products. However, I think its real purpose is to encourage developers to think much further ahead, with modularity in mind. 

Its use is optional, so developers can choose the appropriate moment to apply the approach. It's modular and can be used outside the Vue framework. The plugin for version 2.x makes the approach backwards compatible, so legacy code can be refactored over time.

However, what got me excited about using it, was that it goes back to basics in terms of defining how modular reusable code could be written and used within Vue. 

Douglas Crockford popularised the idea of a Module Pattern that promotes code encapsulation. Code with relatively private and publicly accessible functionality. Addy Osmani covered this and the Revealing Module Pattern in his book Learning Javascript Design Patterns. In its most basic form, the pattern is pretty simple: A function that returns an object exposing variables and methods.


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

The Composition API lets you use the Module Pattern to provide logic and features to components in a way that is not so tightly coupled to the framework in the way a Renderless Component is. 

So if we were to build a tiny list of todos, we might choose to do it like this.

1. Create a module to handle fetching the data
```javascript
// Todos.js

function Todos () {
  const todos = reactive({
    list: []
  })
  
  funtion getTodos() {
    // an ajax call to get
    // your todos.
    http.get('https://api.todos.com')
      .then(response => {
        todos.list = response
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
2. Then use the module inside your component 
```html
<template>
  <ul>
    <li v-for="(todo) in todos.list">
      {% raw %}{{todo.title}}{% endraw %}
      <!-- Add checkbox here -->
    </li>
  </ul>
</template>

<script>
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
</script>
```

For me, this is easier than using a Renderless Component. The template is much clearer and only contains rendering logic. In addition, the Todo module can be reused outside the Vue component ecosystem if required.

>
It's worth remembering that you can still use a module pattern to provide functionality for Vue components, you'd just need to jump through a few hoops if you wish to keep the data bindings / reactivity model.

## VueX?
The sample code above used a **reactive** function as part of the todo list storage.

```javascript
  const todos = reactive({
    results: []
  })
```

This helps the template automatically bind itself to any changes in the list. With the help of **provide** and **inject**, you can bind that same list property to **any** vue compoent within your app.

 So where does this leave VueX? Honest answer is, I don't know. I've always thought VueX was a lot of work for not very much, so I'm glad to see another option available to developers.

## So ...
 I've been using the Composition API for a while now and can see improvements to how I think about building a Vue App. When you get so embedded within a frameworks opinionated style of development, it's very easy to forget older, tried and tested, ways of working. 
 
 I'm hoping The Composition API reminds me of a few other things I've forgotten along the way.