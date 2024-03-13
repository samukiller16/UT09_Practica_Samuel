<?php

    $fileName = $_POST['fileName'];
    $json = $_POST['json'];

    $direccion = __DIR__ . "/backup/$fileName";
    
    file_put_contents($direccion, $json);
?>