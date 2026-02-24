import axios from "axios";
import FormData from "form-data";

export async function predictTumor(imageBuffer) {
  try {
    const formData = new FormData();

    formData.append("file", imageBuffer, {
      filename: "mri.jpg",
      contentType: "image/jpeg",
    });

    const response = await axios.post(
      `${process.env.FASTAPI_URL}/predict`,
      formData,
      {
        headers: formData.getHeaders(),
        timeout: 20000, // 20 seconds timeout
      }
    );

    return response.data;

  } catch (error) {
    console.error("ML Service Error:", error.message);
    throw new Error("ML prediction failed");
  }
}