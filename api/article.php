<?php

function getArticles($search) {
    $ch = curl_init();

    curl_setopt($ch, CURLOPT_URL, 'http://localhost:8000/article/find/'.$search);
    curl_setopt($ch, CURLOPT_HEADER, 0);
    curl_setopt($ch,CURLOPT_RETURNTRANSFER,TRUE);

    $json = curl_exec($ch);
    $res = json_decode($json, true);

    curl_close($ch);
    return $res;
}
