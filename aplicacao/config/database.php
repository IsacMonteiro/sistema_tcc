<?php
// Classe Database responsável por gerenciar a conexão ao banco de dados.
class Database {
    // Propriedades privadas da classe que armazenam informações para conectar ao banco de dados.
    private $host = "localhost";       // O endereço do servidor MySQL.
    private $db_name = "sistema_tcc";  // Nome do banco de dados.
    private $username = "root";        // Nome de usuário do MySQL.
    private $password = "";            // Senha do MySQL.
    public $conn;                      // Propriedade que armazenará a conexão PDO ao banco de dados.

    // Método público que cria e retorna a conexão ao banco de dados.
    public function getConnection() {
        // Inicialmente, a conexão é definida como nula.
        $this->conn = null;
        
        // Estabelecendo uma conexão usando PDO.
        try {
            // Cria uma nova instância da classe PDO.
            $this->conn = new PDO("mysql:host=" . $this->host . ";dbname=" . $this->db_name, $this->username, $this->password);
            
            // Configura a conexão para usar o conjunto de caracteres UTF-8, garantindo compatibilidade com caracteres especiais.
            $this->conn->exec("set names utf8");
        } catch(PDOException $exception) {
            // Mensagem de erro.
            echo "Connection error: " . $exception->getMessage();
        }

        // Retorna a conexão estabelecida (ou null, caso a conexão tenha falhado).
        return $this->conn;
    }
}
?>
