export const uploadToCloudinary = async (imageUri: string) => {
    if (!imageUri) throw new Error("No image selected");

    console.log("📸 Selected Image URI:", imageUri);

    const formData = new FormData();

    const uniqueFileName = `catch_${Date.now()}.jpg`;

    formData.append("file", {
        uri: imageUri,
        type: "image/jpeg",
        name: uniqueFileName,
    } as any);

    formData.append("upload_preset", "fiskeapp_unsigned");

    try {
        console.log("📤 Uploading to Cloudinary...");

        const uploadResponse = await fetch(
            "https://api.cloudinary.com/v1_1/dy7vmxy79/image/upload",
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
};
