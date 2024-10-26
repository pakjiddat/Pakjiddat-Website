---
title: Understanding Meltdown and Spectre vunerabilities
date: "2018-01-28"
template: post
draft: false
slug: "/posts/understanding-meltdown-and-spectre-vunerabilities"
category: "cyber security"
tags:
  - "cyber security"
description: "Meltdown and Spectre are hardware vulnerabilities that affect all microprocessors based on Intel and some based on ARM and AMD."
---

### Introduction
[Meltdown](https://en.wikipedia.org/wiki/Meltdown_(security_vulnerability)) and [Spectre](https://en.wikipedia.org/wiki/Spectre_(security_vulnerability)) are hardware vulnerabilities that affect all microprocessors based on Intel and some based on ARM and AMD.

The vulnerabilities have been under research since last several years but were made public in January 2018. Security experts consider the threats posed by these vulnerabilities as very severe.

### Virtual Memory and Paging Tables
In order to understand the Meltdown and Spectre vulnerabilities, it is helpful to know technical terms such as Virtual Memory and Paging. [Virtual Memory](https://en.wikipedia.org/wiki/Virtual_memory) is a contiguous address space that is used by processes.

It works as an abstraction layer over physical memory. It gives each process, the impression that it is the only process running on the system. Even though each process has its own virtual memory space, the physical address space of processes may overlap.

Virtual Memory is mapped to physical memory using paging tables. It is maintained by the operating system. Depending on the operating system, all processes may share a paging table or each process can have its own paging table.

Data is read in fixed sized blocks called pages from I/O devices and loaded to memory. If a process needs access to data and there is not enough memory to store the data, then existing pages of data are written back to the I/O device and the required data is read and stored in memory. This is called swapping.

Thrashing is said to occur, when a process repeatedly swaps data in and out of memory because of insufficient physical memory. It can be prevented by adding more memory or by optimizing the application or operating system

### The Meltdown vulnerability
Meltdown vulnerability allows a process to access memory location that is is not authorized to access. An example of an attack based on meltdown is as follows:

* A rouge process uses indirect addressing to access a memory location. The instruction consists of a base value, for example 5000 and a memory address for example 2000. This address is out of bound to the process. The contents of this address is 4 and has size of 1 byte. The indirect instruction is therefore supposed to fetch the contents of memory location 5004.

* When the CPU tries to fetch the contents of a memory location, it has to check whether the process should have access to this location. However this check which is known as a privilege check is performed in parallel with the memory fetch operation in order to speed up instruction execution.

As part of the memory fetch operation, the contents of the memory which is 4 is saved to the CPU cache. The next time address 5004 needs to be read, its value will be read and saved to cache before the privilege check completes. The read instruction itself fails and the process never gets direct access to memory location 2000 or the contents of the CPU cache.

* The rouge process then uses a cache timing attack which is a form of [side channel attack](https://en.wikipedia.org/wiki/Side-channel_attack) to determine that request for address 5004 takes less time to return as compared with requests for other addresses. The process can then conclude that memory location 2000 contains the value 4, even though the location is out of bounds to the process.

### The Spectre Vulnerability
The Spectre vulnerability is based on exploiting the side affects of **speculative execution**, in particular **branch prediction** which is a special case of speculative execution.

Speculative execution is an optimization technique that is used to complete work before it is known that the work is needed or not. Branch prediction is used by the CPU to predict the outcome of a condition which results in execution of a certain block of code. Unlike Meltdown, Spectre is based on a more general concept and is more difficult to protect against.

### Which devices can be affected?
The Meltdown and Spectre vulnerabilities affect all servers, desktops, laptops, mobiles and embedded devices. Cloud service providers are affected by Meltdown in a limited way.

The Meltdown vulnerability allows rouge processes running on the host to access guest virtual machines, but does not allow guest virtual machines to access other guests or the host.

Web Browsers that use Just In Time (JIT) JavaScript compilation which include all modern web browsers can be affected by Meltdown and Spectre. For example Meltdown can be used by a website to determine the information of another website that has been loaded by a user in a different tab.

### Steps taken to mitigate the affects of Meltdown and Spectre
Kernel Page Table Isolation (KPTI) is a measure taken to reduce the impact of Meltdown. It involves isolating kernel memory from user mode processes. KPTI patches have been developed for the Linux Kernel 4.15 and also for older versions of the kernel. These patches have been merged with the main kernel.

The KPTI patches have been developed by all major Linux vendors including RedHat. Apple and Microsoft have also released security updates containing KPTI patches.

The KPTI patches are known to reduce computer performance. However the performance impact affects certain workloads more than others. For example the performance of I/O intensive applications such as PostGres database server is more affected by KPTI patches.

### Conclusion
The Meltdown and Spectre vulnerabilities are serious threats which affect almost all microprocessors. No known threats based on these vulnerabilities have yet been discovered. Given the severity of the threats, attacks based on Meltdown and Spectre may soon surface.

Proof of concept code which demonstrates Meltdown and Spectre is already available publicly. Attacks based on Meltdown cannot be detected. Attacks based on Spectre are even more difficult to predict and affect a wider range of devices.
