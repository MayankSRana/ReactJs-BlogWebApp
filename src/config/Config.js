const Config = {
  endPoints: import.meta.env.VITE_APPWRITE_ENDPOINT,
  ProjectId: import.meta.env.VITE_APPWRITE_PROJECT_ID,
  DbId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
  collectionId: import.meta.env.VITE_APPWRITE_COLLECTION_ID,
  bucketId: import.meta.env.VITE_APPWRITE_BUCKET_ID,
};
export default Config;
