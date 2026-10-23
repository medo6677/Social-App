import FeedSidebar from "../../Components/Feed/FeedSidebar";
import Posts from "../../Components/Feed/Posts";
import SuggestedFriends from "../../Components/Feed/SuggestedFriends";
import useDocumentTitle from "../../Hooks/useDocumentTitle";

export default function Feed() {
  useDocumentTitle('Feed');
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
      <aside className="hidden lg:block lg:col-span-3 lg:sticky lg:top-20">
        <FeedSidebar />
      </aside>

      <main className="lg:col-span-6 flex flex-col gap-4 order-1">
        <Posts />
      </main>

      <aside className="hidden lg:block lg:col-span-3 lg:sticky lg:top-20 order-2">
        <SuggestedFriends />
      </aside>
    </div>
  );
}
