<?php
include('./_layouts/header.php');
?>
    <div class="container content-section text-center">
        <div class="row">
            <div class="col-md-4">
                <h2 class="text-uppercase">домашний персонал</h2>
                <a class="activity-group" data-toggle="collapse" href="#activity-home" aria-expanded="false" aria-controls="activity-home">
                    <i class="fa fa-home fa-20x" aria-hidden="true"></i>
                </a>
                <div class="panel panel-default collapse" id="activity-home">
                    <div class="panel-body">
                        <ul class="list-unstyled">
                            <li><a href="/public/activity#home1">Няня</a></li>
                            <li><a href="/public/activity#home2">Домработница</a></li>
                            <li><a href="/public/activity#home3">Сиделка</a></li>
                            <li><a href="/public/activity#home4">Повар</a></li>
                            <li><a href="/public/activity#home5">Личный водитель</a></li>
                            <li><a href="/public/activity#home6">Садовник</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="col-md-4">
                <h2 class="text-uppercase">педагоги</h2>
                <a class="activity-group" data-toggle="collapse" href="#activity-teachers" aria-expanded="false" aria-controls="activity-teachers">
                    <i class="fa fa-graduation-cap fa-20x" aria-hidden="true"></i>
                </a>
                <div class="panel panel-default collapse" id="activity-teachers">
                    <div class="panel-body">
                        <ul class="list-unstyled">
                            <li><a href="/public/activity#teachers1">Репетитор</a></li>
                            <li><a href="/public/activity#teachers2">Гувернантка</a></li>
                            <li><a href="/public/activity#teachers3">Логопед</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="col-md-4">
                <h2 class="text-uppercase">водители, строители</h2>
                <a class="activity-group" data-toggle="collapse" href="#activity-workers" aria-expanded="false" aria-controls="activity-workers">
                    <i class="fa fa-car fa-20x" aria-hidden="true"></i>
                </a>
                <div class="panel panel-default collapse" id="activity-workers">
                    <div class="panel-body">
                        <ul class="list-unstyled">
                            <li><a href="/public/activity#workers1">Водитель категории С</a></li>
                            <li><a href="/public/activity#workers2">Водитель категории E</a></li>
                            <li><a href="/public/activity#workers3">Личный водитель</a></li>
                            <li><a href="/public/activity#workers4">Строитель</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
<?php
include('./_layouts/contacts.php');
include('./_layouts/footer.php');