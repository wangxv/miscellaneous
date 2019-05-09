<?php
  
  $id = $_POST["id"];
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

  $sql = "UPDATE usermessage 
          SET 
            name='".$name."',
            tele_number='".$telephone."',
            address='".$address."',
            intro='".$intro."'
          WHERE id='".$id."';";


  if(mysql_query($sql,$con)){
  	 $mark = "成功";
      
  	echo json_encode($id);
  }else {
   // echo "Error creating database: " . mysql_error();
}

  mysql_close($con);
  

?>