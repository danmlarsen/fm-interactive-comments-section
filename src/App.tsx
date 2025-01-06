import Comments from "./components/Comments";
import CommentsContextProvider from "./context/CommentContext";
import { UserContextProvider } from "./context/UserContext";

function App() {
  return (
    <UserContextProvider>
      <main className="grid min-h-screen place-items-center">
        <div className="max-w-[730px]">
          <CommentsContextProvider>
            <Comments />
          </CommentsContextProvider>
        </div>
      </main>
    </UserContextProvider>
  );
}

export default App;
