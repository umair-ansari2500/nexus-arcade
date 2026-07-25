<?php
require_once '../config.php';
require_once '../app/includes/constant.php';
require_once '../app/includes/app_start.php';

$page = $_POST['page'] ?? 1;
$s = $_POST['query'] ?? '';
$limit = 10;
// $row = ($page - 1) * $limit;

// $query = "SELECT * from zon_games WHERE game_name LIKE '%$s%' limit $row,$limit";
// $run = mysqli_query($con, $query);

if (num_rows(T_ZON_GAMES, " game_name LIKE '%$s%' ") > 0) {
foreach (getGamesByQuery($s, $limit) as $game) { ?>
    <div class="game-Box wow <?php echo $zon['config']['animate_class'] ?> hover:bg-[var(--zon-blog-social-button-bg-hover-color)] rounded-lg px-2 py-2 mb-3">
        <div class="flex gap-2">
            <img class="h-12 w-14 rounded-md " src="<?= $game['game_image_url'] ?>" />
            <div class="game-meta">
                <a class="font-semibold" style="color: var(--zon-common-text-color);"
                    href="<?php echo $site_url . 'game/' . makeSlug($game['game_name']) . '/' . $game['id'] ?>">
                    <?= $game['game_name'] ?>
                </a> <br>
                <a class="text-sm" style="color: var(--zon-muted-color);"
                    href="<?php echo $site_url . 'category/?n=' . $game['game_category'] ?>">
                    <?= $game['game_category'] ?>
                </a>
            </div>
        </div>
    </div>
<?php }
} else { echo "game not found"; } ?>