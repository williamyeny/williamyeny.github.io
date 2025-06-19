+++
title = "A lightweight algorithm to determine if an image is a photo or a screenshot"
date = 2025-06-02
+++

At [Ramp](https://ramp.com/), our customers upload two types of receipt images.

Photos:

{{ image(src="receipt-photo.jpg") }}

And screenshots:

{{ image(src="receipt-screenshot.png") }}

I was bestowed with the privilege of writing an algorithm that distinguishes between these two types.

However, there was one major limitation. I could not use any libraries other than [Pillow](https://pypi.org/project/pillow/). No OpenCV or Tesseract or classification models, just straight rawdogging it.

After a few failed approaches[^1], I came up with a solution that uses color [entropy](<https://en.wikipedia.org/wiki/Entropy_(information_theory)>):

```python
import math
from PIL import Image
from typing import Literal

def is_image_photo_or_screenshot(
    img_path: str
) -> Literal["photo", "screenshot"]:
    with Image.open(img_path) as img:
        if img.mode != "RGB":
            img = img.convert("RGB")
        img.thumbnail(
            (100, 100),
            resample=Image.Resampling.NEAREST,
        )

        total_pixels = img.width * img.height
        colors = img.getcolors(maxcolors=total_pixels) or []

        entropy = 0.0
        for count, _ in colors:
            p = count / total_pixels
            entropy -= p * math.log(p, 2)

        # Normalize to 0.0-1.0 range
        normalized_entropy = entropy / math.log(total_pixels, 2)

        if normalized_entropy > 0.5:
            return "photo"
        return "screenshot"
```

The intuition behind this algorithm is simple. A photo has a large amount of unique colors. Even the blank area of a physical receipt in a photo will have dozens of slightly different whites. The opposite is true of a screenshot -- most of the pixels neatly belong to a handful of colors. This algorithm just measures the distribution of colors.

I ran a test on a small dataset of receipts I prepared:

{{ image(src="photo-screenshot-distribution.png", full_width=true) }}

Looks accurate! It's also quite speedy, due to the trick of downsizing the image to 100x100 pixels[^2].

I quickly shipped this algorithm, and it now runs on the hundreds of millions of receipts Ramp processes a year.

If this sounded interesting to you, [Ramp is hiring](https://ramp.com/careers)!

[^1]: The first approach, originally written by my friend [Yunyu](https://x.com/yunyu_l), measured the percentage of the most common color, since most screenshots are set against a background with a single flat color. However, it struggled with screenshots that had compression artifacts, even after quantizing the colors. I also could not find a reasonable threshold because many screenshots do have two or more background colors. 

[^2]: I was concerned that aggressively downsizing the image would result in too much information loss. Initially, it did ruin the accuracy, but that was because `img.thumbnail`'s default resample method is "bicubic," or `Image.Resampling.BICUBIC`. This meant PIL would generate new colors when downsizing the image, which threw off the algorithm. Changing the method to "nearest neighbor", or `Image.Resampling.NEAREST`, restored the accuracy.
