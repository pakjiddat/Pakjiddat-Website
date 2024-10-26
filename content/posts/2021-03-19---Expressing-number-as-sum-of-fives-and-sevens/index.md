---
title: Expressing numbers as a sum of fives and sevens
date: "2021-03-19"
template: post
draft: false
slug: "/posts/expressing-number-as-sum-of-fives-and-sevens"
category: "discrete mathematics"
tags:
  - "discrete mathematics"
  - "programming problems" 
description: "Recursion is one method for proving statements mathematically. It is a powerful concept that has important applications in Computer Science. In this article I will describe how to use the technique of Recursion to prove a statement mathematically."
---

### Introduction

I recently took the [What is a proof](https://www.coursera.org/learn/what-is-a-proof) course on [Coursera](https://www.coursera.org/) and found it very useful. The course provides useful knowledge about mathematical proofs. I found the course very useful and interesting. In this article I will describe one of the problems that were given to the students to solve. The problem is related to the concept of Recursion.

Recursion is one method for proving statements mathematically. It is a powerful concept that has important applications in Computer Science. In this article I will describe how to use the technique of Recursion to prove a statement mathematically. I will describe two such problems.

### Problem 1

Is is possible to express any number larger than or equal to 8 as a sum of 3s and 5s. For example 8 = 3 + 5, 9 = 3 + 3 + 3, 10 = 5 + 5, 11 = 8 + 3, 12 = 9 + 3, 13 = 10 + 3 and so on.

If we subtract 3 from a given number, we get another number, if we continue subtracting 3 from the number, we will get a number that is either 8, 9 or 10, which we know can be expressed as a sum of 3s and 5s. The process of subtracting 3 from a number is recursive.

### Problem 2

Write a program that takes a number between 24 and 1000 as parameter and returns a list of all combinations of 5s and 7s that when added up gives a result that is equal to the number that was initially passed as argument. Also find the largest number that cannot be expressed as a sum of fives and sevens.

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
