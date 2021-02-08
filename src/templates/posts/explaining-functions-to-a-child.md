---
layout: post.njk
date: 2020-04-12
title:  "Explaining functions to a ten year old"
tags: ['javascript']
excerpt: "During the Corona virus lockdown I thought it might be a good idea to show my daughter what I do all day at work ..."
---

As part of this Corona virus lockdown I thought it might be a good idea to show my daughter what I do all day at work. As she's doing well in maths, we thought it would be fun (no, a challenge) to try and build a calculator (with HTML and Javascript).

We began by talking about what a calculator does, the different types of buttons, what they do and how the screen reflects our input. 
## Play

This was a good chance to understand the mechanics of a thing, as the experience of most software we use nowadays is so good we tend not to think too much about how they work underneath. We accept things willingly because they work well most of the time.

The first thing she noticed was the display and how the numbers got smaller when there wasn't enough room on the screen.

![Calculator image](https://res.cloudinary.com/dxcpo9dzb/image/upload/v1612601913/blog/calculator-number-size.png "Calculator image")

She understood the need for this, but commented on my phone calculator being different to my laptop calculator - My phone calculator stops the number size reduction after a while and uses scrolling to reveal numbers beyond the display. There was surprise and laughter about this, as some physical calculators stop input when a display limit is reached (It then turned into a game to see if we got bored before the display stopped rendering numbers - we got bored).

Play continued by looking at how the display shows the calculation and when it decides that our input is destined for the next part. Of particular interest was how the calculation was displayed if we continued to calculate - A number(s) followed by an operator, followed by a number(s), followed by an operator etc. This is also displayed differently on my laptop.

![Calculator image](https://res.cloudinary.com/dxcpo9dzb/image/upload/v1612736331/blog/calculation-display-variations_xi2rnd.png "Calculator image")

## Looking deeper
Looking at how the numbers and operators followed each other was interesting because it made us think about how we might approach building the calculator. 

I moved the chatter towards how the calculation is made and what decides when it's time for the next part of the calculation to be added. We realised a simple calculation is broken up into 4 parts. 

![Calculator image](https://res.cloudinary.com/dxcpo9dzb/image/upload/v1612736350/blog/calculation-parts_vghlas.png "Calculator image")

We would need to give those parts a name, if any calculating was to be done. It took us a while to work out the names of those parts. **This Number** and **That Number** didn't quite cut it for me! We talked about why it was good to name things well and that Bob or Jim was not a good name for me!

>In case you forgot, like I did, all parts of arithmetic equations have names. We discovered that in an addition equation, <ins>addends</ins> are the numbers that are added together to give a <ins>sum</ins>. 
In a subtraction equation, the <ins>subtrahend</ins> is taken away from the <ins>minuend</ins> to give a <ins>difference</ins>. In a multiplication equation, <ins>factors</ins> are multiplied to give a <ins>product</ins>. In a division equation, a <ins>dividend</ins> is divided by a <ins>divisor</ins> to give a <ins>quotient</ins>.

For the main parts, we settled on **Part 1**, **Part 2**, and **Sum**. The other two parts we identified as being *actions* - Something that lets the calculator know it has finished with the current **Part [1 or 2]** and that it's ok to move on to the next part. So you end up with **part 1** : **action** : **part 2** : **action** : **sum**. This is really simple, simple enough for her to remember as a core concept.

![Calculator image](https://res.cloudinary.com/dxcpo9dzb/image/upload/v1612736333/blog/calculation-parts-named_qpf45z.png "Calculator image")

## The *really* hard part
She was eager to start coding, like we all are. So I tried to explain what a function is, by describing the syntax. What an argument is. The function body. How to call a function. 

WTF! The glazed look on her face said "*huh!* " then it said "*I love you, but please stop!* ". So I dialed it back. A lot. Instead we talked about things we use everyday, things that serve a single purpose. 

The washing machine and the dishwasher proved to be useful as they helped us think about the stuff you put in and the things you get out (input/output).

Even now as a *grown up coder*, it's easy to forget how simple a function should be. But code is so malleable it's trivial to add an argument here, trigger a side effect there. You really can't do that with physical objects, without messing up your warranty!

I think she understood the idea of a dishwasher as a function, but connecting that to how a calculator could be created was a step to far for her this time.

We didn't actually build anything, but the enthusiam is there.