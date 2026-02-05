 import { useState, useEffect, useCallback } from 'react';
 import { TopicContent } from '@/data/subjects';
 
 const BOOKMARKS_KEY = 'study-assistant-bookmarks';
 
 export interface Bookmark {
   topic: TopicContent;
   savedAt: string;
 }
 
 export const useBookmarks = () => {
   const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
 
   // Load bookmarks from localStorage on mount
   useEffect(() => {
     try {
       const saved = localStorage.getItem(BOOKMARKS_KEY);
       if (saved) {
         setBookmarks(JSON.parse(saved));
       }
     } catch (error) {
       console.error('Failed to load bookmarks:', error);
     }
   }, []);
 
   // Save bookmarks to localStorage whenever they change
   const saveBookmarks = useCallback((newBookmarks: Bookmark[]) => {
     try {
       localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(newBookmarks));
       setBookmarks(newBookmarks);
     } catch (error) {
       console.error('Failed to save bookmarks:', error);
     }
   }, []);
 
   const addBookmark = useCallback((topic: TopicContent) => {
     const exists = bookmarks.some(b => b.topic.title === topic.title);
     if (!exists) {
       const newBookmark: Bookmark = {
         topic,
         savedAt: new Date().toISOString(),
       };
       saveBookmarks([...bookmarks, newBookmark]);
     }
   }, [bookmarks, saveBookmarks]);
 
   const removeBookmark = useCallback((topicTitle: string) => {
     const filtered = bookmarks.filter(b => b.topic.title !== topicTitle);
     saveBookmarks(filtered);
   }, [bookmarks, saveBookmarks]);
 
   const isBookmarked = useCallback((topicTitle: string) => {
     return bookmarks.some(b => b.topic.title === topicTitle);
   }, [bookmarks]);
 
   const toggleBookmark = useCallback((topic: TopicContent) => {
     if (isBookmarked(topic.title)) {
       removeBookmark(topic.title);
     } else {
       addBookmark(topic);
     }
   }, [isBookmarked, removeBookmark, addBookmark]);
 
   return {
     bookmarks,
     addBookmark,
     removeBookmark,
     isBookmarked,
     toggleBookmark,
   };
 };