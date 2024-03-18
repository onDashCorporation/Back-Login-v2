-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 18-Mar-2024 às 22:28
-- Versão do servidor: 10.4.32-MariaDB
-- versão do PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `signup`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `login`
--

CREATE TABLE `login` (
  `id` int(11) NOT NULL,
  `name` varchar(220) NOT NULL,
  `email` varchar(220) NOT NULL,
  `password` varchar(220) NOT NULL,
  `cargo` enum('1','2','3','') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Extraindo dados da tabela `login`
--

INSERT INTO `login` (`id`, `name`, `email`, `password`, `cargo`) VALUES
(1, 'anna', 'anna@gmail.com', '154156415', '1'),
(2, 'douglas', 'douglas@gmail.com', 'dyhsfguysdgfyhs', '1'),
(3, 'um', 'hum@gmail.com', 'ahdgasgd', '1'),
(4, 'teste', 'teste@gmail.com', 'testando', '1'),
(5, 'atualizou', 'atualizacao@gmail.com', 'adhgasg', '1'),
(7, 'deu certo?', 'sim@gmail.com', 'aaaaaaaaaaaaa', '1'),
(8, 'senha', 'adaf@gmail.com', 'assenha', '1'),
(9, 'sgadhgasdgh', 'sgadhgasdgh@gmail.com', 'A*1aaasgadhgasdgh', '1'),
(10, 'hash', 'hash@gmail.com', '$2b$10$oSTW1CptHOMVdRE3De3yYOyHw6O3OkWQCe9sx5bHFotVFqYJNa7Ny', '1'),
(11, 'flavia', 'flavia@gmail.com', '$2b$10$9I.k3IpGD2fg77YeLw25fukV3iPKDz5XK5t0jWqZfBccZFAA3TNI6', '1'),
(12, 'login', 'login@gmail.com', '$2b$10$7X3ReFAuJRP.eqzcRgNnX.Gj6nbTfLZ7T6p6GclUsum8YQNKz3bcm', '1'),
(13, 'auth', 'auth@gmail.com', '$2b$10$50ckZGUOBO8dpR/52fh4QOXV9jk1Zq7wsAI0AFY2MW8to0XsQBYwi', '1'),
(14, 'Testar cadastro', 'sucesso@gmail.com', '$2b$10$3tTHTqJwr3tyFCjnf6qWPuliokTliWMCLRfgzloLDaKUP/kUBTLei', '1'),
(15, 'Logout Teste', 'logout@gmail.com', '$2b$10$U4RcADWcSH6X7lmRfmwDVOxueCxTTA9DaZbaFBrPay7fFDuEVWasS', '1'),
(16, 'Teste', 'signupcerto@gmail.com', '$2b$10$H.j1y45/O0pmHBq9kmohE.L02axiO9SbE7HuJkINB36ibJBlysgyO', '1'),
(17, 'Teste', 'signupcertoagora@gmail.com', '$2b$10$3zMqvUN2zinacpX3KRIL4uUdruPLfC.D1nIfYXmPNAqmy9/mHxhni', '1'),
(18, 'Testando o cargo', 'cargo@gmail.com', '$2b$10$qhzR142hox.WNB8tr0saZuQi9F8tyfnmbTBkqUloJtt.kHcRpd/GS', '3'),
(19, 'Testando o cargo', 'cargoaa@gmail.com', '$2b$10$w68jMcngT8/daVO1FGLHt.nGVN5zZqaqxjSZAznEV9MTauOWkhcEW', ''),
(20, 'Testando o cargo', 'cargoaaa@gmail.com', '$2b$10$Kml/45V/IkAYqDRRZcDhEu0c1IWajG5TpNPvkpusEfbYt/P02YpAO', '2');

--
-- Índices para tabelas despejadas
--

--
-- Índices para tabela `login`
--
ALTER TABLE `login`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `login`
--
ALTER TABLE `login`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
