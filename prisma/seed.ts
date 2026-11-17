import { PrismaClient, AvailabilityStatus, DocumentType } from "@prisma/client";

const prisma = new PrismaClient();

const categories = [
  { nameEn: "Reef Fish", slug: "reef-fish" },
  { nameEn: "Crustaceans", slug: "crustaceans" },
  { nameEn: "Cephalopods", slug: "cephalopods" },
  { nameEn: "Pelagic", slug: "pelagic" },
  { nameEn: "Dried Seafood", slug: "dried-seafood" },
];

const products = [
  {
    slug: "coral-tiger-grouper",
    categorySlug: "reef-fish",
    nameEn: "Coral & Tiger Grouper",
    localNameId: "Kerapu Sunu / Macan",
    latinName: "Plectropomus leopardus / Epinephelus fuscoguttatus",
    hsCode: "0301.72",
    processingTypes: "Live Fish, Chilled Whole Gutted, Frozen Fillet",
    freezingMethods: "Live (Oxygenated), Chilled, IQF",
    sizeGrades: "500-800g, 800-1200g, 1200g UP",
    packagingSpec: "Styrofoam box (chilled/air), master carton + inner polybag (frozen)",
    moqSpec: "1 reefer container (sea) / 500 kg (air)",
    availabilityStatus: "AVAILABLE" as AvailabilityStatus,
    peakMonths: null,
    descriptionEn:
      "Reef grouper from Belitung coral waters, supplied live, chilled whole gutted, or as IQF fillet for live-fish markets and HORECA buyers.",
    imageUrl: "/img/commodity_coral_tiger_grouper.jpg",
    isFeatured: true,
  },
  {
    slug: "blue-swimming-crab",
    categorySlug: "crustaceans",
    nameEn: "Blue Swimming Crab",
    localNameId: "Rajungan",
    latinName: "Portunus pelagicus",
    hsCode: "1605.10",
    processingTypes: "Pasteurized Crab Meat (Colossal, Jumbo Lump, Backfin, Claw)",
    freezingMethods: "Chilled (0-2°C) / Frozen",
    sizeGrades: "U-10, 10/20",
    packagingSpec: "Master carton + inner polybag",
    moqSpec: "1 x 20ft reefer container",
    availabilityStatus: "SEASONAL" as AvailabilityStatus,
    peakMonths: "March-August",
    descriptionEn:
      "Pasteurized blue swimming crab meat in Colossal, Jumbo Lump, Backfin and Claw grades for processors and foodservice in the US, Japan and Singapore.",
    imageUrl: "/img/commodity_blue_swimming_crab.jpg",
    isFeatured: true,
  },
  {
    slug: "squid-cuttlefish",
    categorySlug: "cephalopods",
    nameEn: "Squid & Cuttlefish",
    localNameId: "Cumi-Cumi & Sotong",
    latinName: "Loligo spp. / Sepia spp.",
    hsCode: "0307.43",
    processingTypes: "Whole Round (WR), Cleaned Tube, Squid Ring",
    freezingMethods: "Block Frozen, IQF",
    sizeGrades: "100-200g, 200-300g, 300g UP",
    packagingSpec: "Master carton + inner polybag",
    moqSpec: "1 x 20ft reefer container",
    availabilityStatus: "AVAILABLE" as AvailabilityStatus,
    peakMonths: null,
    descriptionEn:
      "Squid and cuttlefish from the Natuna Sea, offered whole round, cleaned tube or rings, block frozen or IQF for Asian and EU markets.",
    imageUrl: "/img/commodity_squid_cuttlefish.jpg",
    isFeatured: true,
  },
  {
    slug: "spanish-mackerel",
    categorySlug: "pelagic",
    nameEn: "Spanish Mackerel",
    localNameId: "Ikan Tenggiri",
    latinName: "Scomberomorus commerson",
    hsCode: "0303.89",
    processingTypes: "Whole Round (WR), Headless Gutted (HGT), Steak / Loin",
    freezingMethods: "Block Frozen, IQF",
    sizeGrades: "500-1000g, 1000g UP",
    packagingSpec: "Master carton + inner polybag",
    moqSpec: "1 x 20ft reefer container",
    availabilityStatus: "AVAILABLE" as AvailabilityStatus,
    peakMonths: null,
    descriptionEn:
      "Spanish mackerel landed at Tanjung Pandan, supplied WR, HGT or steak/loin for Southeast Asian and Middle Eastern buyers.",
    imageUrl: "/img/commodity_spanish_mackerel.jpg",
    isFeatured: false,
  },
  {
    slug: "red-snapper-emperor",
    categorySlug: "reef-fish",
    nameEn: "Red Snapper & Emperor Fish",
    localNameId: "Kakap Merah & Lencam",
    latinName: "Lutjanus malabaricus / Lethrinus spp.",
    hsCode: "0302.89",
    processingTypes: "Whole Gutted & Scaled (WGS), Skin-on / Skinless Fillet",
    freezingMethods: "Chilled, IQF",
    sizeGrades: "500-800g, 800-1200g, 1200g UP",
    packagingSpec: "Styrofoam box (chilled/air), master carton + inner polybag (frozen)",
    moqSpec: "1 reefer container (sea) / 500 kg (air)",
    availabilityStatus: "LIMITED" as AvailabilityStatus,
    peakMonths: null,
    descriptionEn:
      "Red snapper and emperor fish WGS or filleted, chilled or IQF, for Australian, US, European and Singapore buyers.",
    imageUrl: "/img/commodity_red_snapper_emperor.jpg",
    isFeatured: false,
  },
  {
    slug: "dried-sea-cucumber",
    categorySlug: "dried-seafood",
    nameEn: "Dried Sea Cucumber",
    localNameId: "Teripang / Gamat Asap",
    latinName: "Holothuroidea",
    hsCode: "0308.30",
    processingTypes: "Dried / Smoked Whole",
    freezingMethods: "Dry Ambient",
    sizeGrades: "10-20 pcs/kg, 20-40 pcs/kg, 40 pcs UP/kg",
    packagingSpec: "Master carton, food-grade liner",
    moqSpec: "500 kg",
    availabilityStatus: "SEASONAL" as AvailabilityStatus,
    peakMonths: "October-March",
    descriptionEn:
      "Dried and smoked sea cucumber for Hong Kong, Chinese and Singapore markets, processed with certified UPI partners.",
    imageUrl: "/img/commodity_dried_sea_cucumber.jpg",
    isFeatured: false,
  },
];

const documents = [
  {
    titleEn: "Business Identification Number (NIB)",
    issuer: "OSS Republic of Indonesia",
    documentType: "COMPANY_LEGALITY" as DocumentType,
    registrationNumber: "Registered",
    descriptionEn:
      "Company registration covering wholesale fishery trade and export activities (KBLI wholesale of fishery results and export).",
  },
  {
    titleEn: "Corporate Taxpayer Number (NPWP)",
    issuer: "Directorate General of Taxes",
    documentType: "COMPANY_LEGALITY" as DocumentType,
    registrationNumber: "Registered",
    descriptionEn: "Registered corporate taxpayer with registered exporter status.",
  },
  {
    titleEn: "HACCP",
    issuer: "Certified UPI processing partners",
    documentType: "FOOD_SAFETY" as DocumentType,
    registrationNumber: null,
    descriptionEn:
      "Hazard Analysis Critical Control Point certification at partner processing units, guaranteeing food safety throughout processing.",
    badgeIconUrl: "/img/certificate_haccp_grade_a_upi_belitung.jpg",
  },
  {
    titleEn: "SKP (Processing Feasibility Certificate)",
    issuer: "Ministry of Marine Affairs and Fisheries (KKP)",
    documentType: "FOOD_SAFETY" as DocumentType,
    registrationNumber: null,
    descriptionEn:
      "Official processing feasibility certificate issued by KKP for partner fish processing units.",
  },
  {
    titleEn: "Health Certificate (HC)",
    issuer: "KKP / BPPMHKP Indonesia",
    documentType: "EXPORT_CERTIFICATE" as DocumentType,
    registrationNumber: null,
    descriptionEn:
      "Official health certificate issued per shipment by BPPMHKP/BKIPM for export consignments.",
    badgeIconUrl: "/img/certificate_bkipm_health_certificate.jpg",
  },
  {
    titleEn: "Halal Certification",
    issuer: "BPJPH Indonesia",
    documentType: "FOOD_SAFETY" as DocumentType,
    registrationNumber: null,
    descriptionEn:
      "Halal assurance for Middle East, Malaysia and global halal-market segments.",
  },
  {
    titleEn: "Certificate of Origin (COO / SKA)",
    issuer: "Preferential forms E, D, IJEPA, JIEPA",
    documentType: "EXPORT_CERTIFICATE" as DocumentType,
    registrationNumber: null,
    descriptionEn:
      "Form E (China), Form D (ASEAN), Form IJEPA/JIEPA (Japan) for import-duty relief at destination.",
    badgeIconUrl: "/img/certificate_certificate_of_origin_form_e_d.jpg",
  },
  {
    titleEn: "SHTI (Catch Certificate)",
    issuer: "Ministry of Marine Affairs and Fisheries (KKP)",
    documentType: "EXPORT_CERTIFICATE" as DocumentType,
    registrationNumber: null,
    descriptionEn:
      "Proof of legal, IUU-free catch required for EU, Japan and US markets.",
    badgeIconUrl: "/img/certificate_shti_catch_certificate_non_iuu.jpg",
  },
];

async function main() {
  for (const c of categories) {
    await prisma.category.upsert({
      where: { slug: c.slug },
      update: { nameEn: c.nameEn },
      create: c,
    });
  }
  for (const p of products) {
    const { categorySlug, ...data } = p;
    const category = await prisma.category.findUniqueOrThrow({
      where: { slug: categorySlug },
    });
    await prisma.product.upsert({
      where: { slug: data.slug },
      update: { ...data, categoryId: category.id },
      create: { ...data, categoryId: category.id },
    });
  }
  for (const d of documents) {
    const existing = await prisma.complianceDocument.findFirst({
      where: { titleEn: d.titleEn },
    });
    if (existing) {
      await prisma.complianceDocument.update({ where: { id: existing.id }, data: d });
    } else {
      await prisma.complianceDocument.create({ data: d });
    }
  }
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
