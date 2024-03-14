import styles from "./Search.module.css";

import React, { useState, useEffect } from "react";
import Tag from "src/components/Tag/Tag";
import Tags from "src/components/Cards/Tags/Tags";
import SearchCard from "./components/SearchCard/SearchCard";
import StickyButton from "src/components/stickybutton/stickybutton";
import SearchBar from "src/components/Searchbar/Searchbar";
import AdvancedSearchMenu from "./components/AdvancedSearch/AdvancedSearch";


const tag={tags: [
  { text: "Tag 1", color: "danger" },
  { text: "Tag 2", color: "success" },
  { text: "Tag 3", color: "warning" },
  { text: "Tag 4", color: "primary" },
  { text: "Tag 5", color: "secondary" },
  { text: "Tag 6", color: "info" },
  { text: "Tag 7", color: "dark" },
  { text: "Tag 8", color: "light" },
  

]}

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
  const [ingredients, setSearch] = useState("");
  const [tags, setTags] = useState([]);
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleOnChange = (e) => {
    setSearch(e.target.value);
  };

  const handleTagsChange = (tags) => {
    setTags(tags);
  };

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
    <>
      <div className={styles.background}>
        <SearchBar  
        text="onion, canned tomato"
        btnText={"Search"}
        className={styles.searchBar}
        value={ingredients}
        onChange={handleOnChange}
        btnClick={() =>
          navigate("/search", { state: { ingredients, tags } })
        }
        />
        <AdvancedSearchMenu styles={{color:'white'}} onTagsChange={handleTagsChange} />
        <p className={styles.backgroundText}>Recommended Tags</p>
        <div className={styles.design}>
 
          <Tags tags={tag.tags} className={styles.tag} />
        </div>
        <div className={styles.designSmall}>
 
        <Tags tags={tag.tags.slice(0, 5)} />
        </div>
      </div>
      <hr />
      <p className={styles.text}>Search Results:</p>
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
      <StickyButton />
    </>
  );
};

export default SearchPage;
