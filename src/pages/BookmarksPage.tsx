 import { Link } from 'react-router-dom';
 import { Bookmark, BookmarkX, Trash2 } from 'lucide-react';
 import Header from '@/components/Header';
 import Footer from '@/components/Footer';
 import { useBookmarks } from '@/hooks/useBookmarks';
 import { cn } from '@/lib/utils';
 
 const subjectColorMap: Record<string, string> = {
   'Biology': 'biology',
   'Chemistry': 'chemistry',
   'Mathematics': 'mathematics',
   'Physics': 'physics',
   'English': 'english',
   'Further Mathematics': 'further-math',
 };
 
 const BookmarksPage = () => {
   const { bookmarks, removeBookmark } = useBookmarks();
 
   return (
     <div className="flex min-h-screen flex-col">
       <Header />
       
       <main className="flex-1">
         <section className="border-b py-8 sm:py-12">
           <div className="container">
             <div className="flex items-center gap-4">
               <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 sm:h-20 sm:w-20">
                 <Bookmark className="h-8 w-8 text-primary sm:h-10 sm:w-10" />
               </div>
               <div>
                 <h1 className="text-3xl font-bold text-foreground sm:text-4xl">
                   Saved Topics
                 </h1>
                 <p className="mt-1 text-muted-foreground">
                   {bookmarks.length} topic{bookmarks.length !== 1 ? 's' : ''} saved for revision
                 </p>
               </div>
             </div>
           </div>
         </section>
 
         <section className="py-8 sm:py-12">
           <div className="container">
             {bookmarks.length === 0 ? (
               <div className="flex flex-col items-center justify-center py-16 text-center">
                 <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-muted">
                   <BookmarkX className="h-10 w-10 text-muted-foreground" />
                 </div>
                 <h3 className="mb-2 text-xl font-semibold text-foreground">
                   No saved topics yet
                 </h3>
                 <p className="mb-6 max-w-sm text-muted-foreground">
                   When you find a topic you want to revisit, click the bookmark icon to save it here.
                 </p>
                 <Link
                   to="/"
                   className="rounded-xl bg-primary px-6 py-3 font-semibold text-primary-foreground transition-opacity hover:opacity-90"
                 >
                   Browse Subjects
                 </Link>
               </div>
             ) : (
               <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                 {bookmarks.map((bookmark) => {
                   const colorClass = subjectColorMap[bookmark.topic.subject] || 'primary';
                   const subjectId = bookmark.topic.subject.toLowerCase().replace(' ', '-');
                   
                   return (
                     <div
                       key={bookmark.topic.title}
                       className={cn(
                         "group relative overflow-hidden rounded-xl border-2 bg-card p-5 shadow-card transition-all hover:shadow-card-hover",
                         `border-${colorClass}`
                       )}
                     >
                       <div className="mb-3 flex items-start justify-between">
                         <span className={cn(
                           "rounded-full px-3 py-1 text-xs font-medium",
                           `bg-${colorClass} text-${colorClass}`
                         )}>
                           {bookmark.topic.subject}
                         </span>
                         <button
                           onClick={() => removeBookmark(bookmark.topic.title)}
                           className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                           aria-label="Remove bookmark"
                         >
                           <Trash2 className="h-4 w-4" />
                         </button>
                       </div>
                       
                       <Link to={`/subject/${subjectId}?topic=${encodeURIComponent(bookmark.topic.title)}`}>
                         <h3 className="mb-2 text-lg font-bold text-foreground transition-colors group-hover:text-primary">
                           {bookmark.topic.title}
                         </h3>
                         <p className="line-clamp-2 text-sm text-muted-foreground">
                           {bookmark.topic.definition}
                         </p>
                       </Link>
                       
                       <p className="mt-3 text-xs text-muted-foreground">
                         Saved {new Date(bookmark.savedAt).toLocaleDateString()}
                       </p>
                     </div>
                   );
                 })}
               </div>
             )}
           </div>
         </section>
       </main>
 
       <Footer />
     </div>
   );
 };
 
 export default BookmarksPage;