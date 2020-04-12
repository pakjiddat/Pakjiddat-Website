---
title: Islam Companion Desktop API
date: "2019-05-06"
layout: post
draft: false
path: "/posts/islam-companion-desktop-api"
category: "open source"
tags:
  - "open source"
description: "The Islam Companion Desktop API project is a API (Application Programming Interface) written in Python language, that allows users to add Holy Quran and Hadith data to their applications. Currently it provides Quranic and Hadith translations in Urdu language. Support for other languages is planned."
---

![Islam Companion Desktop API](./islamcompanion-desktop-api.png)

### Introduction
The "**Islam Companion Desktop API**" project is a API (Application Programming Interface) written in [Python](https://www.python.org/) language, that allows users to add Holy Quran and Hadith data to their applications. Currently it provides Quranic and Hadith translations in Urdu language. Support for other languages is planned.

An example of an application that uses the Islam Companion Desktop API is the [Islam Companion Desktop](/posts/islamcompanion-desktop) application.

The goal of the Islam Companion Desktop API is to help users develop desktop applications that provide knowledge about Islam.

### Features
The Islam Companion Desktop API has the following features:

* It provides translations of Holy Quran and Hadith in Urdu language. Support for more languages is planned
* It provides meta data about Holy Quran and Hadith data
* The source code is available under [GPL License](https://github.com/nadirlc/islam-companion-desktop-api/blob/master/LICENSE)
* The source code is well commented and easy to update
* The data is stored in sqlite3 database and can easily be accessed using the sqlite3 Python package  

### Requirements
The Islam Companion Desktop API requires the OS and sqlite3 Python packages. These packages are part of the standard Python distribution

### Installation
The following steps can be used to install the "Islam Companion Desktop API":

* Create a new virtual environment using the [virtualenv](https://virtualenv.pypa.io/en/latest/) tool. This can be done with the command: **virualenv -p python3.7 ic-desktop-api**
* Change directory to the ic-desktop-api folder. Download the [source code](https://github.com/nadirlc/islam-companion-desktop-api/archive/master.zip) from GitHub or install from Python Package index using the command: **pip install ic-desktop-api**
* Download the [quran](https://islamcompanion.pakjiddat.pk/islamcompanion/data/holy-quran.db.tar.bz2) sqlite database. Extract the downloaded file to **quran/lib/data/holy-quran.db**
* Download the [hadith](https://islamcompanion.pakjiddat.pk/islamcompanion/data/hadith.db.tar.bz2) sqlite database. Extract the downloaded file to **hadith/lib/data/hadith.db**
* Install the [unittest2](https://pypi.org/project/unittest2/) Python package using the command: **pip install unittest2**. It will be used to unit test the API
* Test the quran api using the command: **python -m unittest test/quran_api.py**
* Test the hadith api using the command: **python -m unittest test/hadith_api.py**

### Usage
The Islam Companion Desktop API supports the following functions:

##### API calls for fetching Holy Quran data

```
1. Name: get_sura_names
Description: Fetches list of all sura names from database
Url: /api/get_suras_in_division
Parameters: none
Response: A numerically indexed array containing list of sura names

2. Name: get_ruku_count
Description: Fetches the number of rukus in the given sura
Parameters:        
sura. The sura number. It should be a number 1 and 114                            
Response: An integer containing the number of rukus in the given sura

3. Name: get_ayat_range
Description: It returns the start and end ayat number for the given sura and ruku
Parameters:
sura. The sura number. It should be a number 1 and 114
ruku. The ruku number. It should be a number 1 and 40        
Response: The start and end ayat numbers
start. The start ayat number
end. The end ayat number

4. Name: get_ayat_text
Description: Fetches the ayat text for the given sura and ruku
Parameters:        
sura. The sura number. It should be a number 1 and 114
ruku. The ruku number. It should be a number 1 and 40        
Response: A numerically indexed array containing the list of ayas
```

##### API calls for fetching Hadith data

```
1. Name: get_source_list
Description: Fetches list of all hadith sources from database
Parameters:none
Response: The list of hadith sources

2. Name: get_book_list
Description: Fetches list of all hadith books for the given source from database
Parameters:        
source. The hadith source        
Response: A numerically indexed array containing list of hadith books. Each index contains an array with two elements. The book id and book title

3. Name: get_title_list
Description: Fetches list of all hadith books for the given source from database
Parameters:
book. The hadith book id        
Response: A numerically indexed array containing the list of hadith titles. Each index contains an array with two elements. The title id and title summary

4. Name: get_hadith_text
Description: It fetches and returns the hadith text for the given hadith id
Parameters:        
hadith_id. The hadith id        
Response: The Hadith text
```
