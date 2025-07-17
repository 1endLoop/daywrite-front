// src/api/musicApi.js
import axios from "axios";

export const fetchRecommendedMusic = async (keywords, genres) => {
  try {
    const response = await axios.post("http://localhost:8000/api/music/recommend", {
      keywordList: keywords,
      genreList: genres,
    });
    return response.data.tracks;
  } catch (error){
    console.error("음악 추천 요청 실패..", error)
    return [];
  }
}

