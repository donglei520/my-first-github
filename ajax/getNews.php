<?php
header('content-type:text/html;charset="utf-8"');
error_reporting(0);

$news = array(
	array('title'=>'0get请求到底要不要加那啥','date'=>'2014-1-6'),
	array('title'=>'1get请求到底要不要加那啥','date'=>'2014-1-6'),
	array('title'=>'2get请求到底要不要加那啥','date'=>'2014-1-6'),
	array('title'=>'3get请求到底要不要加那啥','date'=>'2014-1-6'),
	array('title'=>'4get请求到底要不要加那啥','date'=>'2014-1-6'),
	array('title'=>'5get请求到底要不要加那啥','date'=>'2014-1-6'),
	array('title'=>'6get请求到底要不要加那啥','date'=>'2014-1-6'),
	array('title'=>'7get请求到底要不要加那啥','date'=>'2014-1-6'),
	array('title'=>'8get请求到底要不要加那啥','date'=>'2014-1-6'),
	array('title'=>'9get请求到底要不要加那啥','date'=>'2014-1-6'),
);

echo json_encode($news);//ajax的get