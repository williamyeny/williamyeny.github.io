---
layout: post
title: "Finding the right grow light for an indoor plant -- a plant-first approach"
description:
date: 2025-01-24 12:00:00 +0000
---

I have a small collection of cacti. Given how I live in New York City and keeping them outside isn't an option, I've had to grow them indoors.

![My cacti](/assets/cacti.JPEG){:.w50}

When shopping for a grow light, I decided to avoid buying the first thing on Amazon or checking Reddit for recommendations. Instead, I choose to start with the plant.

# What is the plant and how much sun does it need?

Before we even think about buying a grow light, our first goal should be figuring out how much sun the plant needs.

I mostly own a species of cacti called [Trichocereus pachanoi](https://en.wikipedia.org/wiki/Trichocereus_macrogonus_var._pachanoi) (colloquially known as "San Pedro").

To figure out how much sun the species needs, we need to find its habitat. Some quick research shows that the plant is native to Ecuador, Peru, and Colombia, specifically the mountainous region.

![San Pedro habitat](/assets/trich-habitat.png)

Now, we need to find the [daily light integral (DLI)](https://en.wikipedia.org/wiki/Daily_light_integral) of those regions. DLI measures the amount of _photosynthetically active photons_ per day, or how much plant-usable sunlight hits the ground.

With another quick search on Google, we can find [the DLI values on a map](https://horti-generation.com/daily-light-integral-interactive-tool/):

![Colombia/Ecuador DLI values](/assets/dli-values.png){:.75}

However, don't forget we're looking for the _mountainous_ regions. Looking at the map, we can say that 30-38 mols/m^2/day is a good starting point.

# Converting DLI to PPFD

The nice part about DLI is that we can convert it to photosynthetic photon flux density (PPFD), and we can use PPFD evaluate grow lights by.

Before we calculate the PPFD, we'll need to think the photoperiod. You can think about it as "how long do I want my grow light on a day?", but don't forget that the shorter the photoperiod, the more intense the light will have to be. I chose 12 hours.

Now, let's convert the 30-38 DLI to PPFD using an [online calculator](https://www.nexsel.tech/how-to-calculate-ppfd-from-dli.php).

![30 DLI conversion](/assets/30-dli.png){:.w50}

![38 DLI conversion](/assets/38-dli.png){:.w50}

Now that we have our PPFD value range of 700-880, we can go ahead and shop for grow lights!

# Buying a grow light using PPFD

When looking for a grow light online, the manufacturer should have a PPFD chart in the listing:

![PPFD chart](/assets/growlight-ppfd.png){:.75}

If you don't see this chart, don't buy!

There are a couple things to look out for. We need to note how much of an area this grow light covers, and how far above our plants we should mount the grow light. All these are noted in the image.

![PPFD chart annotated](/assets/growlight-ppfd-annotated.png){:.50}

Looking at the PPFD values in the chart, our plants would be happy for the most part, but they might not get enough light if we put them in the outer areas:

![PPFD chart annotated](/assets/growlight-ppfd-outer.png){:.50}

We can look for another grow light with higher PPFD values, but there are tricks we can do.

First, we can recalculate the PPFD values with a longer photoperiod, which should result in a lower PPFD requirement.

We can also "increase" light output by reducing the height at which grow light is mounted. Be careful as this also reduces the effective grow area, and you may accidentally add _too_ much light due to the [inverse-square law](https://en.wikipedia.org/wiki/Inverse-square_law).

# Putting it all together

Now all we have to do buy the grow light and follow all the information we gathered. In this case, we'll have our plants in a 2x2 foot area, mount the grow light 12 inches above the plants, and have the grow light on for 12 hours a day. However, we did see that plants on the outer areas may be a little more starved for light, so we may consider lowering the grow light to 10 inches and/or increasing photoperiod to 14 hours.

# Caveats and tips

- Artifical lighting is not the same as real sunlight (e.g., UV). I'm not 100% sure of how it affects plant growth, but some manufacturers are adding UV cells to their lights and claiming it helps significantly. My recommendation is to overshoot the PPFD a bit just to be safe.
- Some grow lights have a knob that adjusts intensity. When you see a PPFD chart, assume that the knob is turned all the way to the highest intensity.
- Some manufacturers are not super honest about their PPFD ratings. You can find [3rd party tests](https://youtu.be/TmpQ7TO-szA?si=he8AFGRNag8EPOI8&t=167) or test the PPFD yourself using a light meter or phone app.
- Do NOT buy those stupid purple lights. They do not work.
- If your grow light doesn't come with a timer, you'll need to purchase an [outlet timer](https://www.amazon.com/Century-Indoor-24-Hour-Mechanical-Outlet/dp/B01LPSGBZS)
