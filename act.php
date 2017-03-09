<?php

set_time_limit(0);

$name=$_POST['fil'];

$fname='dump/'.$name;
$nname='store/'.$name;

$h=$_POST['h'];
$w=$_POST['w'];
$q=$_POST['q'];
$opt=$_POST['mode'];
$size=$_POST['size'];
$sunit=$_POST['unit'];
switch($sunit){
	case 1: $size*=1024; break;
	case 2: $size*=1024*1024; break;
}

include("resize-class.php");
$resizeObj = new resize($fname);

res($resizeObj, $h, $w, $q, $opt, $size, $name);


function res($resizeObj, $h, $w, $q, $opt, $size, $name){
	
	$fname='dump/'.$name;
	$nname='store/'.$name;
		
	$resizeObj -> resizeImage($w, $h, $opt);
	$resizeObj -> saveImage($nname, $q);

	$s=filesize($nname);
	$flag=1;
	if($s<=$size){

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
		$a=[$h, $w, $s, $name, $q];
		echo json_encode($a);
	}
	else{
		unlink($nname);
		if($q>=75){$q-=5;}
		else{$h/=1.25; $w/=1.25; $q=100;}
		res($resizeObj, $h, $w, $q, $opt, $size, $name);
	}
}
?>