---
layout: post.njk
title:  "Explaining functions to a child"
tags: javascript functions
---

During the Corona virus lockdown I thought it might be a good idea to show my daughter what I do all day at work. As she's doing well in maths, we thought it'd be cool (no, a challenge) to try and build a calculator (with HTML and Javascript).

So we sat talking about what a calculator does, the different types of buttons, what they do and how the screen reflects our input. 

>
The experience on most on things nowadays is so good we tend not to think too much about how things really work underneath. We accept things willingly because they work most of the time.

The first thing she noticed was the display and how the numbers got smaller when there wasn't enough room on the screen. She understood the need for this, but commented about my phone calculator being different to my laptop calculator - My phone calculator stops the size reduction after a while and uses scrolling to reveal numbers beyond the display.

![Calculator image]({{site.baseurl}}public/images/calculator.png "Calculator image")

Play continued by looking at how the display shows the calculation and when it decides that our input is destined for the next part. Of particular interest was how the calculation was displayed if we continued to calculate - A sequence of a number followed by an operator, followed by a number, followed by an operator etc (which is displayed differently on my laptop). 

The sequence was interesting because it made us think about how we might approach coding up the calculator. A calculation is broken up into 4 parts and it took us a while to work out the names of those parts. Her year hasn't got to that bit yet, and I'd forgetten some of the names too. So we settled on **Part 1**, **Operator**, **Part 2** and **Sum** for simplicity.

>
*Fyi*: All parts of arithmetic equations have names. In an addition equation, <ins>addends</ins> are the numbers that are added together to give a <ins>sum</ins>. In a subtraction equation, the <ins>subtrahend</ins> is taken away from the <ins>minuend</ins> to give a <ins>difference</ins>. In a multiplication equation, <ins>factors</ins> are multiplied to give a <ins>product</ins>. In a division equation, a <ins>dividend</ins> is divided by a <ins>divisor</ins> to give a <ins>quotient</ins>.