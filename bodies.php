<!DOCTYPE html>
<html>
<head>
	<title>Bodies</title>
    <link class="css_garage" rel="stylesheet" type="text/css" href="css/garage.css">
	<?php include 'includes/head.php'; ?>
    <script src="functions/items.js"></script>

</head>
<body>

<?php include 'includes/header.php'; ?>

<div id="garage_content" class="center_content">
    <div id="garage_top" class="<?php echo basename(__FILE__, '.php'); ?>">
        <div id="garage_category">
            <img id="category_image"/>
            <div id="category_name">Bodies</div>
        </div>
		<div id="garage_sort">
			<label id="sort_label" for="sort_menu">Sort by</label>
			<div id="sort_menu">
				<div id="sort_result"></div>
				<div id="sort_input">
					<input type="text">
				</div>
				<ul id="sort_list">
					<li class="sort" onclick="setSort(1)">Rarity ↗</li>
					<li class="sort" onclick="setSort(2)">Rarity ↘</li>
					<li class="sort" onclick="setSort(3)">Name ↗</li>
					<li class="sort" onclick="setSort(4)">Name ↘</li>
				</ul>
			</div>
		</div>
    </div>
    <div id="garage_list">

    </div>
	<div id="modal">

	</div>
</div>

<?php include 'includes/footer.php'; ?>

</body>
</html>
