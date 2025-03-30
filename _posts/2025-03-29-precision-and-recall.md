---
layout: post
title:  "A simple visual guide to precision and recall"
description: 
date:   2025-03-29 00:24:30 +0000
---

_Precision_ and _recall_ are two important metrics in computer science, but they're pretty general concepts. They just describe how good something/someone is at identifying/retrieving stuff.

They're quite simple, yet every explanation is _awful_ for beginners or non-computer people. You should not have to memorize formulas or read confusion matrices to understand the gist.

![what](/assets/pr-what.png){:.w50}

# A simple example

Let's say we have a group of blue and red circles. 

![1](/assets/pr-1.png){:.w75}

Our goal is to draw a box that contains as many red circles as possible while including the least amount of blue circles. Let's give it our best shot.

![2](/assets/pr-2.png){:.w75}

So how "good" is our box at containing red circles?

Let's figure out the _precision_. Our precision here is the ratio of circles in the box that are actually red. Out of the 4 circles in the box, 3 are red, so our precision is 3/4 = 75%.

![2](/assets/pr-3.png){:.w75}

Next, let's figure out the _recall_. Our recall here is the ratio of red circles that we managed to get in the box. Out of the 5 red circles, we managed to get 3 of them in the box, so our recall is 3/5 = 60%.

![4](/assets/pr-4.png){:.w75}

Something notable is that precision and recall are inversely related.

Let's say we want to increase our precision to 100%, or make sure 100% of the circles in the box are red. We can do that by shrinking the box to the right.

![5](/assets/pr-5.png){:.w75}

Our precision is now at 100%, but at what cost? Out of the 5 red circles, only 2 of them are in the box now, meaning our precision dropped from 60% to 40%!

We can try the same thing with increasing recall. We can reach 100% recall by extending the box, but our precision drops from 75% to 62.5% (there are now 8 circles in the box, with 5 of them being red).

![6](/assets/pr-6.png){:.w75}

That's it. That's precision and recall.

# The computer use case

In real-life, precision and recall is used to roast computer programs.

![bad robot!](/assets/pr-bad-robot.png){:.w75}

Since precision and recall are inversely related, we can use them to tweak retrieval algorithms or machine learning models based on the intended goal. For example, a program like FaceID should prioritize precision -- it's fine if it _occasionally_ doesn't work on our face as long as randos would never be able to unlock our iPhone. On the other hand, a screening tool for a highly deadly disease should prioritize recall -- a few false alarms is acceptable as long as we catch every possible case.
