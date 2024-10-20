const axios = require('axios/dist/node/axios.cjs')
export const deleteImageFromCloudinary = async (imgUrl) => {
    try {
      
      const publicId = imgUrl.split('/').pop().split('.')[0];
      const data =  {
        public_id: publicId,
        api_key: process.env.CLOUDINARY_API_KEY,
        timestamp: Math.floor(Date.now() / 1000),
        signature: generateSignature(publicId, process.env.CLOUDINARY_API_SECRET) 
      }
  
      const response = await axios.post(`https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/image/destroy`, 
        data
      );
  
    //   console.log('Delete response:', response.data);
      return {message:'deleted the image', data:response.data, success:true};
    } catch (error) {
    //   console.error('Error deleting image from Cloudinary:', error);
      return {message:'Error deleting image from Cloudinary', error:error, success:false}
    }
  }
  
  
  const generateSignature = (publicId, apiSecret) => {
    const crypto = require('crypto');
    const timestamp = Math.floor(Date.now() / 1000);
    const signature = crypto.createHash('sha1')
      .update(`public_id=${publicId}&timestamp=${timestamp}${apiSecret}`)
      .digest('hex');
    return signature;
  };