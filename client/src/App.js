import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Header from "./components/Header.jsx"

import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import Home from './pages/Home.jsx';
import NotFound from './pages/NotFound.jsx';
import Project from './pages/Project.jsx';
const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        clients: {
          merge(existing, incoming) {
            return incoming;
          },
        },
        projects: {
          merge(existing, incoming) {
            return incoming;
          },
        },
      },
    },
  },
});
const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql',
  cache,
});
function App() {
  return (
    <>
      <ApolloProvider client={client}>
        <Router>
          <Header></Header>
          <div className="container">
            <Routes>
              <Route path='/' element={<Home />}></Route>
              <Route path='/projects/:id' element={<Project/>} ></Route>
              <Route path='*' element={<NotFound></NotFound> } />
            </Routes>
          </div>
        </Router>


      </ApolloProvider>

    </>
  );
}

export default App;
