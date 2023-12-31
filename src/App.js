import Rows from "./Rows";
import requests from "./Request";
import "./Row.css"
import "./App.css"
import Banner from "./Banner";
import Navbar from "./Navbar";
import Search from "./Search";
import Footer from "./Footer";
function App() {
  return (
    <div className="App">
      <Navbar/>
      <Banner fetchUrl={requests.fetchNetflixOriginals&&requests.fetchTrending} />
      <Search isLargeRow/>
      <Rows title="Originals" fetchUrl={requests.fetchNetflixOriginals} isLargeRow />
      <Rows title="Trending Now" fetchUrl={requests.fetchTrending} isLargeRow/>
      <Rows title="Top-Rated" fetchUrl={requests.fetchTopRated} isLargeRow/>
      <Rows title="Popular-Action-Movies" fetchUrl={requests.fetchActionMovies} isLargeRow/>
      <Rows title="Popular-Comedy-Movies" fetchUrl={requests.fetchComedyMovies} isLargeRow/>
      <Rows title="Popular-Horror-Movies" fetchUrl={requests.fetchHorrorMovies}isLargeRow />
      <Rows title="Popular-Romance-Movies" fetchUrl={requests.fetchRomanceMovies}isLargeRow />
      <Rows title="Popular-Document-Movies" fetchUrl={requests.fetchDocumentMovies}isLargeRow />
      <Footer/>
    </div>
  );
}

export default App;
