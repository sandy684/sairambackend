const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Vegetable = require('./models/Vegetable'); // ✅ adjust if needed

dotenv.config();

// ✅ DB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("✅ MongoDB connected...");
  seedVegetables();
}).catch(err => {
  console.error("❌ Connection error:", err);
});

function getRandomKg() {
  return Math.floor(Math.random() * 81) + 20;
}

const veggies = [
  { name: 'பெரிய வெங்காயம் (Onion Big)', pricePerKg: 40, availableKg: getRandomKg(), image: 'https://chefsmandala.com/wp-content/uploads/2018/03/Onion-Red.jpg' },
  { name: 'சின்ன வெங்காயம் (Onion Small)', pricePerKg: 45, availableKg: getRandomKg(), image: 'https://m.media-amazon.com/images/I/81a3EhOX9dL._AC_SL1476_.jpg' },
  { name: 'உருளைக்கிழங்கு (Potato)', pricePerKg: 30, availableKg: getRandomKg(), image: 'https://tse1.mm.bing.net/th/id/OIP.zB7AATBDNYVwv3rUfXbYcwHaE8?pid=Api&P=0&h=180' },
  { name: 'தக்காளி (Tomato)', pricePerKg: 25, availableKg: getRandomKg(), image: 'https://www.almanac.com/sites/default/files/image_nodes/tomatoes_helios4eos_gettyimages-edit.jpeg' },
  { name: 'பச்சை மிளகாய் (Green Chili)', pricePerKg: 60, availableKg: getRandomKg(), image: 'https://www.aaiwini.com/assets/chilli2.webp' },
  { name: 'குடைமிளகாய் (Capsicum)', pricePerKg: 70, availableKg: getRandomKg(), image: 'https://www.homenaturalcures.com/wp-content/uploads/Harvested-Capsicum.jpg' },
  { name: 'அவாரைக்காய் (Avarakkai)', pricePerKg: 35, availableKg: getRandomKg(), image: 'https://1.bp.blogspot.com/-yH1-nOx0FpA/XoXX5oXJEtI/AAAAAAADPYY/Oj9xF7Xitjs1C6rDC-uwlSddoz42GHPrQCLcBGAsYHQ/s640/avarakkai.jpg' },
  { name: 'சுரைக்காய் (Bottle Gourd)', pricePerKg: 35, availableKg: getRandomKg(), image: 'https://fhasal.in/wp-content/uploads/2022/09/Bottle-Gourd-22.jpg' },
  { name: 'பீர்க்கங்காய் (Ridge Gourd)', pricePerKg: 30, availableKg: getRandomKg(), image: 'https://images.tv9telugu.com/wp-content/uploads/2023/08/beerakaya.jpg' },
  { name: 'வெண்டைக்காய் (Ladies Finger)', pricePerKg: 45, availableKg: getRandomKg(), image: 'https://healthwire.pk/wp-content/uploads/2022/03/lady-finger-benefits.jpg' },
  { name: 'பூசணிக்காய் (Ash Gourd)', pricePerKg: 20, availableKg: getRandomKg(), image: 'https://kj1bcdn.b-cdn.net/media/85728/ash-gourd.jpg' },
  { name: 'முருங்கைக்காய் (Drumstick)', pricePerKg: 50, availableKg: getRandomKg(), image: 'https://www.healthifyme.com/blog/wp-content/uploads/2022/03/shutterstock_1663988527-1-1024x682.jpg' },
  { name: 'பீன்ஸ் (Beans)', pricePerKg: 50, availableKg: getRandomKg(), image: 'https://www.egypte-market.com/wp-content/uploads/2023/04/How-to-boil-green-beans-square.jpeg' },
  { name: 'புடலங்காய் (Snake Gourd)', pricePerKg: 35, availableKg: getRandomKg(), image: 'http://www.onlyfoods.net/wp-content/uploads/2017/03/Snake-Gourds.jpg' },
  { name: 'வெள்ளரிக்காய் (Cucumber)', pricePerKg: 25, availableKg: getRandomKg(), image: 'https://a-z-animals.com/media/2023/02/shutterstock_1161733981.jpg' },
  { name: 'மாங்காய் (Raw Mango)', pricePerKg: 60, availableKg: getRandomKg(), image: 'https://i0.wp.com/www.theayurveda.org/wp-content/uploads/2015/05/Raw-mangoes-1024x879.jpg?fit=1024%2C879&ssl=1' },
  { name: 'புடினா (Mint)', pricePerKg: 10, availableKg: getRandomKg(), image: 'https://cdn-prod.medicalnewstoday.com/content/images/articles/275/275944/mint-on-a-wooden-table.jpg' },
  { name: 'கொத்தமல்லி (Coriander)', pricePerKg: 10, availableKg: getRandomKg(), image: 'https://www.lovethegarden.com/sites/default/files/content/articles/UK_coriander-growing.jpg' },
  { name: 'முட்டைகோஸ் (Cabbage)', pricePerKg: 20, availableKg: getRandomKg(), image: 'https://e1.pxfuel.com/desktop-wallpaper/830/800/desktop-wallpaper-cabbage-food-hq-cabbage.jpg' },
  { name: 'பூக்கோசு (Cauliflower)', pricePerKg: 25, availableKg: getRandomKg(), image: 'https://swirlsofflavor.com/wp-content/uploads/2022/03/cauliflower-heads-cva.jpg' },
  { name: 'லெமன் (Lemon)', pricePerKg: 80, availableKg: getRandomKg(), image: 'https://img.emedihealth.com/wp-content/uploads/2020/09/lemon-feat-1.jpg' },
  { name: 'கேரட் (Carrot)', pricePerKg: 40, availableKg: getRandomKg(), image: 'https://www.healthline.com/hlcmsresource/images/AN_images/AN273-Carrots-732x549-Thumb.jpg' },
  { name: 'முள்ளங்கி (Radish)', pricePerKg: 20, availableKg: getRandomKg(), image: 'https://www.thespruceeats.com/thmb/jqLPDkZWFnTrwrcflZkV38UPJbo=/3264x2448/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-454629217-c9eb78f1070248ba98a1ee4c7e2df300.jpg' },
  { name: 'பாசிப்பயிறு (Green Gram)', pricePerKg: 40, availableKg: getRandomKg(), image: 'https://www.naatigrains.com/image/cache/catalog/naatigrains-products/NG195/green-gram-masala-multi-vitamins-nuts-seeds-order-now-payiru-bangalore-chennai-naati-grains-1000x1000.jpg' },
  { name: 'கீரை வகைகள் (Greens)', pricePerKg: 30, availableKg: getRandomKg(), image: 'https://www.seed-bank.ca/wp-content/uploads/how-to-grow-spinach-2048x2048.jpg' },
  { name: 'சேப்பங்கிழங்கு (Cheppankizhangu)', pricePerKg: 40, availableKg: getRandomKg(), image: 'https://tamil.cdn.zeenews.com/tamil/sites/default/files/2022/03/16/216048-taro-root.jpg' },
  { name: 'பனங்கிழங்கு (Palm Root)', pricePerKg: 30, availableKg: getRandomKg(), image: 'https://images.news18.com/tamil/uploads/2024/02/palm-sprout-9-2024-02-28fae3fbe4016c035fac0bb377882960-scaled.jpg' },
  { name: 'இஞ்சி (Ginger)', pricePerKg: 80, availableKg: getRandomKg(), image: 'https://holisticlivingtips.com/wp-content/uploads/2017/06/ginger.jpg' },
  { name: 'பூண்டு (Garlic)', pricePerKg: 100, availableKg: getRandomKg(), image: 'https://www.almanac.com/sites/default/files/image_nodes/garlic-growing-guide.jpg' },
  { name: 'தேங்காய் (Coconut)', pricePerKg: 40, availableKg: getRandomKg(), image:'https://images.saymedia-content.com/.image/t_share/MjA0NDc4ODMzMzE3OTE0NDAw/health-nutrition-benefits-of-coconut.jpg'},
];



async function seedVegetables() {
  try {
    await Vegetable.deleteMany();
    await Vegetable.insertMany(veggies);
    console.log("🌱 Vegetables inserted successfully!");
    process.exit();
  } catch (err) {
    console.error("❌ Failed to seed vegetables:", err.message);
    process.exit(1);
  }
}
