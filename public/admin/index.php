<?php
include('../_layouts/header.php');

session_start();

if (isset($_POST['adminUser'])) {
    $_SESSION['adminUser'] = $_POST['adminUser'];
}

if (isset($_POST['adminPass'])) {
    $_SESSION['adminPass'] = $_POST['adminPass'];
}

if (!isset($_SESSION['adminUser']) || !isset($_SESSION['adminPass'])) {
    header('Location: /admin/auth');
    exit();
}

require_once('../api/CAdminConnector.php');

$db = new CAdminConnector($_SESSION['adminUser'], $_SESSION['adminPass']);
if ($db->connect_error) {
    $_SESSION['error'] = $db->connect_error;
    unset($_SESSION['adminUser']);
    unset($_SESSION['adminPass']);
    header('Location: /admin/auth/');
    exit();
}

if (isset($_SESSION['error'])) {
    unset($_SESSION['error']);
}

if (isset($_GET['list'])) {
    $listData = $db->getList($_GET['list']);
    $listHeaders = $db->getListHeaders($_GET['list']);
}

$db->close();
?>
    <div class="container content-section">
        <h3 class="text-uppercase text-center">админ-панель</h3>
        <ul class="list-inline">
            <!--            <li><a href="/admin/?list=qualifications">Специальности</a></li>-->
            <li><a href="/admin?list=vacancies">Вакансии</a></li>
            <!--            <li><a href="/admin/?list=articles">Статьи</a></li>-->
            <li><a href="/admin?list=reviews">Отзывы</a></li>
        </ul>
        <hr/>
        <div>
            <?php if (isset($_GET['list'])) { ?>
                <div class="table-responsive" data-list="<?php echo $_GET['list']; ?>">
                    <table class="table table-bordered">
                        <thead>
                        <tr class="bg-primary">
                            <?php if (isset($listHeaders)) {
                                foreach($listHeaders as $header) { ?>
                                    <th><?php echo $header['description']; ?></th>
                                <?php }
                            } ?>
                            <th></th>
                        </tr>
                        </thead>
                        <?php if (isset($listData) && isset($listHeaders)) foreach ($listData as $index=>$item) { ?>
                            <tr data-id="<?php echo $item[0]; ?>">
                                <?php
                                foreach ($item as $value) {
                                    if ($index === 0) continue;
                                    echo '<td><input type="'.$listHeaders[$index]->fieldType.'" value="' . $value . '"></td>';
                                } ?>
                                <td>
                                    <ul class="list-inline">
                                        <li>
                                            <button type="button" class="btn btn-primary" data-edit="<?php echo $item[0]; ?>">
                                                <span class="glyphicon glyphicon-edit"></span>
                                            </button>
                                        </li>
                                        <li>
                                            <button type="button" class="btn btn-danger" data-delete="<?php echo $item[0]; ?>">
                                                <span class="glyphicon glyphicon-trash"></span>
                                            </button>
                                        </li>
                                    </ul>
                                </td>
                            </tr>
                        <?php } ?>
                    </table>
                </div>
                <button type="button" id="addButton" class="btn btn-primary">Добавить запись</button>
            <?php } else { ?>
                <p>Выберите нужный список данных</p>
            <?php } ?>
        </div>
        <hr/>
        <a role="button" href="auth/logout" class="btn btn-primary">Выход</a>
    </div>
<?php

include('../_layouts/footer.php');