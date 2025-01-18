import Comments from "./components/Comments";
import CommentsContextProvider from "./context/CommentContext";
import { UserContextProvider } from "./context/UserContext";

function App() {
  return (
    <UserContextProvider>
      <main className="grid min-h-screen justify-center px-4 py-8 md:py-16">
        <div className="max-w-[45.625rem]">
          <CommentsContextProvider>
            <Comments />
          </CommentsContextProvider>
        </div>
      </main>
    </UserContextProvider>
  );
}

export default App;
