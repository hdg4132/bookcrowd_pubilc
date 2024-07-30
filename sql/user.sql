CREATE TABLE `user` (
                        `id` varchar(255) NOT NULL,
                        `email` varchar(255) DEFAULT NULL,
                        `name` varchar(255) DEFAULT NULL,
                        `password` varchar(255) DEFAULT NULL,
                        `phone_number` varchar(255) DEFAULT NULL,
                        `token` varchar(255) DEFAULT NULL,
                        `user_type` varchar(255) DEFAULT NULL,
                        `created_at` datetime(6) DEFAULT NULL,
                        `edited_at` datetime(6) DEFAULT NULL,
                        `last_login_at` datetime(6) DEFAULT NULL,
                        `address` varchar(255) DEFAULT NULL,
                        `detail_address` varchar(255) DEFAULT NULL,
                        PRIMARY KEY (`id`)
)