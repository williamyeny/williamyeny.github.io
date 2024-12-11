---
layout: post
title:  Detecting suboptimal receipt matching experiences using Reddit's comment ranking algorithm
description: 
date:   2024-12-11 00:24:30 +0000
---

At [Ramp](https://ramp.com/), we provide finance software for businesses, and one core feature I work on is called "receipt matching." Businesses are required by law to attach receipts to most transactions, and if a business makes many transactions, matching up all the receipts to the right transactions can get hairy! With receipt matching, a business can submit any receipt, and an algorithm will try to find the right transaction automatically.

The receipt matching system works great most of the time, but occasionally, a customer's receipts will consistently fail to match. More often than not, this is due to a configuration issue for the specific customer, which will require manual intervention instead of broad changes to the receipt matching system.

One of our goals is to become more proactive at detecting these specific cases. For example, if a customer submits 100 receipts but only 10 of them match, we should be alerted instead of waiting for a complaint. So, how do we find out if someone is having a bad time with receipt matching?

## A naive approach

Doesn't sound too hard, right? For one customer (a `business`), we could divide the number of receipts that didn't match by the total number of receipts, and then sort. For example, a business with 4 out of 5 receipts that failed to match would take priority over a business with 2 out of 10 receipts that failed to match.

Except this doesn't work when trying to find the *worst* experiences out of many businesses. For example, let's say we have 
* Business A, who submitted 3 receipts and 2 didn't match
* Business B, who submitted 300 receipts and 180 failed to match

Business A has a worse ratio than Business B, but we definitely care more about Business B. Business A could've just accidentally uploaded the wrong files once, but Business B is almost certainly experiencing a systemic issue. 

The problem? We don't adjust the scoring with sample size.

## A better approach

I stumbled upon [a blog post on how Reddit reworked their comment ranking algorithm](https://medium.com/hacking-and-gonzo/how-reddit-ranking-algorithms-work-ef111e33d0d9), and the problem they're solving seems very similar. They wanted to prevent the situation where a comment with 2 upvotes and 0 downvotes would outrank a comment with 100 upvotes and 2 downvotes (oversimplified from [the full explanation](https://archive.md/Q3oC8)).

The algorithm that they decided on was the Wilson score interval, invented in 1927. Here's the math (don't worry if you don't understand it, I certainly don't):

![Wilson score interval formula](/assets/wilson-score-interval.png)

The way this works is that the formula tries to "predict" the final ratio of upvotes vs. downvotes, or in my case, the ratio between matches and non-matches. Another way to think about it is that it balances the ratio with the uncertainty of a small number of observations. Of course, this uncertainty means that you'll have to set a confidence interval (I chose 95%, the reason is left as an exercise to the reader).

## Does it work?

I went ahead and implemented this in a Jupyter notebook, calculating a score (`bad_match_score`) for each business that represents how bad receipt matching is for them:

![Wilson score interval implementation](/assets/wilson-implementation.png){:.w75}

It worked pretty well! Notice how the businesses with some matched receipts out of thousands of submitted receipts are prioritized over businesses with 0 matched receipts out of only a few hundred.

Side note: don't be alarmed by the high "match not found" rates, I was too lazy to filter out certain irrelevant receipts. The actual rate is much lower, even for outliers.

## What's next?

A modified version of this algorithm will be built into an automated system I've started designing. In all honesty, I haven't prioritized building out this system because there's other projects to tackle that are more impactful and exciting. If you'd like to work on such projects with me, [Ramp is hiring](https://ramp.com/careers)!
