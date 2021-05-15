import fs from "fs";
import { PostData } from "../types";
import { getSortedPostsData } from "../lib/posts";

const basicPath = "./data/";

const generateFilename = () => {
  const today = new Date();
  const timeStamp =
    today.getFullYear() +
    String(today.getMonth() + 1).padStart(2, "0") +
    String(today.getDate()).padStart(2, "0");
  return basicPath + timeStamp + "-algolia.json";
};

const generatePastJsonString = () => {
  const jsonFiles = fs.readdirSync(basicPath);
  const jsonFilePath = basicPath + jsonFiles[jsonFiles.length - 1];

  const pastPostsArray = JSON.parse(fs.readFileSync(jsonFilePath, "utf8"));
  return JSON.stringify(pastPostsArray);
};

const generatePostsGap = () => {
  const currentPostsArray = getSortedPostsData();
  const pastPostsString = generatePastJsonString();

  let postsGap: PostData[] = [];
  currentPostsArray.forEach((post: PostData) => {
    const stringPost = JSON.stringify(post);

    if (!pastPostsString.includes(stringPost)) {
      postsGap.push(post);
    }
  });
  return postsGap;
};

const createJson = () => {
  const newFile = generateFilename();
  const data = generatePostsGap();

  fs.writeFile(newFile, JSON.stringify(data), (err) => {
    if (err) throw err;
    console.log("正常に書き込みが完了しました");
  });
};

createJson();
