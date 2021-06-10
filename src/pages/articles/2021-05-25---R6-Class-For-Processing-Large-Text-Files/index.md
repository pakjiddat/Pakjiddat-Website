---
title: R6 class for processing large text files
date: "2021-05-25"
layout: post
draft: false
path: "/posts/r6-class-for-processing-large-text-files"
tags:
  - "R"
description: "In this article I will describe a R6 class that I had developed for processing large text files."
---

### Introduction
In this article I will describe a R6 class called **TextFileProcessor** that I had developed for processing large text files. I had developed the class as part of the [wordpredictor](https://github.com/pakjiddat/word-predictor) package.

The class can be used as a base class by classes that need to process large text files a fixed number of lines at a time.

### How the class can be used
The **TextFileProcessor** class, provides a method called **process_file**. This method processes a given text file a given number of lines at a time by calling user defined methods. The method takes three arguments. A **pre-processing** method, a **processing** method and a **post-processing** method. These methods need to be defined by the user class.

The **pre-processing** method is called before the processing of the text file starts. The text file is then read a fixed number of lines at a time. The number of lines to read at a time can be configured.

The lines that are read are passed as argument to the **processing** method. The processing methods processes the lines and returns them. The processed lines may be written to a output text file or they may be combined and then returned after all the lines in the text file have been processed.

The **post-processing** method is called after all the lines in the text file have been read and processed.

### Benefits of using the class
The main benefit of the **TextFileProcessor** class is that it makes it easy to create applications that need to process large text files. The programmer has to simply provide a method that processes a given number of lines. Pre-processing and post-processing methods may optionally be defined.

Another benefit of the class is that it supports displaying the progress of processing. This can be controlled using the verbose parameter.

### Source code

The following is the source code for the **TextFileProcessor** class:

<details>
  <summary>Click to expand</summary>
  
```r
#' Base class for text file processing
#'
#' @description
#' Provides basic structure for processing text files.
#'
#' It provides pre-processing, processing and post-processing functions, which
#' need to be overridden by derived classes. The pre-processing function is
#' called before reading a file. The process function is called for processing a
#' line. The post processing function is called on the processed data.
#' @export
TextFileProcessor <- R6::R6Class(
    "TextFileProcessor",
    public = list(
        #' @description
        #' It initializes the current object. It is used to set the file name
        #' and verbose options.
        #' @param fn The path to the file to clean.
        #' @param lc The number of lines to read and clean at a time.
        #' @param ve Indicates if progress information should be displayed.
        initialize = function(fn = NULL, lc = 100, ve = 2) {
            # If the given file name is not NULL and is not valid
            if (!is.null(fn) && !file.exists(fn)) {
                  stop("The given file name is not valid")
              }

            # The base class attributes are set
            # The file name is set
            private$fn <- fn
            # The verbose option is set
            private$ve <- ve
            # The line count is set
            private$lc <- lc
            # The processed output is set
            private$p_output <- NULL
        }
    ),
    private = list(
        # @field opts The list of file processing options.
        # * **save_data**. If the combined processed lines should be saved.
        # * **ret_data**. If the data should be returned.
        # * **output_file**. Name of the output file used to store the data.
        opts = list(
            "save_data" = F,
            "ret_data" = F,
            "output_file" = NULL
        ),

        # @field lc The number of lines to read and process at a time.
        lc = 100,

        # @field p_output The output of the processing step
        p_output = NULL,

        # @field fn The name of the text file to process.
        fn = NULL,

        # @field ve Indicates if progress data should be printed.
        ve = 0,

        # @field con The input file connection
        con = NULL,

        # @description
        #' Reads the given file one line at a time. It runs the given
        #' pre-processing function before reading the file. It runs the given
        # line processing function for each line. It optionally saves the
        # output of line processing after reading the file or after processing
        # certain number of lines.
        # @param pre_process The pre-processing function.
        # @param process The function used to process each line.
        # @param post_process The function used to perform post processing.
        # @return The combined processed data
        process_file = function(pre_process, process, post_process) {
            # Pre-processing is done
            pre_process()
            # The file is opened
            private$con <- file(private$fn)
            # The connection is opened for reading
            open(private$con)
            # The lines to be read,
            lines <- c()
            # The loop counter
            c <- 0
            # Indicates that data should not be appended
            is_app <- F
            # The output file name
            of <- private$opts[["output_file"]]
            # All lines are read
            while (TRUE) {
                # The lines are read
                lines <- readLines(private$con,
                    n = private$lc,
                    skipNul = TRUE
                )
                # If all the lines have been read
                if (length(lines) == 0) break
                # The lines are processed
                p_lines <- process(lines)
                # If the processed lines are NULL
                if (is.null(p_lines)) next
                # If the data should be saved
                if (private$opts[["save_data"]]) {
                    # The cleaned data is written to file
                    private$write_file(p_lines, of, is_app)
                    # Debug message
                    private$display_msg(
                        paste(length(p_lines), "lines were written"), 1
                    )
                    # Indicates that data should be appended
                    is_app <- T
                }
                # If the processed data should be returned
                if (private$opts[["ret_data"]]) {
                    # The processed output is merged
                    private$p_output <- c(private$p_output, p_lines)
                }
                # The loop counter is increased by 1
                c <- c + 1
                # Debug message
                private$display_msg(
                    paste(private$lc * c, "lines have been processed"), 1
                )
            }
            # The file connection is closed if it is open
            close(private$con)
            # Post processing is performed
            post_process()
            # If the data should be returned
            if (private$opts[["ret_data"]]) {
                # The processed output is returned
                return(private$p_output)
            }
        },

        # @description
        # Prints the given message depending on verbose settings.
        # @param msg The message to be printed.
        # @param min_debug The minimum debugging level
        display_msg = function(msg, min_debug) {
            # If verbose is >= min_debug , then message is displayed
            if (private$ve >= min_debug) {
                print(msg)
            }
        },

        # @description
        # Performs processing on the data. It should be
        # overriden by a derived class.
        # @param lines The lines to process
        process = function(lines) {

        },

        # @description
        # Performs post-processing on the processed data. It should be
        # overriden by a derived class.
        post_process = function() {

        },

        # @description
        # Performs pre-processing on the processed data. It should be
        # overriden by a derived class.
        pre_process = function() {
            return(NULL)
        }
    )
)
```
</details>

The following is an example of how to use the **TextFileProcessor** class. The **DataCleaner** class is an example class that allows cleaning large text files. The class is derived from the **TextFileProcessor** class. The main method of the class is **clean_files**.

<details>
  <summary>Click to expand</summary>
  
```r
#' Provides data cleaning functionality
#'
#' @description
#' It provides a memory efficient method for removing unneeded
#' characters from text files. It is suitable for cleaning large text files.
#'
#' It provides a method for cleaning text files. It allows removing bad
#' words, stop words, non dictionary words, extra space, punctuation and
#' non-alphabet characters. Allows conversion to lower case. It supports large
#' text files.
DataCleaner <- R6::R6Class(
    "DataCleaner",
    inherit = TextFileProcessor,
    public = list(
        #' @description
        #' It initializes the current object. It is used to set the file name
        #' and verbose options.
        #' @param fn The path to the file to clean.
        #' @param ve Indicates if progress information should be displayed.
        #' @export
        initialize = function(fn = NULL, opts = list(), ve = 0) {            
            # The base class is initialized
            super$initialize(fn, opts[["line_count"]], ve)
            # The save_data option of base class is set
            private$opts[["save_data"]] <- opts[["save_data"]]
            # The output_file option of base class is set
            private$opts[["output_file"]] <- opts[["output_file"]]
        },

        #' @description
        #' It provides an efficient method for cleaning text files.
        #' It removes unneeded characters from the given text file with several
        #' options. It allows removing punctuations, bad words, stop words,
        #' non-alphabetical symbols and non-dictionary words. It reads a certain
        #' number of lines from the given text file. It removes unneeded
        #' characters from the lines and then saves the lines to an output text
        #' file. File cleaning progress is displayed if the verbose option was
        #' set in the class constructor. It is suitable for cleaning large text
        #' files.
        clean_file = function() {
            # The information message
            msg <- paste0("Cleaning the file: ", private$fn)
            # The information message is shown
            private$display_msg(msg, 1)
            # The base class process_file function is called
            private$process_file(
                private$pre_process, private$process,
                private$post_process
            )
            # If the data should not be saved
            if (!private$dc_opts[["save_data"]]) {
                # The processed output is returned
                return(private$p_output)
            }
        }
    ),
    private = list(
        # @description
        # It processes the given lines of text.
        # @param lines The lines of text to clean.
        # @return The processed line is returned.
        process = function(lines) {

            return(lines)
        }
    )
)
```
</details>

The following example shows how the **DataCleaner** class is used:

<details>
  <summary>Click to expand</summary>

```r
dc <- DataCleaner$new(
    "path-to-large-text-file", 
    opts = list(
        "line_count" = 100, 
        "output_file" = "path-to-output-file", 
        "save_data" = T), 
    ve = 2)
```
</details>

