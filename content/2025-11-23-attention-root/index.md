+++
title = "Why do we normalize by the root of the dimension in attention?"
date = 2025-11-23
+++

This is _attention_, a key part of modern LLMs such as ChatGPT:

$$
\mathrm{Attention}(Q, K, V) = \mathrm{softmax}\left(\frac{QK^{\top}}{\sqrt{d_k}}\right)V
$$

While I won't break down every part of this definition (there are [better resources](youtube.com/watch?v=eMlx5fFNoYc) for that), we'll quickly refresh what \\(Q\\) and \\(K\\) are -- matrices whose rows are query and key vectors. Each entry of \\(QK^{\top}\\) is the dot product between one query vector and one key vector.

But here's the interesting part: why are we dividing by \\(\sqrt{d_k}\\)?

The original paper, [Attention Is All You Need](https://arxiv.org/pdf/1706.03762), explains it[^1] like so:

> While for small values of \\(d_k\\) the two mechanisms perform similarly, additive attention outperforms
> dot product attention without scaling for larger values of \\(d_k\\). We suspect that for large values of
> \\(d_k\\), the dot products grow large in magnitude, pushing the softmax function into regions where it has
> extremely small gradients. To counteract this effect, we scale the dot products by \\(\frac{1}{\sqrt{d_k}}\\).

Basically, as the dimension of \\(K\\) increase, the dot product values in the grid of \\(QK^{\top}\\) become too extreme. To fix this, those values are scaled down using \\(\sqrt{d_k}\\).

That's fine and all, but why \\(\sqrt{d_k}\\) in particular? Why not just \\(d_k\\), or some other manipulation of \\(d_k\\)?

We can figure this out using a bit of math!

To make our lives easier, let's take a single query-key pair in \\(QK^{\top}\\) and call their vectors \\(q\\) and \\(k\\). We'll standardize their components[^2] to have a mean of 0 and a variance of 1:

{% katex(block=true) %}
\begin{aligned}
\mathbb{E}[k_i] &= 0 \qquad & \mathbb{E}[q_i] &= 0 \\
\mathrm{Var}(k_i) &= 1 \qquad & \mathrm{Var}(q_i) &= 1
\end{aligned}
{% end %}

The goal: we want to find some factor \\(c\\) that scales the dot product so that the overall variance is the same as the variance of the inputs to the dot product:

$$
\mathrm{Var}(qk^{\top} \cdot c) = 1
$$

The dot product between \\(q\\) and \\(k\\) is just the sum of the elements from \\(q\\) multiplied by elements of the same index from \\(k\\). This means the variance of the dot product is the sum of the variances of its products (assuming independence):

{% katex(block=true) %}
\begin{aligned}
\mathrm{Var}(qk^{\top}) &= \mathrm{Var}\left(\sum_{i=1}^{d_k} q_i k_i\right) \\
&= \sum_{i=1}^{d_k} \mathrm{Var}(q_i k_i) \\
\end{aligned}
{% end %}

Note that \\(d_q = d_k\\) (only vectors of equal dimensions can be dotted), so we could also say  \\(\mathrm{Var}(qk^{\top}) = \sum_{i=1}^{d_q} \mathrm{Var}(q_i k_i)\\).

Let's use the definition of variance, \\(\mathrm{Var}(X) = \mathbb{E}[X^2] - \mathbb{E}[X]^2\\), to break down \\(\mathrm{Var}(q_i k_i)\\):

$$ \mathrm{Var}(q_i k_i) = \mathbb{E}[{q_i}^2 {k_i}^2] - \mathbb{E}[q_i k_i]^2 $$

Now we can use the expected value of the product of two independent variables, \\(\mathbb{E}[XY] = \mathbb{E}[X] \mathbb{E}[Y]\\), to break it down further:

{% katex(block=true) %}
\begin{aligned}
\mathrm{Var}(q_i k_i) = \mathbb{E}[{q_i}^2] \mathbb{E}[{k_i}^2] - (\mathbb{E}[q_i]\mathbb{E}[k_i])^2
\end{aligned}
{% end %}

But notice how \\(k_i\\) and \\(q_i\\) have a mean of \\(0\\), so the second part zeroes out!

{% katex(block=true) %}
\begin{aligned}
\mathrm{Var}(q_i k_i) &= \mathbb{E}[{q_i}^2] \mathbb{E}[{k_i}^2] - (0 \cdot 0)^2 \\
\mathrm{Var}(q_i k_i) &= \mathbb{E}[{q_i}^2] \mathbb{E}[{k_i}^2]
\end{aligned}
{% end %}

We can figure out what \\(\mathbb{E}[{q_i}^2]\\) is pretty easily since we know \\( \mathrm{Var}(q_i) \\). Again, using the definition of variance:

{% katex(block=true) %}
\begin{aligned}
\mathrm{Var}(q_i) &= 1\\
\mathbb{E}[{q_i}^2] - \mathbb{E}[q_i]^2 &= 1 \\
\mathbb{E}[{q_i}^2] - 0^2 &= 1 \\
\mathbb{E}[{q_i}^2] &= 1
\end{aligned}
{% end %}

Since \\( \mathrm{Var}(k_i) = \mathrm{Var}(q_i) \\), we can also say \\(\mathbb{E}[{k_i}^2] = 1\\)

Putting it all together, we have the variance of a single dot product value!

$$\mathrm{Var}(q_i k_i) = \mathbb{E}[{q_i}^2] \mathbb{E}[{k_i}^2] = 1 \cdot 1 = 1$$

Now we can figure out the overall variance of the dot product:

{% katex(block=true) %}
\begin{aligned}
\mathrm{Var}(qk^{\top}) &= \sum_{i=1}^{d_k} \mathrm{Var}(q_i k_i) \\
&= \sum_{i=1}^{d_k} 1 \\
&= d_k
\end{aligned}
{% end %}

But remember, we're looking for some \\(c\\) so that \\(\mathrm{Var}(qk^{\top} \cdot c) = 1 \\). To do so, we can rearrange the equation and use the variance scaling rule \\(a^2\mathrm{Var}(X) = \mathrm{Var}(aX)\\).

{% katex(block=true) %}
\begin{aligned}
\mathrm{Var}(qk^{\top}) &= d_k \\
\frac{1}{d_k} \mathrm{Var}(qk^{\top}) &= 1 \\
\mathrm{Var}(qk^{\top} \cdot \frac{1}{\sqrt{d_k}}) &= 1 \\
\end{aligned}
{% end %}

And that's our answer! Now you know why we divide by \\(\sqrt{d_k}\\) to normalize the dot product in attention mechanisms.

Thanks to Andrew Gu for reading a draft of this.

[^1]: Interestingly, the way this excerpt is worded implies that they found \\(\frac{1}{\sqrt{d_k}}\\) empirically. I wouldn't be surprised if the authors scaled up the dimension, looked at the dot product values, and thought "hmm yeah, seems to be growing at, like, \\(\sqrt{d_k}\\)".

[^2]: I was inspired to write this post because I saw a [comment on LinkedIn that standardized \\(q_i\\) and \\(k_i\\)](https://www.linkedin.com/feed/update/urn:li:ugcPost:7095298483850481664/?commentUrn=urn%3Ali%3Acomment%3A%28ugcPost%3A7095298483850481664%2C7123707203437355008%29&replyUrn=urn%3Ali%3Acomment%3A%28ugcPost%3A7095298483850481664%2C7133444217841799168%29). This made the math seem simple and satisfying to do!