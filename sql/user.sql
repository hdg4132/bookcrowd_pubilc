CREATE TABLE `bookcrowd`.`user` (
                                    `uuid` bigint(20) NOT NULL AUTO_INCREMENT,
                                    `email` varchar(255) DEFAULT NULL,
                                    `password` varchar(255) DEFAULT NULL,
                                    `name` varchar(255) DEFAULT NULL,
                                    `phone_number` varchar(20) DEFAULT NULL,
                                    `user_type` varchar(20) DEFAULT NULL,
                                    `address` varchar(255) DEFAULT NULL,
                                    `detail_address` varchar(255) DEFAULT NULL,
                                    `token` varchar(255) DEFAULT NULL,
                                    `created_at` datetime DEFAULT NULL,
                                    `edited_at` datetime DEFAULT NULL,
                                    `last_login_at` datetime DEFAULT NULL,
                                    PRIMARY KEY (`uuid`)
);