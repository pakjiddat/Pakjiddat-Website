---
title: Software Development - Quick Tips
date: "2024-11-28"
template: post
draft: false
slug: "/posts/software-development---quick-tips"
category: "software development"
tags:
  - "software development"
description: "Following are some quick tips related to Software Development:"
---

Following are some quick tips related to Software Development:

#### Removing flickering of controls in C# windows forms

In windows forms, when form controls are dynamically resized, they may flicker. The following script can be used to remove flickering of form controls:

```c#
SetDoubleBuffered(formControlVariable);

public static void SetDoubleBuffered(System.Windows.Forms.Control c)
{
    if (System.Windows.Forms.SystemInformation.TerminalServerSession)
        return;
    System.Reflection.PropertyInfo aProp = typeof(System.Windows.Forms.Control).GetProperty("DoubleBuffered", System.Reflection.BindingFlags.NonPublic
        | System.Reflection.BindingFlags.Instance);
    aProp.SetValue(c, true, null);
}
```
