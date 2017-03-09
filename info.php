<?php

include("resize-class.php");
$time=time();

$fname=$_FILES['file']['tmp_name'];

$allowed = array('png', 'jpg', 'gif','bmp');

$ext = pathinfo($_FILES['file']['name'], PATHINFO_EXTENSION);

	if(!in_array(strtolower($ext), $allowed)){
	echo '{"status":"error"}';
		exit;
	}
	else{

	$name=$time.'.'.$ext;
	$nname='dump/'.$name;
	$tname='thumb/'.$name;
	
		move_uploaded_file($fname, $nname);
		
		$resizeObj = new resize($nname);
		$resizeObj -> resizeImage(100, 100, 'auto');	
		$resizeObj -> saveImage($tname, 50);
	
		$s=filesize($nname);
		
		$i=0;
		while($s>1024){
			$s/=1024;
			$i++;
		}
		$units=["bytes", "KB", "MB", "GB"];
		
		$unit=$units[$i];
		$s=round($s, 2).' '.$unit;

		$z=getimagesize($nname);
		$h=$z[1];
		$w=$z[0];
		$a=[$h, $w, $s, $name];
		echo json_encode($a);
	}
?>