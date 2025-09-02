+++
title = "Shifting bits for the first time in company history"
date = 2025-09-02
+++

I'm excited and humbled to announce that I'm the first person to add non-trivial bit shift code to [Ramp](https://ramp.com/)'s codebase.

At Ramp, I'm responsible for determining if a user-uploaded business receipt matches the transaction information on our end. One of the heuristics we use is if the amount on the receipt is the same as the transaction's amount.

But it's not as simple. We'd still want to check if any combination of line item amounts on the receipt add up to the transaction amount.

For example, given a receipt like so:

```
Sept. 2 2025
Agu's Coffee And Books
---
Matcha Latte..................$10
Feminism is for Everybody.....$15
Labubu......................$1000
---
Total: $1025
```

The transaction amount $1010 *could* still be a match -- $10 + $1000 = $1010.

So how do we determine if any combination of numbers could sum up to a certain number?

This is a [subset sum problem](https://en.wikipedia.org/wiki/Subset_sum_problem). And apparently, the fastest implementations use bit shifting.

```python
def subset_sum(nums: list[int], target: int) -> bool:
    # "ChatGPT, write the most efficient subset sum algorithm
    # in Python that handles negatives, make no mistakes."

    if len(nums) > 100:
        # Fuck it, *O(1)s your algorithm*
        return False

    nums = list(nums)
    neg_sum = sum(x for x in nums if x < 0)
    pos_sum = sum(x for x in nums if x > 0)
    if target < neg_sum or target > pos_sum:  # impossible
        return False

    # Offset so lowest possible sum is 0
    offset = -neg_sum
    bits = 1 << offset

    # DP via bit‑shifts
    for x in nums:
        bits |= bits << x if x >= 0 else bits >> -x

    return (bits >> (target + offset)) & 1 == 1
```

Sure, I didn't write most of it, but it still counts for something, right?
