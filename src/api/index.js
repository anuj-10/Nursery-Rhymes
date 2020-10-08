import axios from "axios";

var config = {
  headers: {
    "Content-Type": "text/plain",
  },
  responseType: "text",
};

const url = `http://45.55.53.218/roku_interface/3C15/99999999/11/4141473a4244483a4140493a4846363641464040494444464740//firetv_getChildList/55106/1600944808586`;
const cardMap = new Map();

export const fetchAllCategories = async () => {
  try {
    const { data } = await axios.get(url, config);
    const allData = data.split("@vmc@");
    const allCategories = allData.shift().split(",");
    setCardData(allData);
    return allCategories.map((v, i) => {
      return {
        title: v,
        link: v,
        id: i,
      };
    });
  } catch (error) {
    console.error(error);
  }
};

const setCardData = (allData) => {
  allData.forEach((v) => {
    const [category, data] = v.split("^^^");
    const categoryData = data.split("~^").map((catTextData, i) => {
      const catArray = catTextData.split("~");
      return {
        detail_id: catArray[0],
        title: catArray[1],
        image: {
          p_small: { url: catArray[3] },
        },
        category_name: catArray[5],
        video_id: catArray[6],
        url: `http://45.55.53.218/roku_interface/3C15/99999999/11/4141473a4244483a4140493a4846363641464040494444464740//getContentDetails/${catArray[0]}/relative/1600944808586`,
        id: i,
      };
    });
    cardMap.set(category, categoryData);
  });
};

export const fetchCategoryData = async (categoryName) => {
  return cardMap.get(categoryName);
};

export const fetchVideoDetail = async (url) => {
  try {
    const { data } = await axios.get(url, config);
    return data.split("Play~")[1].split("~~~~|")[0];
  } catch (error) {
    console.log(error);
  }
};
