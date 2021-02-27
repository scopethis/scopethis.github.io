---
layout: post.njk
title: "Managing text and content with Sanity"
tags: ['general']
date: 2021-02-27
excerpt: "So I've been using sanity.io for a while now, at least a year, sporadically. And while there are a ton of good things to shout about, I want to talk about Portable Text and Serailizers"
---

I've been using [sanity.io](https://sanity.io) for a while now, at least a year, sporadically. And while there are a ton of good things to shout about, I want to talk about [Portable Text](https://www.sanity.io/guides/introduction-to-portable-text) and Serailizers.

I'm no expert with the Sanity system yet, it's such a good system to just get going without delving too deeply when starting out, but I've recently had an ***Ah ha*** moment with Portable Text, which I'd like to share.

*These are the moments I love while learning something new - When some of the dots you've been playing with start to connect.*

I had two relatively simple issues and one complex (or so I thought). 
1. The first two were about links within posts that needed to be styled a certain way as well as needing some of those links to open in a new window.
2. The third issue had to do with styling a blockquote in a particular way.

>It must be noted that I'm building a static site, which plays nicely with how Sanity works. And I must also stress that **I didn't want my users to add any markup or styling to the content** within Sanity Studio.


All three of my issues were solved with Marks and Markdefs. A lot of my time was spent reading [their method of handling links](https://www.sanity.io/guides/portable-text-internal-and-external-links) and about [blocks in general](https://www.sanity.io/docs/block-content). However my link version differs from theirs. Let me explain.

## The Blockquote issue
### The problem: 
Provide a way for users to add a background colour and a text colour to a blockquote within an article, without overly compromising the content.

**The solution**: Create a colour swatch document, that contains a hex for both the background and text colours. 

To create a reasonable exeprience for the user, I created a [react] component to help visualise the changes (I've not shown the component code for brevity):

![Sanity Component](https://res.cloudinary.com/dxcpo9dzb/image/upload/v1614443051/blog/sanity-swatch-plugin_mdohnh.png)

I then updated the Colour Swatch schema to make use of the new component.

```javascript
// Swatch schema
import Swatch from '../components/ColourSwatch'
...
fields: [
  ...
    {
      title: 'Colours',
      name: 'swatch',
      type: 'object',
      description: "...",
  --> inputComponent: Swatch,
    }
  ...
]
...
```
All Swatches are a sanity *document*, which means they'll be treated like royalty!

Next I updated the schema where the blockquote was being used, so the text field could apply the Swatch document to a highlighted section of text.

```javascript
// article schema
...
  name: "article",
  type: "array"
  of: [
    {
      type: "blocks",
      marks: {
        annotations: [
          {
              name: "colourSwatch",
              type: "object",
              title: "Colour Swatch",
              fields: [
                  {
                      name: "swatchRef",
                      type: "reference",
                      title: "Colour Swatch",
                      to: [
                          { type: "swatch" },
                      ],
                  },
              ],
          }
        ]
      }
    }
  ]
...
```
Now our users can create a blockquote, highlight it and apply a Swatch to it.

![Block annotation](https://res.cloudinary.com/dxcpo9dzb/image/upload/v1614444280/blog/sanity-annotation_sotx3i.png)

Brilliant! But now what? Rendering this page delivers no visual changes! What did I miss?

## GROQ and Serailizers to the rescue
To ensure the content is transformed correctly, we need to make sure the relevant ```markDefs``` get returned. To do this we have to update our query (Like GraphQL, we decide what we want returned).

```javascript
// GROQ query
article[ ]{
  ...
  markDefs[ ]{
      ...
      "colourSwatch": swatchRef->{
          "background": swatch.background,
          "text": swatch.text
      }
      ...
  }
  ...
}
```
Now, by extending/creating the Serailizers, you are able to hook into the build flow of Portable Text. When the serializer encounters a blockquote, you are given access to not only the blockquote, but also the ```props``` and modifications applied to it. 

```javascript
import renderer from "@sanity/block-content-to-html";
const h = renderer.h;

export const serializers = {
  ...
  marks: {
    colourSwatch: (props) => {
        return h(
            "span", 
            {
                style: {
                    'background-color': props.mark.colourSwatch.background,
                    color: props.mark.colourSwatch.text,
                }
            },
            props.children
        );
    }
  }
  ...
}
```
At this point you're free to return whatever you like, but in my case I was able to use the ```props``` to get the applied Swatch, with colours, and return a blockquote with the correct style attached.

## The Link issues.

The other two issues followed a similar pattern, however, I didn't need to create a new document. I simply asked the serializer to modify links, when it encountered them. 

```javascript
import renderer from "@sanity/block-content-to-html";
const h = renderer.h;

export const serializers = {
  ...
  marks: {
    link: (props) => {
      // handle internal/external links
      const href = props.mark.href
      const target = (href && href.indexOf('mydomain.') > -1)
          ? "_self"
          :"_blank";

      // Insert the <span> tag
      return h(
        "a",
        { href, target },
        h(
          "span",
          null,
          props.children
        )
      )
    }
  }
  ...
}
```
Again, I am given access to the link element and I'm allowed to return whatever I like. In this instance I am adding a ```<span>``` tag as a child of the ```<a>``` tag. In addition to this, I am also checking the actual link to see if it's an external or internal link and updating the target attribute.

## Final thoughts
As I'm building a static site, this is incredibly valuable, because normally you would do all of this dynamically, when the page is requested. As it stands I have pre rendered html pages, with correctly formatted links and correctly styled blockquotes. All without seriously crippling the core content, or even modifying the template.

I admit, this is a very quick overview and I've glossed over a few areas. But understanding Portable text is key to doing great things with this Headless CMS.

Thanks Sanity.

