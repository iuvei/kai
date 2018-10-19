<?php
function post_qx66($url="",$data=""){
	$url = "http://m.qx66.com/".$url;
	$ua = 'Accept: application/json, text/javascript, */*; q=0.01
X-Requested-With: XMLHttpRequest
User-Agent: Mozilla/5.0 (Linux; U; Android 6.0.1; zh-cn; MI 4LTE Build/MMB29M) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/46.0.2490.85 Mobile Safari/537.36 XiaoMi/MiuiBrowser/8.0.11';
	$ch = curl_init();   
    curl_setopt ($ch, CURLOPT_URL, $url);
    curl_setopt ($ch, CURLOPT_REFERER, $ua);
	curl_setopt($ch, CURLOPT_NOBODY, true);
	curl_setopt($ch, CURLOPT_POST, true);
	curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
    curl_exec ($ch);   
    curl_close ($ch);
}
function post_321k($url="",$data=""){
	$url = "http://m.321k.com/".$url;
	$ua = 'Accept: application/json, text/javascript, */*; q=0.01
X-Requested-With: XMLHttpRequest
User-Agent: Mozilla/5.0 (Linux; U; Android 6.0.1; zh-cn; MI 4LTE Build/MMB29M) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/46.0.2490.85 Mobile Safari/537.36 XiaoMi/MiuiBrowser/8.0.11';
	$ch = curl_init();   
    curl_setopt ($ch, CURLOPT_URL, $url);
    curl_setopt ($ch, CURLOPT_REFERER, $ua);
	curl_setopt($ch, CURLOPT_NOBODY, true);
	curl_setopt($ch, CURLOPT_POST, true);
	curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
    curl_exec ($ch);   
    curl_close ($ch);
}
?>