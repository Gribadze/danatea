<?php
/**
 * Created by PhpStorm.
 * User: dmitry
 * Date: 11.09.17
 * Time: 20:38
 * */
include_once('../admin/config.php');

class CAdminConnector extends mysqli {
//    const recQualifications = [array('name' => 'name', 'fieldType' => 'text')];
    const recVacancies = [
        array('name' => 'name', 'fieldType' => 'text', 'description' => 'Наименование'),
        array('name' => 'qualification', 'fieldType' => 'text', 'description' => 'Специальность'),
        array('name' => 'demands', 'fieldType' => 'textarea', 'description' => 'Требования'),
        array('name' => 'conditions', 'fieldType' => 'textarea', 'description' => 'Условия работы')
    ];
//    const recArticles = [
//        array('name' => 'header', 'fieldType' => 'text'),
//        array('name' => 'content', 'fieldType' => 'textarea')
//    ];
    const recReviews = [
        array('name' => 'name', 'fieldType' => 'text', 'description' => 'Имя'),
        array('name' => 'post_date', 'fieldType' => 'datetime', 'description' => 'Дата отзыва'),
        array('name' => 'content', 'fieldType' => 'textarea', 'description' => 'Отзыв'),
        array('name' => 'photo', 'fieldType' => 'file', 'description' => 'Фото')
    ];

    private function _recByType($type) {
        switch ($type) {
            case 'qualifications':
                return self::recQualifications;
            case 'vacancies':
                return self::recVacancies;
            case 'articles':
                return self::recArticles;
            case 'reviews':
                return self::recReviews;
            default:
                throw new Exception('Неизвестный тип записи');
        }
    }

    public function __construct($user, $password) {
        parent::__construct(CSettings::$db_host, $user, $password, CSettings::$db_name);

        if (!$this->connect_error) {
            $this->query("SET NAMES utf8 COLLATE utf8_unicode_ci");
        } else {
            echo $this->connect_error;
        }
    }

    public function getList($type) {
        return $this->query('SELECT * FROM `' . $type . '`')->fetch_all();
    }

    public function getListHeaders($type) {
        try {
            $record = $this->_recByType($type);
        } catch (Exception $e) {
            echo $e->getMessage();
            exit();
        }
        return $record;
    }

    public function insertValues($type, $values) {
        try {
            $record = $this->_recByType($type);
        } catch (Exception $e) {
            echo $e->getMessage();
            exit();
        }
        $query = 'INSERT INTO `'.$type.'` ('.
            join(',',$record).
            ') VALUES ("'.
            join('","',$values).
            '")';

        if ($this->query($query) === TRUE) {
            return 'Запись добавлена';
        } else {
            return $query." ".json_encode($this->error);
        }
    }

    public function updateValues($type, $id, $values) {
        try {
            $record = $this->_recByType($type);
        } catch (Exception $e) {
            echo $e->getMessage();
            exit();
        }
        $query = 'UPDATE `'.$type.'` SET '.
            join(',',array_map(function($rec, $val) { return $rec.'="'.$val.'"'; },$record,$values)).
            ' WHERE id='.$id;

        if ($this->query($query) === TRUE) {
            return 'Запись обновлена';
        } else {
            return $query." ".json_encode($this->error);
        }
    }

    public function deleteRow($type, $id) {
        try {
            $record = $this->_recByType($type);
        } catch (Exception $e) {
            echo $e->getMessage();
            exit();
        }
        $query = 'DELETE FROM `'.$type.'` WHERE id='.$id;

        if ($this->query($query) === TRUE) {
            return 'Запись удалена';
        } else {
            return $query." ".json_encode($this->error);
        }
    }
}