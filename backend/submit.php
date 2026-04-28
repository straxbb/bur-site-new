<?php
$host = 'localhost';
$user = 'root';
$pass = '';
$db = 'bur_site';

$conn = new mysqli($host, $user, $pass, $db);

$name = $_POST['name'];
$phone = $_POST['phone'];
$service = $_POST['service'];
$depth = $_POST['depth'];
$cost = $_POST['cost'];

$sql = "INSERT INTO requests (name, phone, service_type, depth, total_cost) 
        VALUES ('$name', '$phone', '$service', '$depth', '$cost')";

$conn->query($sql);
$conn->close();

header('Location: ../frontend/index.html');
?>