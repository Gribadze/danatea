<?php
include('../../_layouts/header.php');
session_start();
if (isset($_SESSION['adminUser']) && isset($_SESSION['adminPass'])) {
    header('Location: /admin');
    exit();
}
?>
    <div class="container content-section">
        <h3 class="text-uppercase text-center">авторизация</h3>
        <?php if (isset($_SESSION['error'])) { ?>
            <div class="alert alert-danger">
                Ошибка авторизации (<?php echo $_SESSION['error']; ?>)
            </div>
        <?php } ?>
        <div class="row">
            <div class="col-sm-6 col-sm-offset-3 col-md-4 col-md-offset-4">
                <form action="/public/adminc/admin" class="form" method="post">
                    <div class="form-group">
                        <label for="adminUser" class="control-label">Логин</label>
                        <input type="text" class="form-control" id="adminUser" name="adminUser" required/>
                    </div>
                    <div class="form-group">
                        <label for="adminPass" class="control-label">Пароль</label>
                        <input type="password" class="form-control" id="adminPass" name="adminPass" required/>
                    </div>
                    <div class="form-group">
                        <button type="submit" class="btn btn-primary center-block">Войти</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
<?php
include('../../_layouts/footer.php');