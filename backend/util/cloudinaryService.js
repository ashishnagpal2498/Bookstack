// Author - Yogish Honnadevipura Gopalakrishna
const cloudinary = require('cloudinary');
const fs = require('fs');
          
cloudinary.config({ 
  cloud_name: 'dbgnusrnk', 
  api_key: '767827158127427', 
  api_secret: 'aoeR110AXbKQZhUyJ8jOR6lJAyg' 
});

const uploadOnCloudinary  = async(filePath) => {
    try {
        if(!filePath) return null
        const response = await cloudinary.uploader.upload(filePath, {resource_type: "auto"})
        return response 

    }
    catch (error){
      console.log(error);
            fs.unlinkSync(filePath);
    }
}

module.exports = { uploadOnCloudinary };