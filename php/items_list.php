<?php

	echo '<div class="garage_item '.$rarity.'" onclick="modalItem('.$data['id'].', \''.$table.'\')">';

			if (isset ($data['category'])) {
				$table = $data['category'];
			}

			if (isset ($modify)) {
				echo '<div class="item_image" onclick="modifyItem('.$data['id'].', \''.$table.'\')">';
			} else {
				echo '<div class="item_image">';
			}

			echo '<img src="'.$data['default'].'" title="'.$data['name'].'"/>
				</div>
			<div class="item_name">'.$item_name.'</div>';

	echo '</div>';
?>
