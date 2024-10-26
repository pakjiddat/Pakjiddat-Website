---
title: Counting problems
date: "2021-07-26"
template: post
draft: false
slug: "/posts/counting-problems"
category: "discrete mathematics"
tags:
  - "discrete mathematics"
  - "programming problems" 
description: "Combinatorics is a field of Mathematics that allows us to efficiently count numbers. It includes topics such as probabilities, permutations and combinations. It has applications in many areas outside Mathematics. In this article I will describe some problems related to Combinatorics."
---

### Introduction

I recently took the [Combinatorics](https://www.coursera.org/learn/combinatorics) course on [Coursera](https://www.coursera.org/). The course provides useful knowledge about counting and probabilities. I found the course very useful and interesting. In this article I will describe some problems that were given to the students to solve.

Combinatorics is a field of Mathematics that allows us to efficiently count numbers. It includes topics such as probabilities, permutations and combinations. It has applications in many areas outside Mathematics. In this article I will describe some problems related to Combinatorics.

Problems related to permutations and combinations can be grouped as ordered or unordered. They may or may not involve repetitions. There are four main categories of problems. These are ordered with repetitions, ordered without repetitions, unordered with repetitions and unordered without repetitions. For each category there is a formula, which can be used to solve the problem.

Combinations are arrangement of unordered items. They may or may not involve repetitions. Permutations are arrangement of ordered items without repetitions. Tuples are arrangement of items with repetitions.

The formula for combinations without repetitions is **n!/k!*(n-k)!**, where n is the number of items and k is the number of selections. The formula for combinations is often stated as n choose k.

The formula for combinations with repetitions is **(n+k-1)!/(n-1)!*(k)!**, where n is the number of items and k is the number of selections.

The formula for permutations is **n!/(n-k)!**, where n is the number of items and k is the number of selections.

The formula for tuples is **n^k**, where n is the number of items and k is the number of selections.

### Problem 1

How many binary strings of length 6 can be created containing equal number of 0s and 1s.

The binary string of length 6 can be regarded as 6 distinct positions or indexes. These need to be selected 3 at a time. There are 3 selections and 6 items. The indexes are unique so there are no repetitions. Also the selection of the index numbers is unordered. So we can use the formula for combinations without repetitions, which is **n!/k!*(n-k)!**.

This is equal to **6!/3!*(6-3)!** which is equal to **20**.

The result can be verified using the following Python script. The script finds all binary numbers of length 6. For each number if the number of 0s and 1s is equal it increases the value of a counter.

```python
def bin_comb():
    """Returns the number of 6 bit binary strings that contain equal number of 
    0s and 1s.
    """
    
    # The number of binary strings of length 6 that contain equal number of
    # zeros and ones.
    count = 0
    # Each number from 0 to 63 is converted to a binary string
    for i in range(64):
        # Convert to binary string
        num = str(bin(i)).replace("0b", "")
        # The number is right padded so the total string length is 6
        num = num.zfill(6)
        # If the number of zeros and ones is equal
        if num.count("0") == num.count("1"):
            count += 1
            
    return count            
        
# The number of binary strings of length 6 that contain equal number of
# zeros and ones.        
count = bin_comb()        
print(count)
```

### Problem 2

How many 6 digit numbers are there with equal number of even and odd digits. Each digit can have a value from 0 to 9.

This problem is similar to the previous problem with two main differences. First each position can be occupied by 5 values. Second a number cannot start with 0.

First we consider the number of 6 digit numbers with 3 even digits and 3 odd digits. This is same as the number of binary strings of length 6 with 3 0s and 3 1s.

So there are 20, 6 digit numbers with equal number of even and odd digits. However for each combination of 3 even and 3 odd digits, each digit can have 5 different values. An odd digit can have the values **1,3,5,7,9** and the even digit can have the values **0,2,4,6,8**. So the total number of 6 digit numbers is **20*(5^6)**. But this will include numbers that start with 0, which are not valid. So we need to consider the number of 6 digit numbers that start with an odd digit and the number of 6 digit numbers that start with an even digit.

The number of 6 digit numbers that start with an even digit is simply 5 choose 2. This is because, the left most position is even and there are 5 positions left. 3 of these are odd and 2 are even. So the number of 6 digit numbers that start with an even digit is **5!/3!\*2!**. This is equal to 10. For the left most digit, there are 4 possibilities, which are **2,4,6 and 8**. For the other digits there are 5 possibilities for each position. So the total count of all 6 digit numbers that start with an even digit is **10\*4\*5^5 = 125000**.

The number of 6 digit numbers that start with an odd digit is equal to the number of 6 digit numbers minus the number of 6 digit numbers that start with an even digit. This is equal to **20-10 = 10**. Each position can have 5 different values. So the total count of all 6 digit numbers that start with an odd digit is **10*5^6 = 156250**.

The total count of all 6 digit numbers that contain 3 even digits and 3 odd digits is **156250+125000 = 281250**.

This can be verified using the following Python script. The script checks all numbers between **100,000** and **999,999**. For each number it counts the number of even and odd digits. If these are equal, then the script increases the value of a counter.

```python

def get_even_odd_count():
    """Returns the count of all 6 digit numbers with equal number of even and
    odd numbers. Each digit can have a value from 0 to 9.
    """
    
    # The number of 6 digit numbers with equal number of even and odd digits
    count = 0
    # All numbers between 1000000 and 1000000 are checked
    for i in range(100000, 1000000):
        # i is converted to string
        s = str(i)
        # The count of even number of digits
        ec = s.count("0") + s.count("2") + s.count("4") + s.count("6")
        ec += s.count("8")
        # The count of odd number of digits
        oc = s.count("1") + s.count("3") + s.count("5") + s.count("7")
        oc += s.count("9")  
        # If the number of even and add digits is equal
        if ec == oc:
            count += 1
            # print(s)
            
    return count
        
        
# The number of all 6 digit numbers with equal number of even and odd digits
count = get_even_odd_count()
print(count)    
```

### Problem 3

What will the following program print?

```python
n = 10
count = 0

for i in range(n):
    for j in range(n):
        for k in range(n):
            if i < j and j < k:
                count += 1

print(count)
```

The above code should print the number of all combinations of i, j and k such that **i < j < k**, where i, j and k are between 0 and 9.

If we consider the following table:

| i | j | k | total count |
| :--- | :--- | :--- | :--- | :---------------------- |
| 0 | (1,2,3,4,5,6,7,8) | (8,7,6,5,4,3,2,1) | 36 |
| 1 | (2,3,4,5,6,7,8) | (7,6,5,4,3,2,1) | 28 |
| 2 | (3,4,5,6,7,8) | (6, 5, 4, 3, 2, 1) | 21 |
| 3 | (4,5,6,7,8) | (5, 4, 3, 2, 1) | 15 |
| 4 | (5,6,7,8) | (4, 3, 2, 1) | 10 |
| 5 | (6,7,8) | (3, 2, 1) | 6 |
| 6 | (7, 8) | (2, 1) | 3 |
| 7 | (8) | (1) | 1 |

The first column is the possible values for i. The second column contains the possible value for j for the given value of i, such that i < j. The third column contains for each value of i and j, the number of possible values for k, such that j < k. The forth column contains the total number of values for k. It is the sum of the values in the k column. The sum of the total count column is the required result.

The total is **36 + 28 + 21 + 15 + 10 + 6 + 3 + 1 = 120**.

The values in the fourth column may be represented with the formula: **sigma(1, n+k-2)**, where **n = 10** and **k** is the position number or the value of i. k has 8 values in total, which is equal to n-2. So the following formula gives the total number of combinations: **sigma(1, n-2)sigma(1, n+k-2)**. Where the sigma functions are nested. This mean that each value for the outer sigma function is a value for k in the inner sigma function. n has the constant value of 10.

This formula can be useful for large values of n. The following Python script uses this formula to find all combinations where **i < j < k, for n = 1000**.

```python
def seq_sum(n):
    """Returns the sum of the first k natural numbers where k is from 0 to n-2.
    """
    
    sum = 0
    for k in range(1, n-1):
        sum = sum + k*(k+1)/2
    return sum
    
# The value of n    
n = 1000
# The sum of the sequence
s = seq_sum(n)
# The output is displayed
print("The number of combinations that satisfies i < j < k = ", s)
```
