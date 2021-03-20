---
title: Expressing numbers as a sum of fives and sevens
date: "2021-03-19"
layout: post
draft: false
path: "/posts/expressing-number-as-sum-of-fives-and-sevens"
tags:
  - "algorithms"
description: "I recently took a course on Coursera titled: Mathematical Thinking in Computer Science. As part of the course, we were asked to solve a problem that involved expressing a number as a sum of fives and sevens. This problem is related to recursion. In this article I will describe the problem and my attempt at solving it."
---

### Introduction

I recently took a course on Coursera titled: "Mathematical Thinking in Computer Science". As part of the course, we were asked to solve a problem that involved [expressing a number as a sum of fives and sevens](https://coursera.org/share/017661ca94d10a999503f953dfa0334d). This problem is related to recursion. In this article I will describe the problem and my attempt at solving it.

In a lecture video, we were told that it is possible to express any number larger than or equal to 8 as a sum of 3s and 5s. For example 8 = 3 + 5, 9 = 3 + 3 + 3, 10 = 5 + 5, 11 = 8 + 3, 12 = 9 + 3, 13 = 10 + 3 and so on. If we subtract 3 from a given number, we get another number, if we continue subtracting 3 from the number, we will get a number that is either 8, 9 or 10, which we know can be expressed as a sum of 3s and 5s. The process of subtracting 3 from a number is recursive.

We were then asked to solve a programming task. In the programming task we are asked to create a function that takes a number between 24 and 1000 as parameter and returns a list of all combinations of 5s and 7s that when added up gives a result that is equal to the number that was initially passed as argument. Also we were asked to find the largest number that cannot be expressed as a sum of fives and sevens.

### Solution

If we can find 5 consecutive numbers that can be expressed as a sum of 5s and 7s, then we can express any number larger than the 5 consecutive numbers as a sum of 5s and 7s. We can do this by subtracting 5 from this number until it is equal to one of the 5 consecutive numbers.

Since we can express the 5 consecutive numbers: 24, 25, 26, 27, 28 as a sum of 5s and 7s, we can express any number larger than 28 as a sum of 5s and 7s. So the largest number that cannot be expressed as a sum of 5s and 7s must be 23.

The following code can be used to express any number between 24 and 1000 as a sum of fives and sevens:

```python

# Main function that is used to express the given number as a sum of fives and sevens
def change(amount):
  
  if amount == 24:
    return [5, 5, 7, 7]
    
  # complete this method
  
  if amount == 25:
    return [5, 5, 5, 5, 5]
  if amount == 26:
    return [7, 7, 7, 5]
  if amount == 27:
    return [5, 5, 5, 5, 7]    
  if amount == 28:
    return [7, 7, 7, 7]    
            
  assert(amount >=24 and amount <=1000)
  
  coins = change(amount-5)
  coins.append(5)
  
  return coins
  
# Express 50 as a sum of fives and sevens
coins = change(50)
# Print the result
print(coins)
```
