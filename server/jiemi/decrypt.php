<?php
include_once "errorCode.php";
include_once "wxBizDataCrypt.php";

$appid = 'wxbf0f3486db308b93';

$sessionKey= $_GET['sessionID'];
$encryptedData= $_GET['encryptedData'];
$iv =$_GET['iv'];


$pc = new WXBizDataCrypt($appid, $sessionKey);
$errCode = $pc->decryptData($encryptedData, $iv, $data );

if ($errCode == 0) {
print($data . "\n");
} else {
print($errCode . "\n");
}
?>
