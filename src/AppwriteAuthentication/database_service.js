import Config from "../config/Config";
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class DatabaseService {
  client = new Client();
  databases;
  bucket;

  constructor() {
    this.client.setEndpoint(Config.endPoints).setProject(Config.ProjectId);
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  async createPost({ title, slug, content, featuredImage, status, userId }) {
    try {
      return await this.databases.createDocument(
        Config.DbId,
        Config.collectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
          userId,
        }
      );
    } catch (error) {
      console.log("Database Setvice :: createPost", error);
    }
  }

  async updatePost(slug, { title, content, featuredImage, status }) {
    try {
      return await this.databases.updateDocument(
        Config.DbId,
        Config.collectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
        }
      );
    } catch (error) {
      console.log("Database Setvice :: Updatepost", error);
    }
  }

  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(
        Config.DbId,
        Config.collectionId,
        slug
      );
      return true;
    } catch (error) {
      console.log("Database Setvice :: Deletepost", error);
      return false;
    }
  }

  async getSinglePost(slug) {
    try {
      return await this.databases.getDocument(
        Config.DbId,
        Config.collectionId,
        slug
      );
    } catch (error) {
      console.log("Database Setvice :: getSinglePost", error);
      return false;
    }
  }

  async getAllPost(quries = [Query.equal("status", "active")]) {
    try {
      return await this.databases.listDocuments(
        Config.DbId,
        Config.collectionId,
        quries
      );
    } catch (error) {
      console.log("Database Setvice :: getAllPost", error);
      return false;
    }
  }

  // file Upload service

  async uploadFile(file) {
    try {
      return await this.bucket.createFile(Config.bucketId, ID.unique(), file);
    } catch (error) {
      console.log("Database Setvice :: uploadFile", error);
      return false;
    }
  }

  async deleteFile(fileId) {
    try {
      await this.bucket.deleteFile(Config.bucketId, fileId);
      return true;
    } catch (error) {
      console.log("Database Setvice :: deleteFile", error);
      return false;
    }
  }

  getFilePreview(fileId) {
    return this.bucket.getFilePreview(Config.bucketId, fileId);
  }
}

const databaseservice = new DatabaseService();
export default databaseservice;
