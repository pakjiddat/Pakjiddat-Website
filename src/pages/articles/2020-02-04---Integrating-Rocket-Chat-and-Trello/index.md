---
title: Integrating Rocket Chat and Trello
date: "2017-04-11"
layout: post
draft: false
path: "/posts/integrating-rocket-chat-and-trello"
tags:
  - "collaboration tools"
description: "Rocket Chat is an excellent open source collaboration tool. It is similar to the close source commercial application Slack. Trello is a commercial Kanban board that allows managing tasks and task lists. It has an attractive interface with many features and a well documented API."
---

### Introduction
Rocket Chat is an excellent open source collaboration tool. It is similar to the close source commercial application Slack. Trello is a commercial Kanban board that allows managing tasks and task lists. It has an attractive interface with many features and a well documented API.

The Trello API is easy to use and allows Trello to be integrated with other applications. In an earlier article I described how to [install Rocket Chat on Ubuntu server](/posts/installing-rocket-chat-and-wekan-on-ubuntu-server). In this article I will describe how to integrate Trello with Rocket Chat.

### Using Web Hooks for integration
We can integrate Rocket Chat and Trello using web hooks. Both tools provide web hooks as part of their APIs. The Trello API provides a [sandbox](https://developers.trello.com/sandbox) from where we can test the web hooks

The Trello API considers each object as a model. For example a card, checklist, board etc are called models. Each model has a unique id. A web hook is attached to a model by giving it the id of the model. Once a web hook has been attached to a model, it will fire each time the model is updated. For example if we create a web hook on a Trello card and then delete the card, the web hook attached to the card will fire. Each web hook has a callback url that is called when the web hook fires.

### Creating incoming and outgoing web hooks in Rocket Chat
The Rocket Chat administration panel has a section called Integrations, from where we can add incoming and outgoing web hooks. The Rocket Chat documentation describes how to create [incoming](https://rocket.chat/docs/administrator-guides/integrations/#incoming-webhook-scripting) and [outgoing](https://rocket.chat/docs/administrator-guides/integrations/#outgoing-webhook-scripting) web hooks.

To create an incoming Web Hook in Rocket Chat we have to give the name of the channel that uses the web hook, the name of the user of the web hook and the script that should be run when the web hook is called. An outgoing web hook is created similarly.

The Rocket Chat documentation provides sample scripts for both incoming and outgoing web hooks. This script is run when the web hook is called. After an incoming web hook is created, the Rocket Chat generates a URL that can be used by other applications. For example when an application calls the incoming URL, Rocket Chat will run the script that we specified when creating the incoming web hook. The script can do some processing and return the result as a message. This message is displayed to the channel users.

After we have created an incoming web hook in Rocket Chat, we have to copy the generated URL and use that as a callback URL for the Trello web hook. So each time a Trello object is updated, the Rocket Chat URL is called automatically. When this URL is called, the script associated with the URL is run on the Rocket Chat server and the result is displayed to the end user.

The Trello web hook passes parameters to the callback URL so the script for the incoming web hook can use the parameters. e.g for displaying the name of the Trello card to the user. The incoming web hook basically displays information from an external application to the channel users.

When we create an outgoing web hook, we have to give one or more URLs that should be called when the web hook is fired. The outgoing web hook is fired by Rocket Chat when the user enters certain terms. For example a command for listing all Trello cards in a certain list. When the user enters the command, the script associated with the outgoing web hook is called.

This script can access the URLs associated with the outgoing web hook. Depending on the user choice, the outgoing web hook can be fired each time the user enters a message or when a certain text appears in the message.

The script given in the outgoing web hook is specified as a class with two functions. One is called **prepare_outgoing_request** and is called each time the user enters text. The second one is called **process_outgoing_response** and is called when the URL given in the outgoing web hook is called. The **process_outgoing_response** function gets the response from the URL. When the first function **prepare_outgoing_request** is called, it can either call the URL associated with the web hook or it can display help information to the user. For example on how to use the command.

### Conclusion
Rocket Chat is well documented and actively supported. It is an interesting open source project with many possibilities for integration.
