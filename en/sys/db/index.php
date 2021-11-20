<?php
class Database
{
    public $db;

    function __construct($hostname, $username, $password, $database)
    {
        $this->db = mysqli_connect($hostname, $username, $password, $database);
        if ($this->db->connect_error) { // not connected
            // echo '<script>console.log("' . mysqli_connect_error() . '");</script>';
        } else {
            if (!$this->table_exist('user')) {
                $sql = "
                    CREATE TABLE user (
                        uid VARCHAR(30) PRIMARY KEY,
                        psw VARCHAR(255) NOT NULL
                    )
                ";
                $this->sql_post($sql);
            }
            if (!$this->table_exist('mode0')) {
                $sql = "
                    CREATE TABLE mode0 (
                        uid VARCHAR(30) PRIMARY KEY,
                        score INT NOT NULL
                    )
                ";
                $this->sql_post($sql);
            }
            if (!$this->table_exist('mode1')) {
                $sql = "
                    CREATE TABLE mode1 (
                        uid VARCHAR(30) PRIMARY KEY,
                        score INT NOT NULL
                    )
                ";
                $this->sql_post($sql);
            }
            if (!$this->table_exist('mode2')) {
                $sql = "
                    CREATE TABLE mode2 (
                        uid VARCHAR(30) PRIMARY KEY,
                        score INT NOT NULL
                    )
                ";
                $this->sql_post($sql);
            }
        }
    }

    function table_exist($table)
    {
        $req = $this->db->query('SELECT * FROM ' . $table);
        if (!$req) {
            return false;
        } else {
            return true;
        }
    }

    function sql_post($sql)
    {
        if ($this->db->query($sql) === TRUE) {
            return true;
        } else {
            return false;
        }
    }
    function sql_get($sql)
    {
        $req = $this->db->query($sql);
        if (!$req) {
            return false;
        } else {
            return $req->fetch_assoc();
        }
    }

    function sql_get_all($sql)
    {
        $req = $this->db->query($sql);
        if (!$req) {
            return false;
        } else {
            return $req->fetch_all();
        }
    }

    function drop_all()
    {
    }
}

class Repo
{
    public $db;
    function __construct()
    {
        $this->db = new Database('sql112.epizy.com', 'epiz_30216251', 'zEjVwGOSSIcz', 'epiz_30216251_kokomi');
    }

    function set_user($uid, $psw)
    {
        $sql = "
            INSERT INTO user (uid, psw) 
                VALUES ('$uid', '$psw');
            ";
        $this->db->sql_post($sql);
    }

    function get_user($uid)
    {
        $sql = "
            SELECT * FROM user WHERE uid = '$uid'
        ";
        $result = $this->db->sql_get($sql);
        if (!$result) {
            return false;
        } else {
            return json_encode($result);
        }
    }

    function valid_username($usn)
    {
        if (!$this->get_user($usn)) {
            return true;
        } else {
            return false;
        }
    }

    function user_auth($uid, $psw)
    {
        $sql = "
            SELECT * FROM user WHERE uid = '$uid' and psw = '$psw'
        ";
        $result = $this->db->sql_get($sql);
        if (!$result) {
            return false;
        } else {
            return true;
        }
    }

    function upload_score($uid, $score, $mode)
    {
        $sql = "
            SELECT * FROM mode$mode WHERE uid = '$uid'
        ";
        $result = $this->db->sql_get($sql);
        if (!$result) {
            $sql = "
                INSERT INTO mode$mode (uid, score) VALUES ('$uid', '$score')
            ";
            $this->db->sql_post($sql);
        } else {
            if ($score > $result['score']) {
                $sql = "
                    UPDATE mode$mode
                    SET score = '$score'
                    WHERE uid = '$uid'
                ";
                $this->db->sql_post($sql);
            }
        }
    }
    function get_score_ranking($mode){
        $sql = "
            SELECT * FROM mode$mode ORDER BY score DESC
        ";
        return $this->db->sql_get_all($sql);
    }
}

$repo = new Repo();
