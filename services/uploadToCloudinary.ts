import Constants from "expo-constants";

const cloudName = Constants.expoConfig?.extra?.CLOUDINARY_CLOUD_NAME ?? "";
const uploadPreset =
    Constants.expoConfig?.extra?.CLOUDINARY_UPLOAD_PRESET ?? "";
const profileFolder =
    Constants.expoConfig?.extra?.CLOUDINARY_PROFILE_FOLDER ?? "";
const catchesFolder =
    Constants.expoConfig?.extra?.CLOUDINARY_CATCHES_FOLDER ?? "";

// 🔹 Check for Missing Cloudinary Config
if (!cloudName || !uploadPreset) {
    console.error(
        "🔥 Cloudinary configuration is missing. Check your environment variables."
    );
}

const CloudinaryService = {
    async uploadToCloudinary(imageUri: string, folder: string) {
        if (!imageUri) throw new Error("❌ No image selected");

        console.log("📸 Selected Image URI:", imageUri);

        const formData = new FormData();
        const uniqueFileName = `${folder}_${Date.now()}.jpg`;

        formData.append("file", {
            uri: imageUri,
            type: "image/jpeg",
            name: uniqueFileName,
        } as any);
        formData.append("upload_preset", uploadPreset);
        formData.append("folder", folder);

        try {
            console.log(`📤 Uploading to Cloudinary (Folder: ${folder})...`);

            const uploadResponse = await fetch(
                `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
                {
                    method: "POST",
                    body: formData,
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            const data = await uploadResponse.json();
            console.log("🌐 Cloudinary Response:", data);

            if (!data.secure_url) throw new Error("❌ Image upload failed.");

            console.log("✅ Uploaded Image URL:", data.secure_url);
            return data.secure_url;
        } catch (error) {
            console.error("🔥 Upload Error:", error);
            throw new Error("Image upload failed.");
        }
    },

    async uploadCatchesImageToCloudinary(imageUri: string) {
        return await this.uploadToCloudinary(imageUri, catchesFolder);
    },

    async uploadProfileImgToCloudinary(localUri: string) {
        return await this.uploadToCloudinary(localUri, profileFolder);
    },
};

export default CloudinaryService;
