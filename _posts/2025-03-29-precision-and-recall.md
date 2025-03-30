---
layout: post
title:  "Test"
description: 
date:   2025-03-29 00:24:30 +0000
---

Precision and recall are two immensely important metrics in when it comes to retrieval algorithms and machine learning models. Outside of computer science, everyone should learn about them because they just generally describe how good something or someone is at identifying stuff.

Let's say we have a group of blue and red circles. 

Our goal is to draw a box that contains as many red circles as possible while including the least amount of blue circles. Let's give it our best shot.

So how "good" is our box at containing red circles?

Let's figure out the _precision_. Our precision here is the ratio of circles in the box that are actually red. Out of the 4 circles in the box, 3 are red, so our precision is 3/4 = 75%.

Next, let's figure out the _recall_. Our recall here is the ratio of red circles that we managed to get in the box. Out of the 5 red circles, we managed to get 3 of them in the box, so our recall is 3/5 = 60%.

Something notable is that precision and recall are inversely related.

Let's say we want to increase our precision to 100%, or make sure 100% of the circles in the box are red. We can do that by shrinking the box to the right.

Our precision is now at 100%, but at what cost? Out of the 5 red circles, only 2 of them are in the box now, meaning our precision dropped from 60% to 40%!

We can try the same thing with increasing recall. We can reach 100% recall by extending the box, but our precision drops from 75% to 62.5% (there are now 8 circles in the box, with 5 of them being red).

That's it. That's precision and recall.
