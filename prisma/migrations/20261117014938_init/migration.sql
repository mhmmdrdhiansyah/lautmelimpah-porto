-- CreateTable
CREATE TABLE `categories` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name_en` VARCHAR(100) NOT NULL,
    `slug` VARCHAR(100) NOT NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `categories_slug_key`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `products` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `category_id` INTEGER NOT NULL,
    `name_en` VARCHAR(150) NOT NULL,
    `local_name_id` VARCHAR(150) NULL,
    `latin_name` VARCHAR(150) NOT NULL,
    `slug` VARCHAR(150) NOT NULL,
    `hs_code` VARCHAR(20) NULL,
    `origin_area` VARCHAR(100) NOT NULL DEFAULT 'Belitung Island, Indonesia',
    `processing_types` VARCHAR(255) NOT NULL,
    `freezing_methods` VARCHAR(150) NOT NULL,
    `size_grades` VARCHAR(255) NOT NULL,
    `packaging_spec` VARCHAR(255) NOT NULL,
    `moq_spec` VARCHAR(100) NOT NULL,
    `availability_status` ENUM('AVAILABLE', 'SEASONAL', 'LIMITED') NOT NULL DEFAULT 'AVAILABLE',
    `peak_months` VARCHAR(100) NULL,
    `description_en` TEXT NOT NULL,
    `image_url` VARCHAR(255) NOT NULL,
    `is_featured` BOOLEAN NOT NULL DEFAULT false,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `products_slug_key`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `compliance_documents` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title_en` VARCHAR(150) NOT NULL,
    `issuer` VARCHAR(150) NOT NULL,
    `document_type` ENUM('COMPANY_LEGALITY', 'FOOD_SAFETY', 'EXPORT_CERTIFICATE') NOT NULL,
    `registration_number` VARCHAR(100) NULL,
    `description_en` TEXT NOT NULL,
    `badge_icon_url` VARCHAR(255) NULL,
    `is_active` BOOLEAN NOT NULL DEFAULT true,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `inquiries` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `inquiry_code` VARCHAR(30) NOT NULL,
    `buyer_name` VARCHAR(150) NOT NULL,
    `company_name` VARCHAR(150) NOT NULL,
    `country` VARCHAR(100) NOT NULL,
    `email` VARCHAR(150) NOT NULL,
    `phone_whatsapp` VARCHAR(50) NULL,
    `preferred_incoterm` ENUM('FOB_JAKARTA', 'FOB_BELITUNG', 'CIF', 'CNF') NOT NULL DEFAULT 'FOB_JAKARTA',
    `shipping_mode` ENUM('SEA_REEFER', 'AIR_CARGO') NOT NULL DEFAULT 'SEA_REEFER',
    `destination_port` VARCHAR(150) NULL,
    `additional_notes` TEXT NULL,
    `status` ENUM('NEW', 'QUOTED', 'NEGOTIATING', 'CLOSED_WON', 'CLOSED_LOST') NOT NULL DEFAULT 'NEW',
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `inquiries_inquiry_code_key`(`inquiry_code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `inquiry_items` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `inquiry_id` INTEGER NOT NULL,
    `product_id` INTEGER NOT NULL,
    `requested_form` VARCHAR(100) NULL,
    `requested_size` VARCHAR(100) NULL,
    `estimated_quantity` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `products` ADD CONSTRAINT `products_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `categories`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `inquiry_items` ADD CONSTRAINT `inquiry_items_inquiry_id_fkey` FOREIGN KEY (`inquiry_id`) REFERENCES `inquiries`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `inquiry_items` ADD CONSTRAINT `inquiry_items_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
