-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 03/07/2023 às 05:47
-- Versão do servidor: 10.4.28-MariaDB
-- Versão do PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `gestaoongs`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `voluntarios_colaboradores`
--

CREATE TABLE `voluntarios_colaboradores` (
  `id` int(12) NOT NULL,
  `cpf` varchar(11) NOT NULL,
  `nome` varchar(250) NOT NULL,
  `email` varchar(250) NOT NULL,
  `data_nascimento` date NOT NULL,
  `tipo` varchar(250) NOT NULL,
  `sexo` varchar(250) NOT NULL,
  `funcao` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `voluntarios_colaboradores`
--

INSERT INTO `voluntarios_colaboradores` (`id`, `cpf`, `nome`, `email`, `data_nascimento`, `tipo`, `sexo`, `funcao`) VALUES
(1, '59583375055', 'João Silva', 'joaosilva@exemplo.com', '1990-02-01', 'colaborador', 'masculino', 'analista'),
(2, '00000000000', 'Teste 2', 'teste@example.com', '1990-09-01', 'Voluntário', 'Masculino', 'Auxiliar');

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `voluntarios_colaboradores`
--
ALTER TABLE `voluntarios_colaboradores`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `CPF` (`cpf`);

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `voluntarios_colaboradores`
--
ALTER TABLE `voluntarios_colaboradores`
  MODIFY `id` int(12) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
