import axios from "axios";
import Cookies from "js-cookie";

const api = axios.create({
  // baseURL যদি .env থেকে না পায় তবে সরাসরি আপনার এপিআই ইউআরএল ব্যবহার করবে
  baseURL: process.env.NEXT_PUBLIC_API_URL || "https://safariooapi.sumit-achar.site/api",
  headers: { 
    "Content-Type": "application/json",
    "Accept": "application/json" // Laravel/Backend-এর এরর মেসেজ ঠিকভাবে পাওয়ার জন্য এটি জরুরি
  },
});

// রিকোয়েস্ট ইন্টারসেপ্টর: প্রতিবার এপিআই কলের সময় টোকেন পাঠানো
api.interceptors.request.use(
  (config) => {
    const token = Cookies.get("safarioo_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // টোকেন স্ট্রিং হিসেবে নিশ্চিত করা হচ্ছে  
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


// রেসপন্স ইন্টারসেপ্টর: এরর হ্যান্ডলিং
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // যদি সার্ভার থেকে কোনো রেসপন্স আসে (যেমন: 401, 403, 500)
    if (error.response) {
      const status = error.response.status;
      const message = error.response.data?.message || "Something went wrong on server";

      // আপনি যদি গ্লোবাল লগআউট এখানে না চান, তবে অন্তত এরর মেসেজটি থ্রো করুন 
      // যাতে AuthInitializer বুঝতে পারে এপিআই ক্র্যাশ করেছে।
      if (status === 500) {
        console.error("Server Crash (500):", message);
      }
      
      if (status === 401) {
        console.warn("Unauthorized (401): Token might be expired.");
      }

      // কাস্টম এরর মেসেজ অবজেক্ট রিটার্ন করা যা কম্পোনেন্ট লেভেলে ধরা সহজ
      return Promise.reject({
        status,
        message,
        originalError: error
      });
    } 
    
    // যদি নেটওয়ার্ক ইস্যু হয় (সার্ভার অফলাইন থাকলে)
    else if (error.request) {
      return Promise.reject({
        status: 0,
        message: "Network Error: Server is unreachable",
        originalError: error
      });
    }

    return Promise.reject(error);
  }
);

export default api;