---
title: Configuring the GamiPress WordPress plugin
date: "2019-09-19"
layout: post
draft: false
path: "/posts/configuring-the-gamipress-wordpress-plugin"
tags:
  - "wordpress"
description: "GamiPress is a WordPress plugin that allows adding Gamification features to a WordPress website. It is free and open source. The main features of GamiPress are free but some of the addons, service plans and assets are priced."
---

### Introduction
[GamiPress](https://wordpress.org/plugins/gamipress/) is a WordPress plugin that allows adding [Gamification](https://en.wikipedia.org/wiki/Gamification) features to a WordPress website. It is free and open source. The main features of GamiPress are free but some of the addons, service plans and assets are priced.

GamiPress provides a system for awarding points based on actions taken on the WordPress website. GamiPress supports Points, Achievements and Ranks for awarding users. It also allows displaying reports on the points, ranks and achievements earned by the users.

GamiPress provides integrations with a number of well known WordPress plugins such as Forminator, LearnDash, WP-PostRatings, BuddyPress and more. Most of these integrations are free. GamiPress also provides [add-ons](https://gamipress.com/add-ons/), such as frontend reports, Conditional Emails, Extended REST API, Coupons and more.

The [GamiPress website](https://gamipress.com/) and the [GamiPress documentation](https://gamipress.com/docs/getting-started/) allow easily getting started with GamiPress.

### Installation and Configuration
GamiPress is installed normally like other WordPress plugins. It may be installed from the WordPress plugin manager or by uploading the plugin. Once installed it needs to be configured so it is integrated with the website. Configuring the plugin involves creating Point Types, Achievements and Ranks. To add more features, add-ons and assets may be configured.

#### Point Types
GamiPress allows creating Point types. Point types are used to automatically award users based on their interaction with the website. Point types can have any name. For example coins, gems, credits, echoes, pulses, impact etc. When creating a point type, we need to specify the point type name, plural name and slug. We also need to specify how the points should be automatically awarded and deducted.

Points for a point type are awarded and deducted in a similar way. We can specify how many points should be earned when a certain action has been taken by the user. We can also specify how many times the action should be taken by the user and also the time frame within which the action can be taken. We can specify the maximum number of times that points can be earned for this action. We can also specify a custom label for the action.

For example, we can specify that when a user has commented on a post 4 times during a week, he should be awarded 10 points. Similarly for deducting points, we can specify that when a user deletes a post, 1 point should be deducted.

#### Achievement Types
GamiPress allows creating Achievement Types and Achievements. Once an Achievement Type has been created, a sub menu item with the name of the Achievement Type is added under the Achievement menu. Clicking on this sub menu allows us to add the Achievement Types. For example we can create an Achievement type called Skills. We can then add skills such as Leadership Skills, Communication Skills, Computer Skills etc.

When creating an instance of an Achievement type, for example when adding a new skill, we can specify the number of points to be awarded for achieving the skill. We can also specify how the skill can be earned. A skill may be earned by completing steps, by acquiring certain number of points of a certain point type, by reaching a rank or by awarding manually. we can also specify how many times the skill can be achieved. We can also specify that the skill can be earned by spending a certain number of points.

If we choose to allow the skill to be earned by completing steps, then we can add the steps that need to be taken in order to achieve the skill. For example logging in to the website 5 times, creating a post 4 times, commenting on a post 2 times, getting comments on a post 10 times etc. We can also specify if the steps must be completed in sequence.

When adding a new achievement for an achievement type, we can also specify the template that should be used for displaying the achievement. In this template we can choose whether to show list of users that have earned this achievement.

#### Rank Types
GamiPress allows creating Rank Types and Ranks. Rank Types and Ranks are created similarly to Achievement Types and Achievements. We first need to create a Rank Type. For this Rank Type we can create ranks.

When creating a rank, we need to specify the rank name, plural name and slug. We also need to specify how the rank should be earned. Ranks with the lowest priority do not have any requirements. Ranks with higher priorities need to be earned by completing steps. This is similar to the steps required for earning an achievement. We can also specify that the rank can be earned by spending certain number of points of a certain point type.

#### Events
An event is an action that needs to occur in order to complete an achievement step, rank requirement or award/deduct points. The main event types are: WordPress Events, Site interactions, Integrations and GamiPress events.

##### WordPress Events
WordPress events are events such as creating a new post, posting a comment, logging in to the website, deleting a post etc. These events are built in to GamiPress and are supported in the default GamiPress installation.

##### Site Interaction Events
Site interaction events include visiting the website, visiting a post, getting visits to a post etc.

##### Integrations events
Integrations events are events supported in an integration of GamiPress. GamiPress integrations are basically WordPress plugins that allow Gamifying external plugins. For example the [GamiPress Forminator Integration](https://wordpress.org/plugins/gamipress-forminator-integration/) allows awarding points to users based on their interactions with forms and quizzes, that have been created using the [Forminator WordPress plugin](https://wordpress.org/plugins/forminator/).

This integration adds several events to GamiPress such as events related to forms, quizzes and polls. For example we can specify the number of points that should be awarded to a user when a certain form has been submitted with a certain field value by the user.

GamiPress events include events such as unlocking a specific achievement type, earning a certain number of points, reaching a rank etc.

#### Blocks, Shortcodes and Widgets
GamiPress blocks are provided in the Gutenberg WordPress editor. For example the User Points block allows displaying the current or specific user balance. The User Earnings block allows displaying list of user earnings. These blocks may be displayed anywhere where blocks are supported. Such as posts, pages, custom posts etc.

GamiPress also provides short-codes for displaying information such as a single achievement, user ranks, user earnings etc. For example the short-code:

```
[gamipress_achievement]
```

renders a single achievement. Each short-code supports several attributes that allow customizing the short-code output. For example:

```
[gamipress_achievement id="1" title="yes" link="yes" thumbnail="yes" excerpt="yes" times_earned="yes" steps="yes" toggle="yes" earners="no" layout="left"]
```

A short-code button appears on the classic WordPress content editor. It allows customizing the short-code. The Gutenberg editor provides blocks for each short-code.

GamiPress provides several widgets that allow displaying information such as the user earnings, user points, user achievements etc. Each widget supports several customization options.

### Conclusion
GamiPress is a comprehensive plugin that allows Gamifying WordPress websites. It has many features including integrations, add-ons and service plans. It is easy to configure and customize.

It may be used to Gamify websites such as online education courses, job recruitment websites, e-commerce websites, support forums etc. It helps to  improve user engagement with websites.
