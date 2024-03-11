import styles from "./Search.module.css";

import React, { useState, useEffect } from "react";

import SearchCard from "./components/SearchCard/SearchCard";

const dummyData = [
  {
    id: "100",
    width: "30rem",
    height: "400rem" /** must be px/rem value */,
    // imgURL: {'src/assets/images/sample-pic-horizontal.jpg'},
    imgURL: "src/assets/images/sample_pic.jpg",
    title: "Some Random Recipe",
    description: "This is recipe description blablabla ... ",
    info: {
      equip: "Oven",
      time: "40 minutes",
      size: "2 servings",
    },
    tags: [
      { text: "Tag 1", color: "danger" },
      { text: "Tag 2", color: "success" },
      { text: "Tag 3", color: "warning" },
    ],
  },
  {
    id: "101",
    width: "30rem",
    height: "400rem" /** must be px/rem value */,
    // imgURL: {'src/assets/images/sample-pic-horizontal.jpg'},
    imgURL: "src/assets/images/sample_pic.jpg",
    title: "Some Random Recipe 2",
    description: "This is recipe description blablabla ... ",
    info: {
      equip: "Oven",
      time: "40 minutes",
      size: "2 servings",
    },
    tags: [
      { text: "Tag 1", color: "danger" },
      { text: "Tag 2", color: "success" },
      { text: "Tag 3", color: "warning" },
    ],
  },
  {
    id: "102",
    width: "30rem",
    height: "400rem" /** must be px/rem value */,
    // imgURL: {'src/assets/images/sample-pic-horizontal.jpg'},
    imgURL: "src/assets/images/sample_pic.jpg",
    title: "Some Random Recipe 3",
    description: "This is recipe description blablabla ... ",
    info: {
      equip: "Oven",
      time: "40 minutes",
      size: "2 servings",
    },
    tags: [
      { text: "Tag 1", color: "danger" },
      { text: "Tag 2", color: "success" },
      { text: "Tag 3", color: "warning" },
    ],
  },
  {
    id: "103",
    width: "30rem",
    height: "400rem" /** must be px/rem value */,
    // imgURL: {'src/assets/images/sample-pic-horizontal.jpg'},
    imgURL: "src/assets/images/sample_pic.jpg",
    title: "Some Random Recipe 4",
    description: "This is recipe description blablabla ... ",
    info: {
      equip: "Oven",
      time: "40 minutes",
      size: "2 servings",
    },
    tags: [
      { text: "Tag 1", color: "danger" },
      { text: "Tag 2", color: "success" },
      { text: "Tag 3", color: "warning" },
    ],
  },
  {
    id: "104",
    width: "30rem",
    height: "400rem" /** must be px/rem value */,
    // imgURL: {'src/assets/images/sample-pic-horizontal.jpg'},
    imgURL: "src/assets/images/sample_pic.jpg",
    title: "Some Random Recipe 5",
    description: "This is recipe description blablabla ... ",
    info: {
      equip: "Oven",
      time: "40 minutes",
      size: "2 servings",
    },
    tags: [
      { text: "Tag 1", color: "danger" },
      { text: "Tag 2", color: "success" },
      { text: "Tag 3", color: "warning" },
    ],
  },
  {
    id: "105",
    width: "30rem",
    height: "400rem" /** must be px/rem value */,
    // imgURL: {'src/assets/images/sample-pic-horizontal.jpg'},
    imgURL: "src/assets/images/sample_pic.jpg",
    title: "Some Random Recipe 6",
    description: "This is recipe description blablabla ... ",
    info: {
      equip: "Oven",
      time: "40 minutes",
      size: "2 servings",
    },
    tags: [
      { text: "Tag 1", color: "danger" },
      { text: "Tag 2", color: "success" },
      { text: "Tag 3", color: "warning" },
    ],
  },
  {
    id: "106",
    width: "30rem",
    height: "400rem" /** must be px/rem value */,
    // imgURL: {'src/assets/images/sample-pic-horizontal.jpg'},
    imgURL: "src/assets/images/sample_pic.jpg",
    title: "Some Random Recipe 7",
    description: "This is recipe description blablabla ... ",
    info: {
      equip: "Oven",
      time: "40 minutes",
      size: "2 servings",
    },
    tags: [
      { text: "Tag 1", color: "danger" },
      { text: "Tag 2", color: "success" },
      { text: "Tag 3", color: "warning" },
    ],
  },
  {
    id: "107",
    width: "30rem",
    height: "400rem" /** must be px/rem value */,
    // imgURL: {'src/assets/images/sample-pic-horizontal.jpg'},
    imgURL: "src/assets/images/sample_pic.jpg",
    title: "Some Random Recipe 8",
    description: "This is recipe description blablabla ... ",
    info: {
      equip: "Oven",
      time: "40 minutes",
      size: "2 servings",
    },
    tags: [
      { text: "Tag 1", color: "danger" },
      { text: "Tag 2", color: "success" },
      { text: "Tag 3", color: "warning" },
    ],
  },
  {
    id: "108",
    width: "30rem",
    height: "400rem" /** must be px/rem value */,
    // imgURL: {'src/assets/images/sample-pic-horizontal.jpg'},
    imgURL: "src/assets/images/sample_pic.jpg",
    title: "Some Random Recipe 9",
    description: "This is recipe description blablabla ... ",
    info: {
      equip: "Oven",
      time: "40 minutes",
      size: "2 servings",
    },
    tags: [
      { text: "Tag 1", color: "danger" },
      { text: "Tag 2", color: "success" },
      { text: "Tag 3", color: "warning" },
    ],
  },
];

const SearchPage = () => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchMoreData = () => {
    setLoading(true);
    setTimeout(() => {
      const newData = dummyData.slice(cards.length, cards.length + 6);
      setCards((prevCards) => [...prevCards, ...newData]);
      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    fetchMoreData();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
          document.body.scrollHeight - 100 &&
        !loading &&
        cards.length < dummyData.length
      ) {
        fetchMoreData();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, cards]);

  return (
    <div className={styles.container}>
      {cards.map((val, index) => (
        <SearchCard
          key={index}
          imgURL={val.imgURL}
          width={val.width}
          height={val.height}
          title={val.title}
          description={val.description}
          info={val.info}
          tags={val.tags}
        />
      ))}
      {loading && <div>Loading...</div>}
    </div>
  );
};

export default SearchPage;
