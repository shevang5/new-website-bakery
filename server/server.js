import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.js";
import passport from "passport";
import session from "express-session";
import "./config/passport.js";
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import googleAuthRoutes from "./routes/googleAuthRoutes.js";

dotenv.config();
const app = express();

// Configure CORS with proper origin and credentials
const corsOptions = {
  origin: [
    // 'http://localhost:5173',
    // 'http://127.0.0.1:5173',
    process.env.CLIENT_URL // Add environment variable for deployment
  ].filter(Boolean), // Remove undefined/null if CLIENT_URL is not set
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};
app.use(cors(corsOptions));

// Session middleware
app.use(session({
  secret: process.env.SESSION_SECRET || 'MRBI9Us9n6fo6gBQxHVXInPKZGqQckZH',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax', // Needed for cross-site cookies if frontend/backend are on different domains
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  },
  proxy: true // trust the reverse proxy when setting secure cookies (important for Render)
}));

// Initialize passport and session
app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());

connectDB();

app.use("/auth", googleAuthRoutes); // Mount Google auth routes at /auth
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/cart", cartRoutes);

app.get("/", (req, res) => res.send("E-commerce API is running"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
