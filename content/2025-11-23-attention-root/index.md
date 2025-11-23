+++
title = "Why do we normalize by the root of the dimension in attention?"
date = 2025-11-23
+++

This is _attention_, a key part of modern LLMs such as ChatGPT:

$$
\mathrm{Attention}(Q, K, V) = \mathrm{softmax}\left(\frac{QK^{\top}}{\sqrt{d_k}}\right)V
$$

Hopefully you already have some idea of [how attention works](youtube.com/watch?v=eMlx5fFNoYc), because I'm not going to break down every part.

I want to point at this interesting part: why are we dividing by \\(\sqrt{d_k}\\)?

The original paper, [Attention Is All You Need](https://arxiv.org/pdf/1706.03762), explains it like so:

> While for small values of \\(d_k\\) the two mechanisms perform similarly, additive attention outperforms
> dot product attention without scaling for larger values of \\(d_k\\). We suspect that for large values of
> \\(d_k\\), the dot products grow large in magnitude, pushing the softmax function into regions where it has
> extremely small gradients. To counteract this effect, we scale the dot products by \\(\frac{1}{\sqrt{d_k}}\\).

Basically, as the dimension of \\(K\\) increase, the dot product values become too extreme (\\(QK^{\top}\\) is just the dot product of \\(Q\\) and \\(K\\)). To fix this, those values are scaled down using \\(\sqrt{d_k}\\).

That's fine and all, but why \\(\sqrt{d_k}\\) in particular? Why not just \\(d_k\\), or some other manipulation of \\(d_k\\)?

We can figure this out using a bit of math!

To make our lives easier, let's standardize \\(K\\) and \\(Q\\) to have a mean of 0 and a variance of 1:

{% katex(block=true) %}
\begin{aligned}
\mathbb{E}[K] &= 0 \qquad & \mathbb{E}[Q] &= 0 \\
\mathrm{Var}(K) &= 1 \qquad & \mathrm{Var}(Q) &= 1
\end{aligned}
{% end %}

The goal: we want to find some factor \\(c\\) that scales the dot product so that the overall variance is the same as the variance of the inputs to the dot product: \\(\mathrm{Var}(QK^{\top} \cdot c) = \mathrm{Var}(K) = \mathrm{Var}(Q) = 1\\).

The dot product is just the sum of the elements from \\(Q\\) multiplied by elements of the same index from \\(K\\). This means the variance of the dot product is the sum of the sum of the variances of its products.

{% katex(block=true) %}
\begin{aligned}
\mathrm{Var}(QK^{\top}) &= \mathrm{Var}\left(\sum_{i=1}^{d_k} q_i k_i\right) \\
&= \sum_{i=1}^{d_k} \mathrm{Var}(q_i k_i) \\
\end{aligned}
{% end %}

Note that \\(d_q = d_k\\) (you can only dot product vectors of equal dimensions), so we could also say  \\(QK^{\top} = \sum\_{i=1}^{d_q} q_i k_i\\).

Let's use the definition of variance, \\(\mathrm{Var}(X) = \mathbb{E}[X^2] - \mathbb{E}[X]^2\\), to break down \\(\mathrm{Var}(q_i k_i)\\):

$$ \mathrm{Var}(q_i k_i) = \mathbb{E}[{q_i}^2 {k_i}^2] - \mathbb{E}[q_i k_i]^2 $$

Now we can use the expected value of the product of two independent variables, \\(\mathbb{E}[XY] = \mathbb{E}[X] \mathbb{E}[Y]\\) to break it down further:

{% katex(block=true) %}
\begin{aligned}
\mathrm{Var}(q_i k_i) = \mathbb{E}[{q_i}^2] \mathbb{E}[{k_i}^2] - (\mathbb{E}[q_i]\mathbb{E}[k_i])^2
\end{aligned}
{% end %}

But notice how \\(K\\) and \\(Q\\) have a mean of \\(0\\), so the second part zeroes out!

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
\mathrm{Var}(QK^{\top}) &= \sum_{i=1}^{d_k} \mathrm{Var}(q_i k_i) \\
&= \sum_{i=1}^{d_k} 1 \\
&= d_k
\end{aligned}
{% end %}

But remember, we're looking for some \\(c\\) so that \\(\mathrm{Var}(QK^{\top} \cdot c) = 1 \\). To do so, we can rearrange the equation and use the variance scaling rule \\(\mathrm{Var}(aX) = a^2\mathrm{Var}(X)\\).

{% katex(block=true) %}
\begin{aligned}
\mathrm{Var}(QK^{\top}) &= d_k \\
\frac{1}{d_k} \mathrm{Var}(QK^{\top}) &= 1 \\
\mathrm{Var}(QK^{\top} \cdot \frac{1}{\sqrt{d_k}}) &= 1 \\
\end{aligned}
{% end %}

And that's our answer! Now you know why we divide by \\(\sqrt{d_k}\\) to normalize the dot product in attention mechanisms.