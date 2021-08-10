---
title: Finding numbers between 0 and 9999
date: "2021-07-11"
layout: post
draft: false
path: "/posts/finding-numbers-between-0-9999"
tags:
  - "discrete mathematics"
  - "programming problems" 
description: "Combinatorics is a field of Mathematics that allows us to efficiently count numbers. It includes topics such as probabilities, permutations and combinations. In this article I will describe how to solve a problem in Combinatorics that involves numbers between 0 and 9999."
---

### Introduction

I recently took the [Combinatorics](https://www.coursera.org/learn/combinatorics) course on [Coursera](https://www.coursera.org/). The course provides useful knowledge about counting and probabilities. I found the course very useful and interesting. In this article I will describe one of the problems that were given to the students to solve.

Combinatorics is a field of Mathematics that allows us to efficiently count numbers. It includes topics such as probabilities, permutations and combinations. In this article I will describe how to solve a problem in Combinatorics that involves numbers between 0 and 9999.

The problem is to find out how many numbers between 0 and 9999 inclusive contain exactly one "1" and one "3".

### Solution

Numbers containing one "1" and one "3" that are less than 9999, can have 2, 3 or 4 digits. We need to sum the count of 2 digit, 3 digit and 4 digit numbers that contain exactly one "1" and one "3".

Suppose that we label the digit which does not have the value "1" or "3" as **"c"**. This digit can have the values 0,2,4,5,6,7,8,9.

### Count of two digit numbers

The number of 2 digit numbers that contain exactly one "1" and one "3" are **2**, which are 13 and 31.

### Count of three digit numbers

For 3 digit numbers that contain exactly one "1" and one "3", there is only one digit, c that can have values between 0 and 9 excluding 1 and 3. This digit can be the first digit, second digit or third digit.

If c is the first digit, then the second and third digits can be arranged in two different ways, 1,3 and 3,1. For each possible value of c, there are two possibilities for the remaining digits. The possible values for c are 2,4,5,6,7,8,9. i.e there are 7 options. Notice that 0 is excluded because a 3 digit number cannot start with 0. For each of these 7 options there are 2 ways of arranging the remaining digits so there are 7*2=14 3 digit numbers that start with c.

If c is the second digit, then it can have 8 values which are 0,2,4,5,6,7,8,9. For each value of c, there are two possibilities for the remaining 2 digits. So there are 8*2=16 numbers with c as the second digit.

If c is the third digit, then it can have 8 values which are 0,2,4,5,6,7,8,9. For each value of c, there are two possibilities for the remaining 2 digits. So there are 8*2=16 numbers with c as the third digit.

So in total there are **16+16+14=46**, 3 digit numbers containing exactly one "1" and one "3".

### Count of four digit numbers

Consider the following table. It shows the different possibilities for the four digit numbers. a and b are digits that can be either 1 or 3. c is a number that can have all values between 0 and 9 except for 1 and 3. The table shows the different ways of arranging a, b and c.

| 1 | 3 | c | c | number of results |
| :--- | :--- | :--- | :--- | :---------------------- |
| a | b | c | c | (8*8=64 possibilities) |
| b | a | c | c | (8*8=64 possibilities) |
| c | c | a | b | (7*8=56 possibilities) |
| c | c | b | a | (7*8=56 possibilities) |
| a | c | b | c | (8*8=64 possibilities) |
| b | c | a | c | (8*8=64 possibilities) |
| c | a | b | c | (7*8=56 possibilities) |
| c | b | a | c | (7*8=56 possibilities) |
| c | a | c | b | (7*8=56 possibilities) |
| c | b | c | a | (7*8=56 possibilities) |
| a | c | c | b | (8*8=64 possibilities) |
| b | c | c | a | (8*8=64 possibilities) |

The total is **(64\*6)+(56\*7)=720**. There are **720**, 4 digit numbers that contain exactly one "1" and one "3".

The total count is equal to sum of 2 digit count, 3 digit count and 4 digit count. The total is therefore **2+46+720=768**.

### Code

The following code prints all numbers between 0 and 9999 inclusive that contain exactly one "1" and one "3". It can be used to verify that the total count is 768.

```python

# Takes as input the upper bound for the numbers.
def number_checker(max):
  vc = 0
  for i in range(max):
    a = str(i)
    oc = 0
    tc = 0
    for j in a:
      if j == "1":
        oc += 1;
      elif j == "3":
        tc += 1
    if (tc == 1 and oc == 1):
      vc += 1
      print(i)
  return vc
  
      
vc = number_checker(10000)
print("The number of integers between 0 and 9999 is:", vc)
```
