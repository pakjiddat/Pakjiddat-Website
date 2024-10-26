<?php

$base_dir = "/home/nadir/Nodejs/gatsby-starter-lumen/content/posts"; 
$dirs = scandir($base_dir);

$counter = 0;
for($count1 = 2; $count1 < count($dirs); $count1++) {
    $article_file = $base_dir . "/" . $dirs[$count1] . "/index.md";
    $contents = file_get_contents($article_file);
    $contents = preg_replace("/layout: post/", "template: post", $contents);
    $contents = preg_replace('/path: (.+)/', 'slug: $1', $contents);     
    preg_match("/tags(.+)\s+\-\s+(.+)/", $contents, $matches); 
    $category = $matches[2];
    $contents = str_replace("tags:", "category: " . $category . "\r\ntags:", $contents); 
    file_put_contents($article_file, $contents);

    $counter++; 
}

echo ($counter) . " Files were written";   
?>
