<?php
session_start();

unset($_SESSION['adminUser']);
unset($_SESSION['adminPass']);

session_write_close();

header('Location: /admin/');

