<?php
/**
 * Created by PhpStorm.
 * User: dmitry
 * Date: 15.09.17
 * Time: 14:43
 */

session_start();

require_once('./CAdminConnector.php');

$db = new CAdminConnector($_SESSION['adminUser'], $_SESSION['adminPass']);

if ($db->connect_error) {
    die('connection failed');
}

echo $db->updateValues($_POST['list'], $_POST['id'], $_POST['values']);

$db->close();