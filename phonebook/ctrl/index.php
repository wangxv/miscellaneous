<?php 
  
   //mysql连接
   $con = mysql_connect("localhost");
   if(!$con){
   	  die("Connection failed:" .mysql_connect_error());
   }
  
  //设置编码
  mysql_query('SET NAMES UTF8');


  //选择数据库
  $db_selected = mysql_select_db("phonebook",$con);

  if(!$db_selected){
  	die("Can\'t use phonebook : ".mysql_error());
  }

  $sql = "SELECT * FROM usermessage";
  $result = mysql_query($sql,$con);

  $names = array();

  while($row = mysql_fetch_assoc($result)){ 

      array_push($names,$row);
     
  }
  
  echo json_encode($names);
  mysql_close($con);
 ?>