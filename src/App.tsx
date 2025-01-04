import Comments from "./components/Comments";
import { UserContextProvider } from "./context/UserContext";

function App() {
  return (
    <UserContextProvider>
      <main className="grid min-h-screen place-items-center">
        <div className="max-w-[730px]">
          <Comments />
        </div>
      </main>
    </UserContextProvider>
  );
}

export default App;
