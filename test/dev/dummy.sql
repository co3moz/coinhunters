SET @DOGAN = UUID();
SET @GOKSEL = UUID();

INSERT INTO `user` (`id`, `email`, `password`, `name`, `createdAt`, `updatedAt`, `deletedAt`) 
VALUES (@DOGAN, 'doganderya59@gmail.com', 'c4ca4238a0b923820dcc509a6f75849b', 'co3moz',  NOW(), NOW(), NULL);


INSERT INTO `user` (`id`, `email`, `password`, `name`, `createdAt`, `updatedAt`, `deletedAt`) 
VALUES (@GOKSEL, 'gokselpirnal@gmail.com', 'c4ca4238a0b923820dcc509a6f75849b', 'goxel',  NOW(), NOW(), NULL);

INSERT INTO `room` (`id`, `status`, `name`, `ground`, `challengerCoin`, `opponentCoin`, `createdAt`, `updatedAt`, `deletedAt`, `challengerId`, `opponentId`) 
VALUES (UUID(), 'CHALLENGER', 'co3moz vs goxel', REPEAT('?', 400), '0', '0', NOW(), NOW(), NULL, @DOGAN, @GOKSEL);

INSERT INTO `room` (`id`, `status`, `name`, `ground`, `challengerCoin`, `opponentCoin`, `createdAt`, `updatedAt`, `deletedAt`, `challengerId`, `opponentId`) 
VALUES (UUID(), 'CHALLENGER', 'goxel vs co3moz', REPEAT('?', 400), '0', '0', NOW(), NOW(), NULL, @GOKSEL, @DOGAN);