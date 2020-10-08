import React, { useEffect, useState } from "react";
import {
  fetchAllCategories,
  fetchCategoryData,
  fetchVideoDetail,
} from "../api";
import Cards from "./Cards";
import Navigation from "./Navigation";
import { useNavigation } from "../hooks/useNavigation";
import Search from "./Search";
import ModalComponent from "./Modal";

function MainComponent() {
  const [category, setCategory] = useState([]);
  const [cardData, setCardData] = useState([]);
  const [filteredCardData, setFilteredCardData] = useState([]);
  const [currentNavIndex, setCurrentNavIndex] = useState(0);
  const [currentCardIndex, setCurrentCardIndex] = useState(-1);
  const [isNavActive, setIsNavActive] = useState(true);
  const [show, setShow] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");
  const [loader, setLoader] = useState(false);
  const [videoPause, setVideoPause] = useState(false);

  const [current, setNavigation] = useNavigation({
    onUpKey: () => setCurrentCardIndex((i) => (i > -1 ? i - 1 : i)),
    onDownKey: (len) => {
      setCurrentCardIndex((i) => (len > i ? i + 1 : i));
      setIsNavActive(false);
    },
    onLeftKey: (len) => setCurrentNavIndex((i) => (i === 0 ? len - 1 : i - 1)),
    onRightKey: (len) =>
      setCurrentNavIndex((i) => (i + 1 > len - 1 ? 0 : i + 1)),
    onEnterKey: () => {
      setShow(true);
      setVideoPause(false);
    },
    onBackspaceKey: () => {
      setShow(false);
    },
    onVideoPause: () => {
      setVideoPause(true);
    },
    onVideoPlay: () => {
      setVideoPause(false);
    },
  });

  useEffect(() => {
    setLoader(true);
    async function fetchData() {
      const categories = await fetchAllCategories();
      setCategory(categories);
      const firstCategoryData = await fetchCategoryData(categories[0].link);
      setCardData(firstCategoryData);
      setLoader(false);
      setFilteredCardData(firstCategoryData);
      current.allCategoriesLength = categories.length;
      current.cardLength = firstCategoryData.length;
      setNavigation(current);
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (currentCardIndex === -1) {
      setIsNavActive(true);
      current.navigationType = "nav";
      setNavigation(current);
    } else if (
      (current.navigationType = "card" && filteredCardData[currentCardIndex])
    ) {
      async function fetchCurrentVideo() {
        let videoUrl;
        const currentCard = cardData[currentCardIndex];
        if (currentCard.isVideoFetched) {
          videoUrl = currentCard.videoUrl;
        } else {
          videoUrl = await fetchVideoDetail(currentCard.url);
          currentCard.isVideoFetched = true;
          currentCard.videoUrl = videoUrl;
          cardData[currentCardIndex] = currentCard;
        }
        setVideoUrl(videoUrl);
      }
      fetchCurrentVideo();
    }
  }, [currentCardIndex]);

  useEffect(() => {
    current.show = show;
    setNavigation(current);
  }, [show]);

  useEffect(() => {
    current.videoPause = !videoPause; // video pause value true false
    setNavigation(current);
  }, [videoPause]);

  useEffect(() => {
    async function fetchData() {
      const categoryData = await fetchCategoryData(
        category[currentNavIndex].link
      );
      setCardData(categoryData);
      setFilteredCardData(categoryData);
      current.cardLength = categoryData.length;
      setNavigation(current);
    }
    current.navigationType === "nav" &&
      category[currentNavIndex] &&
      fetchData();
  }, [currentNavIndex]);

  const onSearch = (search) => {
    const filteredArray = cardData.filter((i) =>
      i.title.toLowerCase().match(search)
    );
    setFilteredCardData(filteredArray);
  };

  return (
    <div>
      <Search onSearch={onSearch} />
      <Navigation
        category={category}
        currentNavIndex={currentNavIndex}
        isNavActive={isNavActive}
      />
      <Cards
        categoryData={filteredCardData}
        currentCardIndex={currentCardIndex}
      />
      {loader && <div className="loader" />}
      <ModalComponent show={show} videoPause={videoPause} videoUrl={videoUrl} />
    </div>
  );
}

export default MainComponent;
