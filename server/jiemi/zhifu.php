<?php 



$url = 'https://api.mch.weixin.qq.com/pay/unifiedorder';  
  $second = 30;
$postUrl = $url;
$xml = $_GET['formData'];
echo $xml;
        $ch = curl_init();
echo "sdfds";
	  curl_setopt($ch, CURLOPT_TIMEOUT, $second);
	  curl_setopt($ch, CURLOPT_URL, $url);
	    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
	    curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, FALSE); //严格校验

	      curl_setopt($ch, CURLOPT_HEADER, FALSE);
	      curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);

	        curl_setopt($ch, CURLOPT_POST, TRUE);
	        curl_setopt($ch, CURLOPT_POSTFIELDS, $xml);
		 
		 
		  curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 20);
		  curl_setopt($ch, CURLOPT_TIMEOUT, 40);
		    set_time_limit(0);
		          $data = curl_exec($ch);//运行curl
		          curl_close($ch);
			 echo $data;

			    
			   ?>
