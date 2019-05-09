<?php
  
  $name = $_POST["name"];
  $telephone = $_POST["telephone"];
  $address = $_POST["address"];
  $intro = $_POST["intro"];



  $con = mysql_connect("localhost");
  if(!$con){
  	die("Connection failed:" .mysql_connect_error());
  }

  mysql_query('SET NAMES UTF8');

  $db_selected = mysql_select_db("phonebook",$con);

  if(!$db_selected){
  	die("Can\'t use phonebook: ".mysql_error());
  }

  $sql = "INSERT INTO usermessage(name,tele_number,address,intro)  VALUES('".$name."','".$telephone."','".$address."','".$intro."');";


  if(mysql_query($sql,$con)){
  	 $mark = "成功";
  	echo json_encode($mark);
  }else {
    echo "Error creating database: " . mysql_error();
}

  mysql_close($con);
  

?>