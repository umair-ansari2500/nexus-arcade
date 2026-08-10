-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 20, 2024 at 10:30 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `zontal`
--

-- --------------------------------------------------------

--
-- Table structure for table `zon_ads`
--

CREATE TABLE `zon_ads` (
  `id` int(11) NOT NULL,
  `code` mediumtext NOT NULL,
  `ad_name` text NOT NULL,
  `status` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `zon_ads`
--

INSERT INTO `zon_ads` (`id`, `code`, `ad_name`, `status`) VALUES
(1, '', '700x100', 1),
(2, '', '700x100', 1),
(3, '', '700x100', 1),
(4, '', '400x400', 1),
(5, '', '400x400', 1),
(6, '', '700x100', 1);

-- --------------------------------------------------------

--
-- Table structure for table `zon_animation_classes`
--

CREATE TABLE `zon_animation_classes` (
  `id` int(11) NOT NULL,
  `name` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `zon_animation_classes`
--

INSERT INTO `zon_animation_classes` (`id`, `name`) VALUES
(1, 'bounce'),
(2, 'flash'),
(3, 'pulse'),
(4, 'rubberBand'),
(5, 'shakeX'),
(6, 'shakeY'),
(7, 'headShake'),
(8, 'swing'),
(9, 'tada'),
(10, 'wobble'),
(11, 'jello'),
(12, 'heartBeat'),
(13, 'backInDown'),
(14, 'backInLeft'),
(15, 'backOutRight'),
(16, 'backOutUp'),
(17, 'bounceIn'),
(18, 'bounceInDown'),
(19, 'bounceInLeft'),
(20, 'bounceInRight'),
(21, 'bounceInUp'),
(22, 'bounceOut'),
(23, 'bounceOutDown'),
(24, 'bounceOutLeft'),
(25, 'bounceOutRight'),
(26, 'bounceOutUp'),
(27, 'fadeIn'),
(28, 'fadeInDown'),
(29, 'fadeInDownBig'),
(30, 'fadeInLeft'),
(31, 'fadeInLeftBig'),
(32, 'fadeInRight'),
(33, 'fadeInRightBig'),
(34, 'fadeInUp'),
(35, 'fadeInUpBig'),
(36, 'fadeInTopLeft'),
(37, 'fadeInTopRight'),
(38, 'fadeInBottomLeft'),
(39, 'fadeInBottomRight'),
(40, 'fadeOut'),
(41, 'fadeOutDown'),
(42, 'fadeOutDownBig'),
(43, 'fadeOutLeft'),
(44, 'fadeOutLeftBig'),
(45, 'fadeOutRight'),
(46, 'fadeOutRightBig'),
(47, 'fadeOutUp'),
(48, 'fadeOutUpBig'),
(49, 'fadeOutTopLeft'),
(50, 'fadeOutTopRight'),
(51, 'fadeOutBottomRight'),
(52, 'fadeOutBottomLeft'),
(53, 'flip'),
(54, 'flipInX'),
(55, 'flipInY'),
(56, 'flipOutX'),
(57, 'flipOutY'),
(58, 'lightSpeedInRight'),
(59, 'lightSpeedInLeft'),
(60, 'lightSpeedOutRight'),
(61, 'lightSpeedOutLeft'),
(62, 'rotateIn'),
(63, 'rotateInDownLeft'),
(64, 'rotateInDownRight'),
(65, 'rotateInUpLeft'),
(66, 'rotateInUpRight'),
(67, 'rotateOut'),
(68, 'rotateOutDownLeft'),
(69, 'rotateOutDownRight'),
(70, 'rotateOutUpLeft'),
(71, 'rotateOutUpRight'),
(72, 'hinge'),
(73, 'jackInTheBox'),
(74, 'rollIn'),
(75, 'rollOut'),
(76, 'zoomIn'),
(77, 'zoomInDown'),
(78, 'zoomInLeft'),
(79, 'zoomInRight'),
(80, 'zoomInUp'),
(81, 'zoomOut'),
(82, 'zoomOutDown'),
(83, 'zoomOutLeft'),
(84, 'zoomOutRight'),
(85, 'zoomOutUp'),
(86, 'slideInDown'),
(87, 'slideInLeft'),
(88, 'slideInRight'),
(89, 'slideInUp'),
(90, 'slideOutDown'),
(91, 'slideOutLeft'),
(92, 'slideOutRight'),
(93, 'slideOutUp');

-- --------------------------------------------------------

--
-- Table structure for table `zon_blog`
--

CREATE TABLE `zon_blog` (
  `id` int(11) NOT NULL,
  `blog_title` text NOT NULL,
  `blog_desc` text NOT NULL,
  `blog_content` longtext NOT NULL,
  `blog_image` text NOT NULL,
  `blog_date` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `zon_category`
--

CREATE TABLE `zon_category` (
  `id` int(11) NOT NULL,
  `name` text NOT NULL,
  `slug` mediumtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `zon_comments`
--

CREATE TABLE `zon_comments` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `game_id` int(11) NOT NULL,
  `subject` varchar(2000) NOT NULL,
  `date` varchar(11000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `zon_config`
--

CREATE TABLE `zon_config` (
  `id` int(11) NOT NULL,
  `site_name` text NOT NULL,
  `profile_tagline` text NOT NULL,
  `site_logo_light` mediumtext NOT NULL,
  `site_logo_dark` mediumtext NOT NULL,
  `site_favicon` mediumtext NOT NULL,
  `head_code` mediumtext NOT NULL,
  `footer_content` longtext NOT NULL,
  `site_title` text NOT NULL,
  `site_desc` text NOT NULL,
  `site_keywords` text NOT NULL,
  `sidebar_show` int(11) NOT NULL,
  `category_slider_show` int(11) NOT NULL,
  `featured_game_slider` int(11) NOT NULL,
  `popular_views` int(11) NOT NULL,
  `site_color` mediumtext NOT NULL,
  `section_games_limit` int(11) NOT NULL,
  `games_title` text NOT NULL,
  `games_desc` text NOT NULL,
  `play_title` text NOT NULL,
  `play_desc` text NOT NULL,
  `profile_title` text NOT NULL,
  `profile_desc` text NOT NULL,
  `category_title` text NOT NULL,
  `category_desc` text NOT NULL,
  `animate_class` text NOT NULL,
  `cursor_color` text NOT NULL,
  `custom_cursor` int(11) NOT NULL,
  `theme` text NOT NULL,
  `blog` int(11) NOT NULL,
  `gamepix_sid` text NOT NULL,
  `auto_fetch` int(11) NOT NULL,
  `auto_fetch_amount` int(11) NOT NULL,
  `auto_fetch_timing` int(11) NOT NULL,
  `auto_fetch_pub` text NOT NULL,
  `auto_fetch_page` int(11) NOT NULL,
  `auto_fetch_all_games_fetched` int(11) NOT NULL,
  `auto_fetch_game_publisher` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `zon_config`
--

INSERT INTO `zon_config` (`id`, `site_name`, `profile_tagline`, `site_logo_light`, `site_logo_dark`, `site_favicon`, `head_code`, `footer_content`, `site_title`, `site_desc`, `site_keywords`, `sidebar_show`, `category_slider_show`, `featured_game_slider`, `popular_views`, `site_color`, `section_games_limit`, `games_title`, `games_desc`, `play_title`, `play_desc`, `profile_title`, `profile_desc`, `category_title`, `category_desc`, `animate_class`, `cursor_color`, `custom_cursor`, `theme`, `blog`, `gamepix_sid`, `auto_fetch`, `auto_fetch_amount`, `auto_fetch_timing`, `auto_fetch_pub`, `auto_fetch_page`, `auto_fetch_all_games_fetched`, `auto_fetch_game_publisher`) VALUES
(1, 'zontal', 'Welcome to Zontal', 'logo-black.png', 'logo-white.png', 'favicon.png', '<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8244337620604169" crossorigin="anonymous"></script>', '', 'Zontal - Arcade HTML 5 Game Portal PHP Script', 'Zontal - Arcade HTML 5 Game Portal PHP Script', 'Zontal Game Portal, Game Portal, Online Playing Games, HTML5 Games', 1, 1, 1, 10, '#d92202', 10, 'Online Free Games on Zontal — Let&#039;s play', 'Free online games for different tastes:action games, puzzles, races, games for two and more. You do not need to download — you can play in the browser or from', '[name] Free play game — Zontal', '[name] Free play game you can play in the browser or from', '#[name] player — Zontal', '[name] Free play game you can play in the browser or from', '[name] Free Games — Zontal', '[name] Free Games — Zontal', 'fadeInDown', '#fff', 0, 'garud', 0, '', 0, 90, 1, 'gamepix', 0, 0, '');

-- --------------------------------------------------------

--
-- Table structure for table `zon_featured_games`
--

CREATE TABLE `zon_featured_games` (
  `id` int(11) NOT NULL,
  `game_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `zon_games`
--

CREATE TABLE `zon_games` (
  `id` int(11) NOT NULL,
  `game_name` text NOT NULL,
  `game_description` text NOT NULL,
  `game_image_url` longtext NOT NULL,
  `game_url` longtext NOT NULL,
  `game_published` text NOT NULL,
  `game_category` text NOT NULL,
  `game_status` int(11) NOT NULL,
  `game_played` int(11) NOT NULL,
  `game_banner_url` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `zon_likes`
--

CREATE TABLE `zon_likes` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `game_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `zon_pages`
--

CREATE TABLE `zon_pages` (
  `id` int(11) NOT NULL,
  `title` text NOT NULL,
  `desc` text NOT NULL,
  `content` longtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `zon_report`
--

CREATE TABLE `zon_report` (
  `id` int(11) NOT NULL,
  `game_name` text NOT NULL,
  `report_subject` text NOT NULL,
  `game_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `zon_section`
--

CREATE TABLE `zon_section` (
  `id` int(11) NOT NULL,
  `section_name` text NOT NULL,
  `section_category` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `zon_unlikes`
--

CREATE TABLE `zon_unlikes` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `game_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `zon_users`
--

CREATE TABLE `zon_users` (
  `id` int(11) NOT NULL,
  `name` varchar(2000) NOT NULL,
  `email` varchar(2000) NOT NULL,
  `username` varchar(3000) NOT NULL,
  `password` mediumtext NOT NULL,
  `user_pic` mediumtext NOT NULL,
  `status` int(11) NOT NULL,
  `is_admin` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `zon_ads`
--
ALTER TABLE `zon_ads`
  ADD PRIMARY KEY (`id`),
  ADD KEY `ad_name` (`ad_name`(768));

--
-- Indexes for table `zon_animation_classes`
--
ALTER TABLE `zon_animation_classes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `zon_blog`
--
ALTER TABLE `zon_blog`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `zon_category`
--
ALTER TABLE `zon_category`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `zon_comments`
--
ALTER TABLE `zon_comments`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `zon_config`
--
ALTER TABLE `zon_config`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `zon_featured_games`
--
ALTER TABLE `zon_featured_games`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `zon_games`
--
ALTER TABLE `zon_games`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `zon_likes`
--
ALTER TABLE `zon_likes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `zon_pages`
--
ALTER TABLE `zon_pages`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `zon_report`
--
ALTER TABLE `zon_report`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `zon_section`
--
ALTER TABLE `zon_section`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `zon_unlikes`
--
ALTER TABLE `zon_unlikes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `zon_users`
--
ALTER TABLE `zon_users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `zon_ads`
--
ALTER TABLE `zon_ads`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `zon_animation_classes`
--
ALTER TABLE `zon_animation_classes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=94;

--
-- AUTO_INCREMENT for table `zon_blog`
--
ALTER TABLE `zon_blog`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `zon_category`
--
ALTER TABLE `zon_category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `zon_comments`
--
ALTER TABLE `zon_comments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `zon_config`
--
ALTER TABLE `zon_config`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `zon_featured_games`
--
ALTER TABLE `zon_featured_games`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `zon_games`
--
ALTER TABLE `zon_games`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `zon_likes`
--
ALTER TABLE `zon_likes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `zon_pages`
--
ALTER TABLE `zon_pages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `zon_report`
--
ALTER TABLE `zon_report`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `zon_section`
--
ALTER TABLE `zon_section`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `zon_unlikes`
--
ALTER TABLE `zon_unlikes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `zon_users`
--
ALTER TABLE `zon_users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
