import axios from "axios";
import { logInfo } from "../util";
import { LogHandleAxiosError } from "../util/axios-helpers";
import { getStoreUrl } from "../util/store-helper";

const myStoreUrl = getStoreUrl({
  devStore: process.env.KEYWORD_LOCAL_STORE,
  prodStore: process.env.KEYWORD_STORE
});

const store = axios.create({
  baseURL: myStoreUrl
});

export interface IKeywordCollection {
  documents: [
    {
      id: string;
      keyPhrases: string[];
    }
  ];
  errors: string[];
}

async function GetKeywords(filepath: string): Promise<IKeywordCollection> {
  const params = "?path=" + filepath;
  const url = myStoreUrl + params;

  try {
    const result = await store.get(params);
    logInfo("GET", result.status, url);
    return result.data;
  } catch (error) {
    LogHandleAxiosError({ error: error, url: url });
  }
}

export const KeywordStore = {
  GetKeywords: GetKeywords
};
