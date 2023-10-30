// const upload_preset = process.env.VITE_UPLOAD_PRESET_NAME;
// const cloud_name = process.env.VITE_CLOUD_NAME;
const upload_preset = process.env.REACT_APP_UPLOAD_PRESET;
const cloud_name = process.env.REACT_APP_CLOUD_NAME;

const uploadImageToCloudinay = async (file) => {
  // console.log("Upload", cloud_name)
  const uplpadData = new FormData();

  uplpadData.append("file", file);
  uplpadData.append("upload_preset", upload_preset);
  uplpadData.append("cloud_name", cloud_name);

  const res = await fetch(
    `https:/api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
    {
      method: "POST",
      body: uplpadData,
    }
  );

  const data = await res.json();
  console.log(data);
  return data;
};

export default uploadImageToCloudinay;
