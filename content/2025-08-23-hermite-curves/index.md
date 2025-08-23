+++
title = "Hermite curves demystified"
date = 2025-08-23
+++

At some point, it became very useful to draw curves on the computer -- CAD, animation, video games, and more.

{{ image(src="frog-curve.png") }}

A simple curve can be defined just by the start point, end point, and the slopes of the curve at the two points. This is called a Hermite curve!

{{ image(src="hermite-curve.png") }}

Let's say we want to actually implement the Hermite curve on a computer. How would we do that?

We'd need to define some sort of function that takes in the points and slopes as parameters, and when given an X coordinate, spits out a Y coordinate.

But what _kind_ of function?

It can't be a linear function, or \\(y = ax + b\\). There's no curve!

It can't be a quadratic function, or \\(y = ax^2 + bx + c\\). It can only open one way.

Therefore, it has to be a cubic function, or \\(y = ax^3 + bx^2 + cx + d\\)!

Notice how \\(a\\), \\(b\\), \\(c\\), and \\(d\\) gives us 4 degrees of freedom. This makes sense since we have 4 parameters: start point, end point, slope at start point, and slope at end point. We'll call these parameters \\(S\\), \\(E\\), \\(S'\\), and \\(E'\\).

Let's find \\(a\\), \\(b\\), \\(c\\), and \\(d\\) in terms of \\(S\\), \\(E\\), \\(S'\\), and \\(E'\\)!

But first, let's make our lives easier by squishing (or expanding) \\(x\\) into a range between 0 and 1. We'll call the new variable \\(t\\) and call the function \\(H(t)\\).

{{ image(src="squished.png") }}

{% katex(block=true) %}
\begin{aligned}
H(t) &= at^3 + bt^2 + ct + d
\end{aligned}
{% end %}

Now, since the start point's \\(x\\) is at \\(t = 0\\), we can just plug in 0 to find the start point's \\(y\\):

{% katex(block=true) %}
\begin{aligned}
S_y &= H(0) \\
&= a(0)^3 + b(0)^2 + c(0) + d \\
&= d
\end{aligned}
{% end %}

We can do the same for \\(E\\), whose \\(x\\) is at \\(t = 1\\).

{% katex(block=true) %}
\begin{aligned}
E_y &= H(1) \\
&= a(1)^3 + b(1)^2 + c(1) + d \\
&= a + b + c + d
\end{aligned}
{% end %}

Easy so far, but what about the slopes \\(S'\\) and \\(E'\\)? Simple -- find the derivative of \\(H(t)\\)!

{% katex(block=true) %}
\begin{aligned}
H(t) &= at^3 + bt^2 + ct + d \\
H'(t) &= 3at^2 + 2bt + c
\end{aligned}
{% end %}

Now we can do the same thing as we did with the points, plugging in 0 and 1 to find the start and end slopes.

{% katex(block=true) %}
\begin{aligned}
S' &= H'(0) \\
&= 3a(0)^2 + 2b(0) + c \\
&= c
\end{aligned}
{% end %}

{% katex(block=true) %}
\begin{aligned}
E' &= H'(1) \\
&= 3a(1)^2 + 2b(1) + c \\
&= 3a + 2b + c
\end{aligned}
{% end %}

Let's not forget our goal -- finding \\(a\\), \\(b\\), \\(c\\) in terms of the parameters.

Well, we know \\(d = S_y\\) and \\(c = S'\\), but what about \\(a\\) and \\(b\\)?

It's just a matter of solving the system of equations! Let's start plugging in random bullshit.

Isolate \\(b\\):

{% katex(block=true) %}
\begin{aligned}
E_y &= a + b + c + d \\
&= a + b + S' + S_y \\
b &= E_y - a - S' - S_y
\end{aligned}
{% end %}

Find \\(a\\), plugging in \\(b\\):

{% katex(block=true) %}
\begin{aligned}
E' &= 3a + 2b + c \\
&= 3a + 2b + S' \\
&= 3a + 2(E_y - a - S' - S_y) + S' \\
&= 3a + 2E_y - 2a - 2S' - 2S_y + S' \\
&= a + 2E_y - 2S' - 2S_y + S' \\
a &= E' - 2E_y + S' + 2S_y
\end{aligned}
{% end %}

Find \\(b\\), plugging in \\(a\\):

{% katex(block=true) %}
\begin{aligned}
b &= E_y - a - S' - S_y \\
&= E_y - (E' - 2E_y + S' + 2S_y) - S' - S_y \\
&= 3E_y - E' - 2S' - 3S_y
\end{aligned}
{% end %}

Finally, we can construct the final equation:

{% katex(block=true) %}
\begin{aligned}
H(t) &= at^3 + bt^2 + ct + d \\
&= (E' - 2E_y + S' + 2S_y)t^3 \\
&\quad+ (3E_y - E' - 2S' - 3S_y)t^2 \\
&\quad+ S't \\
&\quad+ S_y
\end{aligned}
{% end %}

That's it! Using this formula and \\(S\\), \\(E\\), \\(S'\\), and \\(E'\\), we can input an X coordinate and find the Y coordinate of the curve.

(Note that we'll have to convert the X coordinate to \\(t\\), our squished variable:)

{% katex(block=true) %}
\begin{aligned}
t &= \frac{x - S_x}{E_x - S_x}
\end{aligned}
{% end %}

We're pretty much done, but let's rearrange the formula so it's in terms of \\(S\\), \\(E\\), \\(S'\\), and \\(E'\\):

{% katex(block=true) %}
\begin{aligned}
H(t)
&= (E' - 2E_y + S' + 2S_y)t^3 \\
&\quad+ (3E_y - E' - 2S' - 3S_y)t^2 \\
&\quad+ S't \\
&\quad+ S_y \\[6pt]

&= E't^3 - 2E_yt^3 + S't^3 + 2S_yt^3 \\
&\quad+ 3E_yt^2 - E't^2 - 2S't^2 - 3S_yt^2 \\
&\quad+ S't \\
&\quad+ S_y \\[6pt]

&= \big(2t^3 - 3t^2 + 1\big)S_y \\
&\quad+ \big(t^3 - 2t^2 + t\big)S' \\
&\quad+ \big(-2t^3 + 3t^2\big)E_y \\
&\quad+ \big(t^3 - t^2\big)E'
\end{aligned}
{% end %}

If you look up the Hermite curve elsewhere, it'll probably be in this format. The four "coefficients", \\(2t^3 - 3t^2 + 1\\), \\(t^3 - 2t^2 + t\\), \\(-2t^3 + 3t^2\\), and \\(t^3 - t^2\\), are known as the Hermite basis functions.

Now, you might be wondering, "b-b-b-ut what about Bézier curves?"

They're actually closely related. In fact, it's pretty simple to convert a Hermite curve into a cubic Bézier curve. Just take the slopes and extend them to control points, and presto! The formula of a cubic Bézier curve is left as an exercise to the reader :)
