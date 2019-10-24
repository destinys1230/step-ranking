<?php
$appid = 'wxbf0f3486db308b93';
$appsecret = 'e0b87687a9621b1d279d747354c9fcb4';

$url = 'https://api.weixin.qq.com/sns/jscode2session?appid='.$appid.'&secret='.$appsecret.'&js_code='.$_GET['code'].'&grant_type=authorization_code';

$content = file_get_contents($url);
$json = json_decode($content);

$arr = get_object_vars($json);//返回一个数组。获取$json对象中的属性，组成一个数组


$openid = $arr['openid'];
$session_key = $arr['session_key'];
$temphjz['openid']=$openid;
$temphjz['session_key']=$session_key;
echo json_encode($temphjz);
?>
