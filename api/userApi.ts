import api from './axiosInstance';

export const userApi = {
  verifyOtp: async (data: { email: string; otp: string }) => {
    try {
      const response = await api.post('/verify-otp', data);

      const resData = response.data;

      if (resData.status === false || resData.status === "false") {
        throw new Error(resData.message || 'OTP verification failed');
      }

      return resData;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        'OTP verification failed';

      throw new Error(errorMessage);
    }
  },

  checkUsername: async (username: string) => {
    try {
      const response = await api.post("/check-username", {
        username: username,
      });

      const resData = response.data;

      if (resData.status === false || resData.status === "false") {
        return { available: false, message: resData.message };
      }

      return resData; // e.g. { status: true, available: true }
    } catch (error: any) {
      console.error("Username check error:", error);
      return { available: false, message: "Error checking username" };
    }
  },


  /**
   * Updates user metadata via POST /user/meta
   * Payload format:
   * {
   *   "meta": [
   *     { "meta_key": "bio", "meta_value": "..." },
   *     { "meta_key": "height_cm", "meta_value": "182" },
   *     ...
   *   ]
   * }
   */
  updateProfileMeta: async (meta: Array<{ meta_key: string; meta_value: string }>) => {
    if (!meta || meta.length === 0) {
      return { success: true, message: "No changes to save" };
    }

    try {
      const payload = { meta };
      const response = await api.post('/user/meta', payload);

      const resData = response.data;

      // Typical success check - adjust if your API uses different field
      if (resData.status === false || resData.status === "false") {
        throw new Error(resData.message || 'Failed to update profile metadata');
      }

      // You can return the whole response or just success indicator
      return {
        success: true,
        message: resData.message || 'Profile updated successfully',
        data: resData
      };
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.message ||
        'Failed to update profile metadata';

      // Optional: log for debugging
      console.error('updateProfileMeta error:', error);

      throw new Error(errorMessage);
    }
  },
};