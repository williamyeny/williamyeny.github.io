+++
title = "A simple performance optimization for softmax, explained"
date = 2025-11-25
+++

The softmax function is used frequently in neural networks, such as within large language models like ChatGPT. It converts a list of numbers into a probability distribution, with the values adding up to 1.

{% katex(block=true) %}
\begin{aligned}
x &= [5,\;7,\;8] \\
\mathrm{softmax}(x) &\approx [0.035,\; 0.259,\; 0.706]
\end{aligned}
{% end %}

Softmax does this by exponentiating each value and then dividing by the sum of all the exponentiated values.

{% katex(block=true) %}
\begin{aligned}
\mathrm{softmax}(x)_i = \frac{e^{x_i}}{\sum_{j=1}^{K} e^{x_j}}
\end{aligned}
{% end %}

Using the previous example, here is how the softmax was computed:

{% katex(block=true) %}
\begin{aligned}
x &= [5,\;7,\;8] \\
\mathrm{softmax}(x) &= \left[
\frac{e^5}{e^5 + e^7 + e^8},\;
\frac{e^7}{e^5 + e^7 + e^8},\;
\frac{e^8}{e^5 + e^7 + e^8}
\right]
\end{aligned}
{% end %}

Obviously, softmax uses many base \\(e\\) operations! 

However, in real world implementations, [softmax is modified to use base 2 instead of base \\(e\\)](https://x.com/cHHillee/status/1993024196872749339) because computers are much faster at computing base 2 operations compared to base \\(e\\):

> This is a standard optimization in FlashAttention, where the softmax exponents are a non-negligible cost of the inner loop. It rescales the inputs by 1/ln2 so that you can directly use exp2 instead of exp.

So how do we convert the base \\(e\\) to base 2? We could just use the exponential base change formula[^1], but it's fun (and satisfying) to derive it ourselves.

We want to find some expression \\(y\\) so that \\(e^x = 2^y\\). We'll take the natural log of both sides to cancel out the \\(e\\) and use the logarithmic power rule to bring the \\(y\\) out.

{% katex(block=true) %}
\begin{aligned}
e^x &= 2^y \\
\ln(e^x) &= \ln(2^y) \\
x &= \ln(2^y) \\
x &= y \ln 2 \\
y &= \frac{x}{\ln 2}
\end{aligned}
{% end %}

We can now plug \\(y\\) back in: 

{% katex(block=true) %}
\begin{aligned}
e^x &= 2^y \\
e^x &= 2^{x/\ln 2}
\end{aligned}
{% end %}

So that's why FlashAttention scales inputs by \\(1/\ln 2\\)!

[^1]: \\(a^b = c^{b \log_c a}\\)
