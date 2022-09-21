const whitelist = [
  "http://localhost:3000",
  "http://localhost:3001",
  "https://stock-app-gold.vercel.app/",
];

const corsOption = {
  origin: (origin: any, callback: any) => {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  optionsSuccessStatus: 200,
  credentials: true,
};

export default corsOption;
