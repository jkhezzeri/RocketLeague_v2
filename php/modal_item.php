<?php
    include '../core/database/connect.php';

    $table = $_POST['table'];
    $item = $_POST['item'];

	$requete = "SELECT * FROM ".$table." WHERE id = ".$item."";
	$exec = $pdo->query($requete);
	while ($data = $exec->fetch()){
        $rarity = str_replace(" ", "_", strtolower($data['rarity']));
		echo '<div id="modal_content" class="'.$rarity.'">
                <div id="modal_background"></div>';
                if ($rarity != 'common') {
                    echo '<img src="images/rays_'.$rarity.'"/>';
                }
                echo '<div id="modal_name">
                        <img src="images/head_'.$rarity.'"/>';
                if ($table == 'decals' && $data['bodies'] != 'Universal') {
                    echo $data['bodies'].' : '.$data['name'];
                } else {
                    echo $data['name'];
                }
                echo '</div>
                    <div id="modal_type">
                        <img src="images/ribbon_'.$rarity.'"/>
                        <div id="modal_type_name">';
                if ($data['name'] == 'Key' || $data['name'] == 'Decryptor') {
                    echo ''.$data['type'].'';
                } else {
                    echo ''.$data['rarity'].' '.$data['type'].'';
                }
                echo '</div>
                </div>
                <div id="modal_image">
                    <img src="'.$data['default'].'" title="'.$data['name'].'"/>
                </div>
                <div id="modal_painted">
                    <div id="modal_color"></div>
                </div>
                <div id="modal_info">';
                if (isset ($data['info'])) {
    				echo ''.$data['info'].'';
    			}
                echo '</div>';

                if (isset ($data['black']) || isset ($data['titanium_white']) || isset ($data['grey']) || isset ($data['crimson']) || isset ($data['pink']) || isset ($data['cobalt']) || isset ($data['sky_blue'])
                || isset ($data['burnt_sienna']) || isset ($data['saffron']) || isset ($data['lime']) || isset ($data['forest_green']) || isset ($data['orange']) || isset ($data['purple'])) {

                    echo '<div id="modal_paints_button">
                            <img src="images/colors.png"/>
                        </div>
                        <div id="modal_paints" class="start">
                            <div id="modal_paints_top">
                                <div id="modal_paints_text" class="default"></div>
                                <div id="modal_paints_close">
                                    <i class="material-icons md-32">close</i>
                                </div>
                            </div>
                            <div id="modal_colors">';

                    $paints = "SELECT name FROM paint";
                    $paint = $pdo->query($paints);
                    while ($color = $paint->fetch()){
                        $colorname = str_replace(" ", "_", strtolower($color['name']));
                        echo '<div class="modal_paint '.$colorname.'';
                        if (!isset ($data[$colorname])) { echo ' none'; }
                        echo '">
                            <div class="modal_paint_image">';
                            if (isset ($data[$colorname])) {
                                echo '<img src="'.$data[$colorname].'" title="';
                                if ($color['name'] != 'Default') {
                                    echo ''.$color['name'].' ';
                                }
                                echo ''.$data['name'].'"/>';
                            }
                            echo '</div>
                            <div class="modal_paint_name">'.$color['name'].'</div>
                        </div>';
                    }

                    echo '</div>
                    </div>';

                }
            echo '</div>';
	}
?>
