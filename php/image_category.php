<?php
    include '../core/database/connect.php';

    $category = ucwords(str_replace("_", " ", $_POST['category']));

    $requete = "SELECT image FROM category WHERE name = '{$category}'";
	$exec = $pdo->query($requete);
	while ($data = $exec->fetch()){
        echo 'data:image/*;base64,'.base64_encode($data[0]);
	}
?>
